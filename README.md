# Checklist de Acessibilidade

Aplicação web em português para apoiar a revisão de acessibilidade de interfaces. Permite selecionar categorias, montar checklists personalizados e acompanhar o progresso dos itens atendidos.

O projeto reúne orientações para quem desenvolve, projeta ou revisa interfaces, organizando a avaliação em etapas que abrangem conteúdo, componentes e navegação.

## Funcionalidades

- Seleção entre três camadas de avaliação.
- Personalização do checklist por categorias.
- Escolha do tipo de tela na camada 01: Busca, Cadastro, Edição, Visualização ou Outras Telas.
- Personalização por grupos de itens obrigatórios, comuns e demais itens, com resumo da seleção e opção de resetar.
- Marcação de itens, subitens e categorias completas.
- Acompanhamento do progresso dos itens exibidos.
- Salvamento automático do progresso neste navegador, separado por camada e cenário, com confirmação para reiniciar.
- Links que preservam o cenário, as categorias e as variações do checklist.
- Consulta a referências e imagens de apoio, quando disponíveis.
- Seleção de variações para telas de busca e visualização na camada de navegação.

## Organização dos checklists

As orientações estão divididas em três camadas:

| Camada | Foco |
| --- | --- |
| 1 — Fundamentos Essenciais | Conteúdo, textos, links, imagens, tabelas e outros elementos da interface. |
| 2 — Padronização e Componentização | Construção de componentes, formulários, estados e interações. |
| 3 — Navegação | Navegação por teclado, ordem e gestão de foco e interação com tecnologias assistivas. |

Em cada camada, é possível escolher as categorias que serão avaliadas, marcar itens e subitens e visualizar o percentual de conclusão. Os checklists também oferecem referências complementares e, quando disponíveis, imagens de apoio e variações de telas de busca e visualização.

As categorias são definidas em um catálogo único em `src/data/categories.ts`, com identificadores fixos independentes dos títulos. O conteúdo dos requisitos permanece em `src/mocks/checklists.mock.ts`.

O progresso é salvo no armazenamento local do navegador por camada e cenário. As marcações continuam disponíveis ao recarregar ou voltar à personalização. O botão **Reiniciar progresso** solicita confirmação e limpa as marcações daquele contexto, incluindo categorias ocultas, preservando os filtros e as variações. Caso o armazenamento esteja indisponível, a interface informa essa condição e mantém o progresso em memória durante a navegação.

O botão **Compartilhar** abre as opções do dispositivo quando o navegador oferece esse recurso; quando não é possível, disponibiliza o link por cópia. O botão **Copiar link** permanece como alternativa. As confirmações aparecem no canto da tela por seis segundos, com contagem regressiva, pausa durante a interação e opção de fechar. Também são anunciadas para leitores de tela. O cenário, os filtros e as variações fazem parte da URL; as marcações pessoais ficam no navegador e não fazem parte do link.

Na camada 01, o fluxo é **selecionar tipo de tela → personalizar elementos → gerar checklist**. A classificação por tela fica em `src/pages/PersonalizarCamada/tiposTela.config.ts`: apenas os obrigatórios são pré-selecionados, e os demais começam desmarcados. Cadastro, Edição e Visualização compartilham as mesmas regras. Categorias não classificadas como obrigatórias ou comuns aparecem em “Demais Itens”. A opção de resetar restaura a seleção inicial do tipo de tela.

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

O build verifica os tipos do TypeScript antes de compilar. Para executar somente essa verificação, use `npm run typecheck`.

A aplicação utiliza o caminho base `/ChecklistAcessibilidade/`, definido em `vite.config.ts` e compartilhado automaticamente com o roteador.

## Estrutura do projeto

As verificações de responsividade e acessibilidade e as instruções para repetir a auditoria local estão em [docs/validacao-responsividade.md](docs/validacao-responsividade.md).

```text
src/
├── components/
│   ├── layouts/            # Estrutura compartilhada, cabeçalho e rodapé
│   └── ui/                 # Componentes reutilizáveis
├── data/                   # Catálogo único e tipado das categorias
├── features/checklist/     # Configuração por URL e armazenamento do progresso
├── hooks/                 # Comportamentos compartilhados de navegação
├── mocks/                 # Conteúdo dos checklists, camadas e ícones
├── pages/
│   ├── Home/               # Página inicial
│   ├── Camadas/            # Seleção da camada
│   ├── PersonalizarCamada/ # Seleção das categorias
│   ├── ChecklistCamada/    # Checklist, variações e cálculo de progresso
│   └── Sobre/              # Apresentação da proposta
├── index.css              # Estilos globais
├── App.tsx                # Definição das rotas
└── main.tsx               # Entrada da aplicação
```

## Design e atribuições

O projeto foi iniciado a partir do [design no Figma](https://www.figma.com/design/PyIFX2DolwaLIeNe6HznWo/Site-de-Checklists-de-Acessibilidade).

As atribuições de componentes e imagens estão em [src/Attributions.md](src/Attributions.md).
