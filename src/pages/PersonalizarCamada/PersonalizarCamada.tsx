import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import { ArrowRight, CheckSquare } from "lucide-react";

import {
  categoriasCAMADA01,
  categoriasCAMADA02,
  categoriasCAMADA03,
} from "../../mocks/itensCamadaMock";

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
  if (camada === "1") return <SelecionarTipoTela />;
  if (camada !== "2" && camada !== "3") return <NaoEncontrada message="Essa camada não existe. Escolha uma das três camadas disponíveis." />;
  return <PersonalizarCategorias key={camada} />;
}

function PersonalizarCategorias() {
  const navigate = useNavigate();
  const location = useLocation();
  const { message, announce } = useAnnouncement();
  const { camada } = useParams<{ camada: string }>();

  const camadaNum = parseInt(camada || "1");

  const categoriasMap = {
    1: categoriasCAMADA01,
    2: categoriasCAMADA02,
    3: categoriasCAMADA03,
  };

  const categorias =
    categoriasMap[camadaNum as 1 | 2 | 3] || categoriasCAMADA01;

  const info = camadaInfo[camadaNum as 1 | 2 | 3];

  const [selecionadas, setSelecionadas] = useState<string[]>(() => {
    const anteriores: unknown = location.state?.categoriasSelecionadas;
    return Array.isArray(anteriores)
      ? categorias.filter((item) => anteriores.includes(item.categoria)).map((item) => item.id)
      : camadaNum === 3 ? ["requisitos-tecnicos"] : [];
  });

  const toggleCategoria = (id: string) => {
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

    const categoriasNomes = categorias
      .filter((cat) => selecionadas.includes(cat.id))
      .map((cat) => cat.categoria);

    navigate(info.href, {
      state: { categoriasSelecionadas: categoriasNomes },
    });
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
              onClick={gerarChecklist}
              disabled={selecionadas.length === 0}
              describedBy="ajuda-categorias"
              variant="primary"
              icon={<ArrowRight size={18} />}
              iconPosition="right"
              iconAnimation="slideRight"
            />
          </div>

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
