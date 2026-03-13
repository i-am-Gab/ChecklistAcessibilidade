import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { ChevronDown, BookOpen, ArrowLeft } from "lucide-react";
import Header from "./Header";
import Footer from "./Footer";

/* =======================
   Tipagens
======================= */

type ChecklistCategory =
  | "Campos de Texto"
  | "Campos Numéricos"
  | "Campos de Seleção"
  | "Seleção Pesquisável"
  | "Campos de Data"
  | "Upload de Arquivos"
  | "Grupos de Campos Dinâmicos"
  | "Botões"
  | "Seleção Múltipla"
  | "Booleano"
  | "Card de Informações"
  | "Estrutura em Árvore"
  | "Caixas de Diálogo — Conteúdo"
  | "Caixas de Diálogo — Alerta/Erro"
  | "Menu de Abas"
  | "Filtros Ativos"
  | "Menu de Navegação Oculto";

interface ChecklistItem {
  id: number;
  text: string;
  description?: string;
  category: ChecklistCategory;
  checked: boolean;
}

export default function ChecklistCamada02() {
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
    // Campos de Texto (simples e multilinha)
    {
      id: 1,
      text: "Rótulo do campo descreve claramente o conteúdo esperado",
      description:
        "Associar rótulo (ex: <label>) explícito via aria-labelledby descrevendo claramente o conteúdo esperado.",
      category: "Campos de Texto",
      checked: false,
    },
    {
      id: 2,
      text: "Campo, estado (obrigatório/somente leitura) e conteúdo preenchido",
      description:
        "O input deve ter label associado e expor corretamente estados como required e readonly",
      category: "Campos de Texto",
      checked: false,
    },

    // Campos Numéricos
    {
      id: 3,
      text: "Unidade de medida associada semanticamente ao campo",
      description:
        "A unidade deve estar vinculada ao campo por texto visível ou aria-describedby",
      category: "Campos Numéricos",
      checked: false,
    },
    {
      id: 4,
      text: "Erros de validação explicam claramente o problema",
      description:
        "Ex.: valor fora do intervalo, formato inválido ou campo obrigatório",
      category: "Campos Numéricos",
      checked: false,
    },
    {
      id: 5,
      text: "Rótulo do campo descreve claramente o conteúdo esperado",
      description:
        "Associar rótulo (ex: <label>) explícito via aria-labelledby descrevendo claramente o conteúdo esperado.",
      category: "Campos Numéricos",
      checked: false,
    },

    // Campos de Seleção (Select)
    {
      id: 6,
      text: "Navegação completa por teclado",
      description:
        "Utilizando as teclas Tab, Setas, Enter e Esc",
      category: "Campos de Seleção",
      checked: false,
    },
    {
      id: 7,
      text: "Rótulo do campo descreve claramente o conteúdo esperado",
      description:
        "Associar rótulo (ex: <label>) explícito via aria-labelledby descrevendo claramente o conteúdo esperado.",
      category: "Campos de Seleção",
      checked: false,
    },
    {
      id: 70,
      text: "Validações e estados são comunicados claramente",
      description:
        "Utilizar aria-describedby para associar mensagens de erro ou ajuda, garantindo que sejam anunciadas por leitores de tela.",
      category: "Campos de Seleção",
      checked: false,
    },

    // Seleção Pesquisável (Autocomplete / Combobox)
    {
      id: 8,
      text: "Navegação por setas anuncia item em foco",
      description:
        "Ao navegar por itens em um combobox, o leitor de tela deve anunciar o item que está em foco.",
      category: "Seleção Pesquisável",
      checked: false,
    },
    {
      id: 9,
      text: "Rótulo do campo descreve claramente o conteúdo esperado",
      description:
        "Associar rótulo (ex: <label>) explícito via aria-labelledby descrevendo claramente o conteúdo esperado.",
      category: "Seleção Pesquisável",
      checked: false,
    },
    {
      id: 10,
      text: "Navegação completa por teclado",
      description:
        "Utilizando as teclas Tab, Setas, Enter e Esc",
      category: "Seleção Pesquisável",
      checked: false,
    },
    {
      id: 71,
      text: "Validações e estados são comunicados claramente",
      description:
        "Utilizar aria-describedby para associar mensagens de erro ou ajuda, garantindo que sejam anunciadas por leitores de tela.",
      category: "Seleção Pesquisável",
      checked: false,
    },

    // Campos de Data
    {
      id: 11,
      text: "Informa qual o formato de data esperado",
      description:
        "No texto de ajuda visível ou Programaticamente associado ao campo (ex: aria-describedby).",
      category: "Campos de Data",
      checked: false,
    },
    {
      id: 12,
      text: "Regras adicionais informadas previamente",
      description:
        "Ex.: datas mínimas/máximas, datas indisponíveis ou restrições de período",
      category: "Campos de Data",
      checked: false,
    },
    {
      id: 13,
      text: "Placeholder não é a única instrução",
      description:"Placeholder não deve ser usado como única forma de instrução, pois desaparece ao preencher o campo e pode não ser lido por leitores de tela.",
      category: "Campos de Data",
      checked: false,
    },
    {
      id: 14,
      text: "Calendário visual implementado como diálogo acessível",
      description:
        "Deve utilizar papel semântico adequado (ex.: role='dialog')",
      category: "Campos de Data",
      checked: false,
    },
    {
      id: 15,
      text: "Foco vai para o calendário ao abrir e retorna ao campo ao fechar",
      description:"Ao abrir o calendário, o foco deve ir para o título ou primeiro elemento interativo. Ao fechar, o foco deve retornar ao campo de data.",
      category: "Campos de Data",
      checked: false,
    },
    {
      id: 16,
      text: "Totalmente navegável por teclado",
      description:'Para mais infomações, consulte as orientações da Cartilha em "Mais informações"',
      category: "Campos de Data",
      checked: false,
    },
    {
      id: 17,
      text: "Campo anuncia rótulos, datas e estados",
      description:
        "Datas selecionadas, foco atual e estados devem estar disponíveis programaticamente",
      category: "Campos de Data",
      checked: false,
    },
    {
      id: 72,
      text: "Validações e estados são comunicados claramente",
      description:
        "Utilizar aria-describedby para associar mensagens de erro ou ajuda, garantindo que sejam anunciadas por leitores de tela.",
      category: "Campos de Data",
      checked: false,
    },

    // Upload de Arquivos
    {
      id: 18,
      text: "Navegação completa por teclado",
      description:
        "Utilizando as teclas Tab, Setas, Enter e Esc",
      category: "Upload de Arquivos",
      checked: false,
    },
    {
      id: 19,
      text: "Exibe nome do arquivo após upload",
      description:"O nome do arquivo deve ser exibido visualmente e estar disponível para leitores de tela após o upload",
      category: "Upload de Arquivos",
      checked: false,
    },
    {
      id: 20,
      text: "Possui botões de baixar e remover",
      description:"Após o upload, devem estar disponíveis opções para baixar ou remover o arquivo",
      category: "Upload de Arquivos",
      checked: false,
    },
    {
      id: 21,
      text: "Foco se mantêm após upload ou remoção",
      description:
        "Evita perda de contexto ou retorno inesperado ao topo da página",
      category: "Upload de Arquivos",
      checked: false,
    },
    {
      id: 72,
      text: "Validações e estados são comunicados claramente",
      description:
        "Utilizar aria-describedby para associar mensagens de erro ou ajuda, garantindo que sejam anunciadas por leitores de tela",
      category: "Upload de Arquivos",
      checked: false,
    },

    // Grupos de Campos Dinâmicos
    {
      id: 22,
      text: "Utilizar <fieldset> e <legend> para agrupar elementos",
      description:"Use <fieldset> para agrupar os campos relacionados e <legend> para fornecer um rótulo claro para o grupo, garantindo que leitores de tela possam identificar a relação entre os campos",
      category: "Grupos de Campos Dinâmicos",
      checked: false,
    },
    {
      id: 23,
      text: "Cada instância adicionada possui seu próprio grupo/faz parte de um grupo",
      description:"Cada instância de campo dinâmico deve ser agrupada logicamente, utilizando <fieldset> e <legend> para melhorar a acessibilidade",
      category: "Grupos de Campos Dinâmicos",
      checked: false,
    },
    {
      id: 24,
      text: "Botões de adicionar/remover usam <button>",
      description:"Os botões de adicionar e remover instâncias de campos dinâmicos devem utilizar a tag <button>",
      category: "Grupos de Campos Dinâmicos",
      checked: false,
    },
    {
      id: 25,
      text: "Rótulos dos botões são claros",
      description:"Os rótulos dos botões devem descrever claramente a ação que serão executadas.",
      category: "Grupos de Campos Dinâmicos",
      checked: false,
    },
    {
      id: 26,
      text: "Alterações dinâmicas anunciadas (aria-live)",
      description:"Utilizar aria-live para anunciar automaticamente alterações dinâmicas na página, garantindo que sejam comunicadas aos usuários de leitores de tela",
      category: "Grupos de Campos Dinâmicos",
      checked: false,
    },
    {
      id: 27,
      text: "Foco é movido de forma previsível",
      description:"O foco deve ser movido de forma previsível ao navegar pela página, garantindo que os usuários consigam acompanhar a navegação com facilidade",
      category: "Grupos de Campos Dinâmicos",
      checked: false,
    },

    // Botões
    {
      id: 28,
      text: "Possui nome acessível por texto visível ou ARIA",
      description:
        "O botão deve ter texto visível ou, quando usar apenas ícone, aria-label ou aria-labelledby",
      category: "Botões",
      checked: false,
    },
    {
      id: 29,
      text: "Rótulo descreve claramente a ação executada",
      description:
        'Evite rótulos genéricos como "OK" ou "Clique aqui"; descreva o resultado da ação',
      category: "Botões",
      checked: false,
    },
    {
      id: 30,
      text: "Ações destrutivas solicitam confirmação explícita",
      description:
        "Exclusões ou ações irreversíveis devem exigir confirmação antes da execução",
      category: "Botões",
      checked: false,
    },
    {
      id: 31,
      text: "Resultado da ação é comunicado ao usuário",
      description:
        "Feedback de sucesso ou erro deve ser exibido visualmente e anunciado ao leitor de tela",
      category: "Botões",
      checked: false,
    },

    // Seleção Múltipla
    {
      id: 32,
      text: "Agrupa opções relacionadas com <fieldset> e <legend>",
      description:
        "Use <fieldset> para agrupar opções e <legend> para fornecer um rótulo comum ao grupo",
      category: "Seleção Múltipla",
      checked: false,
    },
    {
      id: 33,
      text: "Legend descreve claramente o propósito e o tipo de seleção",
      description:
        'Indique explicitamente quando a seleção permitir múltiplas opções (ex: "Classificação – seleção múltipla")',
      category: "Seleção Múltipla",
      checked: false,
    },
    {
      id: 34,
      text: "Permite operação completa apenas com teclado",
      description:
        "Todas as opções devem ser selecionáveis e desmarcáveis via teclado, sem dependência do mouse",
      category: "Seleção Múltipla",
      checked: false,
    },
    {
      id: 35,
      text: "Mantém associação correta entre rótulos e controles",
      description:
        "Cada opção deve possuir <label> associado corretamente ao respectivo controle",
      category: "Seleção Múltipla",
      checked: false,
    },
    {
      id: 36,
      text: "Atualizações dinâmicas são tratadas corretamente",
      description:
        "Alterações que afetam outros campos devem atualizar estados e mensagens de forma consistente",
      category: "Seleção Múltipla",
      checked: false,
    },
    {
      id: 72,
      text: "Validações e estados são comunicados claramente",
      description:
        "Utilizar aria-describedby para associar mensagens de erro ou ajuda, garantindo que sejam anunciadas por leitores de tela.",
      category: "Seleção Múltipla",
      checked: false,
    },

    // Booleano
    {
      id: 37,
      text: "Grupo é identificado semanticamente",
      description:
        "Use <fieldset> e <legend> ou aria-labelledby para identificar o grupo de opções",
      category: "Booleano",
      checked: false,
    },
    {
      id: 38,
      text: "Rótulos descrevem claramente cada opção",
      description:
        'Use pares claros como "Sim / Não" ou "Ativar / Desativar"',
      category: "Booleano",
      checked: false,
    },
    {
      id: 39,
      text: "Navegação por teclado segue o padrão esperado",
      description:
        'Para mais infomações, consulte as orientações da Cartilha em "Mais informações",',
      category: "Booleano",
      checked: false,
    },
    {
      id: 40,
      text: "Mudanças que impactam outros campos são tratadas corretamente",
      description:
        "Alterações de valor devem atualizar campos dependentes sem perda de foco ou contexto",
      category: "Booleano",
      checked: false,
    },
    {
      id: 73,
      text: "Validações e estados são comunicados claramente",
      description:
        "Utilizar aria-describedby para associar mensagens de erro ou ajuda, garantindo que sejam anunciadas por leitores de tela.",
      category: "Booleano",
      checked: false,
    },

    // Card de Informações
    {
      id: 41,
      text: "Utiliza elemento semântico apropriado para o card",
      description:
        "Implemente o card como <article> para conteúdo independente ou <section> quando fizer parte de um agrupamento maior",
      category: "Card de Informações",
      checked: false,
    },
    {
      id: 42,
      text: "Mantém ordem de leitura lógica no DOM",
      description:
        "A estrutura do HTML deve refletir a ordem visual e semântica do conteúdo do card",
      category: "Card de Informações",
      checked: false,
    },
    {
      id: 43,
      text: "Estado do card não depende apenas de cor",
      description:
        "Estados como ativo, inativo ou selecionado devem ter indicação visual adicional",
      category: "Card de Informações",
      checked: false,
    },
    {
      id: 44,
      text: "Estado do card é representado de forma semântica",
      description:
        "Use texto, ícones com rótulo ou atributos ARIA para indicar estados do card",
      category: "Card de Informações",
      checked: false,
    },
    {
      id: 45,
      text: "Ícones decorativos são corretamente ocultados",
      description:
        'Use aria-hidden="true" ou CSS para ocultar ícones que não transmitem informação',
      category: "Card de Informações",
      checked: false,
    },
    {
      id: 46,
      text: "Ações do card utilizam controles acessíveis",
      description:
        'Botões como "Ver mais" ou "Visualizar" devem ser elementos <button> ou links com nome acessível',
      category: "Card de Informações",
      checked: false,
    },
    {
      id: 47,
      text: "Possui título semântico para identificação do card",
      description:
        "O card deve ter um título usando heading apropriado (ex: <h3>) para identificar seu conteúdo",
      category: "Card de Informações",
      checked: false,
    },
    {
      id: 48,
      text: "Todo conteúdo interativo do card é acessível por teclado",
      description:
        "Links, botões e controles internos devem ser navegáveis via teclado",
      category: "Card de Informações",
      checked: false,
    },

    // Estrutura em Árvore (Tree View)
    {
      id: 49,
      text: 'Define corretamente role="tree" e role="treeitem"',
      description:
        'O contêiner da árvore deve usar role="tree" e cada nó interativo role="treeitem"',
      category: "Estrutura em Árvore",
      checked: false,
    },
    {
      id: 50,
      text: "Utiliza atributos ARIA para hierarquia e estado",
      description:
        "Use aria-expanded, aria-level, aria-selected e aria-setsize/aria-posinset quando aplicável",
      category: "Estrutura em Árvore",
      checked: false,
    },
    {
      id: 51,
      text: "Mantém apenas um ponto de entrada no foco por TAB",
      description:
        "A navegação interna deve ocorrer por setas, mantendo um único item acessível via TAB",
      category: "Estrutura em Árvore",
      checked: false,
    },
    {
      id: 52,
      text: "Implementa navegação por teclado",
      description:
        'Para mais infomações, consulte as orientações da Cartilha em "Mais informações"',
      category: "Estrutura em Árvore",
      checked: false,
    },
    {
      id: 53,
      text: "Mantém a relação correta entre nós pais e filhos",
      description:
        "Itens filhos devem estar corretamente aninhados no DOM",
      category: "Estrutura em Árvore",
      checked: false,
    },
    {
      id: 54,
      text: "Mudanças de estado são anunciadas corretamente",
      description:
        "Expansão, colapso e seleção devem ser comunicados ao leitor de tela em tempo real com uso de aria-live",
      category: "Estrutura em Árvore",
      checked: false,
    },
    {
      id: 74,
      text: "Navegação por teclado segue o padrão esperado",
      description:
        'Para mais infomações, consulte as orientações da Cartilha em "Mais informações",',
      category: "Booleano",
      checked: false,
    },

    // Caixas de Diálogo — Conteúdo
    {
      id: 55,
      text: 'Usa role="dialog" (não alertdialog)',
      description:
        'Utilize role="dialog" para modais de conteúdo, formulários ou informações não críticas',
      category: "Caixas de Diálogo — Conteúdo",
      checked: false,
    },
    {
      id: 56,
      text: 'Usa aria-modal="true" para bloquear o fundo',
      description:
        "Use aria-modal apenas quando o foco e a interação com o fundo forem bloqueados",
      category: "Caixas de Diálogo — Conteúdo",
      checked: false,
    },
    {
      id: 57,
      text: "Possui título e descrição claros",
      description:
        "Título via aria-labelledby e descrição via aria-describedby",
      category: "Caixas de Diálogo — Conteúdo",
      checked: false,
    },
    {
      id: 58,
      text: "Foco move para o diálogo ao abrir",
      description:
        "O foco inicial deve ir para o título ou primeiro elemento interativo",
      category: "Caixas de Diálogo — Conteúdo",
      checked: false,
    },
    {
      id: 59,
      text: "Focus trap ativo",
      description:
        "O foco deve permanecer dentro do diálogo enquanto estiver aberto",
      category: "Caixas de Diálogo — Conteúdo",
      checked: false,
    },
    {
      id: 60,
      text: "Pode ser fechado por ação explícita do usuário",
      description: "Fechar via botão, Esc ou ação clara",
      category: "Caixas de Diálogo — Conteúdo",
      checked: false,
    },
    {
      id: 61,
      text: "Foco retorna ao elemento acionador",
      description:
        "Ao fechar, o foco deve retornar ao botão ou link que abriu o diálogo",
      category: "Caixas de Diálogo — Conteúdo",
      checked: false,
    },
    {
      id: 62,
      text: "Conteúdo e ações são anunciados corretamente",
      description:
        "Leitor de tela deve anunciar título, texto e botões disponíveis",
      category: "Caixas de Diálogo — Conteúdo",
      checked: false,
    },
    {
      id: 75,
      text: "Navegação por teclado segue o padrão esperado",
      description:
        'Para mais infomações, consulte as orientações da Cartilha em "Mais informações",',
      category: "Booleano",
      checked: false,
    },

    // Caixas de Diálogo Modais
    {
      id: 63,
      text: 'Usa role="alertdialog" apenas quando necessário',
      description:
        "Utilize alertdialog somente para mensagens críticas que exigem atenção imediata",
      category: "Caixas de Diálogo — Alerta/Erro",
      checked: false,
    },
    {
      id: 64,
      text: "Mensagem principal anunciada imediatamente",
      description:
        "O leitor de tela deve anunciar o alerta assim que o diálogo for aberto",
      category: "Caixas de Diálogo — Alerta/Erro",
      checked: false,
    },
    {
      id: 65,
      text: "Foco inicial no texto do alerta ou ação principal",
      description:
        "O foco deve ir diretamente para a mensagem ou botão primário",
      category: "Caixas de Diálogo — Alerta/Erro",
      checked: false,
    },
    {
      id: 66,
      text: "Ações claramente rotuladas",
      description:
        'Botões como "Confirmar", "Cancelar" ou "Excluir" devem ser explícitos',
      category: "Caixas de Diálogo — Alerta/Erro",
      checked: false,
    },
    {
      id: 67,
      text: "Não depende apenas de cor ou ícone para indicar erro",
      description:
        "Mensagens de erro devem ser textuais e compreensíveis",
      category: "Caixas de Diálogo — Alerta/Erro",
      checked: false,
    },
    {
      id: 68,
      text: "Fechamento não ocorre automaticamente",
      description:
        "Alertas não devem desaparecer sem ação do usuário",
      category: "Caixas de Diálogo — Alerta/Erro",
      checked: false,
    },
    {
      id: 69,
      text: "Retorno de foco após resolução do alerta",
      description:
        "Após fechar o alerta, o foco deve retornar ao contexto anterior",
      category: "Caixas de Diálogo — Alerta/Erro",
      checked: false,
    },
    {
      id: 76,
      text: "Navegação por teclado segue o padrão esperado",
      description:
        'Para mais infomações, consulte as orientações da Cartilha em "Mais informações",',
      category: "Booleano",
      checked: false,
    },

    // Menu de abas
    {
      id: 77,
      text: 'Usa role="tablist" no contêiner das abas',
      description:
        'O elemento que agrupa as abas (ex.: <ul> ou <nav>) deve possuir role="tablist" para indicar ao leitor de tela que se trata de um conjunto de abas relacionadas',
      category: "Menu de Abas",
      checked: false,
    },
    {
      id: 78,
      text: 'Cada aba usa role="tab"',
      description:
        'Cada elemento interativo da aba (ex.: <button> ou <a>) deve possuir role="tab", representando uma opção selecionável dentro do conjunto de abas',
      category: "Menu de Abas",
      checked: false,
    },
    {
      id: 79,
      text: 'Painéis de conteúdo usam role="tabpanel"',
      description:
        'O contêiner que apresenta o conteúdo relacionado à aba selecionada deve utilizar role="tabpanel" e estar associado à aba correspondente',
      category: "Menu de Abas",
      checked: false,
    },
    {
      id: 80,
      text: 'Atributo aria-selected indica a aba ativa',
      description:
        'Utilize aria-selected="true" para a aba atualmente selecionada e aria-selected="false" para as demais abas',
      category: "Menu de Abas",
      checked: false,
    },
    {
      id: 81,
      text: "Abas possuem id único associado ao painel",
      description:
        'Cada aba deve possuir um id único que seja referenciado pelo atributo aria-labelledby no elemento com role="tabpanel"',
      category: "Menu de Abas",
      checked: false,
    },
    {
      id: 82,
      text: "Estrutura semântica do menu de abas é clara",
      description:
        "Recomenda-se estruturar o componente utilizando elementos semânticos como <nav>, <ul>, <li>, <button> ou <a> para as abas e <section> ou <div> para os painéis de conteúdo",
      category: "Menu de Abas",
      checked: false,
    },
    {
      id: 83,
      text: "Painel de conteúdo possui título semântico",
      description:
        "Quando <section> for utilizado como painel de conteúdo, recomenda-se incluir um título semântico (<h1>, <h2>, etc.) que represente o conteúdo da aba",
      category: "Menu de Abas",
      checked: false,
    },
    {
      id: 84,
      text: "Apenas uma aba pode estar selecionada",
      description:
        "Somente uma aba deve possuir aria-selected='true' por vez, garantindo que apenas um painel de conteúdo esteja ativo",
      category: "Menu de Abas",
      checked: false,
    },
    {
      id: 85,
      text: "Navegação por setas não altera o conteúdo automaticamente",
      description:
        "Ao navegar entre abas com as setas direcionais, o foco deve se mover entre as abas, mas o conteúdo não deve ser alterado automaticamente",
      category: "Menu de Abas",
      checked: false,
    },
    {
      id: 86,
      text: "Conteúdo muda apenas após ação do usuário",
      description:
        "O painel de conteúdo deve ser alterado apenas após ação explícita do usuário, como pressionar Enter ou Espaço na aba focada",
      category: "Menu de Abas",
      checked: false,
    },
    {
      id: 87,
      text: "Foco inicial vai para a aba selecionada",
      description:
        "Ao acessar o menu de abas via teclado, o foco deve ser posicionado na aba atualmente selecionada",
      category: "Menu de Abas",
      checked: false,
    },
    {
      id: 88,
      text: "Leitor de tela anuncia estado e posição da aba",
      description:
        "O leitor de tela deve anunciar o nome da aba, seu estado (selecionada ou não) e sua posição no conjunto de abas (ex.: “2 de 5”)",
      category: "Menu de Abas",
      checked: false,
    },
    {
      id: 89,
      text: "Navegação por teclado segue o padrão esperado",
      description:"Para mais infomações, consulte as orientações da Cartilha em 'Mais informações'",
      category: "Menu de Abas",
      checked: false,
    },

    // Seção de Filtros Ativos
    {
      id: 90,
      text: "Navegação por teclado segue o padrão esperado",
      description:
        'Para mais infomações, consulte as orientações da Cartilha em "Mais informações",',
      category: "Filtros Ativos",
      checked: false,
    },
    {
      id: 91,
      text: "Filtros ativos são apresentados em um contêiner semântico",
      description:
        "Utilize um contêiner semântico, como <ul>, para representar a lista de filtros atualmente aplicados, permitindo que tecnologias assistivas identifiquem o conjunto corretamente",
      category: "Filtros Ativos",
      checked: false,
    },
    {
      id: 92,
      text: "Cada filtro possui texto visível e descritivo",
      description:
        "O texto do filtro deve indicar claramente o critério e o valor aplicado, como por exemplo: 'Zona: Rural' ou 'Situação: Ativo'",
      category: "Filtros Ativos",
      checked: false,
    },
    {
      id: 93,
      text: "Cada filtro possui botão para remoção individual",
      description:
        "Cada filtro ativo deve possuir um botão explícito que permita sua remoção individual",
      category: "Filtros Ativos",
      checked: false,
    },
    {
      id: 94,
      text: "Botão de remoção possui aria-label descritivo",
      description:
        "O botão de remoção deve possuir aria-label descrevendo qual filtro será removido, por exemplo: 'Remover filtro Zona Rural'",
      category: "Filtros Ativos",
      checked: false,
    },
    {
      id: 95,
      text: "Texto do filtro pode ser associado via aria-labelledby",
      description:
        "Quando necessário, utilize aria-labelledby para associar o texto descritivo do filtro ao seu contêiner ou botão de remoção",
      category: "Filtros Ativos",
      checked: false,
    },
    {
      id: 96,
      text: "Ícones decorativos usam aria-hidden",
      description:
        'Ícones utilizados apenas para fins visuais devem possuir aria-hidden="true" para que não sejam anunciados por leitores de tela',
      category: "Filtros Ativos",
      checked: false,
    },
    {
      id: 97,
      text: "Cada filtro ativo é compreensível isoladamente",
      description:
        "O texto de cada filtro deve ser compreensível mesmo quando lido fora de contexto, permitindo que usuários de leitores de tela entendam o critério aplicado",
      category: "Filtros Ativos",
      checked: false,
    },
    {
      id: 98,
      text: "A ação de remoção é clara para leitores de tela",
      description:
        "O botão de remoção deve indicar claramente sua função e qual filtro será removido, garantindo compreensão para usuários de tecnologias assistivas",
      category: "Filtros Ativos",
      checked: false,
    },
    {
      id: 99,
      text: "Componente é totalmente operável via teclado",
      description:
        "Usuários devem conseguir navegar entre os filtros e seus botões de remoção utilizando a tecla Tab e ativar a remoção com Enter ou Espaço",
      category: "Filtros Ativos",
      checked: false,
    },
    {
      id: 100,
      text: "Lista de filtros ativos é anunciada corretamente",
      description:
        "Leitores de tela devem anunciar o conjunto como uma lista, indicando a quantidade de filtros ativos, por exemplo: 'Filtros ativos, lista com 3 itens'",
      category: "Filtros Ativos",
      checked: false,
    },
    {
      id: 101,
      text: "Atualização da lista é percebida por leitores de tela",
      description:
        "Após a remoção de um filtro, a atualização da lista deve ser percebida pelas tecnologias assistivas",
      category: "Filtros Ativos",
      checked: false,
    },
    {
      id: 102,
      text: "Foco é reposicionado após remover um filtro",
      description:
        "Após a remoção de um filtro, o foco deve ser movido para o próximo filtro disponível, para o anterior ou para um elemento apropriado do contexto caso não existam mais filtros ativos",
      category: "Filtros Ativos",
      checked: false,
    },
    // Menu de Navegação Oculto
    {
      id: 103,
      text: "Menu de navegação oculta utiliza contêiner semântico",
      description:
        "Utilize o elemento <nav> para identificar a região de navegação oculta, permitindo que tecnologias assistivas reconheçam corretamente o propósito do componente",
      category: "Menu de Navegação Oculto",
      checked: false,
    },
    {
      id: 104,
      text: "Menu de navegação oculta possui rótulo acessível",
      description:
        "O elemento <nav> deve possuir um rótulo acessível por meio de aria-label ou aria-labelledby, permitindo que leitores de tela identifiquem corretamente a função da região",
      category: "Menu de Navegação Oculto",
      checked: false,
    },
    {
      id: 105,
      text: "Lista de links é representada por estrutura semântica",
      description:
        "Os links da navegação oculta devem ser organizados utilizando elementos <ul> e <li>, garantindo que tecnologias assistivas identifiquem corretamente o conjunto como uma lista de opções de navegação",
      category: "Menu de Navegação Oculto",
      checked: false,
    },
    {
      id: 106,
      text: "Links possuem texto descritivo e compreensível",
      description:
        "Cada link deve possuir um texto que identifique claramente o destino da navegação, como por exemplo: 'Ir para conteúdo principal' ou 'Ir para seção Animal'",
      category: "Menu de Navegação Oculto",
      checked: false,
    },
    {
      id: 107,
      text: "Texto dos links é compreensível fora de contexto",
      description:
        "O texto de cada link deve fazer sentido mesmo quando lido isoladamente por leitores de tela ou em listas de links",
      category: "Menu de Navegação Oculto",
      checked: false,
    },
    {
      id: 108,
      text: "Links tornam-se visíveis ao receber foco",
      description:
        "Quando um link da navegação oculta recebe foco, ele deve tornar-se visível na interface, permitindo que o usuário identifique claramente sua localização",
      category: "Menu de Navegação Oculto",
      checked: false,
    },
    {
      id: 109,
      text: "Destino dos links possui identificador único",
      description:
        "Cada link deve apontar para uma região da página identificada por um id único, garantindo que o navegador consiga mover corretamente o foco para o destino",
      category: "Menu de Navegação Oculto",
      checked: false,
    },
    {
      id: 110,
      text: "Menu de navegação oculta é acessível por teclado",
      description:
        "Usuários devem conseguir acessar o menu utilizando a tecla Tab e navegar entre seus links utilizando a ordem natural de tabulação",
      category: "Menu de Navegação Oculto",
      checked: false,
    },
    {
      id: 111,
      text: "Links podem ser ativados por Enter ou Espaço",
      description:
        "A ativação dos links deve ocorrer ao pressionar Enter ou Espaço, movendo o foco diretamente para a região correspondente da página",
      category: "Menu de Navegação Oculto",
      checked: false,
    },
    {
      id: 112,
      text: "Foco é movido corretamente para o destino",
      description:
        "Após a ativação de um link, o foco deve ser movido para a região correspondente da página, permitindo que o usuário continue a navegação de forma natural",
      category: "Menu de Navegação Oculto",
      checked: false,
    },
    {
      id: 113,
      text: "Tecnologias assistivas anunciam os links do menu",
      description:
        "Leitores de tela devem conseguir identificar a região de navegação oculta e anunciar corretamente os links disponíveis para navegação",
      category: "Menu de Navegação Oculto",
      checked: false,
    },
    {
      id: 114,
      text: "Navegação por teclado segue o padrão esperado",
      description: "A navegação entre os links deve seguir a ordem natural de tabulação, sem saltos inesperados ou loops infinitos. Para mais orientações, verificar o item 2.17 Menu de Navegação Oculto",
      category: "Menu de Navegação Oculto",
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
  const progress =
    totalItems > 0
      ? Math.round((completedItems / totalItems) * 100)
      : 0;

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
                navigate("/personalizar/camada-02")
              }
              className="hover:text-[#00b894] transition-colors"
            >
              Camada 2
            </button>
            <span className="hidden sm:inline">›</span>
            <span className="text-gray-900">Checklist</span>
          </div>

          <button
            onClick={() => navigate("/personalizar/camada-02")}
            className="flex items-center gap-2 px-3 py-2 bg-[#00b894] text-white rounded-lg transition-colors hover:bg-[#00a380] sm:bg-transparent sm:text-gray-600 sm:hover:text-[#00b894] sm:hover:bg-white flex-shrink-0"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Voltar</span>
          </button>
        </div>

        {/* Botão Mais Informações */}
        <a
          href="https://docs.google.com/document/d/1kPfQyfptKh27_7PSyYxCl2j-122Bk0fgAX2dKliQZ00/edit?tab=t.0#heading=h.5a9f49obfuir"
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
                  Ótimo progresso! 🎉
                </h3>
                <p className="text-gray-300 max-w-xl">
                  Você está dominando a criação de componentes
                  acessíveis. Continue assim para garantir uma
                  experiência inclusiva para todos os usuários!
                </p>
              </div>
              <div className="text-6xl opacity-50">⚡</div>
            </div>

            <div className="flex gap-4 mt-6">
              <button
                onClick={() =>
                  navigate("/personalizar/camada-03")
                }
                className="bg-[#00b894] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#00a380] transition-colors"
              >
                Continuar aprendizado
              </button>
              <a
                href="https://docs.google.com/document/d/1kPfQyfptKh27_7PSyYxCl2j-122Bk0fgAX2dKliQZ00/edit?tab=t.0#heading=h.5a9f49obfuir"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 text-white px-6 py-3 rounded-lg font-medium hover:bg-white/20 transition-colors"
              >
                Ver orientações extras
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