import { useState } from "react";
import { Link, Navigate, useLocation, useNavigate, useParams } from "react-router";
import { ArrowLeft, ArrowRight, BadgeCheck, ChevronDown, Copy, Eye, Layers, ListFilter, MoreHorizontal, Search, SquarePlus } from "lucide-react";
import { categoriasCAMADA01 } from "../../mocks/itensCamadaMock";
import { tiposTela, type TipoTela } from "./tiposTela.config";
import styles from "./FluxoCamadaUm.module.css";

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

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <Caminho />
        <header className={styles.heading}>
          <h1>Selecione o Tipo de Tela</h1>
          <p>Escolha o cenário de desenvolvimento para iniciarmos a personalização do seu checklist de acessibilidade. Cada tipo de tela possui requisitos específicos de conformidade.</p>
        </header>
        <fieldset className={styles.screenGrid}>
          <legend className={styles.srOnly}>Tipo de tela</legend>
          {tiposTela.map((tela) => {
            const Icon = iconesTela[tela.id as keyof typeof iconesTela];
            return (
              <label key={tela.id} className={`${styles.screenCard} ${selecionada === tela.id ? styles.selected : ""}`}>
                <input type="radio" name="tipo-tela" value={tela.id} checked={selecionada === tela.id} onChange={() => setSelecionada(tela.id)} />
                <span className={styles.screenIcon}><Icon size={23} aria-hidden="true" /></span>
                <span className={styles.screenName}>{tela.nome}</span>
                <span className={styles.screenDescription}>{tela.descricao}</span>
              </label>
            );
          })}
        </fieldset>
        <div className={styles.screenActions}>
          <Link className={styles.secondaryButton} to="/camadas"><ArrowLeft size={18} aria-hidden="true" />Voltar</Link>
          <button className={styles.primaryButton} disabled={!selecionada} onClick={() => navigate(`/personalizar/1/${selecionada}`)}>
            Continuar para Personalização<ArrowRight size={18} aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}

export function PersonalizarTipoTela() {
  const { tipoTela } = useParams();
  const tela = tiposTela.find((item) => item.id === tipoTela);
  if (!tela) return <Navigate to="/personalizar/1" replace />;
  return <Personalizacao key={tela.id} tela={tela} />;
}

function Personalizacao({ tela }: { tela: TipoTela }) {
  const navigate = useNavigate();
  const location = useLocation();
  const categorias = categoriasCAMADA01;
  const [selecionadas, setSelecionadas] = useState<string[]>(() => {
    const anteriores: unknown = location.state?.categoriasSelecionadas;
    return Array.isArray(anteriores)
      ? categorias.filter((item) => anteriores.includes(item.categoria)).map((item) => item.id)
      : [...tela.obrigatorios];
  });
  const [abertos, setAbertos] = useState<string[]>(["obrigatorios"]);
  const grupos = [
    { id: "obrigatorios", titulo: "Itens Obrigatórios", Icon: BadgeCheck, itens: categorias.filter((item) => tela.obrigatorios.includes(item.id)) },
    { id: "comuns", titulo: "Itens Comuns", Icon: Copy, itens: categorias.filter((item) => !tela.obrigatorios.includes(item.id) && tela.comuns.includes(item.id)) },
    { id: "demais", titulo: "Demais Itens", Icon: MoreHorizontal, itens: categorias.filter((item) => !tela.obrigatorios.includes(item.id) && !tela.comuns.includes(item.id)) },
  ];

  const toggleItem = (id: string) => setSelecionadas((prev) => prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]);
  const toggleGrupo = (id: string) => setAbertos((prev) => prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]);
  const gerarChecklist = () => {
    if (!selecionadas.length) return;
    navigate("/checklists/1", {
      state: {
        tipoTela: tela.id,
        categoriasSelecionadas: categorias.filter((item) => selecionadas.includes(item.id)).map((item) => item.categoria),
      },
    });
  };

  return (
    <div className={`${styles.page} ${styles.customization}`}>
      <div className={styles.container}>
        <Caminho tela={tela} />
        <header className={styles.heading}>
          <h1>Personalizar Checklist: {tela.nome}</h1>
          <p>Revise os itens pré-selecionados para o cenário de {tela.cenario}. Você pode ajustar conforme as particularidades da sua tarefa de desenvolvimento ou design.</p>
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
                      <label key={item.id} className={`${styles.item} ${selecionadas.includes(item.id) ? styles.checked : ""}`}>
                        <input type="checkbox" checked={selecionadas.includes(item.id)} onChange={() => toggleItem(item.id)} />
                        <span><span className={styles.itemName}>{item.nome}</span><span className={styles.itemDescription}>{item.descricao}</span></span>
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
            <span aria-live="polite" aria-atomic="true"><span className={styles.summaryLabel}>Itens:</span><strong>{selecionadas.length} {selecionadas.length === 1 ? "selecionado" : "selecionados"}</strong></span>
          </div>
          <div className={styles.summaryActions}>
            <button className={styles.secondaryButton} onClick={() => setSelecionadas([...tela.obrigatorios])}>Resetar Filtros</button>
            <button className={styles.primaryButton} disabled={!selecionadas.length} onClick={gerarChecklist}>Gerar Checklist<ArrowRight size={18} aria-hidden="true" /></button>
          </div>
        </div>
      </div>
    </div>
  );
}
