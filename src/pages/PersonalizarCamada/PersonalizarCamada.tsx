import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { ArrowRight, CheckSquare } from "lucide-react";

import {
  categoriasCAMADA01,
  categoriasCAMADA02,
  categoriasCAMADA03,
} from "../../mocks/itensCamadaMock";

import { iconMap, camadaInfo } from "../../mocks/categoriasComIcons";

import { Button } from "../../components/Button/button";
import { Breadcrumb } from "../../components/Breadcrumb/Breadcrumb";

import { CategoriaCard } from "./Components/CategoriaCard/CategoriaCard";

import styles from "./PersonalizarCamada.module.css";

export default function PersonalizarCamada() {
  const navigate = useNavigate();
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

  const [selecionadas, setSelecionadas] = useState<string[]>([]);

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
    } else {
      setSelecionadas(categorias.map((cat) => cat.id));
    }
  };

  const gerarChecklist = () => {
    if (selecionadas.length === 0) {
      alert("Por favor, selecione pelo menos uma categoria");
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
              { label: "Home", onClick: () => navigate("/camadas") },
              { label: "Camadas", onClick: () => navigate("/camadas") },
              { label: "Personalizar" },
            ]}
            onBack={() => navigate("/camadas")}
          />

          {/* Title */}
          <div className={styles.titleSection}>
            <h1 className={styles.title}>{info.titulo}</h1>
            <p className={styles.subtitle}>{info.descricao}</p>
          </div>

          {/* Cards */}
          <div className={styles.cardsGrid}>
            {categorias.map((categoria) => {
              const IconComponent = iconMap[categoria.id];
              const isSelecionada = selecionadas.includes(categoria.id);

              return (
                <CategoriaCard
                  key={categoria.id}
                  nome={categoria.nome}
                  descricao={categoria.descricao}
                  selecionada={isSelecionada}
                  onClick={() => toggleCategoria(categoria.id)}
                  IconComponent={IconComponent}
                />
              );
            })}
          </div>

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
              variant="primary"
              icon={<ArrowRight size={18} />}
              iconPosition="right"
              iconAnimation="slideRight"
            />
          </div>

          {/* Footer info */}
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