import {
  categoryIdFromName,
  getCategoriesForLayer,
  type CategoryId,
  type LayerId,
} from "../../data/categories";
import type {
  VariacaoTelaBusca,
  VariacaoTelaVisualizacao,
} from "../../mocks/checklists.mock";

export interface ChecklistSelection {
  layer: LayerId;
  screen?: string;
  // Ausência inclui todas as categorias; uma lista vazia não inclui nenhuma.
  categories?: CategoryId[];
  searchVariation: VariacaoTelaBusca;
  viewVariation: VariacaoTelaVisualizacao;
}

const screens = new Set(["busca", "cadastro", "edicao", "visualizacao", "outras"]);
const configurationKeys = ["tela", "categorias", "busca", "visualizacao"];
const defaultSearchVariation: VariacaoTelaBusca = "Com Tabela de Dados";
const defaultViewVariation: VariacaoTelaVisualizacao = "Com Abas, Formulário e Cards";

function validScreen(value: unknown): string | undefined {
  return typeof value === "string" && screens.has(value) ? value : undefined;
}

function canonicalCategories(layer: LayerId, values: readonly unknown[], legacy = false): CategoryId[] {
  const requested = new Set(values.map((value) => legacy ? categoryIdFromName(value) : value));
  return getCategoriesForLayer(layer).map((category) => category.id).filter((id) => requested.has(id));
}

function readLegacyState(layer: LayerId, value: unknown): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};
  const state = value as Record<string, unknown>;
  // Estados antigos não tinham camada. Quando há um discriminador, ele precisa
  // corresponder à rota; categorias também são sempre limitadas à camada atual.
  for (const key of ["layer", "camada", "camadaId"]) {
    if (state[key] !== undefined && state[key] !== layer && state[key] !== String(layer)) return {};
  }
  if (layer !== 1 && validScreen(state.tipoTela)) return {};
  return state;
}

/** Lê apenas a configuração compartilhável, nunca as marcações de requisitos. */
export function readChecklistSelection(
  layer: LayerId,
  search: string,
  legacyState?: unknown,
  screenFromPath?: string,
): ChecklistSelection {
  const params = new URLSearchParams(search);
  // Uma URL com configuração se basta: um estado de navegação antigo não pode
  // acrescentar filtros ausentes ao link recebido por outra pessoa.
  const hasConfiguration = configurationKeys.some((key) => params.has(key));
  const legacy: Record<string, unknown> = hasConfiguration ? {} : readLegacyState(layer, legacyState);
  const categories = params.has("categorias")
    ? canonicalCategories(layer, (params.get("categorias") ?? "").split(",").map((id) => id.trim()))
    : Array.isArray(legacy.categoriasSelecionadas)
      ? canonicalCategories(layer, legacy.categoriasSelecionadas, true)
      : undefined;
  const searchValue = params.get("busca");
  const viewValue = params.get("visualizacao");

  return {
    layer,
    screen: layer === 1
      ? validScreen(params.has("tela") ? params.get("tela") : screenFromPath ?? legacy.tipoTela)
      : undefined,
    categories,
    searchVariation: searchValue === "cards" || (!params.has("busca") && legacy.variacaoTelaBusca === "Com Card de Informações")
      ? "Com Card de Informações" : defaultSearchVariation,
    viewVariation: viewValue === "sem-abas" || (!params.has("visualizacao") && legacy.variacaoTelaVisualizacao === "Sem Abas e Com Formulários")
      ? "Sem Abas e Com Formulários" : defaultViewVariation,
  };
}

function selectionSearch(selection: ChecklistSelection, includeScreen: boolean): string {
  const params = new URLSearchParams();
  const screen = selection.layer === 1 ? validScreen(selection.screen) : undefined;
  if (includeScreen && screen) params.set("tela", screen);
  if (selection.categories !== undefined) {
    params.set("categorias", canonicalCategories(selection.layer, selection.categories).join(","));
  }
  if (selection.searchVariation === "Com Card de Informações") params.set("busca", "cards");
  if (selection.viewVariation === "Sem Abas e Com Formulários") params.set("visualizacao", "sem-abas");
  const search = params.toString();
  return search ? `?${search}` : "";
}

/** Caminho relativo ao basename do roteador, sem dados pessoais de progresso. */
export function getChecklistUrl(selection: ChecklistSelection): string {
  return `/checklists/${selection.layer}${selectionSearch(selection, true)}`;
}

export function getPersonalizationUrl(selection: ChecklistSelection): string {
  const screen = selection.layer === 1 ? validScreen(selection.screen) : undefined;
  return `/personalizar/${selection.layer}${screen ? `/${screen}` : ""}${selectionSearch(selection, false)}`;
}
