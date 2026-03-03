import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { ChevronDown, BookOpen, ArrowLeft } from "lucide-react";
import Header from "./Header";
import Footer from "./Footer";

/* =======================
   Tipagens
======================= */

type ChecklistCategory =
  | "Linguagem"
  | "Qualidade Textual"
  | "Tipografia"
  | "Links"
  | "Imagens"
  | "Tabelas e Gráficos"
  | "Arquivos"
  | "Elementos Interativos"
  | "Navegação por Teclado"
  | "Modais"
  | "Estrutura do Documento"
  | "Formulários"
  | "Percepção Visual"
  | "Uso em Dispositivos Móveis"
  | "Campos de Texto"
  | "Campos Numéricos"
  | "Campos de Seleção"
  | "Seleção Pesquisável"
  | "Campos de Data"
  | "Upload de Arquivos"
  | "Botões"
  | "Seleção Múltipla"
  | "Booleano";

interface ChecklistItem {
  id: number;
  text: string;
  description?: string;
  category: ChecklistCategory;
  checked: boolean;
}

export default function ChecklistCamada01() {
  const navigate = useNavigate();
  const location = useLocation();

  // Estado para preservar as categorias selecionadas
  const [categoriasPreservadas, setCategoriasPreservadas] =
    useState<ChecklistCategory[] | undefined>(undefined);

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

  /* =======================
     Estado
  ======================= */

  const [items, setItems] = useState<ChecklistItem[]>([
    // Linguagem
    {
      id: 1,
      text: "Utilizar linguagem clara, objetiva e sem ambiguidades nos textos",
      description:
        "Garanta que todo conteúdo seja compreensível para diversos públicos",
      category: "Linguagem",
      checked: false,
    },
    {
      id: 2,
      text: "Evitar uso excessivo de jargões técnicos ou termos pouco conhecidos",
      description:
        "Use linguagem acessível sempre que possível ou ofereça explicações",
      category: "Linguagem",
      checked: false,
    },
    {
      id: 3,
      text: "Explicar siglas e abreviações na primeira ocorrência",
      description:
        "Exemplo: WCAG (Web Content Accessibility Guidelines)",
      category: "Linguagem",
      checked: false,
    },
    {
      id: 4,
      text: "Evitar metáforas ou linguagem figurativa confusa",
      description:
        "Expressões idiomáticas podem não ser traduzidas corretamente ou compreendidas por todos",
      category: "Linguagem",
      checked: false,
    },
    {
      id: 5,
      text: "Dividir textos longos em parágrafos curtos, listas e subtítulos",
      description:
        "Melhora a escaneabilidade e reduz a carga cognitiva da leitura",
      category: "Linguagem",
      checked: false,
    },

    // Qualidade Textual
    {
      id: 6,
      text: "Garantir que o conteúdo esteja livre de erros ortográficos e gramaticais",
      description:
        "Erros prejudicam a credibilidade e podem confundir leitores de tela",
      category: "Qualidade Textual",
      checked: false,
    },
    {
      id: 7,
      text: "Garantir que cada parágrafo trate apenas de um tópico principal",
      description:
        "Facilita a compreensão e o foco do leitor no assunto abordado",
      category: "Qualidade Textual",
      checked: false,
    },
    {
      id: 8,
      text: "Utilizar listas em vez de longos blocos de texto sempre que possível",
      description:
        "Listas são mais fáceis de escanear visualmente e navegar via tecnologia assistiva",
      category: "Qualidade Textual",
      checked: false,
    },

    // Tipografia
    {
      id: 9,
      text: "Utilizar tamanho de texto adequado (≥ 16px)",
      description:
        "Fontes muito pequenas dificultam a leitura para pessoas com baixa visão",
      category: "Tipografia",
      checked: false,
    },
    {
      id: 10,
      text: "Garantir espaçamento adequado entre linhas e parágrafos",
      description:
        "Use um line-height de pelo menos 1.5 para evitar que as linhas se misturem",
      category: "Tipografia",
      checked: false,
    },
    {
      id: 11,
      text: "Evitar o uso de texto justificado",
      description:
        "Texto justificado cria 'rios de espaço' que dificultam a leitura para disléxicos",
      category: "Tipografia",
      checked: false,
    },
    {
      id: 12,
      text: "Garantir legibilidade mesmo com fontes estilizadas",
      description:
        "Evite fontes cursivas ou muito ornamentadas em blocos de texto longos",
      category: "Tipografia",
      checked: false,
    },
    {
      id: 13,
      text: "Permitir redimensionamento do texto em até 200%",
      description:
        "O layout não deve quebrar ou sobrepor conteúdo ao aumentar o zoom",
      category: "Tipografia",
      checked: false,
    },

    // Links
    {
      id: 14,
      text: "Garantir que links possuam textos descritivos",
      description:
        "O texto do link deve indicar claramente seu destino ou função",
      category: "Links",
      checked: false,
    },
    {
      id: 15,
      text: "Garantir que o texto do link faça sentido fora de contexto",
      description:
        "Usuários de leitores de tela podem navegar listando apenas os links da página",
      category: "Links",
      checked: false,
    },
    {
      id: 16,
      text: 'Evitar textos genéricos como "Clique aqui"',
      description:
        "Use descrições específicas do conteúdo vinculado para melhor usabilidade",
      category: "Links",
      checked: false,
    },
    {
      id: 17,
      text: "Manter descrições iguais para links com o mesmo destino",
      description:
        "A consistência ajuda o usuário a prever para onde o link o levará",
      category: "Links",
      checked: false,
    },
    {
      id: 18,
      text: "Informar formato e tamanho de arquivos nos links",
      description: 'Ex: "Baixar relatório (PDF, 2.5MB)"',
      category: "Links",
      checked: false,
    },

    // Imagens
    {
      id: 19,
      text: "Fornecer texto alternativo para imagens informativas",
      description:
        "Use o atributo alt para descrever imagens que transmitem informação",
      category: "Imagens",
      checked: false,
    },
    {
      id: 20,
      text: "Utilizar alt vazio em imagens decorativas",
      description:
        'Imagens puramente decorativas devem ter alt="" para serem ignoradas por leitores',
      category: "Imagens",
      checked: false,
    },
    {
      id: 21,
      text: "Garantir que o texto alternativo seja objetivo e contextual",
      description:
        "Descreva a função ou conteúdo da imagem, não sua aparência visual irrelevante",
      category: "Imagens",
      checked: false,
    },

    // Tabelas e Gráficos
    {
      id: 22,
      text: "Utilizar tabelas apenas para dados tabulares",
      description:
        "Não use tabelas para controlar o layout visual da página",
      category: "Tabelas e Gráficos",
      checked: false,
    },
    {
      id: 23,
      text: "Associar corretamente cabeçalhos em tabelas",
      description:
        "Utilize as tags <th> e atributos scope para definir colunas e linhas",
      category: "Tabelas e Gráficos",
      checked: false,
    },
    {
      id: 24,
      text: "Garantir que gráficos não dependam apenas de cores",
      description:
        "Use padrões, texturas ou rótulos adicionais para diferenciar dados",
      category: "Tabelas e Gráficos",
      checked: false,
    },
    {
      id: 25,
      text: "Fornecer descrição textual para gráficos",
      description:
        "Disponibilize um resumo dos dados ou uma tabela alternativa acessível",
      category: "Tabelas e Gráficos",
      checked: false,
    },
    {
      id: 26,
      text: "Garantir que tabelas possuam cabeçalhos que expliquem os dados",
      description:
        "O título da tabela (caption) ou cabeçalhos claros devem contextualizar a informação",
      category: "Tabelas e Gráficos",
      checked: false,
    },

    // Arquivos
    {
      id: 27,
      text: "Informar formato e tamanho de arquivos para download",
      description:
        "Permite ao usuário decidir se tem dados/banda suficientes para baixar",
      category: "Arquivos",
      checked: false,
    },
    {
      id: 28,
      text: "Garantir que arquivos sejam acessíveis ou possuam alternativa",
      description:
        "PDFs devem ter tags estruturais, ou deve-se fornecer versão HTML",
      category: "Arquivos",
      checked: false,
    },

    // Elementos Interativos
    {
      id: 29,
      text: "Garantir área mínima de acionamento de 24×24 px",
      description:
        "Alvos de toque devem ter tamanho adequado para facilitar a interação",
      category: "Elementos Interativos",
      checked: false,
    },
    {
      id: 30,
      text: "Evitar elementos interativos muito próximos",
      description:
        "Evita toques acidentais (fat finger error) em telas sensíveis ao toque",
      category: "Elementos Interativos",
      checked: false,
    },
    {
      id: 31,
      text: "Utilizar <button> para ações e <a> apenas para navegação",
      description:
        "Botões executam scripts/ações na página; Links mudam a URL",
      category: "Elementos Interativos",
      checked: false,
    },
    {
      id: 32,
      text: "Garantir que links sejam visualmente reconhecíveis",
      description:
        "Links devem possuir diferenciação (ex: sublinhado) além da cor",
      category: "Elementos Interativos",
      checked: false,
    },
    {
      id: 33,
      text: "Informar quando um link abre em nova aba ou janela",
      description:
        "Avise o usuário para evitar quebra inesperada no fluxo de navegação",
      category: "Elementos Interativos",
      checked: false,
    },
    {
      id: 34,
      text: "Disponibilizar link 'Pular para o conteúdo principal'",
      description:
        "Permite que usuários de teclado pulem menus repetitivos",
      category: "Elementos Interativos",
      checked: false,
    },

    // Navegação por Teclado
    {
      id: 35,
      text: "Garantir navegação completa por teclado",
      description:
        "Todas as funcionalidades devem ser acessíveis via Tab, Enter e Espaço",
      category: "Navegação por Teclado",
      checked: false,
    },
    {
      id: 36,
      text: "Evitar funcionalidades dependentes apenas de mouseover",
      description:
        "Usuários de teclado não conseguem ativar eventos exclusivos de hover",
      category: "Navegação por Teclado",
      checked: false,
    },
    {
      id: 37,
      text: "Garantir foco visível e previsível",
      description:
        "O indicador de foco (outline) deve ser claramente visível ao navegar",
      category: "Navegação por Teclado",
      checked: false,
    },
    {
      id: 38,
      text: "Evitar armadilhas de teclado",
      description:
        "Usuário deve conseguir entrar e sair de qualquer elemento usando apenas o teclado",
      category: "Navegação por Teclado",
      checked: false,
    },

    // Estrutura do Documento
    {
      id: 39,
      text: "Garantir um único h1 por página",
      description:
        "O <h1> deve descrever claramente o assunto principal da página",
      category: "Estrutura do Documento",
      checked: false,
    },
    {
      id: 40,
      text: "Utilizar corretamente a hierarquia de cabeçalhos",
      description:
        "Não pule níveis (h1 → h2 → h3) e evite saltos bruscos",
      category: "Estrutura do Documento",
      checked: false,
    },
    {
      id: 41,
      text: "Garantir que a página possua um <title> único e descritivo",
      description:
        "O título da aba deve representar claramente o conteúdo ou funcionalidade",
      category: "Estrutura do Documento",
      checked: false,
    },
    {
      id: 42,
      text: "Definir corretamente o atributo lang no elemento <html>",
      description:
        "O idioma deve refletir a língua principal da página, ex.: lang='pt-BR'",
      category: "Estrutura do Documento",
      checked: false,
    },
    {
      id: 43,
      text: "Utilizar landmarks semânticos (header, nav, main, footer)",
      description:
        "Use regiões funcionais para facilitar a navegação por leitores de tela",
      category: "Estrutura do Documento",
      checked: false,
    },
    {
      id: 44,
      text: "Evitar o uso do atributo autofocus",
      description:
        "Autofocus pode causar desorientação e mudança brusca de contexto",
      category: "Estrutura do Documento",
      checked: false,
    },
    {
      id: 45,
      text: "Garantir a página siga uma estrutura semântica correta",
      description:
        "Utilizar corretamente tags HTML5 para dar significado ao conteúdo",
      category: "Estrutura do Documento",
      checked: false,
    },
    {
      id: 46,
      text: "Validar o HTML para evitar erros semânticos estruturais",
      description:
        "Erros de marcação podem comprometer a interpretação por leitores de tela",
      category: "Estrutura do Documento",
      checked: false,
    },
    {
      id: 47,
      text: "Garantir fluxo linear lógico do conteúdo",
      description:
        "O conteúdo deve manter sentido quando navegado por teclado ou sem CSS",
      category: "Estrutura do Documento",
      checked: false,
    },
    {
      id: 48,
      text: "Não utilizar o atributo title como único meio de informação",
      description:
        "Tooltips nativos não são acessíveis via teclado ou em dispositivos móveis",
      category: "Estrutura do Documento",
      checked: false,
    },
    {
      id: 49,
      text: "Permitir extensão de tempo quando houver limite de sessão",
      description:
        "Evita encerramento inesperado que prejudica usuários com deficiência",
      category: "Estrutura do Documento",
      checked: false,
    },
    {
      id: 50,
      text: "Garantir a existência de apenas um elemento <main> por página",
      description:
        "O elemento main deve conter exclusivamente o conteúdo principal",
      category: "Estrutura do Documento",
      checked: false,
    },
    {
      id: 51,
      text: "Não utilizar cabeçalhos apenas para fins visuais",
      description:
        "Cabeçalhos devem representar estrutura e não apenas estilo (use CSS para isso)",
      category: "Estrutura do Documento",
      checked: false,
    },

    // Modais
    {
      id: 52,
      text: "Mover foco para dentro do modal ao abrir",
      description:
        "O foco deve ir automaticamente para o modal quando ele é ativado",
      category: "Modais",
      checked: false,
    },
    {
      id: 53,
      text: "Manter foco contido no modal enquanto ativo",
      description:
        "Implemente 'focus trap' para impedir navegação fora do modal aberto",
      category: "Modais",
      checked: false,
    },
    {
      id: 54,
      text: "Retornar foco ao elemento acionador ao fechar",
      description:
        "Ao fechar o modal, retorne o foco ao botão que o abriu para manter o fluxo",
      category: "Modais",
      checked: false,
    },

    // Formulários
    {
      id: 55,
      text: "Garantir que todos os campos de formulário possuam label associado",
      description:
        "Todo input, select ou textarea deve ter um <label> explícito ou nome acessível (aria-label ou aria-labelledby)",
      category: "Formulários",
      checked: false,
    },
    {
      id: 56,
      text: "Exibir mensagens de erro em lista no topo do formulário",
      description:
        "Facilita a localização e correção de problemas antes de reenvio",
      category: "Formulários",
      checked: false,
    },
    {
      id: 57,
      text: "Associar semanticamente mensagens de erro aos campos",
      description:
        "Utilize aria-describedby para vincular o erro ao input correspondente",
      category: "Formulários",
      checked: false,
    },
    {
      id: 58,
      text: "Não comunicar erros ou estados apenas por cor",
      description:
        "Use ícones ou texto explicativo junto com a cor (ex: borda vermelha)",
      category: "Formulários",
      checked: false,
    },
    {
      id: 59,
      text: "Garantir feedback claro e acionável após submissão",
      description:
        "Confirme visualmente e via leitor de tela que a ação foi concluída com sucesso",
      category: "Formulários",
      checked: false,
    },

    // Percepção Visual
    {
      id: 60,
      text: "Garantir contraste adequado para textos e textos grandes",
      description:
        "Relação mínima de 4.5:1 para texto normal e 3:1 para texto grande",
      category: "Percepção Visual",
      checked: false,
    },
    {
      id: 61,
      text: "Garantir contraste suficiente para ícones e gráficos",
      description:
        "Componentes de interface devem ter contraste mínimo de 3:1",
      category: "Percepção Visual",
      checked: false,
    },
    {
      id: 62,
      text: "Garantir que bordas de campos de formulário sejam perceptíveis",
      description:
        "Os campos devem ser claramente delimitados contra o fundo da página",
      category: "Percepção Visual",
      checked: false,
    },
    {
      id: 63,
      text: "Manter legibilidade de texto sobre imagens ou vídeos",
      description:
        "Use overlays escuros ou sombras no texto para garantir contraste",
      category: "Percepção Visual",
      checked: false,
    },

    // Uso em Dispositivos Móveis
    {
      id: 64,
      text: "Permitir rotação da tela sem perda de conteúdo",
      description:
        "O layout deve se adaptar fluidamente entre modo retrato e paisagem",
      category: "Uso em Dispositivos Móveis",
      checked: false,
    },
    {
      id: 65,
      text: "Evitar rolagem horizontal indevida em dispositivos móveis",
      description:
        "Conteúdo deve fluir verticalmente em larguras menores (Design Responsivo)",
      category: "Uso em Dispositivos Móveis",
      checked: false,
    },
    {
      id: 66,
      text: "Garantir espaçamento adequado entre elementos interativos",
      description:
        "Garanta margens seguras para evitar cliques incorretos em telas touch",
      category: "Uso em Dispositivos Móveis",
      checked: false,
    },
    // Campos de Texto (simples e multilinha)
    {
      id: 67,
      text: 'Devem conter <input type="text"> ou <textarea>',
      category: "Campos de Texto",
      checked: false,
    },
    {
      id: 68,
      text: "Limites de caracteres informados no campo",
      description: 'Ex: "Máx. 255 caracteres"',
      category: "Campos de Texto",
      checked: false,
    },
    {
      id: 69,
      text: "Campos somente leitura usam readonly, não disabled",
      description:
        "Para manter leitura por tecnologias assistivas.",
      category: "Campos de Texto",
      checked: false,
    },
    {
      id: 70,
      text: "Campos apenas para transmitir informação informa que são apenas informativos",
      category: "Campos de Texto",
      checked: false,
    },
    // Campos Numéricos
    {
      id: 71,
      text: 'Implementados preferencialmente como <input type="text">',
      description: "Isso evita problemas com leitores de tela",
      category: "Campos Numéricos",
      checked: false,
    },
    {
      id: 72,
      text: "Formato esperado informado claramente",
      description:
        "Possui informações sobre formatação de casas decimais",
      category: "Campos Numéricos",
      checked: false,
    },
    {
      id: 73,
      text: "Máscaras não bloqueiam navegação por teclado nem alteram valor sem aviso",
      category: "Campos Numéricos",
      checked: false,
    },
    {
      id: 74,
      text: "Campos apenas para transmitir informação informa que são apenas informativos",
      category: "Campos Numéricos",
      checked: false,
    },
    // Campos de Seleção (Select)
    {
      id: 75,
      text: "Utiliza <select> nativo sempre que possível",
      category: "Campos de Seleção",
      checked: false,
    },
    {
      id: 76,
      text: 'Opção padrão informativa ("Selecione uma opção")',
      category: "Campos de Seleção",
      checked: false,
    },
    {
      id: 77,
      text: "Campo expõe nome do campo, opção selecionada e quantidade de opções",
      description: "Ex.: Fazenda Rio Preto, opção 1 de 5",
      category: "Campos de Seleção",
      checked: false,
    },
    // Seleção Pesquisável (Autocomplete / Combobox)
    {
      id: 78,
      text: 'Utiliza o padrão WAI-ARIA (role="combobox")',
      category: "Seleção Pesquisável",
      checked: false,
    },
    {
      id: 79,
      text: "Usa corretamente aria-expanded, aria-controls e aria-activedescendant",
      description:
        "Para mais informações consultar a documentação",
      category: "Seleção Pesquisável",
      checked: false,
    },
    {
      id: 80,
      text: "Lista de opções é anunciada ao abrir",
      description: "",
      category: "Seleção Pesquisável",
      checked: false,
    },
    {
      id: 81,
      text: "Campo expõe nome do campo, opção selecionada e quantidade de opções",
      description: "Fazenda Rio Preto, opção 1 de 5",
      category: "Seleção Pesquisável",
      checked: false,
    },
    {
      id: 82,
      text: "Rótulo informa que o campo é pesquisável",
      category: "Seleção Pesquisável",
      checked: false,
    },
    // Campos de Data
    {
      id: 83,
      text: "Permite digitação manual",
      category: "Campos de Data",
      checked: false,
    },
    // Upload de Arquivos
    {
      id: 84,
      text: 'Implementado com <input type="file">',
      category: "Upload de Arquivos",
      checked: false,
    },
    {
      id: 85,
      text: "Informa previamente tipos aceitos, tamanho máximo e quantidade permitida",
      category: "Upload de Arquivos",
      checked: false,
    },
    {
      id: 86,
      text: "Mudanças de estado são anunciadas",
      description:
        "Ex.: upload concluído, erro no envio ou arquivo removido",
      category: "Upload de Arquivos",
      checked: false,
    },
    // Botões
    {
      id: 87,
      text: "Utiliza o elemento nativo <button> para ações",
      description: "Evite divs ou spans clicáveis",
      category: "Botões",
      checked: false,
    },
    {
      id: 88,
      text: "Estado desabilitado é implementado corretamente",
      description:
        "Use o atributo disabled para que o estado seja anunciado e o botão não receba foco",
      category: "Botões",
      checked: false,
    },
    {
      id: 89,
      text: "Botões são ativáveis por teclado",
      description:
        "O botão deve responder às teclas Enter e Espaço sem implementação manual extra",
      category: "Botões",
      checked: false,
    },
    // Seleção Múltipla
    {
      id: 90,
      text: "Utiliza componentes nativos adequados para seleção múltipla",
      description:
        'Prefira <input type="checkbox"> ou <select multiple> em vez de componentes customizados',
      category: "Seleção Múltipla",
      checked: false,
    },
    {
      id: 91,
      text: "Comunica obrigatoriedade e erros de validação",
      description:
        "Use required, aria-required e mensagens de erro associadas ao grupo quando aplicável",
      category: "Seleção Múltipla",
      checked: false,
    },
    // Booleano
    {
      id: 92,
      text: "Utiliza componente apropriado para escolha binária",
      description:
        "Implemente escolhas booleanas usando radio buttons (Sim/Não) ou switch acessível",
      category: "Booleano",
      checked: false,
    },
    {
      id: 93,
      text: "Estado selecionado é gerenciado corretamente",
      description:
        "Apenas uma opção pode estar selecionada por vez e o estado deve refletir o valor real",
      category: "Booleano",
      checked: false,
    },
  ]);

  /* =======================
     Lógica
  ======================= */

  const toggleItem = (id: number) => {
    setItems(
      items.map((item) =>
        item.id === id
          ? { ...item, checked: !item.checked }
          : item,
      ),
    );
  };

  const toggleCategory = (category: ChecklistCategory) => {
    const categoryItems = groupedItems[category];
    const allChecked = categoryItems.every(
      (item) => item.checked,
    );

    setItems(
      items.map((item) =>
        item.category === category
          ? { ...item, checked: !allChecked }
          : item,
      ),
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
  const totalItems = itemsExibidos.length;
  const completedItems = itemsExibidos.filter(
    (item) => item.checked,
  ).length;
  const progress = Math.round(
    totalItems > 0 ? (completedItems / totalItems) * 100 : 0,
  );

  // Encontrar próxima categoria com itens não concluídos
  const nextCategory =
    Object.entries(categoriasParaExibir).find(
      ([_, categoryItems]) =>
        categoryItems.some((item) => !item.checked),
    )?.[0] || "Concluído";

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
                navigate("/personalizar/camada-01")
              }
              className="hover:text-[#00b894] transition-colors"
            >
              Camada 1
            </button>
            <span className="hidden sm:inline">›</span>
            <span className="text-gray-900">Checklist</span>
          </div>

          <button
            onClick={() => navigate("/personalizar/camada-01")}
            className="flex items-center gap-2 px-3 py-2 bg-[#00b894] text-white rounded-lg transition-colors hover:bg-[#00a380] sm:bg-transparent sm:text-gray-600 sm:hover:text-[#00b894] sm:hover:bg-white flex-shrink-0"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Voltar</span>
          </button>
        </div>

        {/* Botão Mais Informações */}
        <a
          href="https://docs.google.com/document/d/1kPfQyfptKh27_7PSyYxCl2j-122Bk0fgAX2dKliQZ00/edit?tab=t.0#heading=h.q7xvzn7l1ba"
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
                    <div className="flex items-center gap-3">
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
                    </div>
                    <ChevronDown className="w-5 h-5 text-gray-500 transition-transform details-open:rotate-180" />
                  </summary>

                  {/* Items da categoria */}
                  <div className="p-5 pt-0 space-y-3">
                    {categoryItems.map((item) => (
                      <label
                        key={item.id}
                        className={`flex items-start gap-4 p-5 rounded-lg border cursor-pointer transition-all hover:shadow-md ${
                          item.checked
                            ? "bg-[#e8f8f5] border-[#00b894]"
                            : "bg-gray-50 border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={item.checked}
                          onChange={() => toggleItem(item.id)}
                          className="mt-1 w-5 h-5 accent-[#00b894] cursor-pointer"
                        />

                        <div className="flex-1">
                          <div
                            className={`font-medium text-gray-900 mb-1 ${item.checked ? "line-through opacity-70" : ""}`}
                          >
                            {item.text}
                          </div>
                          {item.description && (
                            <div className="text-sm text-gray-600">
                              {item.description}
                            </div>
                          )}
                        </div>
                      </label>
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
                  Isso aí! 🎉
                </h3>
                <p className="text-gray-300 max-w-xl">
                  Você está dominando a Base de Conhecimento.
                  Continue assim para garantir uma experiência
                  inclusiva para todos os usuários!
                </p>
              </div>
              <div className="text-6xl opacity-50">📚</div>
            </div>

            <div className="flex gap-4 mt-6">
              <button
                onClick={() =>
                  navigate("/personalizar/camada-02")
                }
                className="bg-[#00b894] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#00a380] transition-colors"
              >
                Continuar Aprendizado
              </button>
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

      {/* Footer */}
      <Footer />
    </div>
  );
}