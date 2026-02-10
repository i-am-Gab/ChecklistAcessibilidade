import { useState } from "react";
import { useNavigate } from "react-router";
import Header from "./Header";
import Footer from "./Footer";
import {
  Focus,
  Layout,
  Bell,
  Search,
  FileEdit,
  CheckSquare,
  ArrowLeft,
  User,
  Eye,
  Pencil,
  BookOpen,
} from "lucide-react";

export default function PersonalizarCamada03() {
  const navigate = useNavigate();

  const categorias = [
    {
      id: "requisitos-tecnicos",
      nome: "Requisitos Técnicos (Checklist Geral)",
      descricao: "Indicador de foco visível",
      icon: Focus,
      categoria: "Requisitos Técnicos",
    },
    {
      id: "tela-principal",
      nome: "Tela Principal",
      descricao: "Ordem de foco na página inicial",
      icon: Layout,
      categoria: "Tela Principal",
    },
    {
      id: "tela-notificacoes",
      nome: "Tela de Notificações",
      descricao: "Navegação por notificações",
      icon: Bell,
      categoria: "Tela de Notificações",
    },
    {
      id: "tela-busca",
      nome: "Tela de Busca/Listagem",
      descricao: "Navegação em resultados",
      icon: Search,
      categoria: "Tela de Busca/Listagem",
    },
    {
      id: "tela-cadastro",
      nome: "Tela de Cadastro Interno",
      descricao: "Formulários e acordeões",
      icon: FileEdit,
      categoria: "Tela de Cadastro Interno",
    },
    {
      id: "tela-edicao",
      nome: "Tela de Edição",
      descricao: "Campos editáveis e botões",
      icon: Pencil,
      categoria: "Tela de Edição",
    },
    {
      id: "tela-visualizacao",
      nome: "Tela de Visualização",
      descricao: "Visualização de dados e informações",
      icon: CheckSquare,
      categoria: "Tela de Visualização",
    },
    {
      id: "tela-perfil-usuario",
      nome: "Tela de Perfil de Usuário",
      descricao: "Ajustes e preferências do usuário",
      icon: User,
      categoria: "Tela de Perfil de Usuário",
    },
    {
      id: "tela-consulta-externa",
      nome: "Tela de Consulta Externa",
      descricao: "Consulta e visualização externa",
      icon: BookOpen,
      categoria: "Tela de Consulta Externa",
    },
  ];

  const [selecionadas, setSelecionadas] = useState<string[]>(
    [],
  );

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

    // Passa as categorias selecionadas via state
    const categoriasNomes = categorias
      .filter((cat) => selecionadas.includes(cat.id))
      .map((cat) => cat.categoria);

    navigate("/checklist/camada-03", {
      state: { categoriasSelecionadas: categoriasNomes },
    });
  };

  return (
    <div className="bg-white min-h-screen flex flex-col">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="bg-[#f8f9fa] flex-1 py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb e Botão Voltar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-600 flex-wrap">
              <button
                onClick={() => navigate("/camadas")}
                className="hover:text-[#00b894] transition-colors"
              >
                Home
              </button>
              <span>›</span>
              <button
                onClick={() => navigate("/camadas")}
                className="hover:text-[#00b894] transition-colors"
              >
                Camada 3
              </button>
              <span>›</span>
              <span className="text-gray-900">
                Personalizar
              </span>
            </div>

            <button
              onClick={() => navigate("/camadas")}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-[#00b894] hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar
            </button>
          </div>

          {/* Title Section */}
          <div className="mb-8 sm:mb-12">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 break-words">
              Personalizar Checklist Camada 3
            </h1>
            <p className="text-gray-600 text-base sm:text-lg max-w-3xl">
              Selecione as telas e fluxos de navegação que
              deseja incluir em seu checklist. Garanta uma
              experiência de navegação acessível em todo o
              sistema.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6 sm:mb-8">
            {categorias.map((categoria) => {
              const IconComponent = categoria.icon;
              const isSelecionada = selecionadas.includes(
                categoria.id,
              );

              return (
                <button
                  key={categoria.id}
                  onClick={() => toggleCategoria(categoria.id)}
                  className={`relative bg-white rounded-xl border-2 p-5 sm:p-6 text-left transition-all hover:shadow-lg ${
                    isSelecionada
                      ? "border-[#00b894] bg-[#e8f8f5]"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  {/* Checkmark */}
                  {isSelecionada && (
                    <div className="absolute top-3 right-3 w-6 h-6 bg-[#00b894] rounded-full flex items-center justify-center">
                      <svg
                        className="w-4 h-4 text-white"
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
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
                      isSelecionada
                        ? "bg-[#00b894]"
                        : "bg-[#e8f8f5]"
                    }`}
                  >
                    <IconComponent
                      className={`w-6 h-6 ${
                        isSelecionada
                          ? "text-white"
                          : "text-[#00b894]"
                      }`}
                    />
                  </div>

                  {/* Title */}
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 break-words">
                    {categoria.nome}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-gray-600">
                    {categoria.descricao}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4">
            <button
              onClick={selecionarTodas}
              className="px-5 sm:px-6 py-3 border-2 border-[#00b894] text-[#00b894] rounded-lg font-medium hover:bg-[#e8f8f5] transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              <CheckSquare className="w-5 h-5" />
              {selecionadas.length === categorias.length
                ? "Desmarcar Todos"
                : "Selecionar Todos"}
            </button>

            <button
              onClick={gerarChecklist}
              disabled={selecionadas.length === 0}
              className="px-6 sm:px-8 py-3 bg-[#00b894] text-white rounded-lg font-medium hover:bg-[#00a380] transition-colors flex items-center justify-center gap-2 disabled:bg-gray-300 disabled:cursor-not-allowed text-sm sm:text-base"
            >
              <span className="hidden sm:inline">
                Gerar Checklist Personalizado
              </span>
              <span className="sm:hidden">Gerar Checklist</span>
              <svg
                className="w-5 h-5"
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
            <div className="mt-6 sm:mt-8 bg-white rounded-lg border border-gray-200 p-4 sm:p-6 text-center">
              <p className="text-gray-600 text-sm sm:text-base">
                <span className="font-bold text-[#00b894]">
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

      {/* Footer */}
      <Footer />
    </div>
  );
}