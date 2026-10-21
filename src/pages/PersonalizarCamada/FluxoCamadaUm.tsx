import { useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router";
import { ArrowLeft, ArrowRight, BadgeCheck, ChevronDown, Copy, Eye, Layers, ListFilter, MoreHorizontal, Search, SquarePlus } from "lucide-react";
import { categoriasCAMADA01 } from "../../mocks/itensCamadaMock";
import { tiposTela, type TipoTela } from "./tiposTela.config";
import styles from "./FluxoCamadaUm.module.css";
import { useAnnouncement } from "../../hooks/useAnnouncement";
import NaoEncontrada from "../NaoEncontrada/NaoEncontrada";
import type { CategoryId } from "../../data/categories";
import { getChecklistUrl, getPersonalizationUrl, readChecklistSelection } from "../../features/checklist/checklistUrl";

const iconesTela = { busca: Search, cadastro: SquarePlus, edicao: ListFilter, visualizacao: Eye, outras: Layers };

function Caminho({ tela }: { tela?: TipoTela }) {
  return (
    <nav className={styles.breadcrumb} aria-label="Caminho de navegação">
      <ol>
        <li><Link to="/camadas">Home</Link></li>
        <li aria-hidden="true">›</li>
        {tela ? <>
          <li><Link to="/personalizar/1">Personalizar</Link></li>
          <li aria-hidden="true">›</li>
          <li aria-current="page">{tela.cenario}</li>
        </> : <li aria-current="page">Tipo de Tela</li>}
      </ol>
      {tela && <Link className={styles.backLink} to="/personalizar/1"><ArrowLeft size={16} aria-hidden="true" /> Voltar</Link>}
    </nav>
  );
}

export function SelecionarTipoTela() {
  const navigate = useNavigate();
  const [selecionada, setSelecionada] = useState("");
  const location = useLocation();
  const selection = readChecklistSelection(1, location.search, location.state);

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <Caminho />
        <header className={styles.heading}>
          <h1>Selecione o Tipo de Tela</h1>
          <p>Escolha o cenário de desenvolvimento para iniciarmos a personalização do seu checklist de acessibilidade. Cada tipo de tela possui requisitos específicos de conformidade.</p>
        </header>
        <form aria-label="Selecionar tipo de tela" onSubmit={(event) => {
          event.preventDefault();
          if (selecionada) navigate(getPersonalizationUrl({ ...selection, screen: selecionada }));
        }}>
          <fieldset className={styles.screenGrid} aria-describedby="ajuda-tipo-tela">
            <legend className={styles.srOnly}>Tipo de tela</legend>
            {tiposTela.map((tela) => {
              const Icon = iconesTela[tela.id as keyof typeof iconesTela];
              return (
                <label key={tela.id} className={`${styles.screenCard} ${selecionada === tela.id ? styles.selected : ""}`}>
                  <input type="radio" name="tipo-tela" value={tela.id} checked={selecionada === tela.id} onChange={() => setSelecionada(tela.id)} aria-labelledby={`nome-${tela.id}`} aria-describedby={`descricao-${tela.id}`} />
                  <span className={styles.screenIcon}><Icon size={23} aria-hidden="true" /></span>
                  <span id={`nome-${tela.id}`} className={styles.screenName}>{tela.nome}</span>
                  <span id={`descricao-${tela.id}`} className={styles.screenDescription}>{tela.descricao}</span>
                </label>
              );
            })}
          </fieldset>
          <p id="ajuda-tipo-tela">Selecione um tipo de tela para habilitar a continuação. Use Tab para entrar e sair das opções. As setas mudam a opção selecionada; Espaço seleciona a opção em foco.</p>
          <div className={styles.screenActions}>
            <Link className={styles.secondaryButton} to="/camadas"><ArrowLeft size={18} aria-hidden="true" />Voltar</Link>
            <button type="submit" className={styles.primaryButton} disabled={!selecionada} aria-describedby="ajuda-tipo-tela">
              Continuar para Personalização<ArrowRight size={18} aria-hidden="true" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function PersonalizarTipoTela() {
  const { tipoTela } = useParams();
  const location = useLocation();
  const tela = tiposTela.find((item) => item.id === tipoTela);
  if (!tela) return <NaoEncontrada message="Esse tipo de tela não existe. Escolha uma camada para continuar." />;
  return <Personalizacao key={`${tela.id}:${location.search}`} tela={tela} />;
}

function Personalizacao({ tela }: { tela: TipoTela }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { message, announce } = useAnnouncement();
  const categorias = categoriasCAMADA01;
  const selection = readChecklistSelection(1, location.search, location.state, tela.id);
  const [selecionadas, setSelecionadas] = useState<CategoryId[]>(() => selection.categories ?? [...tela.obrigatorios]);
  const [abertos, setAbertos] = useState<string[]>(["obrigatorios"]);
  const grupos = [
    { id: "obrigatorios", titulo: "Itens Obrigatórios", Icon: BadgeCheck, itens: categorias.filter((item) => tela.obrigatorios.includes(item.id)) },
    { id: "comuns", titulo: "Itens Comuns", Icon: Copy, itens: categorias.filter((item) => !tela.obrigatorios.includes(item.id) && tela.comuns.includes(item.id)) },
    { id: "demais", titulo: "Demais Itens", Icon: MoreHorizontal, itens: categorias.filter((item) => !tela.obrigatorios.includes(item.id) && !tela.comuns.includes(item.id)) },
  ];

  const toggleItem = (id: CategoryId) => setSelecionadas((prev) => prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]);
  const toggleGrupo = (id: string) => setAbertos((prev) => prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]);
  const gerarChecklist = () => {
    if (!selecionadas.length) return;
    navigate(getChecklistUrl({ ...selection, screen: tela.id, categories: selecionadas }));
  };

  return (
    <div className={`${styles.page} ${styles.customization}`}>
      <div className={styles.container}>
        <Caminho tela={tela} />
        <header className={styles.heading}>
          <h1>Personalizar Checklist: {tela.nome}</h1>
          <p>Revise os itens pré-selecionados para o cenário de {tela.cenario}. Você pode ajustar conforme as particularidades da sua tarefa de desenvolvimento ou design.</p>
          <p>Os itens obrigatórios vêm selecionados por padrão. Você pode desmarcá-los se não quiser incluí-los.</p>
        </header>
        <div className={styles.groups}>
          {grupos.map(({ id, titulo, Icon, itens }) => {
            const aberto = abertos.includes(id);
            const total = itens.filter((item) => selecionadas.includes(item.id)).length;
            return (
              <section key={id} className={styles.group}>
                <h2 className={styles.groupHeading}>
                  <button type="button" className={styles.groupToggle} aria-expanded={aberto} aria-controls={`grupo-${id}`} id={`titulo-${id}`} onClick={() => toggleGrupo(id)}>
                    <span className={`${styles.groupIcon} ${id === "obrigatorios" ? styles.requiredIcon : ""}`}><Icon size={22} aria-hidden="true" /></span>
                    <span className={styles.groupTitle}>{titulo}<span>{total} {total === 1 ? "selecionado" : "selecionados"}</span></span>
                    <ChevronDown size={18} className={aberto ? styles.chevronOpen : ""} aria-hidden="true" />
                  </button>
                </h2>
                <div id={`grupo-${id}`} role="region" aria-labelledby={`titulo-${id}`} hidden={!aberto}>
                  {itens.length > 0 ? <div className={styles.itemGrid}>
                    {itens.map((item) => (
                      <label key={item.id} htmlFor={`elemento-${tela.id}-${item.id}`} className={`${styles.item} ${selecionadas.includes(item.id) ? styles.checked : ""}`}>
                        <input id={`elemento-${tela.id}-${item.id}`} type="checkbox" checked={selecionadas.includes(item.id)} onChange={() => toggleItem(item.id)} aria-labelledby={`nome-${item.id}`} aria-describedby={`descricao-${item.id}`} />
                        <span><span id={`nome-${item.id}`} className={styles.itemName}>{item.nome}</span><span id={`descricao-${item.id}`} className={styles.itemDescription}>{item.descricao}</span></span>
                      </label>
                    ))}
                  </div> : <p className={styles.empty}>Nenhum item definido neste grupo para esta tela.</p>}
                </div>
              </section>
            );
          })}
        </div>
      </div>
      <div className={styles.summaryBar}>
        <div className={styles.summaryInner}>
          <div className={styles.summary}>
            <span><span className={styles.summaryLabel}>Cenário:</span><strong className={styles.scenario}>{tela.cenario}</strong></span>
            <span><span className={styles.summaryLabel}>Itens:</span><strong>{selecionadas.length} {selecionadas.length === 1 ? "selecionado" : "selecionados"}</strong></span>
          </div>
          <div className={styles.summaryActions}>
            <button type="button" className={styles.secondaryButton} onClick={() => { setSelecionadas([...tela.obrigatorios]); announce(`Seleção restaurada: ${tela.obrigatorios.length} itens obrigatórios selecionados.`); }}>Resetar Filtros</button>
            <button type="button" className={styles.primaryButton} disabled={!selecionadas.length} aria-describedby="ajuda-gerar" onClick={gerarChecklist}>Gerar Checklist<ArrowRight size={18} aria-hidden="true" /></button>
          </div>
        </div>
        <p id="ajuda-gerar" className={styles.actionHelp}>Selecione pelo menos um item para habilitar a geração do checklist.</p>
      </div>
      <p className="sr-only" role="status" aria-atomic="true">{message}</p>
    </div>
  );
}
