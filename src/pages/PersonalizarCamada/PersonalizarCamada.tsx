import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import { ArrowRight, CheckSquare } from "lucide-react";

import { getCategoriesForLayer, type CategoryId, type LayerId } from "../../data/categories";
import { getChecklistUrl, readChecklistSelection } from "../../features/checklist/checklistUrl";

import { iconMap, camadaInfo } from "../../mocks/categoriasComIcons";

import { Button } from "../../components/ui/Button/button";
import { Breadcrumb } from "../../components/ui/Breadcrumb/Breadcrumb";

import { CategoriaCard } from "./Components/CategoriaCard/CategoriaCard";

import styles from "./PersonalizarCamada.module.css";
import { SelecionarTipoTela } from "./FluxoCamadaUm";
import NaoEncontrada from "../NaoEncontrada/NaoEncontrada";
import { useAnnouncement } from "../../hooks/useAnnouncement";

export default function PersonalizarCamada() {
  const { camada } = useParams<{ camada: string }>();
  const location = useLocation();
  if (camada === "1") return <SelecionarTipoTela />;
  if (camada !== "2" && camada !== "3") return <NaoEncontrada message="Essa camada não existe. Escolha uma das três camadas disponíveis." />;
  return <PersonalizarCategorias key={`${camada}:${location.search}`} camadaNum={Number(camada) as LayerId} />;
}

function PersonalizarCategorias({ camadaNum }: { camadaNum: LayerId }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { message, announce } = useAnnouncement();
  const categorias = getCategoriesForLayer(camadaNum);

  const info = camadaInfo[camadaNum as 1 | 2 | 3];

  const selection = readChecklistSelection(camadaNum, location.search, location.state);
  const [selecionadas, setSelecionadas] = useState<CategoryId[]>(() => selection.categories ?? (camadaNum === 3 ? ["requisitos-tecnicos"] : []));

  const toggleCategoria = (id: CategoryId) => {
    if (selecionadas.includes(id)) {
      setSelecionadas(selecionadas.filter((cat) => cat !== id));
    } else {
      setSelecionadas([...selecionadas, id]);
    }
  };

  const selecionarTodas = () => {
    if (selecionadas.length === categorias.length) {
      setSelecionadas([]);
      announce("Todas as categorias foram desmarcadas. Selecione pelo menos uma para gerar o checklist.");
    } else {
      setSelecionadas(categorias.map((cat) => cat.id));
      announce(`Todas as ${categorias.length} categorias foram selecionadas.`);
    }
  };

  const gerarChecklist = () => {
    if (selecionadas.length === 0) {
      announce("Selecione pelo menos uma categoria para gerar o checklist.");
      return;
    }

    navigate(getChecklistUrl({ ...selection, categories: selecionadas }));
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.mainContent}>
        <div className={styles.container}>

          <Breadcrumb
            items={[
              { label: "Home", to: "/" },
              { label: "Camadas", to: "/camadas" },
              { label: "Personalizar" },
            ]}
            onBack={() => navigate("/camadas")}
          />

          {/* Title */}
          <div className={styles.titleSection}>
            <h1 className={styles.title}>{info.titulo}</h1>
            <p className={styles.subtitle}>{info.descricao}</p>
            {camadaNum === 3 && (
              <p className={styles.subtitle}>
                Requisitos Técnicos é incluído por padrão como item obrigatório.
                Você pode desmarcá-lo se não quiser incluí-lo no checklist.
              </p>
            )}
          </div>

          <form aria-label={`Personalizar checklist da camada ${camadaNum}`} onSubmit={(event) => { event.preventDefault(); gerarChecklist(); }}>
            {/* Cards */}
            <fieldset className={styles.cardsGrid} aria-describedby="ajuda-categorias">
              <legend className="sr-only">Categorias do checklist da camada {camadaNum}</legend>
              {categorias.map((categoria) => {
                const IconComponent = iconMap[categoria.id];
                const isSelecionada = selecionadas.includes(categoria.id);

                return (
                  <CategoriaCard
                    key={categoria.id}
                    nome={categoria.nome}
                    descricao={categoria.descricao}
                    selecionada={isSelecionada}
                    onChange={() => toggleCategoria(categoria.id)}
                    IconComponent={IconComponent}
                  />
                );
              })}
            </fieldset>
            <p id="ajuda-categorias">Selecione pelo menos uma categoria para habilitar a geração do checklist.</p>

            {/* Actions */}
            <div className={styles.actionsSection}>
              <Button
                text={
                  selecionadas.length === categorias.length
                    ? "Desmarcar Todos"
                    : "Selecionar Todos"
                }
                onClick={selecionarTodas}
                variant="secondary"
                icon={<CheckSquare size={18} />}
                iconPosition="left"
              />

              <Button
                text="Gerar Checklist Personalizado"
                type="submit"
                disabled={selecionadas.length === 0}
                describedBy="ajuda-categorias"
                variant="primary"
                icon={<ArrowRight size={18} />}
                iconPosition="right"
                iconAnimation="slideRight"
              />
            </div>
          </form>

          {/* Footer info */}
          <p className="sr-only" role="status" aria-atomic="true">{message}</p>
          {selecionadas.length > 0 && (
            <div className={styles.infoFooter}>
              <p className={styles.infoFooterText}>
                <span className={styles.infoFooterCount}>
                  {selecionadas.length}
                </span>{" "}
                {selecionadas.length === 1
                  ? "categoria selecionada"
                  : "categorias selecionadas"}
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
