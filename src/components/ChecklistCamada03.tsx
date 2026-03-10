import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import {
  ChevronDown,
  BookOpen,
  ArrowLeft,
  Image,
  Settings,
} from "lucide-react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";

/* =======================
   Tipagens
======================= */

type ChecklistCategory =
  | "Requisitos Técnicos"
  | "Tela Principal"
  | "Tela de Notificações"
  | "Tela de Busca/Listagem"
  | "Tela de Cadastro Interno"
  | "Tela de Edição"
  | "Tela de Visualização"
  | "Tela de Perfil de Usuário"
  | "Tela de Consulta Externa";

interface ChecklistSubItem {
  id: string;
  text: string;
  description?: string;
  checked: boolean;
  imagemUrl?: string; // URL do print da subcategoria
  colorIndicator?: string; // Cor indicadora para sub-itens
}

interface ChecklistItem {
  id: number;
  text: string;
  description?: string;
  category: ChecklistCategory;
  checked: boolean;
  subItems?: ChecklistSubItem[];
  imagemUrl?: string; // URL do print da tela
  colorIndicator?: string; // Cor indicadora para itens
}

const categoryIcons: Record<string, string> = {
  "Requisitos Técnicos": "🎯",
  "Tela Principal": "🏠",
  "Tela de Notificações": "🔔",
  "Tela de Busca/Listagem": "🔍",
  "Tela de Cadastro Interno": "📝",
};

// Mapeamento de URLs de prints por ID de item e sub-item
// Adicione aqui os links do Google Drive para cada seção e subseção
const imageUrls: Record<number | string, string> = {
  // Categorias principais - Botão "Ver Print da Tela" no cabeçalho
  "categoria-tela-principal":
    "https://drive.google.com/file/d/1M0HK2opQGBjBuq5Ww726wEio_w796RRL/view?usp=sharing",
  "categoria-tela-de-notificacoes":
    "https://drive.google.com/file/d/1SnAr3SnxK4R40MQJB4crHxEQWAaKQeTw/view?usp=sharing",
  "categoria-tela-de-buscalistagem":
    "https://drive.google.com/file/d/1MPPmH5GkE8vXnhSxZBWs0hotTSCWQPbM/view?usp=sharing",
  "categoria-tela-de-cadastro-interno":
    "https://drive.google.com/file/d/1icECuhVRTBwTJygQW7SRzwph6opbd08u/view?usp=sharing",
  "categoria-tela-de-edicao":
    "https://drive.google.com/file/d/1wEjVHqGBMIv2XRLKxfr4_vPd5yIciVzg/view?usp=sharing",
  "categoria-tela-de-visualizacao":
    "https://drive.google.com/file/d/18UgkAvdA4r0490jDA3DbaBt1bRBhDF6C/view?usp=sharing",
  "categoria-tela-de-perfil-de-usuario":
    "https://drive.google.com/file/d/1qHmusVeC72ZZe9PpJKisCCS4q9MpW-jG/view?usp=sharing",
  "categoria-tela-de-consulta-externa":
    "https://drive.google.com/file/d/1iOgM1YIhqvzSeouEE1kmtKpJA_h1xmuU/view?usp=sharing",

  // Itens com sub-categorias - Botão "Ver Print" no título do item
  11: "https://drive.google.com/file/d/1cB1fMA2ADKHJ71LvHuNM93aBi3K_FSZO/view?usp=sharing", // Sub-menu Cadastros
  21: "https://drive.google.com/file/d/1WHyjoYgI1skPcZfbNobJUQD_GEz5NL3v/view?usp=sharing", // Modal de Notificação
  29: "https://drive.google.com/file/d/1CzMmRiKbABKuAaIzOW-qcgTqcO4Uqxs6/view?usp=sharing", // Tabela de resultados de busca
  "29-1":
    "https://drive.google.com/file/d/1CzMmRiKbABKuAaIzOW-qcgTqcO4Uqxs6/view?usp=sharing", // Área de ordenação de colunas e resultados
  "29-3":
    "https://drive.google.com/file/d/1XdDdPj1yy7ApMQm1VGd_fB_rDy6VwjJR/view?usp=sharing", // Área de ações sobre resultados selecionados
  "29-4":
    "https://drive.google.com/file/d/17Trzu_yqziVxdJStR-Sb3LWaoUYFXoOs/view?usp=sharing", // Área de expansão de visualização de dados
  30: "https://drive.google.com/file/d/1WVW1WIFV4fyMhMQ_vqFiNBo42mz1sxbc/view?usp=sharing", // Listagem de cards
  31: "https://drive.google.com/file/d/1_8M-Xhdtacsl6WEf9u3A8p4A7jTlJKP6/view?usp=sharing", // Elementos do card
  47: "https://drive.google.com/file/d/1rgPIffnN93KnI1a8HuWunb4HV0yVneKo/view?usp=sharing", // Seção de cards
  58: "https://drive.google.com/file/d/1ZLUqfKgUz3j10CYmBiTDKVE5YblRoRCk/view?usp=sharing", // Mini cards

  // Você pode adicionar mais itens conforme necessário
  // 10: "https://drive.google.com/file/d/...",
  // 15: "https://drive.google.com/file/d/...",
};

export default function ChecklistCamada03() {
  const navigate = useNavigate();
  const location = useLocation();

  // Estado para preservar as categorias selecionadas
  const [categoriasPreservadas, setCategoriasPreservadas] =
    useState<ChecklistCategory[] | undefined>(undefined);

  // Estados para variações de telas
  const [
    variacaoTelaVisualizacao,
    setVariacaoTelaVisualizacao,
  ] = useState<
    | "Com Abas, Formulário e Cards"
    | "Sem Abas e Com Formulários"
  >("Com Abas, Formulário e Cards");

  const [variacaoTelaBusca, setVariacaoTelaBusca] = useState<
    "Com Tabela de Dados" | "Com Card de Informações"
  >("Com Tabela de Dados");

  // Estado para controlar a exibição do modal de variações
  const [showModalVariacoes, setShowModalVariacoes] =
    useState(false);
  const [telaParaConfigurar, setTelaParaConfigurar] = useState<
    "Visualização" | "Busca" | null
  >(null);

  // useEffect para capturar categorias selecionadas na primeira montagem
  useEffect(() => {
    const categorias = location.state
      ?.categoriasSelecionadas as
      | ChecklistCategory[]
      | undefined;
    if (categorias && categorias.length > 0) {
      setCategoriasPreservadas(categorias);
    }
  }, [location.state?.categoriasSelecionadas]);

  // Usar as categorias preservadas se existirem
  const categoriasSelecionadas = categoriasPreservadas;

  // useEffect para atualizar os itens da Tela de Visualização quando a variação mudar
  useEffect(() => {
    setItems((prevItems) => {
      // Remover os itens antigos da Tela de Visualização
      const itemsSemVisualizacao = prevItems.filter(
        (item) => item.category !== "Tela de Visualização",
      );

      // Adicionar os novos itens da Tela de Visualização
      const novosItensVisualizacao = getTelaVisualizacaoItems(
        variacaoTelaVisualizacao,
      );

      return [
        ...itemsSemVisualizacao,
        ...novosItensVisualizacao,
      ];
    });
  }, [variacaoTelaVisualizacao]);

  // useEffect para atualizar os itens da Tela de Busca quando a variação mudar
  useEffect(() => {
    setItems((prevItems) => {
      // Remover os itens antigos da Tela de Busca/Listagem
      const itemsSemBusca = prevItems.filter(
        (item) => item.category !== "Tela de Busca/Listagem",
      );

      // Adicionar os novos itens da Tela de Busca/Listagem
      const novosItensBusca = getTelaBuscaItems(
        variacaoTelaBusca,
      );

      return [...itemsSemBusca, ...novosItensBusca];
    });
  }, [variacaoTelaBusca]);

  // Função para gerar itens da Tela de Busca/Listagem baseado na variação
  const getTelaBuscaItems = (
    variacao: "Com Tabela de Dados" | "Com Card de Informações",
  ): ChecklistItem[] => {
    // Itens padrão (sempre presentes)
    const itensComuns: ChecklistItem[] = [
      {
        id: 24,
        text: "Cabeçalho principal da página (Vermelho)",
        colorIndicator: "#dc3545",
        description:
          "A ordem interna do foco deve seguir rigorosamente a ordem de apresentação dos elementos interativos dentro do grupo.",
        category: "Tela de Busca/Listagem",
        checked: false,
      },
      {
        id: 25,
        text: "Interações de redirecionamento (Laranja)",
        colorIndicator: "#ff9800",
        description:
          "A ordem interna do foco deve seguir a ordem de apresentação dos elementos interativos dentro do grupo.",
        category: "Tela de Busca/Listagem",
        checked: false,
      },
      {
        id: 26,
        text: "Seção de busca inicial (Roxo)",
        colorIndicator: "#9c27b0",
        description:
          "A ordem interna do foco deve contemplar:\n Campo de entrada de texto para pesquisa;\n Botão de ação associado à busca (ex.: ícone de lupa), quando aplicável;\n Botão de abertura da seção secundária de busca.",
        category: "Tela de Busca/Listagem",
        checked: false,
      },
      {
        id: 27,
        text: "Seção de busca secundária (Azul)",
        colorIndicator: "#2196f3",
        description:
          "A ordem interna do foco deve contemplar todos os campos internos da seção na ordem em que são apresentados.",
        category: "Tela de Busca/Listagem",
        checked: false,
      },
      {
        id: 28,
        text: "Seção de filtro ativo (Rosa)",
        colorIndicator: "#e91e63",
        description:
          "A ordem interna do foco deve navegar pelos botões de remoção de filtro 'X' de cada uma das opções exibidas no momento.",
        category: "Tela de Busca/Listagem",
        checked: false,
      },
    ];

    // Itens específicos por variação
    let itensVariacao: ChecklistItem[] = [];

    if (variacao === "Com Tabela de Dados") {
      itensVariacao = [
        {
          id: 29,
          text: "Tabela de resultados de busca (Amarelo)",
          colorIndicator: "#ffc107",
          description: "",
          category: "Tela de Busca/Listagem",
          checked: false,
          subItems: [
            {
              id: "29-1",
              text: "Área de ordenação de colunas e resultados",
              description:
                "O foco visível deve navegar por todas as colunas que possuem a opção de ordenação (↑ ou ↓).",
              checked: false,
            },
            {
              id: "29-2",
              text: "Área de resultados da busca",
              description: "",
              checked: false,
            },
          ],
        },
      ];
    } else {
      // "Com Card de Informações"
      itensVariacao = [
        {
          id: 30,
          text: "Listagem de cards (Verde-Água-Escuro)",
          colorIndicator: "#00838f",
          description:
            "O foco visível deve percorrer a lista de cards de informações, respeitando a ordem visual de apresentação.",
          category: "Tela de Busca/Listagem",
          checked: false,
        },
        {
          id: 31,
          text: "Elementos do card (Verde-Água)",
          colorIndicator: "#00bcd4",
          description:
            "O foco visível deve navegar por todos os elementos interativos dentro de cada card de informação, incluindo botões de ação e links.",
          category: "Tela de Busca/Listagem",
          checked: false,
        },
      ];
    }

    // Itens finais (sempre presentes)
    const itensFinais: ChecklistItem[] = [
      {
        id: 32,
        text: "Paginação de resultados da busca (Vinho)",
        colorIndicator: "#8b0000",
        description:
          "O foco visível deve navegar pelos botões de avançar na paginação (>) e, quando disponível, voltar na paginação (<).",
        category: "Tela de Busca/Listagem",
        checked: false,
      },
      {
        id: 33,
        text: "Rodapé (Verde-musgo)",
        colorIndicator: "#6b7c59",
        description:
          "Nessa área, deve existir apenas um elemento interativo, correspondente ao link externo do IMA.",
        category: "Tela de Busca/Listagem",
        checked: false,
      },
    ];

    return [...itensComuns, ...itensVariacao, ...itensFinais];
  };

  // Função para gerar itens da Tela de Visualização baseado na variação
  const getTelaVisualizacaoItems = (
    variacao:
      | "Com Abas, Formulário e Cards"
      | "Sem Abas e Com Formulários",
  ): ChecklistItem[] => {
    // Itens padrão (sempre presentes)
    const itensComuns: ChecklistItem[] = [
      {
        id: 43,
        text: "Cabeçalho principal da página (Vermelho)",
        colorIndicator: "#dc3545",
        description:
          "A ordem interna do foco deve seguir rigorosamente a ordem de apresentação dos elementos interativos dentro do grupo.",
        category: "Tela de Visualização",
        checked: false,
      },
      {
        id: 44,
        text: "Interações de redirecionamento (Laranja)",
        colorIndicator: "#ff9800",
        description:
          "Após a conclusão da navegação pelo cabeçalho, o foco deve avançar para o elemento de navegação de retorno à página inicial (ex.: botão ou link “Inicial”) e logo após acessar o botão “Editar”.",
        category: "Tela de Visualização",
        checked: false,
      },
    ];

    // Itens específicos por variação
    let itensVariacao: ChecklistItem[] = [];

    if (variacao === "Sem Abas e Com Formulários") {
      itensVariacao = [
        {
          id: 45,
          text: "Formulário (Amarelo)",
          colorIndicator: "#ffc107",
          description:
            "O foco visível deve percorrer os elementos interativos da seção de formulário, respeitando a ordem lógica e visual de apresentação.",
          category: "Tela de Visualização",
          checked: false,
          subItems: [
            {
              id: "45-1",
              text: "Acordeon de seção (Azul)",
              description:
                "O primeiro elemento focável deve ser o componente de acordeon, responsável por expandir e colapsar a seção correspondente.",
              colorIndicator: "#2196f3",
              checked: false,
            },
            {
              id: "45-2",
              text: "Elementos da seção (Roxo)",
              description:
                "O foco visível deve avançar para os elementos interativos internos da seção, respeitando rigorosamente a ordem em que são apresentados visualmente.",
              colorIndicator: "#9c27b0",
              checked: false,
            },
          ],
        },
      ];
    } else {
      // "Com Abas, Formulário e Cards"
      itensVariacao = [
        {
          id: 46,
          text: "Abas de navegação (Verde-Água)",
          colorIndicator: "#00d4b1",
          description:
            "O foco deve percorrer todas as abas de navegação disponíveis, respeitando a ordem visual de apresentação.",
          category: "Tela de Visualização",
          checked: false,
        },
        {
          id: 47,
          text: "Seção de cards (Amarelo)",
          colorIndicator: "#ffc107",
          description:
            "O foco visível deve percorrer a seção de cards de informações.",
          category: "Tela de Visualização",
          checked: false,
          subItems: [
            {
              id: "47-1",
              text: "Acordeon de seção (Roxo)",
              description:
                "O primeiro elemento focável deve ser o componente de acordeon, responsável por expandir e colapsar a seção correspondente.",
              colorIndicator: "#9c27b0",
              checked: false,
            },
            {
              id: "47-2",
              text: "Elementos internos do acordeon (Azul)",
              description:
                "O foco visível deve avançar para os elementos interativos internos do acordeon.",
              colorIndicator: "#2196f3",
              checked: false,
            },
            {
              id: "47-3",
              text: "Card de Informações e seus elementos internos (Verde-Água)",
              description:
                "O foco deve percorrer todos os elementos interativos dentro dos cards de informação.",
              colorIndicator: "#00bcd4",
              checked: false,
            },
            {
              id: "47-4",
              text: "Menu de paginação (Vinho)",
              description:
                "Se houver paginação, o foco deve navegar pelos controles de paginação.",
              colorIndicator: "#880e4f",
              checked: false,
            },
          ],
        },
        {
          id: 58,
          text: "Elementos colapsáveis e Mini Cards",
          description:
            "Deve-se seguir ordem semelhante ao elemento acima, com exceção das navegações dos elementos:\n O restante dos elementos presentes na tela seguem os padrões mencionados no início deste tópico.",
          category: "Tela de Visualização",
          checked: false,
          subItems: [
            {
              id: "58-1",
              text: "Seção colapsável (Azul)",
              colorIndicator: "#2196f3",
              checked: false,
            },
            {
              id: "58-2",
              text: "Elementos internos da seção (Roxo)",
              colorIndicator: "#9c27b0",
              checked: false,
            },
            {
              id: "58-3",
              text: "Card de Informações e seus elementos internos (Verde-Água)",
              colorIndicator: "#00bcd4",
              checked: false,
            },
          ],
        },
      ];
    }

    // Itens finais (sempre presentes)
    const itensFinais: ChecklistItem[] = [
      {
        id: 48,
        text: "Botão de envio do formulário (Verde)",
        colorIndicator: "#4caf50",
        description:
          "O foco visível deve alcançar, como penúltimo elemento focável da página, o botão de ação principal.",
        category: "Tela de Visualização",
        checked: false,
      },
      {
        id: 49,
        text: "Rodapé (Verde-musgo)",
        colorIndicator: "#6b7c59",
        description:
          "Nessa área, deve existir apenas um elemento interativo, correspondente ao link externo do IMA.",
        category: "Tela de Visualização",
        checked: false,
      },
    ];

    return [...itensComuns, ...itensVariacao, ...itensFinais];
  };

  // Função auxiliar para renderizar o texto com bolinha colorida
  const renderTextWithColorIndicator = (
    text: string,
    colorIndicator?: string,
  ) => {
    if (!colorIndicator) {
      return text;
    }

    // Extrair o nome da cor do texto dentro dos parênteses
    const colorMatch = text.match(/\(([^)]+)\)$/);
    const colorName = colorMatch ? colorMatch[1] : "";
    const textWithoutParentheses = text
      .replace(/\([^)]+\)$/, "")
      .trim();

    return (
      <span className="flex items-center gap-2 flex-wrap">
        <span>{textWithoutParentheses}</span>
        {colorName && (
          <span className="inline-flex items-center gap-1.5 text-gray-600">
            <span>(</span>
            <span
              className="inline-block w-3 h-3 rounded-full border border-gray-300"
              style={{ backgroundColor: colorIndicator }}
              aria-label={colorName}
            />
            <span>{colorName})</span>
          </span>
        )}
      </span>
    );
  };

  /* =======================
     Estado
  ======================= */

  const [items, setItems] = useState<ChecklistItem[]>([
    // Requisitos Técnicos (Checklist Geral)
    {
      id: 1,
      text: "Todo elemento focável exibe indicador de foco visível ao receber foco por teclado.",
      category: "Requisitos Técnicos",
      checked: false,
    },
    {
      id: 2,
      text: "O indicador de foco possui espessura mínima de 2px CSS, conforme ABNT NBR 17225.",
      category: "Requisitos Técnicos",
      checked: false,
    },
    {
      id: 3,
      text: "O indicador de foco envolve ou delimita claramente o perímetro do elemento focável.",
      category: "Requisitos Técnicos",
      checked: false,
    },
    {
      id: 4,
      text: "O indicador de foco apresenta contraste mínimo de 3:1 em relação às cores adjacentes.",
      category: "Requisitos Técnicos",
      checked: false,
    },
    {
      id: 5,
      text: "O foco não depende exclusivamente de mudança sutil de cor, sombra leve ou animação imperceptível.",
      category: "Requisitos Técnicos",
      checked: false,
    },
    {
      id: 6,
      text: "O foco padrão do navegador não foi removido sem substituição equivalente ou superior.",
      category: "Requisitos Técnicos",
      checked: false,
    },
    {
      id: 7,
      text: "O foco permanece totalmente visível, não sendo cortado por overflow: hidden, encoberto por animações, ocultado por sombras internas ou limitado por bordas de contêineres.",
      category: "Requisitos Técnicos",
      checked: false,
    },
    {
      id: 8,
      text: "O indicador de foco é perceptível em áreas claras, áreas escuras, cabeçalhos, rodapés, menus e barras laterais.",
      category: "Requisitos Técnicos",
      checked: false,
    },
    {
      id: 9,
      text: "Todos os tipos de elementos interativos apresentam foco visível: links, botões, campos de formulário, controles customizados e componentes dinâmicos.",
      category: "Requisitos Técnicos",
      checked: false,
    },

    // Tela Principal - Reorganizada com sub-itens
    {
      id: 10,
      text: "Cabeçalho principal da página (Vermelho)",
      colorIndicator: "#dc3545",
      description:
        "A ordem interna do foco deve seguir rigorosamente a ordem de apresentação dos elementos interativos dentro do grupo.",
      category: "Tela Principal",
      checked: false,
    },
    {
      id: 11,
      text: "Sub-menu Cadastros (quando acionado)",
      category: "Tela Principal",
      description:
        "Quando acionado o botão de cadastros, o foco visível deve seguir as orientações abaixo:",
      checked: false,
      subItems: [
        {
          id: "11-1",
          text: "Acordeon de seções (Amarelo)",
          description:
            "O primeiro elemento focável do sub-menu deve ser o componente de acordeon responsável por expandir e colapsar a seção correspondente.",
          colorIndicator: "#ffc107",
          checked: false,
        },
        {
          id: "11-2",
          text: "Seções de interação (Lilás)",
          description:
            "A navegação deve ocorrer sequencialmente dentro de cada uma das seções, percorrendo todas as opções disponíveis antes de avançar para a próxima seção.",
          colorIndicator: "#9c27b0",
          checked: false,
        },
      ],
    },
    {
      id: 12,
      text: "Seção de busca e ações de sessão (Laranja)",
      colorIndicator: "#ff9800",
      description:
        "A navegação interna deve respeitar a ordem visual dos componentes apresentados nessa área.",
      category: "Tela Principal",
      checked: false,
    },
    {
      id: 13,
      text: "Lista de páginas do sistema (menu principal) (Verde)",
      colorIndicator: "#4caf50",
      description:
        "A navegação deve ocorrer por seções, como no exemplo abaixo:\n 1 - Todas as opções da seção Geral;\n 2- Em seguida, todas as opções da seção Animal;\n 3- Por fim, todas as opções da seção Vegetal.",
      category: "Tela Principal",
      checked: false,
    },
    {
      id: 14,
      text: "Sub-seção da página principal (Azul)",
      colorIndicator: "#2196f3",
      description:
        "A ordem de navegação deve seguir o mesmo princípio adotado para a seção anterior, respeitando a organização por seções e a ordem visual dos elementos interativos.",
      category: "Tela Principal",
      checked: false,
    },
    {
      id: 15,
      text: "Rodapé (Verde-musgo)",
      colorIndicator: "#6b7c59",
      description:
        "Nessa área, deve existir apenas um elemento interativo, correspondente ao link externo do IMA.",
      category: "Tela Principal",
      checked: false,
    },

    // Tela de Notificações
    {
      id: 16,
      text: "Cabeçalho principal da página (Vermelho)",
      colorIndicator: "#dc3545",
      description:
        "A ordem interna do foco deve seguir rigorosamente a ordem de apresentação dos elementos interativos dentro do grupo.",
      category: "Tela de Notificações",
      checked: false,
    },
    {
      id: 17,
      text: "Navegação de retorno (breadcrumb / ação de voltar) (Laranja)",
      colorIndicator: "#ff9800",
      description:
        "O foco deve avançar para o elemento de navegação de retorno à página inicial (ex.: botão “Inicial”).",
      category: "Tela de Notificações",
      checked: false,
    },
    {
      id: 18,
      text: "Campo de busca de notificações (Verde)",
      colorIndicator: "#4caf50",
      description:
        "A ordem interna do foco deve contemplar:\n Campo de entrada de texto para pesquisa de notificações;\n Botão de ação associado à busca (ex.: ícone de lupa), quando aplicável.",
      category: "Tela de Notificações",
      checked: false,
    },
    {
      id: 19,
      text: "Ações globais sobre a lista de notificações (Cinza)",
      colorIndicator: "#6c757d",
      description:
        "O foco deve avançar para os controles de ação global da lista, incluindo:\n Caixa de seleção “Selecionar todas” as notificações.",
      category: "Tela de Notificações",
      checked: false,
    },
    {
      id: 20,
      text: "Lista de notificações (Roxo)",
      colorIndicator: "#9c27b0",
      description:
        "O foco deve percorrer a lista de notificações, respeitando a ordem visual de apresentação, item a item. Ex:\n Caixa de seleção da notificação;\n Link ou botão de ação “Visualizar”.",
      category: "Tela de Notificações",
      checked: false,
    },
    {
      id: 21,
      text: "Modal de Visualização de Notificação (quando acionado) (Amarelo)",
      colorIndicator: "#ffc107",
      description:
        "Quando acionado o botão de visualizar, o foco visível deve seguir as orientações abaixo:",
      category: "Tela de Notificações",
      checked: false,
      subItems: [
        {
          id: "21-1",
          text: 'Ao abrir o modal, o foco é movido automaticamente para o botão "Fechar"',
          description:
            "O foco visível diretamente no botão “Fechar”, por ser o único elemento interativo disponível nesse contexto.",
          checked: false,
        },
        {
          id: "21-2",
          text: "Durante o modal aberto, o foco permanece restrito ao modal",
          description:
            "Não é possível mover o foco para a interface subjacente.",
          checked: false,
        },
        {
          id: "21-3",
          text: "O modal pode ser fechado por teclado",
          description:
            "O modal deve aceitar a interação com teclado, exemplo: Esc",
          checked: false,
        },
        {
          id: "21-4",
          text: "Ao fechar o modal, o foco retorna ao elemento que acionou sua abertura",
          checked: false,
        },
      ],
    },
    {
      id: 22,
      text: "Paginação da lista (Azul)",
      colorIndicator: "#2196f3",
      description:
        "O foco deve avançar para os controles de paginação, respeitando a ordem visual dos elementos, incluindo:\n Informação de quantidade de itens por página;\n Indicador de intervalo de resultados exibidos;\n Botões de navegação entre páginas (anterior e próxima).",
      category: "Tela de Notificações",
      checked: false,
    },
    {
      id: 23,
      text: "Rodapé (Verde-musgo)",
      colorIndicator: "#6b7c59",
      description:
        "Nessa área, deve existir apenas um elemento interativo, correspondente ao link externo do IMA.",
      category: "Tela de Notificações",
      checked: false,
    },

    // Tela de Busca/Listagem
    ...getTelaBuscaItems(variacaoTelaBusca),

    // Tela de Cadastro Interno
    {
      id: 34,
      text: "Cabeçalho principal da página (Vermelho)",
      colorIndicator: "#dc3545",
      description:
        "A ordem interna do foco deve seguir rigorosamente a ordem de apresentação dos elementos interativos dentro do grupo.",
      category: "Tela de Cadastro Interno",
      checked: false,
    },
    {
      id: 35,
      text: "Interações de redirecionamento (Laranja)",
      colorIndicator: "#ff9800",
      description:
        "Após a conclusão da navegação pelo cabeçalho, o foco deve avançar para o elemento de navegação de retorno à página inicial (ex.: botão ou link “Inicial”).",
      category: "Tela de Cadastro Interno",
      checked: false,
    },
    {
      id: 36,
      text: "Formulário de cadastro (Amarelo)",
      colorIndicator: "#ffc107",
      description:
        "O foco visível deve percorrer os elementos interativos da seção de formulário da página, respeitando a ordem lógica e visual de apresentação.",
      category: "Tela de Cadastro Interno",
      checked: false,
      subItems: [
        {
          id: "36-1",
          text: "Acordeon de seção (Azul)",
          description:
            "O primeiro elemento focável deve ser o componente de acordeon, responsável por expandir e colapsar a seção correspondente.",
          colorIndicator: "#2196f3",
          checked: false,
        },
        {
          id: "36-2",
          text: "Elementos da seção (Roxo)",
          description:
            "Após o acordeon, o foco visível deve avançar para os elementos interativos internos da seção, respeitando rigorosamente a ordem em que são apresentados visualmente na interface.",
          colorIndicator: "#9c27b0",
          checked: false,
        },
      ],
    },
    {
      id: 37,
      text: "Botão de envio do formulário (Verde)",
      colorIndicator: "#4caf50",
      description:
        "O foco visível deve alcançar, como penúltimo elemento focável da página, o botão “Adicionar”, localizado na seção Laranja.",
      category: "Tela de Cadastro Interno",
      checked: false,
    },
    {
      id: 38,
      text: "Rodapé (Verde-musgo)",
      colorIndicator: "#6b7c59",
      description:
        "Nessa área, deve existir apenas um elemento interativo, correspondente ao link externo do IMA.",
      category: "Tela de Cadastro Interno",
      checked: false,
    },

    // Tela de Edição
    {
      id: 39,
      text: "Cabeçalho principal da página (Vermelho)",
      colorIndicator: "#dc3545",
      description:
        "A ordem interna do foco deve seguir rigorosamente a ordem de apresentação dos elementos interativos dentro do grupo.",
      category: "Tela de Edição",
      checked: false,
    },
    {
      id: 40,
      text: "Interações de redirecionamento (Laranja)",
      colorIndicator: "#ff9800",
      description:
        "Após a conclusão da navegação pelo cabeçalho, o foco deve avançar para o elemento de navegação de retorno à página inicial (ex.: botão ou link “Inicial”).",
      category: "Tela de Edição",
      checked: false,
    },
    {
      id: 41,
      text: "Formulário de edição (Amarelo)",
      colorIndicator: "#ffc107",
      description:
        "O foco visível deve percorrer os elementos interativos da seção de formulário da página, respeitando a ordem lógica e visual de apresentação.",
      category: "Tela de Edição",
      checked: false,
      subItems: [
        {
          id: "41-1",
          text: "Acordeon de seção (Azul)",
          description:
            "O primeiro elemento focável deve ser o componente de acordeon, responsável por expandir e colapsar a seção correspondente.",
          colorIndicator: "#2196f3",
          checked: false,
        },
        {
          id: "41-2",
          text: "Elementos da seção (Roxo)",
          description:
            "O foco visível deve avançar para os elementos interativos internos da seção, respeitando rigorosamente a ordem em que são apresentados visualmente na interface.",
          colorIndicator: "#9c27b0",
          checked: false,
        },
      ],
    },
    {
      id: 42,
      text: "Botão de envio do formulário (Verde)",
      colorIndicator: "#4caf50",
      description:
        "O foco visível deve alcançar, como penúltimo elemento focável da página, o botão “Salvar”, localizado na seção Laranja.",
      category: "Tela de Edição",
      checked: false,
    },

    // Tela de Visualização
    ...getTelaVisualizacaoItems(variacaoTelaVisualizacao),

    {
      id: 50,
      text: "Cabeçalho principal da página (Vermelho)",
      colorIndicator: "#dc3545",
      description:
        "A ordem interna do foco deve seguir rigorosamente a ordem de apresentação dos elementos interativos dentro do grupo.",
      category: "Tela de Perfil de Usuário",
      checked: false,
    },
    {
      id: 51,
      text: "Interações de redirecionamento (Laranja)",
      colorIndicator: "#ff9800",
      description:
        "Após a conclusão da navegação pelo cabeçalho, o foco deve avançar para o elemento de navegação de retorno à página inicial (ex.: botão ou link “Inicial”).",
      category: "Tela de Perfil de Usuário",
      checked: false,
    },
    {
      id: 52,
      text: "Abas de navegação (Lilás)",
      colorIndicator: "#9c27b0",
      description:
        "O foco deve percorrer todas as abas de navegação disponíveis, respeitando a ordem visual de apresentação.",
      category: "Tela de Perfil de Usuário",
      checked: false,
    },
    {
      id: 53,
      text: "Formulário (Amarelo)",
      colorIndicator: "#ffc107",
      description:
        "O foco visível deve percorrer os elementos interativos da seção de formulário, respeitando a ordem lógica e visual de apresentação.",
      category: "Tela de Perfil de Usuário",
      checked: false,
      subItems: [
        {
          id: "53-1",
          text: "Alteração de imagem (Azul)",
          description:
            "O primeiro elemento focável deve ser o botão para alteração da imagem de perfil, por ser o primeiro elemento interativo da seção do formulário.",
          colorIndicator: "#2196f3",
          checked: false,
        },
        {
          id: "53-2",
          text: "Acordeon de Seção (Roxo)",
          description:
            "O segundo elemento focável deve ser o componente de acordeon, responsável por expandir e colapsar a seção correspondente.",
          colorIndicator: "#9c27b0",
          checked: false,
        },
        {
          id: "53-3",
          text: "Elementos da Seção (Verde-Água)",
          description:
            "Após o acordeon, o foco visível deve avançar para os elementos interativos internos da seção, respeitando rigorosamente a ordem em que são apresentados visualmente na interface.",
          colorIndicator: "#00bcd4",
          checked: false,
        },
      ],
    },
    {
      id: 54,
      text: "Cabeçalho principal da página (Vermelho)",
      colorIndicator: "#dc3545",
      description:
        "A ordem interna do foco deve seguir rigorosamente a ordem de apresentação dos elementos interativos dentro do grupo.",
      category: "Tela de Consulta Externa",
      checked: false,
    },
    {
      id: 55,
      text: "Interações de redirecionamento (Laranja)",
      colorIndicator: "#ff9800",
      description:
        "Após a conclusão da navegação pelo cabeçalho, o foco deve avançar para o elemento de navegação de retorno à página inicial (ex.: botão ou link “Inicial”).",
      category: "Tela de Consulta Externa",
      checked: false,
    },
    {
      id: 56,
      text: "Seção de busca (Lilás)",
      colorIndicator: "#9c27b0",
      description:
        "A ordem interna do foco deve contemplar:\n Campo de entrada de texto para pesquisa;\n Botão de ação associado à busca (ex.: ícone de lupa), quando aplicável.",
      category: "Tela de Consulta Externa",
      checked: false,
    },
    {
      id: 57,
      text: "Card de Informações (Azul)",
      colorIndicator: "#2196f3",
      description:
        "O foco visível deve percorrer o card de informações, caso haja elementos interativos, respeitando a ordem visual de apresentação.\n *Caso não haja elementos interativos, o foco deve seguir o fluxo natural, passando pelos elementos do navegador e depois manter o fluxo de navegação interna definido anteriormente.",
      category: "Tela de Consulta Externa",
      checked: false,
    },
  ]);

  /* =======================
     Lógica
  ======================= */

  const toggleItem = (id: number) => {
    setItems(
      items.map((item) => {
        if (item.id === id) {
          const newChecked = !item.checked;
          // Também marcar todos os sub-itens com o mesmo estado
          if (item.subItems) {
            return {
              ...item,
              checked: newChecked,
              subItems: item.subItems.map((sub) => ({
                ...sub,
                checked: newChecked,
              })),
            };
          }
          return { ...item, checked: newChecked };
        }
        return item;
      }),
    );
  };

  const toggleSubItem = (itemId: number, subItemId: string) => {
    setItems(
      items.map((item) => {
        if (item.id === itemId && item.subItems) {
          const updatedSubItems = item.subItems.map((sub) =>
            sub.id === subItemId
              ? { ...sub, checked: !sub.checked }
              : sub,
          );
          // Se todos os sub-itens estiverem marcados, marca o item pai também
          const allSubItemsChecked = updatedSubItems.every(
            (sub) => sub.checked,
          );
          return {
            ...item,
            subItems: updatedSubItems,
            checked: allSubItemsChecked,
          };
        }
        return item;
      }),
    );
  };

  const toggleCategory = (category: ChecklistCategory) => {
    const categoryItems = groupedItems[category];
    const allChecked = categoryItems.every(
      (item) => item.checked,
    );

    setItems(
      items.map((item) => {
        if (item.category === category) {
          // Se o item tem sub-itens, marcar todos eles também
          if (item.subItems) {
            return {
              ...item,
              checked: !allChecked,
              subItems: item.subItems.map((sub) => ({
                ...sub,
                checked: !allChecked,
              })),
            };
          }
          return { ...item, checked: !allChecked };
        }
        return item;
      }),
    );
  };

  const groupedItems = items.reduce<
    Record<ChecklistCategory, ChecklistItem[]>
  >(
    (acc, item) => {
      if (!acc[item.category]) acc[item.category] = [];
      acc[item.category].push(item);
      return acc;
    },
    {} as Record<ChecklistCategory, ChecklistItem[]>,
  );

  // Filtrar categorias se houver seleção personalizada
  const categoriasParaExibir = categoriasSelecionadas
    ? Object.fromEntries(
        Object.entries(groupedItems).filter(([cat]) =>
          categoriasSelecionadas.includes(
            cat as ChecklistCategory,
          ),
        ),
      )
    : groupedItems;

  // Calcular totais baseado nas categorias exibidas
  const itemsExibidos = Object.values(
    categoriasParaExibir,
  ).flat();

  // Calcular total de itens incluindo subitens
  let totalItems = 0;
  let completedItems = 0;

  itemsExibidos.forEach((item) => {
    if (item.subItems && item.subItems.length > 0) {
      // Se o item tem subitens, conta apenas os subitens
      totalItems += item.subItems.length;
      completedItems += item.subItems.filter(
        (sub) => sub.checked,
      ).length;
    } else {
      // Se não tem subitens, conta o item normalmente
      totalItems += 1;
      if (item.checked) completedItems += 1;
    }
  });

  const progress = Math.round(
    totalItems > 0 ? (completedItems / totalItems) * 100 : 0,
  );

  /* =======================
     Funções auxiliares
  ======================= */

  // Função para normalizar categoria para chave do imageUrls (remove acentos)
  const normalizeCategoryKey = (category: string): string => {
    return category
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // Remove acentos
      .replace(/\s+/g, "-")
      .replace(/\//g, "");
  };

  /* =======================
     Render
  ======================= */

  return (
    <div className="bg-[#f8f9fa] min-h-screen">
      {/* Header com navegação */}
      <Header />

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-8 py-8">
        {/* Breadcrumb e Botão Voltar */}
        <div className="flex items-center justify-between gap-4 mb-6 flex-wrap sm:flex-nowrap">
          <div className="flex items-center gap-2 text-sm text-gray-600 flex-wrap">
            <button
              onClick={() => navigate("/camadas")}
              className="hover:text-[#00b894] transition-colors"
            >
              Home
            </button>
            <span className="hidden sm:inline">›</span>
            <button
              onClick={() =>
                navigate("/personalizar/camada-03")
              }
              className="hover:text-[#00b894] transition-colors"
            >
              Camada 3
            </button>
            <span className="hidden sm:inline">›</span>
            <span className="text-gray-900">Checklist</span>
          </div>

          <button
            onClick={() => navigate("/personalizar/camada-03")}
            className="flex items-center gap-2 px-3 py-2 bg-[#00b894] text-white rounded-lg transition-colors hover:bg-[#00a380] sm:bg-transparent sm:text-gray-600 sm:hover:text-[#00b894] sm:hover:bg-white flex-shrink-0"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Voltar</span>
          </button>
        </div>

        {/* Botão Mais Informações */}
        <a
          href="https://docs.google.com/document/d/1kPfQyfptKh27_7PSyYxCl2j-122Bk0fgAX2dKliQZ00/edit?tab=t.0#heading=h.im7nuipffw1q"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-[#00b894] text-white px-5 py-3 rounded-lg font-medium hover:bg-[#00a380] transition-colors mb-6"
        >
          <BookOpen className="w-5 h-5" />
          Mais Informações
        </a>

        {/* Barra de Progresso */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="text-lg font-bold text-gray-900">
                Itens atendidos
              </h2>
            </div>
            <div className="text-2xl font-bold text-[#00b894]">
              {progress}% Concluído
            </div>
          </div>

          <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden mb-4">
            <div
              className="bg-[#00b894] h-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex justify-between text-sm text-gray-600">
            <span>
              {completedItems} DE {totalItems} ITENS CONCLUÍDOS
            </span>
          </div>
        </div>

        {/* Caixa de Informação sobre Cores */}
        <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-5 mb-6">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold mt-0.5">
              i
            </div>
            <div className="flex-1">
              <p className="text-gray-800 text-sm leading-relaxed">
                As cores indicam a área de aplicação de cada
                item do checklist, facilitando a identificação
                visual na imagem da tela correspondente.
              </p>
              <p className="text-gray-800 text-sm leading-relaxed mt-2 flex items-center gap-2 flex-wrap">
                <span>Para acessar a imagem, utilize o</span>
                <button
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#00b894] text-white text-xs rounded hover:bg-[#00a380] transition-colors"
                  disabled
                >
                  <Image className="w-3.5 h-3.5" />
                  <span>Ver Print</span>
                </button>
                <span>presente na seção da tela desejada.</span>
              </p>
            </div>
          </div>
        </div>

        {/* Checklist por categorias */}
        <div className="space-y-8">
          {Object.entries(categoriasParaExibir).map(
            ([category, categoryItems]) => {
              const categoryCompleted = categoryItems.filter(
                (i) => i.checked,
              ).length;
              const categoryTotal = categoryItems.length;

              return (
                <details
                  key={category}
                  open
                  className="bg-white rounded-lg border border-gray-200 overflow-hidden"
                >
                  <summary className="flex items-center justify-between p-5 cursor-pointer hover:bg-gray-50 transition-colors select-none">
                    <div className="flex items-center gap-3 flex-wrap">
                      <input
                        type="checkbox"
                        checked={
                          categoryCompleted === categoryTotal
                        }
                        onChange={() =>
                          toggleCategory(
                            category as ChecklistCategory,
                          )
                        }
                        onClick={(e) => e.stopPropagation()}
                        className="w-5 h-5 accent-[#00b894] cursor-pointer"
                      />
                      <h3 className="text-xl font-bold text-gray-900">
                        {category}
                      </h3>
                      <span className="text-sm text-gray-500">
                        ({categoryCompleted}/{categoryTotal})
                      </span>

                      {/* Botão Ver Print da Tela */}
                      {imageUrls[
                        `categoria-${normalizeCategoryKey(category)}`
                      ] && (
                        <a
                          href={
                            imageUrls[
                              `categoria-${normalizeCategoryKey(category)}`
                            ]
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            window.open(
                              imageUrls[
                                `categoria-${normalizeCategoryKey(category)}`
                              ],
                              "_blank",
                            );
                          }}
                          className="ml-auto sm:ml-2 flex items-center gap-2 px-3 py-1.5 bg-[#00b894] text-white text-sm rounded-lg hover:bg-[#00a380] transition-colors"
                        >
                          <Image className="w-4 h-4" />
                          <span className="hidden sm:inline">
                            Ver Print
                          </span>
                        </a>
                      )}

                      {/* Botão Configurar Variação - Tela de Visualização */}
                      {category === "Tela de Visualização" && (
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setTelaParaConfigurar(
                              "Visualização",
                            );
                            setShowModalVariacoes(true);
                          }}
                          className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          <Settings className="w-4 h-4" />
                          <span className="hidden sm:inline">
                            Configurar Variação
                          </span>
                        </button>
                      )}

                      {/* Botão Configurar Variação - Tela de Busca/Listagem */}
                      {category ===
                        "Tela de Busca/Listagem" && (
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setTelaParaConfigurar("Busca");
                            setShowModalVariacoes(true);
                          }}
                          className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          <Settings className="w-4 h-4" />
                          <span className="hidden sm:inline">
                            Configurar Variação
                          </span>
                        </button>
                      )}
                    </div>
                    <ChevronDown className="w-5 h-5 text-gray-500 transition-transform details-open:rotate-180" />
                  </summary>

                  {/* Items da categoria */}
                  <div className="p-5 pt-0 space-y-3">
                    {categoryItems.map((item) => (
                      <div
                        key={item.id}
                        className={`rounded-lg border transition-all hover:shadow-md ${
                          item.checked
                            ? "bg-[#e8f8f5] border-[#00b894]"
                            : "bg-gray-50 border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <label className="flex items-start gap-4 p-5 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={item.checked}
                            onChange={() => toggleItem(item.id)}
                            className="mt-1 w-5 h-5 accent-[#00b894] cursor-pointer"
                          />

                          <div className="flex-1">
                            <div className="flex items-center justify-between gap-3 mb-1">
                              <div
                                className={`font-medium text-gray-900 ${
                                  item.checked
                                    ? "line-through opacity-70"
                                    : ""
                                }`}
                              >
                                {renderTextWithColorIndicator(
                                  item.text,
                                  item.colorIndicator,
                                )}
                              </div>

                              {/* Botão Ver Print no título do item */}
                              {imageUrls[item.id] && (
                                <a
                                  href={imageUrls[item.id]}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    window.open(
                                      imageUrls[item.id],
                                      "_blank",
                                    );
                                  }}
                                  className="flex items-center gap-1.5 px-2.5 py-1 bg-[#00b894] text-white text-xs rounded hover:bg-[#00a380] transition-colors flex-shrink-0"
                                >
                                  <Image className="w-3.5 h-3.5" />
                                  <span className="hidden sm:inline">
                                    Ver Print
                                  </span>
                                </a>
                              )}
                            </div>

                            {item.description && (
                              <div className="text-sm text-gray-600 whitespace-pre-line">
                                {item.description}
                              </div>
                            )}

                            {item.subItems && (
                              <div className="mt-3 space-y-2">
                                {item.subItems.map(
                                  (subItem) => (
                                    <div
                                      key={subItem.id}
                                      className={`flex items-start gap-4 p-3 rounded-lg border transition-all hover:shadow-md ${
                                        subItem.checked
                                          ? "bg-[#e8f8f5] border-[#00b894]"
                                          : "bg-gray-50 border-gray-200 hover:border-gray-300"
                                      }`}
                                    >
                                      <label className="flex items-start gap-3 flex-1 cursor-pointer">
                                        <input
                                          type="checkbox"
                                          checked={
                                            subItem.checked
                                          }
                                          onChange={() =>
                                            toggleSubItem(
                                              item.id,
                                              subItem.id,
                                            )
                                          }
                                          className="mt-1 w-5 h-5 accent-[#00b894] cursor-pointer"
                                        />

                                        <div className="flex-1">
                                          <div
                                            className={`font-medium text-gray-900 mb-1 ${
                                              subItem.checked
                                                ? "line-through opacity-70"
                                                : ""
                                            }`}
                                          >
                                            {renderTextWithColorIndicator(
                                              subItem.text,
                                              subItem.colorIndicator,
                                            )}
                                          </div>
                                          {subItem.description && (
                                            <div className="text-sm text-gray-600 whitespace-pre-line">
                                              {
                                                subItem.description
                                              }
                                            </div>
                                          )}
                                        </div>
                                      </label>
                                    </div>
                                  ),
                                )}
                              </div>
                            )}
                          </div>
                        </label>
                      </div>
                    ))}
                  </div>
                </details>
              );
            },
          )}
        </div>

        {/* Footer Card de Motivação */}
        {progress >= 50 && (
          <div className="mt-12 bg-gradient-to-br from-[#1a3a3a] to-[#2d5a5a] rounded-xl p-8 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold mb-2">
                  Excelente trabalho! 🎯
                </h3>
                <p className="text-gray-300 max-w-xl">
                  Você está dominando os conceitos avançados de
                  navegação e acessibilidade. Continue assim
                  para garantir a conformidade completa!
                </p>
              </div>
              <div className="text-6xl opacity-50">🚀</div>
            </div>

            <div className="flex gap-4 mt-6">
              <a
                href="mailto:gabrielaguiar.ti@fundecc.org.br?subject=Avaliação Checklists Acessiblilidade"
                className="bg-[#00b894] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#00a380] transition-colors"
              >
                Avaliar Conteúdo
              </a>
              <a
                href="https://docs.google.com/document/d/1kPfQyfptKh27_7PSyYxCl2j-122Bk0fgAX2dKliQZ00/edit?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 text-white px-6 py-3 rounded-lg font-medium hover:bg-white/20 transition-colors"
              >
                Ver Recursos Extras
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Modal de Variações */}
      {showModalVariacoes &&
        telaParaConfigurar === "Visualização" && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-2xl w-full p-6 shadow-2xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Configurar Variação - Tela de Visualização
              </h2>
              <p className="text-gray-600 mb-6">
                Selecione qual variação da Tela de Visualização
                você deseja visualizar no checklist:
              </p>

              {/* Opções de variação */}
              <div className="space-y-3 mb-6">
                <button
                  onClick={() => {
                    setVariacaoTelaVisualizacao(
                      "Com Abas, Formulário e Cards",
                    );
                    setShowModalVariacoes(false);
                    setTelaParaConfigurar(null);
                  }}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                    variacaoTelaVisualizacao ===
                    "Com Abas, Formulário e Cards"
                      ? "border-[#00b894] bg-[#e8f8f5]"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        variacaoTelaVisualizacao ===
                        "Com Abas, Formulário e Cards"
                          ? "border-[#00b894] bg-[#00b894]"
                          : "border-gray-300"
                      }`}
                    >
                      {variacaoTelaVisualizacao ===
                        "Com Abas, Formulário e Cards" && (
                        <div className="w-2 h-2 bg-white rounded-full" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900">
                        Com Abas, Formulário e Cards
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        Inclui abas de navegação, seção de cards
                        com acordeões, elementos internos, cards
                        de informação e menu de paginação
                      </p>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => {
                    setVariacaoTelaVisualizacao(
                      "Sem Abas e Com Formulários",
                    );
                    setShowModalVariacoes(false);
                    setTelaParaConfigurar(null);
                  }}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                    variacaoTelaVisualizacao ===
                    "Sem Abas e Com Formulários"
                      ? "border-[#00b894] bg-[#e8f8f5]"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        variacaoTelaVisualizacao ===
                        "Sem Abas e Com Formulários"
                          ? "border-[#00b894] bg-[#00b894]"
                          : "border-gray-300"
                      }`}
                    >
                      {variacaoTelaVisualizacao ===
                        "Sem Abas e Com Formulários" && (
                        <div className="w-2 h-2 bg-white rounded-full" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900">
                        Sem Abas e Com Formulários
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        Formulário com acordeon de seção e
                        elementos interativos, sem abas de
                        navegação
                      </p>
                    </div>
                  </div>
                </button>
              </div>

              {/* Botão Fechar */}
              <button
                onClick={() => {
                  setShowModalVariacoes(false);
                  setTelaParaConfigurar(null);
                }}
                className="w-full px-4 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
              >
                Fechar
              </button>
            </div>
          </div>
        )}

      {/* Modal de Variações */}
      {showModalVariacoes && telaParaConfigurar === "Busca" && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full p-6 shadow-2xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Configurar Variação - Tela de Busca/Listagem
            </h2>
            <p className="text-gray-600 mb-6">
              Selecione qual variação da Tela de Busca/Listagem
              você deseja visualizar no checklist:
            </p>

            {/* Opções de variação */}
            <div className="space-y-3 mb-6">
              <button
                onClick={() => {
                  setVariacaoTelaBusca("Com Tabela de Dados");
                  setShowModalVariacoes(false);
                  setTelaParaConfigurar(null);
                }}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                  variacaoTelaBusca === "Com Tabela de Dados"
                    ? "border-[#00b894] bg-[#e8f8f5]"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      variacaoTelaBusca ===
                      "Com Tabela de Dados"
                        ? "border-[#00b894] bg-[#00b894]"
                        : "border-gray-300"
                    }`}
                  >
                    {variacaoTelaBusca ===
                      "Com Tabela de Dados" && (
                      <div className="w-2 h-2 bg-white rounded-full" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900">
                      Com Tabela de Dados
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Inclui tabela de resultados de busca com
                      área de ordenação de colunas e resultados,
                      área de ações sobre resultados
                      selecionados e área de expansão de
                      visualização de dados
                    </p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => {
                  setVariacaoTelaBusca(
                    "Com Card de Informações",
                  );
                  setShowModalVariacoes(false);
                  setTelaParaConfigurar(null);
                }}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                  variacaoTelaBusca ===
                  "Com Card de Informações"
                    ? "border-[#00b894] bg-[#e8f8f5]"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      variacaoTelaBusca ===
                      "Com Card de Informações"
                        ? "border-[#00b894] bg-[#00b894]"
                        : "border-gray-300"
                    }`}
                  >
                    {variacaoTelaBusca ===
                      "Com Card de Informações" && (
                      <div className="w-2 h-2 bg-white rounded-full" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900">
                      Com Card de Informações
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Inclui card de informações com área de
                      ordenação de colunas e resultados, área de
                      ações sobre resultados selecionados e área
                      de expansão de visualização de dados
                    </p>
                  </div>
                </div>
              </button>
            </div>

            {/* Botão Fechar */}
            <button
              onClick={() => {
                setShowModalVariacoes(false);
                setTelaParaConfigurar(null);
              }}
              className="w-full px-4 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
            >
              Fechar
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
}