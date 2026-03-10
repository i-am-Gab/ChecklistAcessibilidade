import { useNavigate } from "react-router";
import Header from "./Header";
import Footer from "./Footer";
import { ArrowLeft } from "lucide-react";
import CamadasSVG from "./figma/camadas";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const imaLogo =
  "https://www.ima.mg.gov.br/images/header/logo-ima.png";

const uflaLogo =
  "https://ufla.br/dcom/wp-content/uploads/2014/06/logo-ufla.jpg";

const fundeccLogo =
  "https://fundecc.org.br/wp-content/uploads/2024/10/Logo_fundecc-cor-1-1.png";

export default function Sobre() {
  const navigate = useNavigate();

  return (
    <div className="bg-white min-h-screen flex flex-col">
      {/* Header */}
      <Header activeTab="sobre" />

      {/* Main Content */}
      <div className="bg-[#f8f9fa] flex-1 py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Breadcrumb e Botão Voltar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <button
                onClick={() => navigate("/")}
                className="hover:text-[#00b894] transition-colors"
              >
                Home
              </button>
              <span>›</span>
              <span className="text-gray-900">Sobre</span>
            </div>

            <button
              onClick={() => navigate("/camadas")}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-[#00b894] hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar
            </button>
          </div>

          {/* Title */}
          <div className="mb-8 sm:mb-12">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 break-words">
              Sobre o Projeto
            </h1>
            <div className="w-20 h-1 bg-[#00b894] rounded-full"></div>
          </div>

          {/* Sobre o Documento */}
          <section className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6 break-words">
              Sobre o documento
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed text-base sm:text-lg text-justify">
              <p>
                Este documento reúne orientações práticas de
                acessibilidade digital voltadas ao apoio de
                equipes de desenvolvimento na construção de
                interfaces mais inclusivas, previsíveis e
                utilizáveis. Seu foco está principalmente em
                sistemas web com uso extensivo de formulários,
                componentes interativos e fluxos de navegação
                complexos, oferecendo checklists objetivos que
                auxiliam na aplicação consistente das boas
                práticas de acessibilidade no dia a dia do
                desenvolvimento.
              </p>
              <p>
                As diretrizes apresentadas são fundamentadas em
                normas técnicas, recomendações oficiais e boas
                práticas reconhecidas nacional e
                internacionalmente, como a{" "}
                <strong>ABNT NBR 17225</strong>, o{" "}
                <strong>Design System Gov.br</strong> e o{" "}
                <strong>
                  W3C (WAI-ARIA Authoring Practices)
                </strong>
                .
              </p>
            </div>
          </section>

          {/* Organização em Camadas */}
          <section className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6 break-words">
              Organização em camadas
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed text-base sm:text-lg mb-6 sm:mb-8 text-justify">
              <p>
                Para facilitar a compreensão e a aplicação
                prática, o conteúdo foi estruturado em{" "}
                <strong>camadas de acessibilidade</strong>,
                organizadas de forma progressiva e complementar:
              </p>
              <div className="space-y-6 mt-6">
                <div className="border-l-4 border-orange-500 pl-4 sm:pl-6">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                    Camada 1: Fundamentos Essenciais do Desenvolvedor
                  </h3>
                  <p className="text-gray-700 text-sm sm:text-base text-justify">
                    Reúne os fundamentos essenciais que devem
                    orientar toda interação com o usuário,
                    servindo como base de conhecimento
                    permanente para o desenvolvimento.
                  </p>
                </div>
                <div className="border-l-4 border-blue-500 pl-4 sm:pl-6">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                    Camada 2: Padronização e Componentização Acessível
                  </h3>
                  <p className="text-gray-700 text-sm sm:text-base text-justify">
                    Trata da padronização e componentização
                    acessível, garantindo que componentes sejam
                    reutilizáveis, consistentes e acessíveis por
                    padrão.
                  </p>
                </div>
                <div className="border-l-4 border-green-500 pl-4 sm:pl-6">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                    Camada 3: Navegação
                  </h3>
                  <p className="text-gray-700 text-sm sm:text-base text-justify">
                    Aborda a navegação e os fluxos do sistema,
                    assegurando que o deslocamento entre telas e
                    processos de negócio seja acessível em toda
                    a experiência do usuário.
                  </p>
                </div>
              </div>
              <p className="mt-6">
                Essa organização permite uma adoção gradual das
                orientações, alinhada ao fluxo natural de
                desenvolvimento e aos diferentes níveis de
                maturidade das equipes, promovendo uma
                acessibilidade sustentável e integrada ao
                sistema como um todo.
              </p>
            </div>

            {/* Imagem das Camadas */}
            <div className="mt-6 sm:mt-8 flex justify-center">
              <CamadasSVG
                className="max-w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          </section>

          {/* Responsáveis */}
          <section className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6 break-words">
              Responsáveis pelo Projeto
            </h2>
            <div className="text-gray-700 leading-relaxed text-base sm:text-lg mb-6 sm:mb-8 text-justify">
              <p>
                O desenvolvimento deste site foi possível graças
                à parceria entre a{" "}
                <strong>
                  Universidade Federal de Lavras (UFLA)
                </strong>
                , o{" "}
                <strong>
                  Instituto Mineiro de Agropecuária (IMA)
                </strong>{" "}
                e a <strong>FUNDECC</strong>. Essa colaboração
                institucional viabilizou a consolidação das
                orientações de acessibilidade aqui apresentadas,
                unindo conhecimento acadêmico, prática técnica e
                necessidades reais de sistemas públicos, com o
                objetivo de promover soluções digitais mais
                acessíveis, inclusivas e alinhadas às normas
                vigentes.
              </p>
            </div>

            {/* Logos das Instituições */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-center justify-items-center mt-8 sm:mt-12">
              <div className="flex flex-col items-center gap-4 w-full max-w-xs">
                <div className="w-40 h-40 sm:w-48 sm:h-48 bg-white rounded-lg border-2 border-gray-200 flex items-center justify-center p-4 overflow-hidden">
                  <ImageWithFallback
                    src={uflaLogo}
                    alt="Logo da UFLA"
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
                <span className="font-semibold text-gray-900 text-center text-sm sm:text-base">
                  Universidade Federal de Lavras
                </span>
              </div>

              <div className="flex flex-col items-center gap-4 w-full max-w-xs">
                <div className="w-40 h-40 sm:w-48 sm:h-48 bg-white rounded-lg border-2 border-gray-200 flex items-center justify-center p-4 overflow-hidden">
                  <ImageWithFallback
                    src={imaLogo}
                    alt="Logo do IMA"
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
                <span className="font-semibold text-gray-900 text-center text-sm sm:text-base">
                  Instituto Mineiro de Agropecuária
                </span>
              </div>

              <div className="flex flex-col items-center gap-4 w-full max-w-xs sm:col-span-2 lg:col-span-1">
                <div className="w-40 h-40 sm:w-48 sm:h-48 bg-white rounded-lg border-2 border-gray-200 flex items-center justify-center p-4 overflow-hidden">
                  <ImageWithFallback
                    src={fundeccLogo}
                    alt="Logo da FUNDECC"
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
                <span className="font-semibold text-gray-900 text-center text-sm sm:text-base">
                  FUNDECC
                </span>
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <div className="bg-gradient-to-br from-[#1a3a3a] to-[#2d5a5a] rounded-xl p-6 sm:p-8 text-white text-center">
            <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 break-words">
              Pronto para começar sua jornada de acessibilidade?
            </h3>
            <p className="text-gray-300 mb-4 sm:mb-6 max-w-2xl mx-auto text-sm sm:text-base">
              Explore nossas trilhas de desenvolvimento e
              transforme seus projetos em experiências
              verdadeiramente inclusivas.
            </p>
            <button
              onClick={() => navigate("/camadas")}
              className="bg-[#00b894] text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-medium hover:bg-[#00a380] transition-colors text-sm sm:text-base"
            >
              Explorar Trilhas
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}