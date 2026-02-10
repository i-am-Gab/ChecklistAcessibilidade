import { useNavigate } from "react-router";
import {
  ArrowRight,
  Home,
  Grid3x3,
  Zap,
  BarChart2,
} from "lucide-react";
import Header from "./Header";
import Footer from "./Footer";

export default function Camadas() {
  const navigate = useNavigate();

  const camadas = [
    {
      id: 1,
      nivel: "Camada 1",
      titulo: "Fundamentos Essenciais",
      descricao:
        "Esta camada concentra-se principalmente na forma como o conteúdo é escrito, estruturado e apresentado, abrangendo textos, links, imagens, tabelas, gráficos, arquivos para download e elementos interativos. As orientações aqui descritas são transversais a todo o sistema e devem ser consideradas desde a concepção do conteúdo até sua implementação técnica.",
      path: "/personalizar/camada-01",
      icon: Home,
    },
    {
      id: 2,
      nivel: "Camada 2",
      titulo: "Padronização/-Componentização",
      descricao:
        "Esta camada concentra-se principalmente na implementação técnica dos componentes da interface, abordando como formulários, botões, seleções, diálogos, estruturas dinâmicas e elementos complexos devem ser construídos para assegurar compatibilidade com leitores de tela, navegação integral por teclado e comunicação adequada de estados, instruções e feedbacks.",
      path: "/personalizar/camada-02",
      icon: Grid3x3,
    },
    {
      id: 3,
      nivel: "Camada 3",
      titulo: "Navegação",
      descricao:
        "Esta camada concentra-se no comportamento do foco, tanto em sua manifestação visual (foco visível) quanto em sua exposição programática (foco acessível), estabelecendo critérios claros para ordem de navegação, gestão de foco em componentes dinâmicos e comunicação adequada com tecnologias assistivas, em conformidade com a ABNT NBR 17225 e com as boas práticas internacionais de acessibilidade digital.",
      path: "/personalizar/camada-03",
      icon: Zap,
    },
  ];

  return (
    <div className="bg-white min-h-screen flex flex-col">
      {/* Header */}
      <Header activeTab="checklists" />

      {/* Main Content */}
      <div className="bg-[#f8f9fa] flex-1 py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Title Section */}
          <div className="mb-8 sm:mb-12">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 break-words">
              Camadas
            </h1>
            <p className="text-[#00b894] text-base sm:text-lg">
              Selecione o checklist que deseja visualizar.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {camadas.map((camada) => {
              const IconComponent = camada.icon;
              return (
                <div
                  key={camada.id}
                  className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8 hover:shadow-lg transition-all flex flex-col"
                >
                  {/* Icon */}
                  <div className="w-12 h-12 bg-[#e8f8f5] rounded-lg flex items-center justify-center mb-4 sm:mb-6 flex-shrink-0">
                    <IconComponent className="w-6 h-6 text-[#00b894]" />
                  </div>

                  {/* Nivel Label */}
                  <div className="text-[#00b894] text-xs font-bold tracking-wider mb-3">
                    {camada.nivel}
                  </div>

                  {/* Title */}
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 break-words whitespace-pre-line">
                    {camada.titulo.replace("-", "\n")}
                  </h2>

                  {/* Description */}
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-6 sm:mb-8 flex-1 break-words text-justify">
                    {camada.descricao}
                  </p>

                  {/* Button */}
                  <button
                    onClick={() => navigate(camada.path)}
                    className="text-[#00b894] font-medium flex items-center gap-2 hover:gap-3 transition-all group self-start"
                  >
                    Acesse
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}