# Validação de responsividade e acessibilidade

Data: 16/10/2026.

## Escopo

- Página inicial, Sobre e seleção de camadas.
- Seleção de tipo de tela e as cinco personalizações da camada 1.
- Personalização das camadas 2 e 3.
- Checklists montados das três camadas.
- Menu mobile, diálogos de variação e diagrama em tela cheia.

## Como repetir

1. Instale as dependências com `npm ci` e inicie com `npm run dev`.
2. Abra `/ChecklistAcessibilidade/tests/browser-audit.html` no endereço local informado pelo Vite.
3. Acione **Executar auditoria**. O resultado JSON aparece abaixo dos controles.
4. Para investigar verificações inconclusivas, use **Conferir contraste da página em teste**.

A página de auditoria é uma ferramenta local de desenvolvimento. O build de produção usa apenas o `index.html` principal e não inclui esse HTML nem o axe-core.

## Verificações

| Verificação | Abrangência |
| --- | --- |
| Reflow | 14 rotas × 320, 375, 390, 768, 1024 e 1440 px: 84 combinações |
| Ampliação de texto | Fonte raiz de 16 para 32 px, nas 14 rotas com viewport de 640 px |
| axe-core | Regras WCAG A/AA, incluindo WCAG 2.1/2.2, em 320 e 1440 px: 28 execuções |
| Diálogos | Diagrama e variação de Busca abertos em 320 × 480 px, com axe e verificação de foco |
| Teclado | Menu mobile, seleção e geração nas três camadas, expansão, marcação, Escape e retorno de foco |

Resultado da matriz: sem transbordamento horizontal da página e sem violações automáticas nos cenários auditados. Os dois diálogos cabem na viewport e recebem foco ao abrir. A navegação inversa e direta com Tab permanece dentro deles, e Escape devolve o foco ao acionador.

Também foram conferidos visualmente os layouts mobile e desktop. O contraste dos textos e botões verdes foi corrigido; os títulos coloridos do SVG foram escurecidos e possuem a mesma informação disponível como texto na página.

O axe marcou como inconclusivo o contraste do texto dentro do SVG e sobre o gradiente da página Sobre. Esses casos foram revisados pelas cores de texto e fundo: os títulos do diagrama sobre branco, o texto do botão verde e os textos sobre os dois extremos do gradiente têm razão de contraste superior a 4,5:1. A verificação inconclusiva permanece registrada no JSON da auditoria; não foi suprimida.

## Limites da verificação

O teste de texto usa o tamanho da fonte raiz; a matriz também verifica a reorganização em 320 px. Isso não substitui testar zoom real e configurações de texto em diferentes navegadores. As interações foram testadas em navegador Chromium; ainda é indicada verificação em dispositivos físicos, Safari/Firefox e leitores de tela como NVDA e VoiceOver. Resultados automáticos não representam certificação de conformidade integral com WCAG.
