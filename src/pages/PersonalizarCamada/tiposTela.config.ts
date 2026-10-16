import { categoriasCAMADA01 } from "../../mocks/itensCamadaMock";

export type CategoriaId = (typeof categoriasCAMADA01)[number]["id"];

export interface TipoTela {
  id: string;
  nome: string;
  cenario: string;
  descricao: string;
  obrigatorios: CategoriaId[];
  comuns: CategoriaId[];
}

const obrigatoriosFormulario: CategoriaId[] = [
  "linguagem", "qualidade-textual", "tipografia", "links",
  "estrutura-documento", "formularios", "campos-texto", "campos-data",
  "campos-numericos", "campos-selecao", "selecao-pesquisavel",
  "upload-arquivos", "modais", "elementos-interativos", "botoes",
];

const comunsFormulario: CategoriaId[] = [
  "uso-mobile", "percepcao-visual", "booleano", "arquivos",
];

// Os IDs correspondem às categorias de src/mocks/itensCamadaMock.ts.
// Categorias não listadas entram em "Demais Itens".
// Apenas os obrigatórios são pré-selecionados; resetar restaura essa seleção.
export const tiposTela: TipoTela[] = [
  {
    id: "busca", nome: "Tela de Busca", cenario: "Busca",
    descricao: "Filtros, resultados e navegação de dados.",
    obrigatorios: [
      "linguagem", "qualidade-textual", "tipografia", "links",
      "tabelas-graficos", "estrutura-documento", "formularios", "elementos-interativos",
      "campos-texto",
    ],
    comuns: ["selecao-pesquisavel", "campos-data", "campos-numericos", "botoes", "modais"],
  },
  {
    id: "cadastro", nome: "Tela de Cadastro", cenario: "Cadastro",
    descricao: "Formulários de criação, validações e inputs diversos.",
    obrigatorios: [...obrigatoriosFormulario], comuns: [...comunsFormulario],
  },
  {
    id: "edicao", nome: "Tela de Edição", cenario: "Edição",
    descricao: "Alteração de dados existentes e feedback de salvamento.",
    obrigatorios: [...obrigatoriosFormulario], comuns: [...comunsFormulario],
  },
  {
    id: "visualizacao", nome: "Tela de Visualização", cenario: "Visualização",
    descricao: "Exibição de informações, detalhes e leitura de dados.",
    obrigatorios: [...obrigatoriosFormulario], comuns: [...comunsFormulario],
  },
  {
    id: "outras", nome: "Outras Telas", cenario: "Outras Telas",
    descricao: "Componentes genéricos e fluxos personalizados.",
    obrigatorios: [
      "linguagem", "qualidade-textual", "tipografia", "links",
      "estrutura-documento", "elementos-interativos", "uso-mobile", "percepcao-visual",
    ],
    comuns: [],
  },
];
