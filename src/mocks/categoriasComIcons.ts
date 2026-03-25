import {
  Languages,
  FileText,
  Type,
  Link,
  Image,
  BarChart3,
  FolderOpen,
  MousePointerClick,
  Keyboard,
  Square,
  Eye,
  Smartphone,
  LayoutTemplate,
  ClipboardList,
  Hash,
  ChevronDown,
  Search,
  Calendar,
  Upload,
  PlusCircle,
  CheckSquare,
  ToggleLeft,
  GitBranch,
  MessageSquare,
  Focus,
  Layout,
  Bell,
  FileEdit,
  Pencil,
  BookOpen,
  LucideIcon,
} from "lucide-react";

// Mapa de ícones por ID de categoria
export const iconMap: Record<string, LucideIcon> = {
  // CAMADA 01
  linguagem: Languages,
  "qualidade-textual": FileText,
  tipografia: Type,
  links: Link,
  imagens: Image,
  "tabelas-graficos": BarChart3,
  arquivos: FolderOpen,
  "elementos-interativos": MousePointerClick,
  "navegacao-teclado": Keyboard,
  modais: Square,
  "estrutura-documento": LayoutTemplate,
  formularios: ClipboardList,
  "percepcao-visual": Eye,
  "uso-mobile": Smartphone,
  "campos-texto": Type,
  "campos-numericos": Hash,
  "campos-selecao": ChevronDown,
  "selecao-pesquisavel": Search,
  "campos-data": Calendar,
  "upload-arquivos": Upload,
  botoes: MousePointerClick,
  "selecao-multipla": CheckSquare,
  booleano: ToggleLeft,

  // CAMADA 02
  "campos-dinamicos": PlusCircle,
  "card-informacoes": FileText,
  "estrutura-arvore": GitBranch,
  "caixas-dialogo-conteudo": MessageSquare,
  "caixas-dialogo-alerta": Square,

  // CAMADA 03
  "requisitos-tecnicos": Focus,
  "tela-principal": Layout,
  "tela-notificacoes": Bell,
  "tela-busca": Search,
  "tela-cadastro": FileEdit,
  "tela-edicao": Pencil,
  "tela-visualizacao": CheckSquare,
  "tela-perfil-usuario": Layout,
  "tela-consulta-externa": BookOpen,
};

export const camadaInfo = {
  1: {
    titulo: "Personalizar Checklist Camada 1",
    descricao:
      "Selecione os pontos que deseja adicionar checklist de acessibilidade básico. Personalize sua jornada de desenvolvimento de acordo com as particularidades da sua tarefa atual.",
    href: "/checklists/1",
  },
  2: {
    titulo: "Personalizar Checklist Camada 2",
    descricao:
      "Selecione os campos e/ou elementos personalizados que deseja incluir em seu checklist. Garanta a acessibilidade técnica em cada elemento e campo da interface.",
    href: "/checklists/2",
  },
  3: {
    titulo: "Personalizar Checklist Camada 3",
    descricao:  
      "Selecione as telas e fluxos de navegação que deseja incluir em seu checklist. Garanta uma experiência de navegação acessível em todo o sistema.",
    href: "/checklists/3",
  },
};
