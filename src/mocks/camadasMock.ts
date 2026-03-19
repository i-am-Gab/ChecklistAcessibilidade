  import {
    Home,
    Grid3x3,
    Zap,
  } from "lucide-react";
  
  export const camadas = [
    {
      id: 1,
      nivel: 1,
      titulo: "Fundamentos Essenciais",
      descricao:
        "Esta camada concentra-se principalmente na forma como o conteúdo é escrito, estruturado e apresentado, abrangendo textos, links, imagens, tabelas, gráficos, arquivos para download e elementos interativos. As orientações aqui descritas são transversais a todo o sistema e devem ser consideradas desde a concepção do conteúdo até sua implementação técnica.",
      path: "/personalizar/1",
      icon: Home,
    },
    {
      id: 2,
      nivel: 2,
      titulo: "Padronização/-Componentização",
      descricao:
        "Esta camada concentra-se principalmente na implementação técnica dos componentes da interface, abordando como formulários, botões, seleções, diálogos, estruturas dinâmicas e elementos complexos devem ser construídos para assegurar compatibilidade com leitores de tela, navegação integral por teclado e comunicação adequada de estados, instruções e feedbacks.",
      path: "/personalizar/2",
      icon: Grid3x3,
    },
    {
      id: 3,
      nivel: 3,
      titulo: "Navegação",
      descricao:
        "Esta camada concentra-se no comportamento do foco, tanto em sua manifestação visual (foco visível) quanto em sua exposição programática (foco acessível), estabelecendo critérios claros para ordem de navegação, gestão de foco em componentes dinâmicos e comunicação adequada com tecnologias assistivas, em conformidade com a ABNT NBR 17225 e com as boas práticas internacionais de acessibilidade digital.",
      path: "/personalizar/3",
      icon: Zap,
    },
  ];