import { useEffect, useMemo, useState } from "react";
import {
  useLocation,
  useNavigate,
  useParams,
} from "react-router";
import { ArrowLeft, BookOpen, Image } from "lucide-react";
import type {
  ChecklistCategory,
  VariacaoTelaBusca,
  VariacaoTelaVisualizacao,
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
  normalizeCategoryKey,
  toggleChecklistCategory,
  toggleChecklistItem,
  toggleChecklistSubItem,
} from "./checklist.utils";
import ChecklistCategorySection from "./Components/ChecklistCategorySection/ChecklistCategorySection";
import ChecklistVariacoesModal from "./Components/ChecklistVariacoesModal/ChecklistVariacoesModal";
import styles from "./ChecklistCamada.module.css";

export default function ChecklistCamada() {
  const navigate = useNavigate();
  const location = useLocation();
  const { camadaId } = useParams<{ camadaId: string }>();

  const parsedCamadaId = Number(camadaId) as CamadaId;
  const currentLayer: CamadaId =
    parsedCamadaId === 1 ||
    parsedCamadaId === 2 ||
    parsedCamadaId === 3
      ? parsedCamadaId
      : 1;

  const currentConfig = checklistConfig[currentLayer];

  const [categoriasPreservadas, setCategoriasPreservadas] =
    useState<ChecklistCategory[] | undefined>(undefined);

  const [
    variacaoTelaVisualizacao,
    setVariacaoTelaVisualizacao,
  ] = useState<VariacaoTelaVisualizacao>(
    "Com Abas, Formulário e Cards",
  );

  const [variacaoTelaBusca, setVariacaoTelaBusca] =
    useState<VariacaoTelaBusca>("Com Tabela de Dados");

  const [showModalVariacoes, setShowModalVariacoes] =
    useState(false);

  const [telaParaConfigurar, setTelaParaConfigurar] = useState<
    "Visualização" | "Busca" | null
  >(null);

  const [items, setItems] = useState(() =>
    getChecklistItemsByLayer(
      currentLayer,
      variacaoTelaBusca,
      variacaoTelaVisualizacao,
    ),
  );

  useEffect(() => {
    const categorias = location.state?.categoriasSelecionadas as
      | ChecklistCategory[]
      | undefined;

    if (categorias && categorias.length > 0) {
      setCategoriasPreservadas(categorias);
    }
  }, [location.state?.categoriasSelecionadas]);

  useEffect(() => {
    setItems(
      getChecklistItemsByLayer(
        currentLayer,
        variacaoTelaBusca,
        variacaoTelaVisualizacao,
      ),
    );
  }, [
    currentLayer,
    variacaoTelaBusca,
    variacaoTelaVisualizacao,
  ]);

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

  const handleToggleItem = (itemId: number) => {
    setItems((prevItems) =>
      toggleChecklistItem(prevItems, itemId),
    );
  };

  const handleToggleSubItem = (
    itemId: number,
    subItemId: string,
  ) => {
    setItems((prevItems) =>
      toggleChecklistSubItem(prevItems, itemId, subItemId),
    );
  };

  const handleToggleCategory = (
    category: ChecklistCategory,
  ) => {
    setItems((prevItems) =>
      toggleChecklistCategory(prevItems, category),
    );
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
              aria-label={colorName}
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
        <button
          onClick={() => navigate(action.value)}
          className={className}
        >
          {action.label}
        </button>
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
      >
        {action.label}
      </a>
    );
  };

  return (
    <div className={styles.page}>

      <div className={styles.container}>
        <div className={styles.topBar}>
          <div className={styles.breadcrumb}>
            <button
              onClick={() => navigate("/camadas")}
              className={styles.breadcrumbButton}
            >
              Home
            </button>
            <span className={styles.breadcrumbSeparator}>›</span>
            <button
              onClick={() => navigate(currentConfig.backRoute)}
              className={styles.breadcrumbButton}
            >
              {currentConfig.label}
            </button>
            <span className={styles.breadcrumbSeparator}>›</span>
            <span className={styles.breadcrumbCurrent}>
              Checklist
            </span>
          </div>

          <button
            onClick={() => navigate(currentConfig.backRoute)}
            className={styles.backButton}
          >
            <ArrowLeft className={styles.backIcon} />
            <span className={styles.backButtonText}>Voltar</span>
          </button>
        </div>

        <a
          href={currentConfig.infoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.infoButton}
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

          <div className={styles.progressBarBackground}>
            <div
              className={styles.progressBarFill}
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className={styles.progressFooter}>
            <span>
              {completedItems} DE {totalItems} ITENS CONCLUÍDOS
            </span>
          </div>
        </div>

        {currentConfig.showInfoBox && (
          <div className={styles.infoBox}>
            <div className={styles.infoBoxContent}>
              <div className={styles.infoBoxIcon}>i</div>
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
                  <button
                    className={styles.infoPrintButton}
                    disabled
                  >
                    <Image className={styles.infoPrintIcon} />
                    <span>Ver Print</span>
                  </button>
                  <span>
                    presente na seção da tela desejada.
                  </span>
                </p>
              </div>
            </div>
          </div>
        )}

        <div className={styles.categoriesWrapper}>
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
                normalizeCategoryKey={normalizeCategoryKey}
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
                <h3 className={styles.completionTitle}>
                  {currentConfig.completion.title}
                </h3>
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
        onSelect={(value) =>
          setVariacaoTelaVisualizacao(
            value as VariacaoTelaVisualizacao,
          )
        }
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
        onSelect={(value) =>
          setVariacaoTelaBusca(value as VariacaoTelaBusca)
        }
        onClose={() => {
          setShowModalVariacoes(false);
          setTelaParaConfigurar(null);
        }}
      />

    </div>
  );
}