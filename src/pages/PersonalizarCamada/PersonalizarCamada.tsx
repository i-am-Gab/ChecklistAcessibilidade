import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { ArrowLeft, CheckSquare } from "lucide-react";
import {
  categoriasCAMADA01,
  categoriasCAMADA02,
  categoriasCAMADA03,
} from "../../mocks/itensCamadaMock";
import { iconMap, camadaInfo } from "../../mocks/categoriasComIcons";
import styles from "./PersonalizarCamada.module.css";

export default function PersonalizarCamada() {
  const navigate = useNavigate();
  const { camada } = useParams<{ camada: string }>();

  // Determinar qual lista de categorias usar
  const camadaNum = parseInt(camada || "1");
  const categoriasMap = {
    1: categoriasCAMADA01,
    2: categoriasCAMADA02,
    3: categoriasCAMADA03,
  };

  const categorias = categoriasMap[camadaNum as 1 | 2 | 3] || categoriasCAMADA01;
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

      {/* Main Content */}
      <div className={styles.mainContent}>
        <div className={styles.container}>
          {/* Breadcrumb e Botão Voltar */}
          <div className={styles.breadcrumbSection}>
            <div className={styles.breadcrumb}>
              <button
                onClick={() => navigate("/camadas")}
              >
                Home
              </button>
              <span>›</span>
              <button
                onClick={() => navigate("/camadas")}
              >
                Camada {camadaNum}
              </button>
              <span>›</span>
              <span>Personalizar</span>
            </div>

            <button
              onClick={() => navigate("/camadas")}
              className={styles.backButton}
            >
              <ArrowLeft className={styles.backIcon} />
              Voltar
            </button>
          </div>

          {/* Title Section */}
          <div className={styles.titleSection}>
            <h1 className={styles.title}>
              {info.titulo}
            </h1>
            <p className={styles.subtitle}>
              {info.descricao}
            </p>
          </div>

          {/* Cards Grid */}
          <div className={styles.cardsGrid}>
            {categorias.map((categoria) => {
              const IconComponent = iconMap[categoria.id];
              const isSelecionada = selecionadas.includes(
                categoria.id
              );

              return (
                <button
                  key={categoria.id}
                  onClick={() => toggleCategoria(categoria.id)}
                  className={`${styles.card} ${
                    isSelecionada ? styles.selected : ""
                  }`}
                >
                  {/* Checkmark */}
                  {isSelecionada && (
                    <div className={styles.cardCheckmark}>
                      <svg
                        className={styles.checkmarkIcon}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                  )}

                  {/* Icon */}
                  {IconComponent && (
                    <div
                      className={`${styles.cardIconContainer} ${
                        isSelecionada ? styles.selected : ""
                      }`}
                    >
                      <IconComponent
                        className={`${styles.cardIcon} ${
                          isSelecionada ? styles.selected : ""
                        }`}
                      />
                    </div>
                  )}

                  {/* Title */}
                  <h3 className={styles.cardTitle}>
                    {categoria.nome}
                  </h3>

                  {/* Description */}
                  <p className={styles.cardDescription}>
                    {categoria.descricao}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Action Buttons */}
          <div className={styles.actionsSection}>
            <button
              onClick={selecionarTodas}
              className={styles.selectAllButton}
            >
              <CheckSquare className={styles.buttonIcon} />
              {selecionadas.length === categorias.length
                ? "Desmarcar Todos"
                : "Selecionar Todos"}
            </button>

            <button
              onClick={gerarChecklist}
              disabled={selecionadas.length === 0}
              className={styles.generateButton}
            >
              <span className={styles.generateButtonText}>
                Gerar Checklist Personalizado
              </span>
              <span className={styles.generateButtonTextMobile}>Gerar Checklist</span>
              <svg
                className={styles.buttonIcon}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </button>
          </div>

          {/* Info Footer */}
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
