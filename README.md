
# Checklist de Acessibilidade

Aplicação web em português para apoiar a revisão de acessibilidade de interfaces. Permite selecionar categorias, montar checklists personalizados e acompanhar o progresso dos itens atendidos.

## Organização dos checklists

As orientações estão divididas em três camadas:

| Camada | Foco |
| --- | --- |
| 1 — Fundamentos Essenciais | Conteúdo, textos, links, imagens, tabelas e outros elementos da interface. |
| 2 — Padronização e Componentização | Construção de componentes, formulários, estados e interações. |
| 3 — Navegação | Navegação por teclado, ordem e gestão de foco e interação com tecnologias assistivas. |

Em cada camada, é possível escolher as categorias que serão avaliadas, marcar itens e subitens e visualizar o percentual de conclusão. Os checklists também oferecem referências complementares e, quando disponíveis, imagens de apoio e variações de telas de busca e visualização.

Os dados são definidos localmente em `src/mocks/`. O progresso é mantido em memória durante o uso da tela e não é salvo entre sessões ou recarregamentos.

## Tecnologias

- React 18 e TypeScript.
- Vite com o plugin React SWC.
- React Router para navegação.
- CSS Modules e estilos globais.
- Lucide React para ícones.

## Executar localmente

É necessário ter Node.js e npm instalados. O ambiente Docker do projeto utiliza Node.js 22.

```sh
npm install
npm run dev
```

Acesse [http://localhost:3000/acessibilidade/](http://localhost:3000/acessibilidade/). Se a porta estiver ocupada, consulte o endereço informado pelo Vite no terminal.

## Executar com Docker

Com Docker e Docker Compose disponíveis:

```sh
docker compose up --build
```

Acesse [http://localhost:3005/acessibilidade/](http://localhost:3005/acessibilidade/). O Compose monta o código local no contêiner para desenvolvimento.

Para encerrar:

```sh
docker compose down
```

## Gerar a versão de produção

```sh
npm run build
```

Os arquivos gerados ficam em `build/`.

A aplicação está configurada para o caminho base `/acessibilidade/`, tanto no Vite (`vite.config.ts`) quanto no roteador (`src/App.tsx`). Para publicar em outro caminho, ajuste os dois locais. A hospedagem deve servir o `index.html` da aplicação ao acessar diretamente suas rotas.

## Estrutura do projeto

```text
src/
├── components/
│   ├── layouts/            # Estrutura compartilhada, cabeçalho e rodapé
│   └── ui/                 # Componentes reutilizáveis
├── hooks/                 # Comportamentos compartilhados de navegação
├── mocks/                 # Camadas, categorias e conteúdo dos checklists
├── pages/
│   ├── Home/               # Página inicial
│   ├── Camadas/            # Seleção da camada
│   ├── PersonalizarCamada/ # Seleção das categorias
│   ├── ChecklistCamada/    # Checklist, variações e cálculo de progresso
│   └── Sobre/              # Apresentação da proposta
├── styles/                # Estilos globais
├── App.tsx                # Definição das rotas
└── main.tsx               # Entrada da aplicação
```

## Design e atribuições

O projeto foi iniciado a partir do [design no Figma](https://www.figma.com/design/PyIFX2DolwaLIeNe6HznWo/Site-de-Checklists-de-Acessibilidade).

As atribuições de componentes e imagens estão em [src/Attributions.md](src/Attributions.md).
