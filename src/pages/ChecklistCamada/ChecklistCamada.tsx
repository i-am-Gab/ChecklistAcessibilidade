import { useEffect, useMemo, useRef, useState } from "react";
import {
  useLocation,
  useNavigate,
  useParams,
  Link,
} from "react-router";
import { BookOpen, Image } from "lucide-react";
import { Breadcrumb } from "../../components/ui/Breadcrumb/Breadcrumb";
import type {
  ChecklistCategory,
} from "../../mocks/checklists.mock";
import {
  checklistConfig,
  type CamadaId,
} from "./checklist.config";
import {
  calculateProgress,
  filterCategories,
  getChecklistImageUrlsByLayer,
  getChecklistItemsByLayer,
  groupItemsByCategory,
  reconcileChecklistItems,
  toggleChecklistCategory,
  toggleChecklistItem,
  toggleChecklistSubItem,
} from "./checklist.utils";
import ChecklistCategorySection from "./Components/ChecklistCategorySection/ChecklistCategorySection";
import ChecklistVariacoesModal from "./Components/ChecklistVariacoesModal/ChecklistVariacoesModal";
import styles from "./ChecklistCamada.module.css";
import { tiposTela } from "../PersonalizarCamada/tiposTela.config";
import NaoEncontrada from "../NaoEncontrada/NaoEncontrada";
import { useAnnouncement } from "../../hooks/useAnnouncement";
import { useModalDialog } from "../../hooks/useModalDialog";
import { readChecklistDraft, saveChecklistDraft } from "../../features/checklist/checklistProgress";
import { getChecklistUrl, getPersonalizationUrl, readChecklistSelection, type ChecklistSelection } from "../../features/checklist/checklistUrl";
import modalStyles from "./Components/ChecklistVariacoesModal/ChecklistVariacoesModal.module.css";
import { getCategoriesForLayer } from "../../data/categories";

export default function ChecklistCamada() {
  const { camadaId } = useParams<{ camadaId: string }>();
  const location = useLocation();
  if (camadaId !== "1" && camadaId !== "2" && camadaId !== "3") {
    return <NaoEncontrada message="Esse checklist não existe. Escolha uma das três camadas disponíveis." />;
  }
  const selection = readChecklistSelection(Number(camadaId) as CamadaId, location.search, location.state);
  return <ChecklistConteudo key={`${selection.layer}:${selection.screen ?? "geral"}`} selection={selection} />;
}

function ChecklistConteudo({ selection }: { selection: ChecklistSelection }) {
  const currentLayer = selection.layer;
  const navigate = useNavigate();
  const location = useLocation();
  const { message, announce } = useAnnouncement();

  const currentConfig = checklistConfig[currentLayer];
  const tipoTela = currentLayer === 1
    ? tiposTela.find((tela) => tela.id === selection.screen)
    : undefined;
  const personalizationUrl = getPersonalizationUrl({
    ...selection,
    categories: selection.categories ?? getCategoriesForLayer(currentLayer).map(category => category.id),
  });
  const voltarParaPersonalizacao = () => navigate(personalizationUrl);
  const categoriasPreservadas = selection.categories;
  const variacaoTelaVisualizacao = selection.viewVariation;
  const variacaoTelaBusca = selection.searchVariation;
  const checklistUrl = getChecklistUrl(selection);
  useEffect(() => {
    if (`${location.pathname}${location.search}` !== checklistUrl) {
      navigate(checklistUrl, { replace: true, state: null });
    }
  }, [checklistUrl, location.pathname, location.search, navigate]);

  const [showModalVariacoes, setShowModalVariacoes] =
    useState(false);

  const [telaParaConfigurar, setTelaParaConfigurar] = useState<
    "Visualização" | "Busca" | null
  >(null);

  const [initialDraft] = useState(() => readChecklistDraft(selection));
  const [storageAvailable, setStorageAvailable] = useState(initialDraft.available);
  const [showReset, setShowReset] = useState(false);
  const resetDialog = useModalDialog(showReset);
  const copyLinkButton = useRef<HTMLButtonElement>(null);
  const didReset = useRef(false);
  const [items, setItems] = useState(() => {
    const fresh = getChecklistItemsByLayer(
      currentLayer,
      variacaoTelaBusca,
      variacaoTelaVisualizacao,
    );
    return initialDraft.items ? reconcileChecklistItems(initialDraft.items, fresh) : fresh;
  });
  useEffect(() => {
    setItems(previous => reconcileChecklistItems(previous,
      getChecklistItemsByLayer(currentLayer, variacaoTelaBusca, variacaoTelaVisualizacao),
    ));
  }, [currentLayer, variacaoTelaBusca, variacaoTelaVisualizacao]);
  useEffect(() => {
    if (!showReset && didReset.current) {
      copyLinkButton.current?.focus();
      didReset.current = false;
    }
  }, [showReset]);

  const persistItems = (next: typeof items) => {
    setItems(next);
    const saved = saveChecklistDraft(selection, next);
    setStorageAvailable(saved);
    return saved;
  };

  const resetProgress = () => {
    const fresh = getChecklistItemsByLayer(currentLayer, variacaoTelaBusca, variacaoTelaVisualizacao);
    const saved = persistItems(fresh);
    didReset.current = true;
    setShowReset(false);
    announce(`Progresso reiniciado. ${saved ? "Rascunho atualizado neste navegador." : "Não foi possível salvar o rascunho neste navegador."}`);
  };

  const copyChecklistLink = async () => {
    const base = import.meta.env.BASE_URL.replace(/\/$/, "");
    const url = new URL(`${base}${checklistUrl}`, window.location.origin).href;
    try {
      await navigator.clipboard.writeText(url);
      announce("Link copiado. Ele inclui a personalização e as variações, sem suas marcações.");
    } catch {
      announce("Não foi possível copiar automaticamente. Você pode copiar o endereço da página na barra do navegador.");
    }
  };

  const groupedItems = useMemo(
    () => groupItemsByCategory(items),
    [items],
  );

  const categoriasParaExibir = useMemo(
    () =>
      filterCategories(groupedItems, categoriasPreservadas),
    [groupedItems, categoriasPreservadas],
  );

  const itemsExibidos = Object.values(categoriasParaExibir).flat();

  const { totalItems, completedItems, progress } =
    calculateProgress(itemsExibidos);

  const imageUrls = getChecklistImageUrlsByLayer(currentLayer);

  const updateProgress = (next: typeof items) => {
    const saved = persistItems(next);
    const visible = Object.values(filterCategories(groupItemsByCategory(next), categoriasPreservadas)).flat();
    const result = calculateProgress(visible);
    announce(`${result.completedItems} de ${result.totalItems} itens concluídos. ${result.progress === 100 ? "Checklist concluído." : `${result.progress}% concluído.`}${saved ? "" : " Não foi possível salvar o rascunho neste navegador."}`);
  };

  const previewVariation = (type: "Busca" | "Visualização", value: string) => {
    const next = reconcileChecklistItems(items, getChecklistItemsByLayer(
      currentLayer,
      type === "Busca" ? value as ChecklistSelection["searchVariation"] : variacaoTelaBusca,
      type === "Visualização" ? value as ChecklistSelection["viewVariation"] : variacaoTelaVisualizacao,
    ));
    const lost = calculateProgress(items).completedItems - calculateProgress(next).completedItems;
    return { next, lost };
  };
  const describeVariation = (type: "Busca" | "Visualização", value: string) => {
    const { lost } = previewVariation(type, value);
    return lost > 0
      ? `${lost === 1 ? "Uma marcação será removida porque o requisito não existe" : `${lost} marcações serão removidas porque os requisitos não existem`} nesta variação. As demais marcações serão preservadas.`
      : "As marcações dos requisitos que continuarem na tela serão preservadas. Requisitos novos começam desmarcados.";
  };
  const applyVariation = (type: "Busca" | "Visualização", value: string) => {
    const { next, lost } = previewVariation(type, value);
    const saved = persistItems(next);
    navigate(getChecklistUrl({
      ...selection,
      searchVariation: type === "Busca" ? value as ChecklistSelection["searchVariation"] : variacaoTelaBusca,
      viewVariation: type === "Visualização" ? value as ChecklistSelection["viewVariation"] : variacaoTelaVisualizacao,
    }), { replace: true });
    announce(`Variação aplicada: ${value}. ${lost > 0 ? `${lost} marcações removidas de requisitos que saíram do checklist.` : "Marcações preservadas."}${saved ? "" : " O rascunho está disponível apenas enquanto o site permanecer aberto."}`);
  };

  const handleToggleItem = (itemId: number) => {
    updateProgress(toggleChecklistItem(items, itemId));
  };

  const handleToggleSubItem = (
    itemId: number,
    subItemId: string,
  ) => {
    updateProgress(toggleChecklistSubItem(items, itemId, subItemId));
  };

  const handleToggleCategory = (
    category: ChecklistCategory,
  ) => {
    updateProgress(toggleChecklistCategory(items, category));
  };

  const handleOpenVariations = (
    type: "Visualização" | "Busca",
  ) => {
    setTelaParaConfigurar(type);
    setShowModalVariacoes(true);
  };

  const renderTextWithColorIndicator = (
    text: string,
    colorIndicator?: string,
  ) => {
    if (!colorIndicator) return text;

    const colorMatch = text.match(/\(([^)]+)\)$/);
    const colorName = colorMatch ? colorMatch[1] : "";
    const textWithoutParentheses = text
      .replace(/\([^)]+\)$/, "")
      .trim();

    return (
      <span className={styles.colorIndicatorWrapper}>
        <span>{textWithoutParentheses}</span>
        {colorName && (
          <span className={styles.colorIndicatorInfo}>
            <span>(</span>
            <span
              className={styles.colorDot}
              style={{ backgroundColor: colorIndicator }}
              aria-hidden="true"
            />
            <span>{colorName})</span>
          </span>
        )}
      </span>
    );
  };

  const renderAction = (
    action?: {
      label: string;
      type: "navigate" | "link" | "mailto";
      value: string;
    },
    variant: "primary" | "secondary" = "primary",
  ) => {
    if (!action) return null;

    const className =
      variant === "primary"
        ? styles.primaryActionButton
        : styles.secondaryActionButton;

    if (action.type === "navigate") {
      return (
        <Link
          to={action.value}
          className={className}
        >
          {action.label}
        </Link>
      );
    }

    return (
      <a
        href={action.value}
        target={action.type === "link" ? "_blank" : undefined}
        rel={
          action.type === "link"
            ? "noopener noreferrer"
            : undefined
        }
        className={className}
        aria-label={action.type === "link" ? `${action.label} (abre em nova aba)` : undefined}
      >
        {action.label}
      </a>
    );
  };

  return (
    <div className={styles.page}>

      <div className={styles.container}>
        <Breadcrumb
          items={[
            { label: "Home", to: "/" },
            { label: currentConfig.label, to: personalizationUrl },
            { label: "Checklist" },
          ]}
          onBack={voltarParaPersonalizacao}
        />

        <h1 className={styles.pageTitle}>Checklist — {currentConfig.label}</h1>
        {tipoTela && <p className={styles.scenarioLabel}>Cenário: {tipoTela.cenario}</p>}

        <a
          href={currentConfig.infoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.infoButton}
          aria-label={`Mais informações sobre a ${currentConfig.label} (abre em nova aba)`}
        >
          <BookOpen className={styles.infoButtonIcon} />
          Mais Informações
        </a>

        <div className={styles.progressCard}>
          <div className={styles.progressHeader}>
            <div>
              <h2 className={styles.progressTitle}>
                Itens atendidos
              </h2>
            </div>

            <div className={styles.progressValue}>
              {progress}% Concluído
            </div>
          </div>

          <div className={styles.progressBarBackground} role="progressbar" aria-label="Progresso do checklist" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress} aria-valuetext={`${completedItems} de ${totalItems} itens concluídos`}>
            <div
              className={styles.progressBarFill}
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className={styles.progressFooter}>
            <span>
              {completedItems} DE {totalItems} ITENS CONCLUÍDOS
            </span>
            <div className={styles.draftActions}>
              <button type="button" ref={copyLinkButton} onClick={copyChecklistLink}>Copiar link</button>
              <button type="button" onClick={() => setShowReset(true)} disabled={!calculateProgress(items).completedItems}>Reiniciar progresso</button>
            </div>
          </div>
          <p className={styles.draftHelp}>
            {storageAvailable
              ? "Seu progresso fica salvo neste navegador para esta camada e cenário. O link compartilha a personalização e as variações, sem suas marcações."
              : "Não foi possível acessar o armazenamento do navegador. Suas marcações serão mantidas apenas enquanto esta página estiver aberta."}
          </p>
        </div>

        {currentConfig.showInfoBox && (
          <div className={styles.infoBox}>
            <div className={styles.infoBoxContent}>
              <div className={styles.infoBoxIcon} aria-hidden="true">i</div>
              <div className={styles.infoBoxTextWrapper}>
                <p className={styles.infoBoxText}>
                  As cores indicam a área de aplicação de cada
                  item do checklist, facilitando a identificação
                  visual na imagem da tela correspondente.
                </p>
                <p
                  className={`${styles.infoBoxText} ${styles.infoBoxTextRow}`}
                >
                  <span>Para acessar a imagem, utilize o</span>
                  <span className={styles.infoPrintButton}><Image className={styles.infoPrintIcon} aria-hidden="true" /><span>Ver Print</span></span>
                  <span>
                    presente na seção da tela desejada.
                  </span>
                </p>
              </div>
            </div>
          </div>
        )}

        <div className={styles.categoriesWrapper}>
          {!itemsExibidos.length && <section>
            <h2>Nenhuma categoria selecionada</h2>
            <p>Volte à personalização e selecione pelo menos uma categoria para montar o checklist.</p>
            <Link to={personalizationUrl} className={styles.primaryActionButton}>Personalizar checklist</Link>
          </section>}
          {Object.entries(categoriasParaExibir).map(
            ([category, categoryItems]) => (
              <ChecklistCategorySection
                key={category}
                category={category as ChecklistCategory}
                categoryItems={categoryItems}
                layerId={currentLayer}
                imageUrls={imageUrls}
                onToggleCategory={handleToggleCategory}
                onToggleItem={handleToggleItem}
                onToggleSubItem={handleToggleSubItem}
                onOpenVariations={handleOpenVariations}
                renderTextWithColorIndicator={
                  renderTextWithColorIndicator
                }
              />
            ),
          )}
        </div>

        {progress >= 50 && (
          <div className={styles.completionCard}>
            <div className={styles.completionHeader}>
              <div>
                <h2 className={styles.completionTitle}>
                  {currentConfig.completion.title}
                </h2>
                <p className={styles.completionDescription}>
                  {currentConfig.completion.description}
                </p>
              </div>
              <div className={styles.completionIcon}>
                {currentConfig.completion.icon}
              </div>
            </div>

            <div className={styles.completionActions}>
              {renderAction(
                currentConfig.completion.primaryAction,
                "primary",
              )}
              {renderAction(
                currentConfig.completion.secondaryAction,
                "secondary",
              )}
            </div>
          </div>
        )}
      </div>

      <p className="sr-only" role="status" aria-atomic="true">{message}</p>

      <dialog ref={resetDialog} className={modalStyles.modal} aria-labelledby="reiniciar-titulo" aria-describedby="reiniciar-descricao" onCancel={(event) => { event.preventDefault(); setShowReset(false); }}>
        <h2 id="reiniciar-titulo" className={modalStyles.title}>Reiniciar progresso?</h2>
        <p id="reiniciar-descricao" className={modalStyles.description}>Todas as marcações desta camada e cenário serão removidas, incluindo as categorias que estão ocultas. A seleção de categorias e as variações serão preservadas.</p>
        <div className={modalStyles.actions}>
          <button type="button" className={modalStyles.closeButton} onClick={() => setShowReset(false)}>Cancelar</button>
          <button type="button" className={modalStyles.applyButton} onClick={resetProgress}>Reiniciar progresso</button>
        </div>
      </dialog>

      <ChecklistVariacoesModal
        isOpen={
          showModalVariacoes &&
          telaParaConfigurar === "Visualização"
        }
        title="Configurar Variação - Tela de Visualização"
        description="Selecione qual variação da Tela de Visualização você deseja visualizar no checklist:"
        options={[
          {
            label: "Com Abas, Formulário e Cards",
            description:
              "Inclui abas de navegação, seção de cards com acordeões, elementos internos, cards de informação e menu de paginação",
          },
          {
            label: "Sem Abas e Com Formulários",
            description:
              "Formulário com acordeon de seção e elementos interativos, sem abas de navegação",
          },
        ]}
        selectedOption={variacaoTelaVisualizacao}
        describeChange={(value) => describeVariation("Visualização", value)}
        onSelect={(value) => applyVariation("Visualização", value)}
        onClose={() => {
          setShowModalVariacoes(false);
          setTelaParaConfigurar(null);
        }}
      />

      <ChecklistVariacoesModal
        isOpen={
          showModalVariacoes && telaParaConfigurar === "Busca"
        }
        title="Configurar Variação - Tela de Busca/Listagem"
        description="Selecione qual variação da Tela de Busca/Listagem você deseja visualizar no checklist:"
        options={[
          {
            label: "Com Tabela de Dados",
            description:
              "Inclui tabela de resultados de busca com área de ordenação de colunas e resultados",
          },
          {
            label: "Com Card de Informações",
            description:
              "Inclui listagem em cards no lugar de tabela de dados",
          },
        ]}
        selectedOption={variacaoTelaBusca}
        describeChange={(value) => describeVariation("Busca", value)}
        onSelect={(value) => applyVariation("Busca", value)}
        onClose={() => {
          setShowModalVariacoes(false);
          setTelaParaConfigurar(null);
        }}
      />

    </div>
  );
}
