import { Link } from "react-router";
import { X } from "lucide-react";
import { useState } from "react";
import { useModalDialog } from "../../hooks/useModalDialog";
import CamadasSVG from "./Components/camadas";
import { ImageWithFallback } from "../../components/ui/ImageWithFallback/ImageWithFallback";
import styles from "./Sobre.module.css";
import { Breadcrumb } from "../../components/ui/Breadcrumb/Breadcrumb";

const imaLogo = "https://www.ima.mg.gov.br/images/header/logo-ima.png";
const uflaLogo = "https://ufla.br/dcom/wp-content/uploads/2014/06/logo-ufla.jpg";
const fundeccLogo = "https://fundecc.org.br/wp-content/uploads/2024/10/Logo_fundecc-cor-1-1.png";

export default function Sobre() {
  const [imageOpen, setImageOpen] = useState(false);
  const imageDialog = useModalDialog(imageOpen);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.wrapper}>
          <Breadcrumb items={[{ label: "Home", to: "/" }, { label: "Sobre" }]} />

          <div className={styles.titleSection}>
            <h1 className={styles.title}>Sobre o Projeto</h1>
            <div className={styles.titleUnderline}></div>
          </div>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Sobre o documento</h2>
            <div className={styles.sectionContent}>
              <p>
                Este documento reúne orientações práticas de acessibilidade digital voltadas ao apoio de equipes de desenvolvimento na construção de interfaces mais inclusivas, previsíveis e utilizáveis.
              </p>
              <p>
                As diretrizes apresentadas são fundamentadas em normas técnicas como <strong>ABNT NBR 17225</strong>, <strong>Design System Gov.br</strong> e <strong>W3C (WAI-ARIA Authoring Practices)</strong>.
              </p>
            </div>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Organização em camadas</h2>
            <div className={styles.sectionContent}>
              <p>
                Para facilitar a compreensão e a aplicação prática, o conteúdo foi estruturado em <strong>camadas de acessibilidade</strong>, organizadas de forma progressiva e complementar:
              </p>
            </div>
            <div className={styles.layersContainer}>
              <div className={`${styles.layerCard} ${styles.layer1}`}>
                <h3 className={styles.layerTitle}>Camada 1</h3>
                <p className={styles.layerDescription}>
                  Reúne os fundamentos essenciais que devem orientar toda interação com o usuário, servindo como base de conhecimento permanente para o desenvolvimento.
                </p>
              </div>
              <div className={`${styles.layerCard} ${styles.layer2}`}>
                <h3 className={styles.layerTitle}>Camada 2</h3>
                <p className={styles.layerDescription}>
                  Trata da padronização e componentização acessível, garantindo que componentes sejam reutilizáveis, consistentes e acessíveis por padrão.
                </p>
              </div>
              <div className={`${styles.layerCard} ${styles.layer3}`}>
                <h3 className={styles.layerTitle}>Camada 3</h3>
                <p className={styles.layerDescription}>
                  Aborda a navegação e os fluxos do sistema, assegurando que o deslocamento entre telas e processos de negócio seja acessível em toda a experiência do usuário.
                </p>
              </div>
            </div>
            <div className={styles.imageCamadas}>
              <button type="button" className={styles.imageTrigger} aria-label="Abrir diagrama das camadas em tela cheia" onClick={() => setImageOpen(true)}>
                <CamadasSVG className={styles.imageCamadasImg} />
              </button>
            </div>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Responsáveis pelo Projeto</h2>
            <div className={styles.sectionContent}>
              <p>
                O desenvolvimento deste site foi possível graças à parceria entre a <strong>Universidade Federal de Lavras (UFLA)</strong>, o <strong>Instituto Mineiro de Agropecuária (IMA)</strong> e a <strong>FUNDECC</strong>.
              </p>
            </div>

            <div className={styles.institutionsGrid}>
              <div className={styles.institutionCard}>
                <div className={styles.institutionLogoContainer}>
                  <ImageWithFallback src={uflaLogo} alt="Logo da UFLA" className={styles.institutionLogo} />
                </div>
                <span className={styles.institutionLabel}>Universidade Federal de Lavras</span>
              </div>

              <div className={styles.institutionCard}>
                <div className={styles.institutionLogoContainer}>
                  <ImageWithFallback src={imaLogo} alt="Logo do IMA" className={styles.institutionLogo} />
                </div>
                <span className={styles.institutionLabel}>Instituto Mineiro de Agropecuária</span>
              </div>

              <div className={styles.institutionCard}>
                <div className={styles.institutionLogoContainer}>
                  <ImageWithFallback src={fundeccLogo} alt="Logo da FUNDECC" className={styles.institutionLogo} />
                </div>
                <span className={styles.institutionLabel}>FUNDECC</span>
              </div>
            </div>
          </section>

          <div className={styles.ctaSection}>
            <h2 className={styles.ctaTitle}>Pronto para começar sua jornada de acessibilidade?</h2>
            <p className={styles.ctaDescription}>
              Explore nossas trilhas de desenvolvimento e transforme seus projetos em experiências verdadeiramente inclusivas.
            </p>
            <Link to="/camadas" className={styles.ctaButton}>
              Explorar Trilhas
            </Link>
          </div>
        </div>
      </div>
      <dialog ref={imageDialog} className={styles.imageDialog} aria-label="Diagrama das camadas em tela cheia" onCancel={(event) => { event.preventDefault(); setImageOpen(false); }}>
        <div className={styles.imageToolbar}>
          <button type="button" onClick={() => setImageOpen(false)}><X size={20} aria-hidden="true" />Fechar</button>
        </div>
        <div className={styles.fullscreenCanvas}>
          {imageOpen && <CamadasSVG className={styles.fullscreenImage} />}
        </div>
      </dialog>
    </div>
  );
}
