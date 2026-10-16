// Os IDs permanecem estáveis quando os nomes ou as descrições mudam.
export type LayerId = 1 | 2 | 3;

interface CategoryDefinition {
  readonly id: string;
  readonly nome: string;
  readonly descricao: string;
  readonly camadas: readonly LayerId[];
  readonly nomesAnteriores?: readonly string[];
}

export const categories = [
  {
    "id": "linguagem",
    "nome": "Linguagem",
    "descricao": "Clareza e objetividade",
    "camadas": [
      1
    ]
  },
  {
    "id": "qualidade-textual",
    "nome": "Qualidade Textual",
    "descricao": "Estrutura e formatação",
    "camadas": [
      1
    ]
  },
  {
    "id": "tipografia",
    "nome": "Tipografia",
    "descricao": "Fontes e legibilidade",
    "camadas": [
      1
    ]
  },
  {
    "id": "links",
    "nome": "Links",
    "descricao": "Hiperlinks acessíveis",
    "camadas": [
      1
    ]
  },
  {
    "id": "imagens",
    "nome": "Imagens",
    "descricao": "Alternativas textuais",
    "camadas": [
      1
    ]
  },
  {
    "id": "tabelas-graficos",
    "nome": "Tabelas e Gráficos",
    "descricao": "Dados estruturados",
    "camadas": [
      1
    ]
  },
  {
    "id": "arquivos",
    "nome": "Arquivos",
    "descricao": "Downloads e documentos",
    "camadas": [
      1
    ]
  },
  {
    "id": "elementos-interativos",
    "nome": "Elementos Interativos",
    "descricao": "Controles e interações",
    "camadas": [
      1
    ]
  },
  {
    "id": "navegacao-teclado",
    "nome": "Navegação por Teclado",
    "descricao": "Acessibilidade via teclado",
    "camadas": [
      1
    ]
  },
  {
    "id": "modais",
    "nome": "Modais",
    "descricao": "Janelas e diálogos",
    "camadas": [
      1
    ]
  },
  {
    "id": "estrutura-documento",
    "nome": "Estrutura do Documento",
    "descricao": "HTML, metadados e landmarks",
    "camadas": [
      1
    ]
  },
  {
    "id": "formularios",
    "nome": "Formulários",
    "descricao": "Erros, feedback e validações",
    "camadas": [
      1
    ]
  },
  {
    "id": "percepcao-visual",
    "nome": "Percepção Visual",
    "descricao": "Contraste e visibilidade",
    "camadas": [
      1
    ]
  },
  {
    "id": "uso-mobile",
    "nome": "Uso em Dispositivos Móveis",
    "descricao": "Toque e responsividade",
    "camadas": [
      1
    ]
  },
  {
    "id": "campos-texto",
    "nome": "Campos de Texto",
    "descricao": "Inputs simples e multilinha",
    "camadas": [
      1,
      2
    ]
  },
  {
    "id": "campos-numericos",
    "nome": "Campos Numéricos",
    "descricao": "Validação e formatação",
    "camadas": [
      1,
      2
    ]
  },
  {
    "id": "campos-selecao",
    "nome": "Campos de Seleção",
    "descricao": "Selects nativos",
    "camadas": [
      1,
      2
    ]
  },
  {
    "id": "selecao-pesquisavel",
    "nome": "Seleção Pesquisável",
    "descricao": "Autocomplete e combobox",
    "camadas": [
      1,
      2
    ]
  },
  {
    "id": "campos-data",
    "nome": "Campos de Data",
    "descricao": "Datepickers acessíveis",
    "camadas": [
      1,
      2
    ]
  },
  {
    "id": "upload-arquivos",
    "nome": "Upload de Arquivos",
    "descricao": "Input file e gestão",
    "camadas": [
      1,
      2
    ]
  },
  {
    "id": "botoes",
    "nome": "Botões",
    "descricao": "Ações e confirmações",
    "camadas": [
      1,
      2
    ]
  },
  {
    "id": "selecao-multipla",
    "nome": "Seleção Múltipla",
    "descricao": "Checkboxes e multiselect",
    "camadas": [
      1,
      2
    ]
  },
  {
    "id": "booleano",
    "nome": "Booleano",
    "descricao": "Radio buttons e switches",
    "camadas": [
      1,
      2
    ]
  },
  {
    "id": "campos-dinamicos",
    "nome": "Grupos de Campos Dinâmicos",
    "descricao": "Adicionar/remover campos",
    "camadas": [
      2
    ],
    "nomesAnteriores": [
      "Grupos Dinâmicos"
    ]
  },
  {
    "id": "card-informacoes",
    "nome": "Card de Informações",
    "descricao": "Estrutura e estados",
    "camadas": [
      2
    ]
  },
  {
    "id": "estrutura-arvore",
    "nome": "Estrutura em Árvore",
    "descricao": "Tree views e navegação",
    "camadas": [
      2
    ]
  },
  {
    "id": "caixas-dialogo-conteudo",
    "nome": "Caixas de Diálogo — Conteúdo",
    "descricao": "Dialogs informativos",
    "camadas": [
      2
    ]
  },
  {
    "id": "caixas-dialogo-alerta",
    "nome": "Caixas de Diálogo — Alerta/Erro",
    "descricao": "Alertdialogs críticos",
    "camadas": [
      2
    ]
  },
  {
    "id": "requisitos-tecnicos",
    "nome": "Requisitos Técnicos",
    "descricao": "Indicador de foco visível",
    "camadas": [
      3
    ],
    "nomesAnteriores": [
      "Requisitos Técnicos (Checklist Geral)"
    ]
  },
  {
    "id": "tela-principal",
    "nome": "Tela Principal",
    "descricao": "Ordem de foco na página inicial",
    "camadas": [
      3
    ]
  },
  {
    "id": "tela-notificacoes",
    "nome": "Tela de Notificações",
    "descricao": "Navegação por notificações",
    "camadas": [
      3
    ]
  },
  {
    "id": "tela-busca",
    "nome": "Tela de Busca/Listagem",
    "descricao": "Navegação em resultados",
    "camadas": [
      3
    ]
  },
  {
    "id": "tela-cadastro",
    "nome": "Tela de Cadastro Interno",
    "descricao": "Formulários e acordeões",
    "camadas": [
      3
    ]
  },
  {
    "id": "tela-edicao",
    "nome": "Tela de Edição",
    "descricao": "Campos editáveis e botões",
    "camadas": [
      3
    ]
  },
  {
    "id": "tela-visualizacao",
    "nome": "Tela de Visualização",
    "descricao": "Visualização de dados e informações",
    "camadas": [
      3
    ]
  },
  {
    "id": "tela-perfil-usuario",
    "nome": "Tela de Perfil de Usuário",
    "descricao": "Ajustes e preferências do usuário",
    "camadas": [
      3
    ]
  },
  {
    "id": "tela-consulta-externa",
    "nome": "Tela de Consulta Externa",
    "descricao": "Consulta e visualização externa",
    "camadas": [
      3
    ]
  }
] as const satisfies readonly CategoryDefinition[];

export type CategoryId = (typeof categories)[number]["id"];
export type Category = (typeof categories)[number];

const categoryById = Object.fromEntries(categories.map((category) => [category.id, category])) as Record<CategoryId, Category>;

const categoryIdsByLayer = {
  "1": [
    "linguagem",
    "qualidade-textual",
    "tipografia",
    "links",
    "imagens",
    "tabelas-graficos",
    "arquivos",
    "elementos-interativos",
    "navegacao-teclado",
    "modais",
    "estrutura-documento",
    "formularios",
    "percepcao-visual",
    "uso-mobile",
    "campos-texto",
    "campos-numericos",
    "campos-selecao",
    "selecao-pesquisavel",
    "campos-data",
    "upload-arquivos",
    "botoes",
    "selecao-multipla",
    "booleano"
  ],
  "2": [
    "campos-texto",
    "campos-numericos",
    "campos-selecao",
    "selecao-pesquisavel",
    "campos-data",
    "upload-arquivos",
    "campos-dinamicos",
    "botoes",
    "selecao-multipla",
    "booleano",
    "card-informacoes",
    "estrutura-arvore",
    "caixas-dialogo-conteudo",
    "caixas-dialogo-alerta"
  ],
  "3": [
    "requisitos-tecnicos",
    "tela-principal",
    "tela-notificacoes",
    "tela-busca",
    "tela-cadastro",
    "tela-edicao",
    "tela-visualizacao",
    "tela-perfil-usuario",
    "tela-consulta-externa"
  ]
} as const satisfies Record<LayerId, readonly CategoryId[]>;

export function isCategoryId(value: unknown): value is CategoryId {
  return typeof value === "string" && Object.prototype.hasOwnProperty.call(categoryById, value);
}

export function getCategory(id: CategoryId): Category {
  return categoryById[id];
}

export function getCategoriesForLayer(layer: LayerId) {
  return categoryIdsByLayer[layer].map((id) => ({ ...getCategory(id), camada: layer }));
}

// Compatibilidade apenas na entrada de seleções antigas, antes de usar os IDs.
const legacyCategoryIds = new Map<string, CategoryId>();
for (const category of categories) {
  legacyCategoryIds.set(category.nome, category.id);
  if ("nomesAnteriores" in category) {
    for (const name of category.nomesAnteriores) legacyCategoryIds.set(name, category.id);
  }
}

export function categoryIdFromName(value: unknown): CategoryId | undefined {
  if (isCategoryId(value)) return value;
  return typeof value === "string" ? legacyCategoryIds.get(value.trim()) : undefined;
}
