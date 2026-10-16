import type { CategoryId } from "../data/categories";

export type ChecklistCategory = CategoryId;

export interface ChecklistSubItem {
  id: string;
  text: string;
  description?: string;
  checked: boolean;
  imagemUrl?: string;
  colorIndicator?: string;
}

export interface ChecklistItem {
  id: number;
  text: string;
  description?: string;
  category: ChecklistCategory;
  checked: boolean;
  subItems?: ChecklistSubItem[];
  imagemUrl?: string;
  colorIndicator?: string;
}

export interface ChecklistCamada {
  categoryIcons?: Partial<Record<ChecklistCategory, string>>;
  items: ChecklistItem[];
  imageUrls?: Record<number | string, string>;
}

export type VariacaoTelaVisualizacao =
  | "Com Abas, Formulário e Cards"
  | "Sem Abas e Com Formulários";

export type VariacaoTelaBusca =
  | "Com Tabela de Dados"
  | "Com Card de Informações";

export const checklistCamada03ImageUrls: Record<number | string, string> = {
  "categoria-tela-principal":
    "https://drive.google.com/file/d/1M0HK2opQGBjBuq5Ww726wEio_w796RRL/view?usp=sharing",
  "categoria-tela-notificacoes":
    "https://drive.google.com/file/d/1SnAr3SnxK4R40MQJB4crHxEQWAaKQeTw/view?usp=sharing",
  "categoria-tela-busca":
    "https://drive.google.com/file/d/1MPPmH5GkE8vXnhSxZBWs0hotTSCWQPbM/view?usp=sharing",
  "categoria-tela-cadastro":
    "https://drive.google.com/file/d/1icECuhVRTBwTJygQW7SRzwph6opbd08u/view?usp=sharing",
  "categoria-tela-edicao":
    "https://drive.google.com/file/d/1wEjVHqGBMIv2XRLKxfr4_vPd5yIciVzg/view?usp=sharing",
  "categoria-tela-visualizacao":
    "https://drive.google.com/file/d/18UgkAvdA4r0490jDA3DbaBt1bRBhDF6C/view?usp=sharing",
  "categoria-tela-perfil-usuario":
    "https://drive.google.com/file/d/1qHmusVeC72ZZe9PpJKisCCS4q9MpW-jG/view?usp=sharing",
  "categoria-tela-consulta-externa":
    "https://drive.google.com/file/d/1iOgM1YIhqvzSeouEE1kmtKpJA_h1xmuU/view?usp=sharing",

  11: "https://drive.google.com/file/d/1cB1fMA2ADKHJ71LvHuNM93aBi3K_FSZO/view?usp=sharing",
  21: "https://drive.google.com/file/d/1WHyjoYgI1skPcZfbNobJUQD_GEz5NL3v/view?usp=sharing",
  29: "https://drive.google.com/file/d/1CzMmRiKbABKuAaIzOW-qcgTqcO4Uqxs6/view?usp=sharing",
  "29-1":
    "https://drive.google.com/file/d/1CzMmRiKbABKuAaIzOW-qcgTqcO4Uqxs6/view?usp=sharing",
  "29-3":
    "https://drive.google.com/file/d/1XdDdPj1yy7ApMQm1VGd_fB_rDy6VwjJR/view?usp=sharing",
  "29-4":
    "https://drive.google.com/file/d/17Trzu_yqziVxdJStR-Sb3LWaoUYFXoOs/view?usp=sharing",
  30: "https://drive.google.com/file/d/1WVW1WIFV4fyMhMQ_vqFiNBo42mz1sxbc/view?usp=sharing",
  31: "https://drive.google.com/file/d/1_8M-Xhdtacsl6WEf9u3A8p4A7jTlJKP6/view?usp=sharing",
  47: "https://drive.google.com/file/d/1rgPIffnN93KnI1a8HuWunb4HV0yVneKo/view?usp=sharing",
  58: "https://drive.google.com/file/d/1ZLUqfKgUz3j10CYmBiTDKVE5YblRoRCk/view?usp=sharing",
};

export const getTelaBuscaItems = (
  variacao: VariacaoTelaBusca,
): ChecklistItem[] => {
  const itensComuns: ChecklistItem[] = [
    {
      id: 24,
      text: "Cabeçalho principal da página (Vermelho)",
      colorIndicator: "#dc3545",
      description:
        "A ordem interna do foco deve seguir rigorosamente a ordem de apresentação dos elementos interativos dentro do grupo.",
      category: "tela-busca",
      checked: false,
    },
    {
      id: 25,
      text: "Interações de redirecionamento (Laranja)",
      colorIndicator: "#ff9800",
      description:
        "A ordem interna do foco deve seguir a ordem de apresentação dos elementos interativos dentro do grupo.",
      category: "tela-busca",
      checked: false,
    },
    {
      id: 26,
      text: "Seção de busca inicial (Roxo)",
      colorIndicator: "#9c27b0",
      description:
        "A ordem interna do foco deve contemplar:\n Campo de entrada de texto para pesquisa;\n Botão de ação associado à busca (ex.: ícone de lupa), quando aplicável;\n Botão de abertura da seção secundária de busca.",
      category: "tela-busca",
      checked: false,
    },
    {
      id: 27,
      text: "Seção de busca secundária (Azul)",
      colorIndicator: "#2196f3",
      description:
        "A ordem interna do foco deve contemplar todos os campos internos da seção na ordem em que são apresentados.",
      category: "tela-busca",
      checked: false,
    },
    {
      id: 28,
      text: "Seção de filtro ativo (Rosa)",
      colorIndicator: "#e91e63",
      description:
        "A ordem interna do foco deve navegar pelos botões de remoção de filtro 'X' de cada uma das opções exibidas no momento.",
      category: "tela-busca",
      checked: false,
    },
  ];

  const itensVariacao: ChecklistItem[] =
    variacao === "Com Tabela de Dados"
      ? [
          {
            id: 29,
            text: "Tabela de resultados de busca (Amarelo)",
            colorIndicator: "#ffc107",
            description: "",
            category: "tela-busca",
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
        ]
      : [
          {
            id: 30,
            text: "Listagem de cards (Verde-Água-Escuro)",
            colorIndicator: "#00838f",
            description:
              "O foco visível deve percorrer a lista de cards de informações, respeitando a ordem visual de apresentação.",
            category: "tela-busca",
            checked: false,
          },
          {
            id: 31,
            text: "Elementos do card (Verde-Água)",
            colorIndicator: "#00bcd4",
            description:
              "O foco visível deve navegar por todos os elementos interativos dentro de cada card de informação, incluindo botões de ação e links.",
            category: "tela-busca",
            checked: false,
          },
        ];

  const itensFinais: ChecklistItem[] = [
    {
      id: 32,
      text: "Paginação de resultados da busca (Vinho)",
      colorIndicator: "#8b0000",
      description:
        "O foco visível deve navegar pelos botões de avançar na paginação (>) e, quando disponível, voltar na paginação (<).",
      category: "tela-busca",
      checked: false,
    },
    {
      id: 33,
      text: "Rodapé (Verde-musgo)",
      colorIndicator: "#6b7c59",
      description:
        "Nessa área, deve existir apenas um elemento interativo, correspondente ao link externo do IMA.",
      category: "tela-busca",
      checked: false,
    },
  ];

  return [...itensComuns, ...itensVariacao, ...itensFinais];
};

export const getTelaVisualizacaoItems = (
  variacao: VariacaoTelaVisualizacao,
): ChecklistItem[] => {
  const itensComuns: ChecklistItem[] = [
    {
      id: 43,
      text: "Cabeçalho principal da página (Vermelho)",
      colorIndicator: "#dc3545",
      description:
        "A ordem interna do foco deve seguir rigorosamente a ordem de apresentação dos elementos interativos dentro do grupo.",
      category: "tela-visualizacao",
      checked: false,
    },
    {
      id: 44,
      text: "Interações de redirecionamento (Laranja)",
      colorIndicator: "#ff9800",
      description:
        "Após a conclusão da navegação pelo cabeçalho, o foco deve avançar para o elemento de navegação de retorno à página inicial (ex.: botão ou link “Inicial”) e logo após acessar o botão “Editar”.",
      category: "tela-visualizacao",
      checked: false,
    },
  ];

  const itensVariacao: ChecklistItem[] =
    variacao === "Sem Abas e Com Formulários"
      ? [
          {
            id: 45,
            text: "Formulário (Amarelo)",
            colorIndicator: "#ffc107",
            description:
              "O foco visível deve percorrer os elementos interativos da seção de formulário, respeitando a ordem lógica e visual de apresentação.",
            category: "tela-visualizacao",
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
        ]
      : [
          {
            id: 46,
            text: "Abas de navegação (Verde-Água)",
            colorIndicator: "#00d4b1",
            description:
              "O foco deve percorrer todas as abas de navegação disponíveis, respeitando a ordem visual de apresentação.",
            category: "tela-visualizacao",
            checked: false,
          },
          {
            id: 47,
            text: "Seção de cards (Amarelo)",
            colorIndicator: "#ffc107",
            description:
              "O foco visível deve percorrer a seção de cards de informações.",
            category: "tela-visualizacao",
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
            category: "tela-visualizacao",
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

  const itensFinais: ChecklistItem[] = [
    {
      id: 48,
      text: "Botão de envio do formulário (Verde)",
      colorIndicator: "#4caf50",
      description:
        "O foco visível deve alcançar, como penúltimo elemento focável da página, o botão de ação principal.",
      category: "tela-visualizacao",
      checked: false,
    },
    {
      id: 49,
      text: "Rodapé (Verde-musgo)",
      colorIndicator: "#6b7c59",
      description:
        "Nessa área, deve existir apenas um elemento interativo, correspondente ao link externo do IMA.",
      category: "tela-visualizacao",
      checked: false,
    },
  ];

  return [...itensComuns, ...itensVariacao, ...itensFinais];
};

export const getChecklistCamada03BaseItems = (): ChecklistItem[] => [
  {
    id: 1,
    text: "Todo elemento focável exibe indicador de foco visível ao receber foco por teclado.",
    category: "requisitos-tecnicos",
    checked: false,
  },
  {
    id: 2,
    text: "O indicador de foco possui espessura mínima de 2px CSS, conforme ABNT NBR 17225.",
    category: "requisitos-tecnicos",
    checked: false,
  },
  {
    id: 3,
    text: "O indicador de foco envolve ou delimita claramente o perímetro do elemento focável.",
    category: "requisitos-tecnicos",
    checked: false,
  },
  {
    id: 4,
    text: "O indicador de foco apresenta contraste mínimo de 3:1 em relação às cores adjacentes.",
    category: "requisitos-tecnicos",
    checked: false,
  },
  {
    id: 5,
    text: "O foco não depende exclusivamente de mudança sutil de cor, sombra leve ou animação imperceptível.",
    category: "requisitos-tecnicos",
    checked: false,
  },
  {
    id: 6,
    text: "O foco padrão do navegador não foi removido sem substituição equivalente ou superior.",
    category: "requisitos-tecnicos",
    checked: false,
  },
  {
    id: 7,
    text: "O foco permanece totalmente visível, não sendo cortado por overflow: hidden, encoberto por animações, ocultado por sombras internas ou limitado por bordas de contêineres.",
    category: "requisitos-tecnicos",
    checked: false,
  },
  {
    id: 8,
    text: "O indicador de foco é perceptível em áreas claras, áreas escuras, cabeçalhos, rodapés, menus e barras laterais.",
    category: "requisitos-tecnicos",
    checked: false,
  },
  {
    id: 9,
    text: "Todos os tipos de elementos interativos apresentam foco visível: links, botões, campos de formulário, controles customizados e componentes dinâmicos.",
    category: "requisitos-tecnicos",
    checked: false,
  },

  {
    id: 10,
    text: "Cabeçalho principal da página (Vermelho)",
    colorIndicator: "#dc3545",
    description:
      "A ordem interna do foco deve seguir rigorosamente a ordem de apresentação dos elementos interativos dentro do grupo.",
    category: "tela-principal",
    checked: false,
  },
  {
    id: 11,
    text: "Sub-menu Cadastros (quando acionado)",
    category: "tela-principal",
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
    category: "tela-principal",
    checked: false,
  },
  {
    id: 13,
    text: "Lista de páginas do sistema (menu principal) (Verde)",
    colorIndicator: "#4caf50",
    description:
      "A navegação deve ocorrer por seções, como no exemplo abaixo:\n 1 - Todas as opções da seção Geral;\n 2- Em seguida, todas as opções da seção Animal;\n 3- Por fim, todas as opções da seção Vegetal.",
    category: "tela-principal",
    checked: false,
  },
  {
    id: 14,
    text: "Sub-seção da página principal (Azul)",
    colorIndicator: "#2196f3",
    description:
      "A ordem de navegação deve seguir o mesmo princípio adotado para a seção anterior, respeitando a organização por seções e a ordem visual dos elementos interativos.",
    category: "tela-principal",
    checked: false,
  },
  {
    id: 15,
    text: "Rodapé (Verde-musgo)",
    colorIndicator: "#6b7c59",
    description:
      "Nessa área, deve existir apenas um elemento interativo, correspondente ao link externo do IMA.",
    category: "tela-principal",
    checked: false,
  },

  {
    id: 16,
    text: "Cabeçalho principal da página (Vermelho)",
    colorIndicator: "#dc3545",
    description:
      "A ordem interna do foco deve seguir rigorosamente a ordem de apresentação dos elementos interativos dentro do grupo.",
    category: "tela-notificacoes",
    checked: false,
  },
  {
    id: 17,
    text: "Navegação de retorno (breadcrumb / ação de voltar) (Laranja)",
    colorIndicator: "#ff9800",
    description:
      "O foco deve avançar para o elemento de navegação de retorno à página inicial (ex.: botão “Inicial”).",
    category: "tela-notificacoes",
    checked: false,
  },
  {
    id: 18,
    text: "Campo de busca de notificações (Verde)",
    colorIndicator: "#4caf50",
    description:
      "A ordem interna do foco deve contemplar:\n Campo de entrada de texto para pesquisa de notificações;\n Botão de ação associado à busca (ex.: ícone de lupa), quando aplicável.",
    category: "tela-notificacoes",
    checked: false,
  },
  {
    id: 19,
    text: "Ações globais sobre a lista de notificações (Cinza)",
    colorIndicator: "#6c757d",
    description:
      "O foco deve avançar para os controles de ação global da lista, incluindo:\n Caixa de seleção “Selecionar todas” as notificações.",
    category: "tela-notificacoes",
    checked: false,
  },
  {
    id: 20,
    text: "Lista de notificações (Roxo)",
    colorIndicator: "#9c27b0",
    description:
      "O foco deve percorrer a lista de notificações, respeitando a ordem visual de apresentação, item a item. Ex:\n Caixa de seleção da notificação;\n Link ou botão de ação “Visualizar”.",
    category: "tela-notificacoes",
    checked: false,
  },
  {
    id: 21,
    text: "Modal de Visualização de Notificação (quando acionado) (Amarelo)",
    colorIndicator: "#ffc107",
    description:
      "Quando acionado o botão de visualizar, o foco visível deve seguir as orientações abaixo:",
    category: "tela-notificacoes",
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
    category: "tela-notificacoes",
    checked: false,
  },
  {
    id: 23,
    text: "Rodapé (Verde-musgo)",
    colorIndicator: "#6b7c59",
    description:
      "Nessa área, deve existir apenas um elemento interativo, correspondente ao link externo do IMA.",
    category: "tela-notificacoes",
    checked: false,
  },

  {
    id: 34,
    text: "Cabeçalho principal da página (Vermelho)",
    colorIndicator: "#dc3545",
    description:
      "A ordem interna do foco deve seguir rigorosamente a ordem de apresentação dos elementos interativos dentro do grupo.",
    category: "tela-cadastro",
    checked: false,
  },
  {
    id: 35,
    text: "Interações de redirecionamento (Laranja)",
    colorIndicator: "#ff9800",
    description:
      "Após a conclusão da navegação pelo cabeçalho, o foco deve avançar para o elemento de navegação de retorno à página inicial (ex.: botão ou link “Inicial”).",
    category: "tela-cadastro",
    checked: false,
  },
  {
    id: 36,
    text: "Formulário de cadastro (Amarelo)",
    colorIndicator: "#ffc107",
    description:
      "O foco visível deve percorrer os elementos interativos da seção de formulário da página, respeitando a ordem lógica e visual de apresentação.",
    category: "tela-cadastro",
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
    category: "tela-cadastro",
    checked: false,
  },
  {
    id: 38,
    text: "Rodapé (Verde-musgo)",
    colorIndicator: "#6b7c59",
    description:
      "Nessa área, deve existir apenas um elemento interativo, correspondente ao link externo do IMA.",
    category: "tela-cadastro",
    checked: false,
  },

  {
    id: 39,
    text: "Cabeçalho principal da página (Vermelho)",
    colorIndicator: "#dc3545",
    description:
      "A ordem interna do foco deve seguir rigorosamente a ordem de apresentação dos elementos interativos dentro do grupo.",
    category: "tela-edicao",
    checked: false,
  },
  {
    id: 40,
    text: "Interações de redirecionamento (Laranja)",
    colorIndicator: "#ff9800",
    description:
      "Após a conclusão da navegação pelo cabeçalho, o foco deve avançar para o elemento de navegação de retorno à página inicial (ex.: botão ou link “Inicial”).",
    category: "tela-edicao",
    checked: false,
  },
  {
    id: 41,
    text: "Formulário de edição (Amarelo)",
    colorIndicator: "#ffc107",
    description:
      "O foco visível deve percorrer os elementos interativos da seção de formulário da página, respeitando a ordem lógica e visual de apresentação.",
    category: "tela-edicao",
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
    category: "tela-edicao",
    checked: false,
  },

  {
    id: 50,
    text: "Cabeçalho principal da página (Vermelho)",
    colorIndicator: "#dc3545",
    description:
      "A ordem interna do foco deve seguir rigorosamente a ordem de apresentação dos elementos interativos dentro do grupo.",
    category: "tela-perfil-usuario",
    checked: false,
  },
  {
    id: 51,
    text: "Interações de redirecionamento (Laranja)",
    colorIndicator: "#ff9800",
    description:
      "Após a conclusão da navegação pelo cabeçalho, o foco deve avançar para o elemento de navegação de retorno à página inicial (ex.: botão ou link “Inicial”).",
    category: "tela-perfil-usuario",
    checked: false,
  },
  {
    id: 52,
    text: "Abas de navegação (Lilás)",
    colorIndicator: "#9c27b0",
    description:
      "O foco deve percorrer todas as abas de navegação disponíveis, respeitando a ordem visual de apresentação.",
    category: "tela-perfil-usuario",
    checked: false,
  },
  {
    id: 53,
    text: "Formulário (Amarelo)",
    colorIndicator: "#ffc107",
    description:
      "O foco visível deve percorrer os elementos interativos da seção de formulário, respeitando a ordem lógica e visual de apresentação.",
    category: "tela-perfil-usuario",
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
    category: "tela-consulta-externa",
    checked: false,
  },
  {
    id: 55,
    text: "Interações de redirecionamento (Laranja)",
    colorIndicator: "#ff9800",
    description:
      "Após a conclusão da navegação pelo cabeçalho, o foco deve avançar para o elemento de navegação de retorno à página inicial (ex.: botão ou link “Inicial”).",
    category: "tela-consulta-externa",
    checked: false,
  },
  {
    id: 56,
    text: "Seção de busca (Lilás)",
    colorIndicator: "#9c27b0",
    description:
      "A ordem interna do foco deve contemplar:\n Campo de entrada de texto para pesquisa;\n Botão de ação associado à busca (ex.: ícone de lupa), quando aplicável.",
    category: "tela-consulta-externa",
    checked: false,
  },
  {
    id: 57,
    text: "Card de Informações (Azul)",
    colorIndicator: "#2196f3",
    description:
      "O foco visível deve percorrer o card de informações, caso haja elementos interativos, respeitando a ordem visual de apresentação.\n *Caso não haja elementos interativos, o foco deve seguir o fluxo natural, passando pelos elementos do navegador e depois manter o fluxo de navegação interna definido anteriormente.",
    category: "tela-consulta-externa",
    checked: false,
  },
];

export const getChecklistCamada03Items = (
  variacaoTelaBusca: VariacaoTelaBusca,
  variacaoTelaVisualizacao: VariacaoTelaVisualizacao,
): ChecklistItem[] => [
  ...getChecklistCamada03BaseItems(),
  ...getTelaBuscaItems(variacaoTelaBusca),
  ...getTelaVisualizacaoItems(variacaoTelaVisualizacao),
];

export const checklistsMock: Record<1 | 2 | 3, ChecklistCamada> = {
  // Camada 1 revisada com base na cartilha "Orientações para Desenvolvimento
  // Acessível", seções 1.1 a 1.23 (PDF fornecido, páginas 1 a 31).
  1: {
    categoryIcons: {
      "linguagem": "🧩",
      "qualidade-textual": "✍️",
      "tipografia": "🔤",
      "links": "🔗",
      "imagens": "🖼️",
      "tabelas-graficos": "📊",
      "arquivos": "📁",
      "elementos-interativos": "🎯",
      "navegacao-teclado": "⌨️",
      "modais": "🪟",
      "estrutura-documento": "📄",
      "formularios": "📋",
      "percepcao-visual": "👁️",
      "uso-mobile": "📱",
    },
    items: [
      {
        id: 1,
        text: "Utilizar linguagem clara, objetiva e sem ambiguidades nos textos",
        description:
          "Garanta que todo conteúdo seja compreensível para diversos públicos",
        category: "linguagem",
        checked: false,
      },
      {
        id: 2,
        text: "Evitar uso excessivo de jargões técnicos ou termos pouco conhecidos",
        description:
          "Evite também expressões regionais e termos excessivamente especializados. Prefira vocabulário comum, adequado ao público-alvo, ou ofereça explicações.",
        category: "linguagem",
        checked: false,
      },
      {
        id: 3,
        text: "Explicar siglas e abreviações na primeira ocorrência",
        description:
          "Exemplo: WCAG (Web Content Accessibility Guidelines)",
        category: "linguagem",
        checked: false,
      },
      {
        id: 4,
        text: "Evitar metáforas ou linguagem figurativa confusa",
        description:
          "Expressões idiomáticas podem não ser traduzidas corretamente ou compreendidas por todos",
        category: "linguagem",
        checked: false,
      },
      {
        id: 5,
        text: "Dividir textos longos em parágrafos curtos, listas e subtítulos",
        description:
          "Melhora a escaneabilidade e reduz a carga cognitiva da leitura",
        category: "linguagem",
        checked: false,
      },

      {
        id: 6,
        text: "Garantir que o conteúdo esteja livre de erros ortográficos e gramaticais",
        description:
          "Revise também digitação e pontuação: erros podem tornar o conteúdo incompreensível quando lido por tecnologias assistivas.",
        category: "qualidade-textual",
        checked: false,
      },
      {
        id: 7,
        text: "Garantir que cada parágrafo trate apenas de um tópico principal",
        description:
          "Facilita a compreensão e o foco do leitor no assunto abordado",
        category: "qualidade-textual",
        checked: false,
      },
      {
        id: 8,
        text: "Utilizar listas em vez de longos blocos de texto sempre que possível",
        description:
          "Listas são mais fáceis de escanear visualmente e navegar via tecnologia assistiva",
        category: "qualidade-textual",
        checked: false,
      },

      {
        id: 9,
        text: "Utilizar tamanho de texto adequado (≥ 16px)",
        description:
          "A cartilha recomenda preferencialmente fontes a partir de 16px para textos corridos, favorecendo pessoas com baixa visão.",
        category: "tipografia",
        checked: false,
      },
      {
        id: 10,
        text: "Garantir espaçamento adequado entre linhas e parágrafos",
        description:
          "Use entrelinhas de pelo menos 1,5 vez o tamanho da fonte e espaçamento entre parágrafos de pelo menos 2 vezes o tamanho da fonte.",
        category: "tipografia",
        checked: false,
      },
      {
        id: 11,
        text: "Evitar o uso de texto justificado",
        description:
          "Texto justificado cria 'rios de espaço' que dificultam a leitura para disléxicos",
        category: "tipografia",
        checked: false,
      },
      {
        id: 12,
        text: "Garantir legibilidade mesmo com fontes estilizadas",
        description:
          "Evite fontes cursivas ou muito ornamentadas em blocos de texto longos",
        category: "tipografia",
        checked: false,
      },
      {
        id: 13,
        text: "Permitir redimensionamento do texto em até 200%",
        description:
          "Teste manualmente o zoom em 200% e diferentes larguras: nenhum texto essencial deve desaparecer, ficar cortado ou se sobrepor. Preserve rótulos, campos, botões, mensagens, hierarquia e ordem de leitura, sem rolagem horizontal para textos corridos.",
        category: "tipografia",
        checked: false,
      },

      {
        id: 14,
        text: "Garantir que links possuam textos descritivos",
        description:
          "O texto do link deve indicar claramente seu destino ou função",
        category: "links",
        checked: false,
      },
      {
        id: 15,
        text: "Garantir que o texto do link faça sentido fora de contexto",
        description:
          "Usuários de leitores de tela podem navegar listando apenas os links da página",
        category: "links",
        checked: false,
      },
      {
        id: 16,
        text: 'Evitar textos genéricos como "Clique aqui"',
        description:
          "Use descrições específicas do conteúdo vinculado para melhor usabilidade",
        category: "links",
        checked: false,
      },
      {
        id: 17,
        text: "Manter descrições iguais para links com o mesmo destino",
        description:
          "Use a mesma descrição para o mesmo destino e descrições distintas para destinos diferentes, permitindo antecipar o resultado da navegação.",
        category: "links",
        checked: false,
      },
      {
        id: 18,
        text: "Informar formato e tamanho de arquivos nos links",
        description: 'Ex: "Baixar relatório (PDF, 2.5MB)"',
        category: "links",
        checked: false,
      },

      {
        id: 19,
        text: "Fornecer texto alternativo para imagens informativas",
        description:
          "Use o atributo alt para descrever imagens que transmitem informação",
        category: "imagens",
        checked: false,
      },
      {
        id: 20,
        text: "Utilizar alt vazio em imagens decorativas",
        description:
          'Imagens puramente decorativas devem ter alt="" para serem ignoradas por leitores',
        category: "imagens",
        checked: false,
      },
      {
        id: 21,
        text: "Garantir que o texto alternativo seja objetivo e contextual",
        description:
          "Descreva a informação transmitida conforme o contexto e o propósito. Evite juízos de valor, metáforas, interpretações subjetivas, redundâncias e descrições excessivamente longas.",
        category: "imagens",
        checked: false,
      },

      {
        id: 22,
        text: "Utilizar tabelas apenas para dados tabulares",
        description:
          "Não use tabelas para controlar o layout visual da página",
        category: "tabelas-graficos",
        checked: false,
      },
      {
        id: 23,
        text: "Associar corretamente cabeçalhos em tabelas",
        description:
          "Marque cabeçalhos com <th> e use scope='col' ou scope='row'. Prefira cabeçalhos visíveis; quando não forem visíveis, mantenha a associação disponível programaticamente.",
        category: "tabelas-graficos",
        checked: false,
      },
      {
        id: 24,
        text: "Garantir que gráficos não dependam apenas de cores",
        description:
          "Use padrões, texturas ou rótulos para diferenciar dados e verifique se o gráfico continua compreensível em escala de cinza.",
        category: "tabelas-graficos",
        checked: false,
      },
      {
        id: 25,
        text: "Fornecer descrição textual para gráficos",
        description:
          "Disponibilize um resumo dos dados ou uma tabela alternativa acessível",
        category: "tabelas-graficos",
        checked: false,
      },
      {
        id: 26,
        text: "Garantir que tabelas possuam cabeçalhos que expliquem os dados",
        description:
          "O título da tabela (caption) ou cabeçalhos claros devem contextualizar a informação",
        category: "tabelas-graficos",
        checked: false,
      },

      {
        id: 27,
        text: "Informar formato e tamanho de arquivos para download",
        description:
          "Permite ao usuário decidir se tem dados/banda suficientes para baixar",
        category: "arquivos",
        checked: false,
      },
      {
        id: 28,
        text: "Garantir que arquivos sejam acessíveis ou possuam alternativa",
        description:
          "Verifique a acessibilidade conforme as especificações de cada formato, incluindo a estrutura de PDFs. Quando possível, ofereça versões alternativas de visualização, como HTML.",
        category: "arquivos",
        checked: false,
      },

      {
        id: 29,
        text: "Garantir área mínima de acionamento de 24×24 px",
        description:
          "Verifique altura e largura mínimas de 24 pixels CSS em botões, ícones, links isolados e ações em listas, tabelas e cards.",
        category: "elementos-interativos",
        checked: false,
      },
      {
        id: 30,
        text: "Evitar elementos interativos muito próximos",
        description:
          "Confira tamanho e espaçamento para atingir pelo menos 24 pixels CSS em todas as direções em relação a alvos adjacentes. A cartilha recomenda espaçamento inicial de 8px.",
        category: "elementos-interativos",
        checked: false,
      },
      {
        id: 31,
        text: "Utilizar <button> para ações e <a> apenas para navegação",
        description:
          "Botões executam scripts/ações na página; Links mudam a URL",
        category: "elementos-interativos",
        checked: false,
      },
      {
        id: 32,
        text: "Garantir que links sejam visualmente reconhecíveis",
        description:
          "Links devem possuir diferenciação (ex: sublinhado) além da cor",
        category: "elementos-interativos",
        checked: false,
      },
      {
        id: 33,
        text: "Informar quando um link abre em nova aba ou janela",
        description:
          "Avise o usuário para evitar quebra inesperada no fluxo de navegação",
        category: "elementos-interativos",
        checked: false,
      },
      {
        id: 34,
        text: "Disponibilizar link 'Pular para o conteúdo principal'",
        description:
          "O link deve ficar visível ao receber foco e levar ao conteúdo principal, permitindo pular menus e blocos repetitivos.",
        category: "elementos-interativos",
        checked: false,
      },

      {
        id: 35,
        text: "Garantir navegação completa por teclado",
        description:
          "Teste sem mouse: Tab para avançar, Shift + Tab para voltar e Enter e/ou Espaço para acionar controles.",
        category: "navegacao-teclado",
        checked: false,
      },
      {
        id: 36,
        text: "Evitar funcionalidades dependentes apenas de mouseover",
        description:
          "Disponibilize alternativa equivalente por foco, clique ou tecla para todo conteúdo e ação apresentados por mouseover.",
        category: "navegacao-teclado",
        checked: false,
      },
      {
        id: 37,
        text: "Garantir foco visível e previsível",
        description:
          "O indicador deve permanecer visível, seguindo uma ordem lógica e consistente durante toda a navegação.",
        category: "navegacao-teclado",
        checked: false,
      },
      {
        id: 38,
        text: "Evitar armadilhas de teclado",
        description:
          "Usuário deve conseguir entrar e sair de qualquer elemento usando apenas o teclado",
        category: "navegacao-teclado",
        checked: false,
      },

      {
        id: 39,
        text: "Garantir um único h1 por página",
        description:
          "O <h1> deve descrever claramente o assunto principal da página",
        category: "estrutura-documento",
        checked: false,
      },
      {
        id: 40,
        text: "Utilizar corretamente a hierarquia de cabeçalhos",
        description:
          "Use h2 para seções principais e níveis subsequentes para subseções, sem saltos como h2 seguido de h4.",
        category: "estrutura-documento",
        checked: false,
      },
      {
        id: 41,
        text: "Garantir que a página possua um <title> único e descritivo",
        description:
          "O título da aba deve representar claramente o conteúdo ou funcionalidade",
        category: "estrutura-documento",
        checked: false,
      },
      {
        id: 42,
        text: "Definir corretamente o atributo lang no elemento <html>",
        description:
          "O idioma deve refletir a língua principal da página, ex.: lang='pt-BR'",
        category: "estrutura-documento",
        checked: false,
      },
      {
        id: 43,
        text: "Utilizar landmarks semânticos (header, nav, main, footer)",
        description:
          "Use regiões funcionais para facilitar a navegação por leitores de tela",
        category: "estrutura-documento",
        checked: false,
      },
      {
        id: 44,
        text: "Evitar o uso do atributo autofocus",
        description:
          "Autofocus pode causar desorientação e mudança brusca de contexto",
        category: "estrutura-documento",
        checked: false,
      },
      {
        id: 45,
        text: "Garantir a página siga uma estrutura semântica correta",
        description:
          "Utilizar corretamente tags HTML5 para dar significado ao conteúdo",
        category: "estrutura-documento",
        checked: false,
      },
      {
        id: 46,
        text: "Validar o HTML para evitar erros semânticos estruturais",
        description:
          "Erros de marcação podem comprometer a interpretação por leitores de tela",
        category: "estrutura-documento",
        checked: false,
      },
      {
        id: 47,
        text: "Garantir fluxo linear lógico do conteúdo",
        description:
          "O conteúdo deve manter sentido quando navegado por teclado ou sem CSS",
        category: "estrutura-documento",
        checked: false,
      },
      {
        id: 48,
        text: "Não utilizar o atributo title como único meio de informação",
        description:
          "Tooltips nativos não são acessíveis via teclado ou em dispositivos móveis",
        category: "estrutura-documento",
        checked: false,
      },
      {
        id: 49,
        text: "Permitir extensão de tempo quando houver limite de sessão",
        description:
          "Evita encerramento inesperado que prejudica usuários com deficiência",
        category: "estrutura-documento",
        checked: false,
      },
      {
        id: 50,
        text: "Garantir a existência de apenas um elemento <main> por página",
        description:
          "O elemento main deve conter exclusivamente o conteúdo principal",
        category: "estrutura-documento",
        checked: false,
      },
      {
        id: 51,
        text: "Não utilizar cabeçalhos apenas para fins visuais",
        description:
          "Cabeçalhos devem representar estrutura e não apenas estilo (use CSS para isso)",
        category: "estrutura-documento",
        checked: false,
      },

      {
        id: 52,
        text: "Mover foco para dentro do modal ao abrir",
        description:
          "O foco deve ir automaticamente para o modal quando ele é ativado",
        category: "modais",
        checked: false,
      },
      {
        id: 53,
        text: "Manter foco contido no modal enquanto ativo",
        description:
          "Implemente 'focus trap' para impedir navegação fora do modal aberto",
        category: "modais",
        checked: false,
      },
      {
        id: 54,
        text: "Retornar foco ao elemento acionador ao fechar",
        description:
          "Ao fechar o modal, retorne o foco ao botão que o abriu para manter o fluxo",
        category: "modais",
        checked: false,
      },

      {
        id: 55,
        text: "Garantir que todos os campos de formulário possuam label associado",
        description:
          "Todo input, select ou textarea deve ter um <label> explícito ou nome acessível (aria-label ou aria-labelledby)",
        category: "formularios",
        checked: false,
      },
      {
        id: 56,
        text: "Exibir mensagens de erro em lista no topo do formulário",
        description:
          "Facilita a localização e correção de problemas antes de reenvio",
        category: "formularios",
        checked: false,
      },
      {
        id: 57,
        text: "Associar semanticamente mensagens de erro aos campos",
        description:
          "Utilize aria-describedby para vincular o erro ao input correspondente",
        category: "formularios",
        checked: false,
      },
      {
        id: 58,
        text: "Não comunicar erros ou estados apenas por cor",
        description:
          "Comunique erros, sucesso e alertas com texto e informação programática, sem depender exclusivamente de cores, posição visual ou ícones sem alternativa textual.",
        category: "formularios",
        checked: false,
      },
      {
        id: 59,
        text: "Garantir feedback claro e acionável após submissão",
        description:
          "Informe textualmente e de forma programática o sucesso ou a falha no envio. Em caso de erro, explique como corrigir e prosseguir.",
        category: "formularios",
        checked: false,
      },

      {
        id: 60,
        text: "Garantir contraste adequado para textos e textos grandes",
        description:
          "Relação mínima de 4.5:1 para texto normal e 3:1 para texto grande",
        category: "percepcao-visual",
        checked: false,
      },
      {
        id: 61,
        text: "Garantir contraste suficiente para ícones e gráficos",
        description:
          "Componentes de interface devem ter contraste mínimo de 3:1",
        category: "percepcao-visual",
        checked: false,
      },
      {
        id: 62,
        text: "Garantir que bordas de campos de formulário sejam perceptíveis",
        description:
          "Os campos devem ser claramente delimitados contra o fundo da página",
        category: "percepcao-visual",
        checked: false,
      },
      {
        id: 63,
        text: "Manter legibilidade de texto sobre imagens ou vídeos",
        description:
          "Use overlays escuros ou sombras no texto para garantir contraste",
        category: "percepcao-visual",
        checked: false,
      },

      {
        id: 64,
        text: "Permitir rotação da tela sem perda de conteúdo",
        description:
          "O layout deve se adaptar fluidamente entre modo retrato e paisagem",
        category: "uso-mobile",
        checked: false,
      },
      {
        id: 65,
        text: "Evitar rolagem horizontal indevida em dispositivos móveis",
        description:
          "Conteúdo deve fluir verticalmente em larguras menores (Design Responsivo)",
        category: "uso-mobile",
        checked: false,
      },
      {
        id: 66,
        text: "Garantir espaçamento adequado entre elementos interativos",
        description:
          "Botões e ícones devem ser facilmente acionáveis, com espaço suficiente para rolar a página sem ativar controles por acidente.",
        category: "uso-mobile",
        checked: false,
      },

      {
        id: 67,
        text: 'Devem conter <input type="text"> ou <textarea>',
        category: "campos-texto",
        checked: false,
      },
      {
        id: 68,
        text: "Informar limites de caracteres no rótulo ou texto de ajuda",
        description: 'Ex.: "Máx. 255 caracteres". A instrução deve estar disponível antes do preenchimento.',
        category: "campos-texto",
        checked: false,
      },
      {
        id: 69,
        text: "Campos somente leitura usam readonly, não disabled",
        description: "Para manter leitura por tecnologias assistivas.",
        category: "campos-texto",
        checked: false,
      },
      {
        id: 70,
        text: "Identificar campos somente leitura como informativos no rótulo ou ajuda",
        category: "campos-texto",
        checked: false,
      },

      {
        id: 71,
        text: 'Implementados preferencialmente como <input type="text">',
        description: "Associe validação controlada ao campo de texto, conforme a orientação da cartilha, para evitar conflitos com leitores de tela.",
        category: "campos-numericos",
        checked: false,
      },
      {
        id: 72,
        text: "Formato esperado informado claramente",
        description:
          "Explique a formatação, por exemplo: 'Use vírgula para casas decimais'.",
        category: "campos-numericos",
        checked: false,
      },
      {
        id: 73,
        text: "Máscaras não bloqueiam navegação por teclado nem alteram valor sem aviso",
        category: "campos-numericos",
        checked: false,
      },
      {
        id: 74,
        text: "Identificar campos numéricos somente leitura como informativos no rótulo ou ajuda",
        category: "campos-numericos",
        checked: false,
      },

      {
        id: 75,
        text: "Utiliza <select> nativo sempre que possível",
        category: "campos-selecao",
        checked: false,
      },
      {
        id: 76,
        text: 'Opção padrão informativa ("Selecione uma opção")',
        category: "campos-selecao",
        checked: false,
      },
      {
        id: 77,
        text: "Campo expõe nome do campo, opção selecionada e quantidade de opções",
        description: "Ex.: Fazenda Rio Preto, opção 1 de 5",
        category: "campos-selecao",
        checked: false,
      },

      {
        id: 78,
        text: 'Utiliza o padrão WAI-ARIA (role="combobox")',
        category: "selecao-pesquisavel",
        checked: false,
      },
      {
        id: 79,
        text: "Usa corretamente aria-expanded, aria-controls e aria-activedescendant",
        description:
          "aria-expanded reflete a abertura da lista, aria-controls aponta para os resultados e aria-activedescendant referencia o ID da opção ativa enquanto o foco permanece no campo.",
        category: "selecao-pesquisavel",
        checked: false,
      },
      {
        id: 80,
        text: "Lista de opções é anunciada ao abrir",
        category: "selecao-pesquisavel",
        checked: false,
      },
      {
        id: 81,
        text: "Campo expõe nome do campo, opção selecionada e quantidade de opções",
        description: "Fazenda Rio Preto, opção 1 de 5",
        category: "selecao-pesquisavel",
        checked: false,
      },
      {
        id: 82,
        text: "Rótulo informa que o campo é pesquisável",
        category: "selecao-pesquisavel",
        checked: false,
      },

      {
        id: 83,
        text: "Permite digitação manual",
        category: "campos-data",
        checked: false,
      },

      {
        id: 84,
        text: 'Implementar upload com <input type="file"> e rótulo claro e descritivo',
        category: "upload-arquivos",
        checked: false,
      },
      {
        id: 85,
        text: "Informa previamente tipos aceitos, tamanho máximo e quantidade permitida",
        category: "upload-arquivos",
        checked: false,
      },
      {
        id: 86,
        text: "Mudanças de estado são anunciadas",
        description:
          "Ex.: upload concluído, erro no envio ou arquivo removido",
        category: "upload-arquivos",
        checked: false,
      },

      {
        id: 87,
        text: "Utiliza o elemento nativo <button> para ações",
        description: "Evite divs ou spans clicáveis",
        category: "botoes",
        checked: false,
      },
      {
        id: 88,
        text: "Estado desabilitado é implementado corretamente",
        description:
          "Apresente indicação visual clara e exponha o estado com disabled ou aria-disabled='true'. Ao usar aria-disabled, impeça também a execução da ação.",
        category: "botoes",
        checked: false,
      },
      {
        id: 89,
        text: "Botões são ativáveis por teclado",
        description:
          "O botão deve responder às teclas Enter e Espaço sem implementação manual extra",
        category: "botoes",
        checked: false,
      },

      {
        id: 90,
        text: "Utiliza componentes nativos adequados para seleção múltipla",
        description:
          'Prefira <input type="checkbox"> ou <select multiple> em vez de componentes customizados',
        category: "selecao-multipla",
        checked: false,
      },
      {
        id: 91,
        text: "Comunica obrigatoriedade e erros de validação",
        description:
          "Use required, aria-required e mensagens de erro associadas ao grupo quando aplicável",
        category: "selecao-multipla",
        checked: false,
      },

      {
        id: 92,
        text: "Utiliza componente apropriado para escolha binária",
        description:
          "Implemente escolhas booleanas usando radio buttons (Sim/Não) ou switch acessível",
        category: "booleano",
        checked: false,
      },
      {
        id: 93,
        text: "Estado selecionado é gerenciado corretamente",
        description:
          "Apenas uma opção pode estar selecionada por vez e o estado deve refletir o valor real",
        category: "booleano",
        checked: false,
      },
      {
        id: 94,
        text: "Preferir frases curtas, ordem direta e linguagem inclusiva",
        description: "Organize as frases em sujeito, verbo e complemento, com palavras comuns e adequadas ao público-alvo.",
        category: "linguagem",
        checked: false,
      },
      {
        id: 95,
        text: "Oferecer apoio para conteúdos que exigem conhecimento avançado",
        description: "Inclua informações complementares, exemplos explicativos ou uma versão simplificada quando a complexidade do assunto exigir.",
        category: "qualidade-textual",
        checked: false,
      },
      {
        id: 96,
        text: "Limitar a largura das linhas para favorecer a leitura",
        description: "A cartilha recomenda aproximadamente 60 caracteres ou 11 a 13 palavras por linha em textos corridos.",
        category: "tipografia",
        checked: false,
      },
      {
        id: 97,
        text: "Garantir espaçamento entre palavras de pelo menos 0,16 vez o tamanho da fonte",
        description: "Verifique a separação entre palavras para facilitar o acompanhamento do texto.",
        category: "tipografia",
        checked: false,
      },
      {
        id: 98,
        text: "Informar quando o link leva a um site externo",
        description: "Quando aplicável, indique o destino externo de forma compreensível e acessível antes do acionamento.",
        category: "links",
        checked: false,
      },
      {
        id: 99,
        text: "Considerar a estrutura FSPA na descrição de imagens",
        description: "Quando apropriado, descreva Formato, Sujeito, Contexto/Paisagem e Ação. Prefira verbos no presente e evite gerundismo, sem incluir detalhes irrelevantes ao propósito da imagem.",
        category: "imagens",
        checked: false,
      },
      {
        id: 100,
        text: "Simplificar tabelas complexas sempre que possível",
        description: "Considere dividir informações extensas em tabelas menores, preservando a relação e a compreensão dos dados.",
        category: "tabelas-graficos",
        checked: false,
      },
      {
        id: 101,
        text: "Associar explicitamente células e cabeçalhos em tabelas complexas",
        description: "Utilize headers referenciando os IDs dos cabeçalhos para que o leitor de tela identifique as relações entre linha, coluna e célula.",
        category: "tabelas-graficos",
        checked: false,
      },
      {
        id: 102,
        text: "Verificar a leitura do valor, da linha e da coluna em cada célula",
        description: "Teste com leitor de tela se o usuário compreende o dado e seus cabeçalhos correspondentes ao navegar pela tabela.",
        category: "tabelas-graficos",
        checked: false,
      },
      {
        id: 103,
        text: "Contextualizar o nome acessível das ações com o registro da linha",
        description: "Botões, links, checkboxes, seleções e menus de ações devem identificar sobre qual registro atuam. Ex.: 'Visualizar Ana Paula', em vez de apenas 'Visualizar'.",
        category: "tabelas-graficos",
        checked: false,
      },
      {
        id: 104,
        text: "Garantir foco visível em todos os controles interativos",
        description: "Verifique botões, links, ícones acionáveis e controles personalizados durante a navegação por teclado.",
        category: "elementos-interativos",
        checked: false,
      },
      {
        id: 105,
        text: "Permitir abrir, percorrer e fechar menus e componentes expansíveis por teclado",
        description: "Garanta navegação interna sem mouse e gestão de foco ao ativar componentes ou exibir elementos dinamicamente.",
        category: "navegacao-teclado",
        checked: false,
      },
      {
        id: 106,
        text: "Avaliar alternativas antes de utilizar um modal",
        description: "Prefira, quando possível, conteúdo na própria página, acordeons, seções expansíveis ou navegação para outra tela.",
        category: "modais",
        checked: false,
      },
      {
        id: 107,
        text: "Disponibilizar botão de fechamento visível e acessível no modal",
        description: "Use um controle fácil de localizar, com nome claro como 'Fechar' ou 'Cancelar', operável por teclado e reconhecido por leitores de tela.",
        category: "modais",
        checked: false,
      },
      {
        id: 108,
        text: "Permitir fechar o modal com a tecla Escape",
        description: "O usuário deve conseguir encerrar o diálogo sem depender do mouse.",
        category: "modais",
        checked: false,
      },
      {
        id: 109,
        text: "Impedir acesso ao conteúdo em segundo plano enquanto o modal estiver aberto",
        description: "O fundo deve ficar inacessível ao teclado e, quando aplicável, oculto programaticamente das tecnologias assistivas.",
        category: "modais",
        checked: false,
      },
      {
        id: 110,
        text: "Identificar semanticamente o modal e fornecer um rótulo acessível",
        description: "Use role='dialog' ou role='alertdialog', conforme o propósito, com um nome que identifique o conteúdo do diálogo.",
        category: "modais",
        checked: false,
      },
      {
        id: 111,
        text: "Informar a unidade de medida dos campos numéricos",
        description: "Apresente a unidade associada ao valor, como hectares, metros ou quilogramas, para evitar interpretações ambíguas.",
        category: "campos-numericos",
        checked: false,
      },
      {
        id: 112,
        text: "Usar readonly em campos numéricos somente leitura, em vez de disabled",
        description: "Preserve a leitura por tecnologias assistivas quando o valor for apenas informativo.",
        category: "campos-numericos",
        checked: false,
      },
      {
        id: 113,
        text: "Identificar seleções personalizadas com papel e nome acessível",
        description: "Quando houver um listbox personalizado, use role='listbox' e aria-label ou aria-labelledby. Prefira o select nativo sem substituir sua semântica por ARIA desnecessária.",
        category: "campos-selecao",
        checked: false,
      },
      {
        id: 114,
        text: "Atualizar a opção ativa ao navegar por um listbox personalizado",
        description: "Ao usar aria-activedescendant, mantenha o foco no listbox e atualize o ID da opção ativa durante a navegação por setas, permitindo seu anúncio pelo leitor de tela.",
        category: "campos-selecao",
        checked: false,
      },
      {
        id: 115,
        text: "Relacionar opções externas ao listbox quando necessário",
        description: "Use aria-owns quando as opções não forem filhas do listbox no DOM e a relação programática precisar ser estabelecida.",
        category: "campos-selecao",
        checked: false,
      },
      {
        id: 116,
        text: "Expor seleção múltipla e estado das opções no listbox personalizado",
        description: "Quando aplicável, defina aria-multiselectable='true' e informe aria-selected='true' ou 'false' em cada opção selecionável.",
        category: "campos-selecao",
        checked: false,
      },
      {
        id: 117,
        text: "Comunicar obrigatoriedade e somente leitura nas seleções",
        description: "Em listboxes personalizados, use aria-required e aria-readonly quando aplicáveis. No estado somente leitura, permita navegar sem alterar a seleção.",
        category: "campos-selecao",
        checked: false,
      },
      {
        id: 118,
        text: "Permitir acessar e percorrer todas as opções do combobox por teclado",
        description: "As opções devem ser alcançáveis sem mouse e a opção ativa deve ser anunciada durante a navegação por setas.",
        category: "selecao-pesquisavel",
        checked: false,
      },
      {
        id: 119,
        text: "Confirmar a opção do combobox com Enter sem perder o foco do campo",
        description: "Selecione o item ativo, feche a lista atualizando aria-expanded para false e anuncie o valor escolhido, mantendo o foco na entrada.",
        category: "selecao-pesquisavel",
        checked: false,
      },
      {
        id: 120,
        text: "Explicar o motivo quando a data for somente leitura",
        description: "Se uma regra de negócio impedir a edição, informe a razão no texto de ajuda do campo.",
        category: "campos-data",
        checked: false,
      },
      {
        id: 121,
        text: "Informar previamente se o envio de arquivos é obrigatório ou opcional",
        description: "Apresente essa condição junto às instruções antes de o usuário interagir com o upload.",
        category: "upload-arquivos",
        checked: false,
      },
      {
        id: 122,
        text: "Não depender apenas de ícones ou placeholders nas instruções de upload",
        description: "Use rótulos e textos de ajuda claros para comunicar as regras de envio.",
        category: "upload-arquivos",
        checked: false,
      },
      {
        id: 123,
        text: "Dar aos botões nomes que descrevam claramente a ação",
        description: "Use rótulos como 'Salvar', 'Cancelar' ou 'Adicionar', evitando nomes genéricos como 'botão'.",
        category: "botoes",
        checked: false,
      },
      {
        id: 124,
        text: "Usar type='submit' nos botões que enviam formulários",
        description: "Preserve o comportamento esperado de envio, inclusive ao pressionar Enter nos campos do formulário.",
        category: "botoes",
        checked: false,
      },
      {
        id: 125,
        text: "Usar type='button' nas ações que não devem enviar o formulário",
        description: "Abrir modais, adicionar itens ou limpar campos não deve provocar submissões acidentais.",
        category: "botoes",
        checked: false,
      },
      {
        id: 126,
        text: "Verificar seleção múltipla por teclado e leitor de tela",
        description: "Confirme que todas as opções de checkbox ou select multiple são operáveis por teclado e corretamente anunciadas.",
        category: "selecao-multipla",
        checked: false,
      },
      {
        id: 127,
        text: "Identificar semanticamente o conjunto da escolha booleana",
        description: "Agrupe radio buttons em fieldset e legend ou use um switch com semântica acessível equivalente. O leitor de tela deve compreender a decisão de sim/não ou verdadeiro/falso e o estado atual.",
        category: "booleano",
        checked: false,
      },
    ],
  },

    2: {
    categoryIcons: {},
    items: [
      {
        id: 1,
        text: "Rótulo do campo descreve claramente o conteúdo esperado",
        description:
          "Associar rótulo (ex: <label>) explícito via aria-labelledby descrevendo claramente o conteúdo esperado.",
        category: "campos-texto",
        checked: false,
      },
      {
        id: 2,
        text: "Campo, estado (obrigatório/somente leitura) e conteúdo preenchido",
        description:
          "O input deve ter label associado e expor corretamente estados como required e readonly",
        category: "campos-texto",
        checked: false,
      },

      {
        id: 3,
        text: "Unidade de medida associada semanticamente ao campo",
        description:
          "A unidade deve estar vinculada ao campo por texto visível ou aria-describedby",
        category: "campos-numericos",
        checked: false,
      },
      {
        id: 4,
        text: "Erros de validação explicam claramente o problema",
        description:
          "Ex.: valor fora do intervalo, formato inválido ou campo obrigatório",
        category: "campos-numericos",
        checked: false,
      },
      {
        id: 5,
        text: "Rótulo do campo descreve claramente o conteúdo esperado",
        description:
          "Associar rótulo (ex: <label>) explícito via aria-labelledby descrevendo claramente o conteúdo esperado.",
        category: "campos-numericos",
        checked: false,
      },

      {
        id: 6,
        text: "Navegação completa por teclado",
        description: "Utilizando as teclas Tab, Setas, Enter e Esc",
        category: "campos-selecao",
        checked: false,
      },
      {
        id: 7,
        text: "Rótulo do campo descreve claramente o conteúdo esperado",
        description:
          "Associar rótulo (ex: <label>) explícito via aria-labelledby descrevendo claramente o conteúdo esperado.",
        category: "campos-numericos",
        checked: false,
      },

      {
        id: 8,
        text: "Navegação por setas anuncia item em foco",
        category: "selecao-pesquisavel",
        checked: false,
      },
      {
        id: 9,
        text: "Rótulo do campo descreve claramente o conteúdo esperado",
        description:
          "Associar rótulo (ex: <label>) explícito via aria-labelledby descrevendo claramente o conteúdo esperado.",
        category: "campos-numericos",
        checked: false,
      },
      {
        id: 10,
        text: "Navegação completa por teclado",
        description: "Utilizando as teclas Tab, Setas, Enter e Esc",
        category: "selecao-pesquisavel",
        checked: false,
      },

      {
        id: 11,
        text: "Informa qual o formato de data esperado",
        description:
          "No texto de ajuda visível ou Programaticamente associado ao campo (ex: aria-describedby).",
        category: "campos-data",
        checked: false,
      },
      {
        id: 12,
        text: "Regras adicionais informadas previamente",
        description:
          "Ex.: datas mínimas/máximas, datas indisponíveis ou restrições de período",
        category: "campos-data",
        checked: false,
      },
      {
        id: 13,
        text: "Placeholder não é a única instrução",
        category: "campos-data",
        checked: false,
      },
      {
        id: 14,
        text: "Calendário visual implementado como diálogo acessível",
        description:
          "Deve utilizar papel semântico adequado (ex.: role='dialog')",
        category: "campos-data",
        checked: false,
      },
      {
        id: 15,
        text: "Foco vai para o calendário ao abrir e retorna ao campo ao fechar",
        category: "campos-data",
        checked: false,
      },
      {
        id: 16,
        text: "Totalmente navegável por teclado",
        category: "campos-data",
        checked: false,
      },
      {
        id: 17,
        text: "Campo anuncia rótulos, datas e estados",
        description:
          "Datas selecionadas, foco atual e estados devem estar disponíveis programaticamente",
        category: "campos-data",
        checked: false,
      },

      {
        id: 18,
        text: "Navegação completa por teclado",
        description: "Utilizando as teclas Tab, Setas, Enter e Esc",
        category: "selecao-pesquisavel",
        checked: false,
      },
      {
        id: 19,
        text: "Exibe nome do arquivo após upload",
        category: "upload-arquivos",
        checked: false,
      },
      {
        id: 20,
        text: "Possui botões de baixar e remover",
        category: "upload-arquivos",
        checked: false,
      },
      {
        id: 21,
        text: "Foco se mantêm após upload ou remoção",
        description:
          "Evita perda de contexto ou retorno inesperado ao topo da página",
        category: "upload-arquivos",
        checked: false,
      },

      {
        id: 22,
        text: "Utilizar <fieldset> e <legend> para agrupar elementos",
        category: "campos-dinamicos",
        checked: false,
      },
      {
        id: 23,
        text: "Cada instância adicionada possui seu próprio grupo/faz parte de um grupo",
        category: "campos-dinamicos",
        checked: false,
      },
      {
        id: 24,
        text: "Botões de adicionar/remover usam <button>",
        category: "campos-dinamicos",
        checked: false,
      },
      {
        id: 25,
        text: "Rótulos dos botões são claros",
        category: "campos-dinamicos",
        checked: false,
      },
      {
        id: 26,
        text: "Alterações dinâmicas anunciadas (aria-live)",
        category: "campos-dinamicos",
        checked: false,
      },
      {
        id: 27,
        text: "Foco é movido de forma previsível",
        category: "campos-dinamicos",
        checked: false,
      },

      {
        id: 28,
        text: "Possui nome acessível por texto visível ou ARIA",
        description:
          "O botão deve ter texto visível ou, quando usar apenas ícone, aria-label ou aria-labelledby",
        category: "botoes",
        checked: false,
      },
      {
        id: 29,
        text: "Rótulo descreve claramente a ação executada",
        description:
          'Evite rótulos genéricos como "OK" ou "Clique aqui"; descreva o resultado da ação',
        category: "botoes",
        checked: false,
      },
      {
        id: 30,
        text: "Ações destrutivas solicitam confirmação explícita",
        description:
          "Exclusões ou ações irreversíveis devem exigir confirmação antes da execução",
        category: "botoes",
        checked: false,
      },
      {
        id: 31,
        text: "Resultado da ação é comunicado ao usuário",
        description:
          "Feedback de sucesso ou erro deve ser exibido visualmente e anunciado ao leitor de tela",
        category: "botoes",
        checked: false,
      },

      {
        id: 32,
        text: "Agrupa opções relacionadas com <fieldset> e <legend>",
        description:
          "Use <fieldset> para agrupar opções e <legend> para fornecer um rótulo comum ao grupo",
        category: "selecao-multipla",
        checked: false,
      },
      {
        id: 33,
        text: "Legend descreve claramente o propósito e o tipo de seleção",
        description:
          'Indique explicitamente quando a seleção permitir múltiplas opções (ex: "Classificação – seleção múltipla")',
        category: "selecao-multipla",
        checked: false,
      },
      {
        id: 34,
        text: "Permite operação completa apenas com teclado",
        description:
          "Todas as opções devem ser selecionáveis e desmarcáveis via teclado, sem dependência do mouse",
        category: "selecao-multipla",
        checked: false,
      },
      {
        id: 35,
        text: "Mantém associação correta entre rótulos e controles",
        description:
          "Cada opção deve possuir <label> associado corretamente ao respectivo controle",
        category: "selecao-multipla",
        checked: false,
      },
      {
        id: 36,
        text: "Atualizações dinâmicas são tratadas corretamente",
        description:
          "Alterações que afetam outros campos devem atualizar estados e mensagens de forma consistente",
        category: "selecao-multipla",
        checked: false,
      },

      {
        id: 37,
        text: "Grupo é identificado semanticamente",
        description:
          "Use <fieldset> e <legend> ou aria-labelledby para identificar o grupo de opções",
        category: "booleano",
        checked: false,
      },
      {
        id: 38,
        text: "Rótulos descrevem claramente cada opção",
        description:
          'Use pares claros como "Sim / Não" ou "Ativar / Desativar"',
        category: "booleano",
        checked: false,
      },
      {
        id: 39,
        text: "Navegação por teclado segue o padrão esperado",
        description:
          "Quando usar radio buttons, a navegação entre opções deve ocorrer pelas setas",
        category: "booleano",
        checked: false,
      },
      {
        id: 40,
        text: "Mudanças que impactam outros campos são tratadas corretamente",
        description:
          "Alterações de valor devem atualizar campos dependentes sem perda de foco ou contexto",
        category: "booleano",
        checked: false,
      },

      {
        id: 41,
        text: "Utiliza elemento semântico apropriado para o card",
        description:
          "Implemente o card como <article> para conteúdo independente ou <section> quando fizer parte de um agrupamento maior",
        category: "card-informacoes",
        checked: false,
      },
      {
        id: 42,
        text: "Mantém ordem de leitura lógica no DOM",
        description:
          "A estrutura do HTML deve refletir a ordem visual e semântica do conteúdo do card",
        category: "card-informacoes",
        checked: false,
      },
      {
        id: 43,
        text: "Estado do card não depende apenas de cor",
        description:
          "Estados como ativo, inativo ou selecionado devem ter indicação visual adicional",
        category: "card-informacoes",
        checked: false,
      },
      {
        id: 44,
        text: "Estado do card é representado de forma semântica",
        description:
          "Use texto, ícones com rótulo ou atributos ARIA para indicar estados do card",
        category: "card-informacoes",
        checked: false,
      },
      {
        id: 45,
        text: "Ícones decorativos são corretamente ocultados",
        description:
          'Use aria-hidden="true" ou CSS para ocultar ícones que não transmitem informação',
        category: "card-informacoes",
        checked: false,
      },
      {
        id: 46,
        text: "Ações do card utilizam controles acessíveis",
        description:
          'Botões como "Ver mais" ou "Visualizar" devem ser elementos <button> ou links com nome acessível',
        category: "card-informacoes",
        checked: false,
      },
      {
        id: 47,
        text: "Possui título semântico para identificação do card",
        description:
          "O card deve ter um título usando heading apropriado (ex: <h3>) para identificar seu conteúdo",
        category: "card-informacoes",
        checked: false,
      },
      {
        id: 48,
        text: "Todo conteúdo interativo do card é acessível por teclado",
        description:
          "Links, botões e controles internos devem ser navegáveis via TAB",
        category: "card-informacoes",
        checked: false,
      },

      {
        id: 49,
        text: 'Define corretamente role="tree" e role="treeitem"',
        description:
          'O contêiner da árvore deve usar role="tree" e cada nó interativo role="treeitem"',
        category: "estrutura-arvore",
        checked: false,
      },
      {
        id: 50,
        text: "Utiliza atributos ARIA para hierarquia e estado",
        description:
          "Use aria-expanded, aria-level, aria-selected e aria-setsize/aria-posinset quando aplicável",
        category: "estrutura-arvore",
        checked: false,
      },
      {
        id: 51,
        text: "Mantém apenas um ponto de entrada no foco por TAB",
        description:
          "A navegação interna deve ocorrer por setas, mantendo um único item acessível via TAB",
        category: "estrutura-arvore",
        checked: false,
      },
      {
        id: 52,
        text: "Implementa navegação por teclado",
        description:
          "Setas para navegação, Enter/Espaço para seleção e expansão/retração dos nós",
        category: "estrutura-arvore",
        checked: false,
      },
      {
        id: 53,
        text: "Mantém a relação correta entre nós pais e filhos",
        description:
          "Itens filhos devem estar corretamente aninhados no DOM",
        category: "estrutura-arvore",
        checked: false,
      },
      {
        id: 54,
        text: "Mudanças de estado são anunciadas corretamente",
        description:
          "Expansão, colapso e seleção devem ser comunicados ao leitor de tela em tempo real",
        category: "estrutura-arvore",
        checked: false,
      },

      {
        id: 55,
        text: 'Usa role="dialog" (não alertdialog)',
        description:
          'Utilize role="dialog" para modais de conteúdo, formulários ou informações não críticas',
        category: "caixas-dialogo-conteudo",
        checked: false,
      },
      {
        id: 56,
        text: 'Usa aria-modal="true" para bloquear o fundo',
        description:
          "Use aria-modal apenas quando o foco e a interação com o fundo forem bloqueados",
        category: "caixas-dialogo-conteudo",
        checked: false,
      },
      {
        id: 57,
        text: "Possui título e descrição claros",
        description:
          "Título via aria-labelledby e descrição via aria-describedby",
        category: "caixas-dialogo-conteudo",
        checked: false,
      },
      {
        id: 58,
        text: "Foco move para o diálogo ao abrir",
        description:
          "O foco inicial deve ir para o título ou primeiro elemento interativo",
        category: "caixas-dialogo-conteudo",
        checked: false,
      },
      {
        id: 59,
        text: "Focus trap ativo",
        description:
          "O foco deve permanecer dentro do diálogo enquanto estiver aberto",
        category: "caixas-dialogo-conteudo",
        checked: false,
      },
      {
        id: 60,
        text: "Pode ser fechado por ação explícita do usuário",
        description: "Fechar via botão, Esc ou ação clara",
        category: "caixas-dialogo-conteudo",
        checked: false,
      },
      {
        id: 61,
        text: "Foco retorna ao elemento acionador",
        description:
          "Ao fechar, o foco deve retornar ao botão ou link que abriu o diálogo",
        category: "caixas-dialogo-conteudo",
        checked: false,
      },
      {
        id: 62,
        text: "Conteúdo e ações são anunciados corretamente",
        description:
          "Leitor de tela deve anunciar título, texto e botões disponíveis",
        category: "caixas-dialogo-conteudo",
        checked: false,
      },

      {
        id: 63,
        text: 'Usa role="alertdialog" apenas quando necessário',
        description:
          "Utilize alertdialog somente para mensagens críticas que exigem atenção imediata",
        category: "caixas-dialogo-alerta",
        checked: false,
      },
      {
        id: 64,
        text: "Mensagem principal anunciada imediatamente",
        description:
          "O leitor de tela deve anunciar o alerta assim que o diálogo for aberto",
        category: "caixas-dialogo-alerta",
        checked: false,
      },
      {
        id: 65,
        text: "Foco inicial no texto do alerta ou ação principal",
        description:
          "O foco deve ir diretamente para a mensagem ou botão primário",
        category: "caixas-dialogo-alerta",
        checked: false,
      },
      {
        id: 66,
        text: "Ações claramente rotuladas",
        description:
          'Botões como "Confirmar", "Cancelar" ou "Excluir" devem ser explícitos',
        category: "caixas-dialogo-alerta",
        checked: false,
      },
      {
        id: 67,
        text: "Não depende apenas de cor ou ícone para indicar erro",
        description:
          "Mensagens de erro devem ser textuais e compreensíveis",
        category: "caixas-dialogo-alerta",
        checked: false,
      },
      {
        id: 68,
        text: "Fechamento não ocorre automaticamente",
        description:
          "Alertas não devem desaparecer sem ação do usuário",
        category: "caixas-dialogo-alerta",
        checked: false,
      },
      {
        id: 69,
        text: "Retorno de foco após resolução do alerta",
        description:
          "Após fechar o alerta, o foco deve retornar ao contexto anterior",
        category: "caixas-dialogo-alerta",
        checked: false,
      },
    ],
  },

    3: {
    categoryIcons: {
      "requisitos-tecnicos": "🎯",
      "tela-principal": "🏠",
      "tela-notificacoes": "🔔",
      "tela-busca": "🔍",
      "tela-cadastro": "📝",
    },
    imageUrls: checklistCamada03ImageUrls,
    items: getChecklistCamada03Items(
      "Com Tabela de Dados",
      "Com Abas, Formulário e Cards",
    ),
  },
};
