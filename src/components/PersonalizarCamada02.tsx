import { useState } from "react";
import { useNavigate } from "react-router";
import Header from "./Header";
import Footer from "./Footer";
import {
  Type,
  Hash,
  ChevronDown,
  Search,
  Calendar,
  Upload,
  PlusCircle,
  MousePointerClick,
  CheckSquare,
  ToggleLeft,
  FileText,
  GitBranch,
  MessageSquare,
  Layers,
  ArrowLeft,
  Square,
  Filter
} from "lucide-react";

export default function PersonalizarCamada02() {
  const navigate = useNavigate();

  const categorias = [
    {
      id: "campos-texto",
      nome: "Campos de Texto",
      descricao: "Inputs simples e multilinha",
      icon: Type,
      categoria: "Campos de Texto",
    },
    {
      id: "campos-numericos",
      nome: "Campos Numéricos",
      descricao: "Validação e formatação",
      icon: Hash,
      categoria: "Campos Numéricos",
    },
    {
      id: "campos-selecao",
      nome: "Campos de Seleção",
      descricao: "Selects nativos",
      icon: ChevronDown,
      categoria: "Campos de Seleção",
    },
    {
      id: "selecao-pesquisavel",
      nome: "Seleção Pesquisável",
      descricao: "Autocomplete e combobox",
      icon: Search,
      categoria: "Seleção Pesquisável",
    },
    {
      id: "campos-data",
      nome: "Campos de Data",
      descricao: "Datepickers acessíveis",
      icon: Calendar,
      categoria: "Campos de Data",
    },
    {
      id: "upload-arquivos",
      nome: "Upload de Arquivos",
      descricao: "Input file e gestão",
      icon: Upload,
      categoria: "Upload de Arquivos",
    },
    {
      id: "campos-dinamicos",
      nome: "Grupos Dinâmicos",
      descricao: "Adicionar/remover campos",
      icon: PlusCircle,
      categoria: "Grupos de Campos Dinâmicos",
    },
    {
      id: "botoes",
      nome: "Botões",
      descricao: "Ações e confirmações",
      icon: MousePointerClick,
      categoria: "Botões",
    },
    {
      id: "selecao-multipla",
      nome: "Seleção Múltipla",
      descricao: "Checkboxes e multiselect",
      icon: CheckSquare,
      categoria: "Seleção Múltipla",
    },
    {
      id: "booleano",
      nome: "Booleano",
      descricao: "Radio buttons e switches",
      icon: ToggleLeft,
      categoria: "Booleano",
    },
    {
      id: "card-informacoes",
      nome: "Card de Informações",
      descricao: "Estrutura e estados",
      icon: FileText,
      categoria: "Card de Informações",
    },
    {
      id: "estrutura-arvore",
      nome: "Estrutura em Árvore",
      descricao: "Tree views e navegação",
      icon: GitBranch,
      categoria: "Estrutura em Árvore",
    },
    {
      id: "caixas-dialogo-conteudo",
      nome: "Caixas de Diálogo — Conteúdo",
      descricao: "Dialogs informativos",
      icon: MessageSquare,
      categoria: "Caixas de Diálogo — Conteúdo",
    },
    {
      id: "caixas-dialogo-alerta",
      nome: "Caixas de Diálogo — Alerta/Erro",
      descricao: "Alertdialogs críticos",
      icon: Layers,
      categoria: "Caixas de Diálogo — Alerta/Erro",
    },
    {
      id: "menu-abas",
      nome: "Menu de Abas",
      descricao: "Navegação tabular",
      icon: Square,
      categoria: "Menu de Abas",
    },
    {
      id: "filtros-ativos",
      nome: "Filtros Ativos",
      descricao: "Gestão e acessibilidade",
      icon: Filter,
      categoria: "Filtros Ativos",
    }
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

    navigate("/checklist/camada-02", {
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
                Camada 2
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
              Personalizar Checklist Camada 2
            </h1>
            <p className="text-gray-600 text-base sm:text-lg max-w-3xl">
              Selecione os campos e/ou elementos personalizados
              que deseja incluir em seu checklist. Garanta a
              acessibilidade técnica em cada elemento e campo da
              interface.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-6 sm:mb-8">
            {categorias.map((categoria) => {
              const IconComponent = categoria.icon;
              const isSelecionada = selecionadas.includes(
                categoria.id,
              );

              return (
                <button
                  key={categoria.id}
                  onClick={() => toggleCategoria(categoria.id)}
                  className={`relative bg-white rounded-xl border-2 p-6 text-left transition-all hover:shadow-lg ${
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