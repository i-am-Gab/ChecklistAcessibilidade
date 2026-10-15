
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

Acesse [http://localhost:3000/ChecklistAcessibilidade/](http://localhost:3000/ChecklistAcessibilidade/). Se a porta estiver ocupada, consulte o endereço informado pelo Vite no terminal.

## Executar com Docker

Com Docker e Docker Compose disponíveis:

```sh
docker compose up --build
```

Acesse [http://localhost:3005/ChecklistAcessibilidade/](http://localhost:3005/ChecklistAcessibilidade/). O Compose monta o código local no contêiner para desenvolvimento.

Para encerrar:

```sh
docker compose down
```

## Gerar a versão de produção

```sh
npm run build
```

Os arquivos gerados ficam em `build/`.

A aplicação está configurada para o caminho base `/ChecklistAcessibilidade/`, no Vite (`vite.config.ts`). O roteador utiliza automaticamente esse mesmo caminho. Para publicar em outro caminho, ajuste o `base` no Vite. A hospedagem deve servir o `index.html` da aplicação ao acessar diretamente suas rotas.

## Publicar no GitHub Pages

Em **Settings → Pages → Build and deployment**, selecione **GitHub Actions** como origem. Depois de enviar as alterações para `main`, o workflow `.github/workflows/deploy-pages.yml` instala as dependências, gera o build e publica a pasta `build/`.

O endereço esperado é [https://i-am-gab.github.io/ChecklistAcessibilidade/](https://i-am-gab.github.io/ChecklistAcessibilidade/).

O workflow também gera `404.html` a partir da entrada da aplicação para permitir abrir e recarregar rotas internas no Pages. Nessas visitas diretas, o servidor responde com status HTTP 404, mas o React carrega a tela correspondente.

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
