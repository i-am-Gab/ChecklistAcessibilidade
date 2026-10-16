import type { LayerId } from "../../data/categories";

export type CamadaId = LayerId;

type ActionConfig = {
  label: string;
  type: "navigate" | "link" | "mailto";
  value: string;
};

type CompletionConfig = {
  title: string;
  description: string;
  icon: string;
  primaryAction?: ActionConfig;
  secondaryAction?: ActionConfig;
};

export type ChecklistLayerConfig = {
  id: CamadaId;
  label: string;
  backRoute: string;
  infoUrl: string;
  showInfoBox?: boolean;
  allowVariations?: boolean;
  completion: CompletionConfig;
};

export const checklistConfig: Record<
  CamadaId,
  ChecklistLayerConfig
> = {
  1: {
    id: 1,
    label: "Camada 1",
    backRoute: "/personalizar/1",
    infoUrl:
      "https://docs.google.com/document/d/1kPfQyfptKh27_7PSyYxCl2j-122Bk0fgAX2dKliQZ00/edit?tab=t.0#heading=h.q7xvzn7l1ba",
    completion: {
      title: "Isso aí! 🎉",
      description:
        "Você está dominando a Base de Conhecimento. Continue assim para garantir uma experiência inclusiva para todos os usuários!",
      icon: "📚",
      primaryAction: {
        label: "Continuar Aprendizado",
        type: "navigate",
        value: "/personalizar/2",
      },
      secondaryAction: {
        label: "Ver Recursos Extras",
        type: "link",
        value:
          "https://docs.google.com/document/d/1kPfQyfptKh27_7PSyYxCl2j-122Bk0fgAX2dKliQZ00/edit?usp=sharing",
      },
    },
  },

  2: {
    id: 2,
    label: "Camada 2",
    backRoute: "/personalizar/2",
    infoUrl:
      "https://docs.google.com/document/d/1kPfQyfptKh27_7PSyYxCl2j-122Bk0fgAX2dKliQZ00/edit?tab=t.0#heading=h.5a9f49obfuir",
    completion: {
      title: "Ótimo progresso! 🎉",
      description:
        "Você está dominando os componentes interativos acessíveis. Continue assim para garantir uma experiência inclusiva para todos os usuários!",
      icon: "⚡",
      primaryAction: {
        label: "Continuar Aprendizado",
        type: "navigate",
        value: "/personalizar/3",
      },
      secondaryAction: {
        label: "Ver Recursos Extras",
        type: "link",
        value:
          "https://docs.google.com/document/d/1kPfQyfptKh27_7PSyYxCl2j-122Bk0fgAX2dKliQZ00/edit?usp=sharing",
      },
    },
  },

  3: {
    id: 3,
    label: "Camada 3",
    backRoute: "/personalizar/3",
    infoUrl:
      "https://docs.google.com/document/d/1kPfQyfptKh27_7PSyYxCl2j-122Bk0fgAX2dKliQZ00/edit?tab=t.0#heading=h.im7nuipffw1q",
    showInfoBox: true,
    allowVariations: true,
    completion: {
      title: "Excelente trabalho! 🎯",
      description:
        "Você está dominando os conceitos avançados de navegação e acessibilidade. Continue assim para garantir a conformidade completa!",
      icon: "🚀",
      primaryAction: {
        label: "Avaliar Conteúdo",
        type: "mailto",
        value:
          "mailto:gabrielaguiar.ti@fundecc.org.br?subject=Avaliação Checklists Acessiblilidade",
      },
      secondaryAction: {
        label: "Ver Recursos Extras",
        type: "link",
        value:
          "https://docs.google.com/document/d/1kPfQyfptKh27_7PSyYxCl2j-122Bk0fgAX2dKliQZ00/edit?usp=sharing",
      },
    },
  },
};
