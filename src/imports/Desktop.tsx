import svgPaths from "./svg-hlaep5owcb";

function Heading() {
  return (
    <div className="absolute h-[72px] left-[40px] top-[40px] w-[325.328px]" data-name="Heading 2">
      <p className="absolute css-ew64yg font-['Cousine:Bold',sans-serif] leading-[72px] left-0 not-italic text-[#0a0a0a] text-[48px] top-0">Camada 01</p>
    </div>
  );
}

function Container() {
  return <div className="absolute bg-black h-[2px] left-[40px] top-[136px] w-[325.328px]" data-name="Container" />;
}

function Container1() {
  return <div className="absolute bg-black bottom-[72px] h-[2px] left-0 w-[325.328px]" data-name="Container" />;
}

function Icon() {
  return (
    <div className="absolute left-[116.83px] size-[32px] top-[5px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="Icon">
          <path d="M6.66667 16H25.3333" id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          <path d={svgPaths.p24247500} id="Vector_2" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
        </g>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="absolute bottom-0 h-[42px] left-[11px] w-[325.328px]" data-name="Button">
      <p className="absolute css-ew64yg font-['Cousine:Bold',sans-serif] leading-[42px] left-[50.5px] not-italic text-[#0a0a0a] text-[28px] text-center top-0 translate-x-[-50%]">Acesse</p>
      <Icon />
    </div>
  );
}

function Group() {
  return (
    <div className="absolute bottom-0 contents left-0">
      <Container1 />
      <Button />
    </div>
  );
}

function Paragraph() {
  return (
    <div className="absolute bottom-[18px] h-[468px] left-[40px] right-[46px]" data-name="Paragraph">
      <p className="absolute css-4hzbpn font-['Cousine:Regular',sans-serif] h-[364px] leading-[45.5px] left-0 not-italic right-0 text-[#0a0a0a] text-[26px] top-[8px]">Este nível concentra-se principalmente na forma como o conteúdo é escrito, estruturado e apresentado, abrangendo textos, links, imagens, tabelas, gráficos, arquivos para download e elementos interativos.</p>
      <Group />
    </div>
  );
}

function Camada() {
  return (
    <div className="absolute bg-[#d9d9d9] h-[637px] left-[29px] top-[197px] w-[578px]" data-name="Camada 01">
      <Heading />
      <Container />
      <Paragraph />
    </div>
  );
}

function Heading1() {
  return (
    <div className="absolute h-[72px] left-[40px] top-[40px] w-[325.328px]" data-name="Heading 2">
      <p className="absolute css-ew64yg font-['Cousine:Bold',sans-serif] leading-[72px] left-0 not-italic text-[#0a0a0a] text-[48px] top-0">Camada 02</p>
    </div>
  );
}

function Container2() {
  return <div className="absolute bg-black h-[2px] left-[40px] top-[136px] w-[325.328px]" data-name="Container" />;
}

function Paragraph1() {
  return (
    <div className="absolute bottom-[104px] h-[371px] left-[40px] right-[40px]" data-name="Paragraph">
      <p className="absolute css-4hzbpn font-['Cousine:Regular',sans-serif] leading-[45.5px] left-0 not-italic right-0 text-[#0a0a0a] text-[26px] top-0">Este nível aborda a estrutura semântica do HTML, uso adequado de tags, navegação por teclado, foco visível e ARIA quando necessário para componentes personalizados.</p>
    </div>
  );
}

function Container3() {
  return <div className="absolute bg-black h-[2px] left-[40px] top-[548px] w-[325.328px]" data-name="Container" />;
}

function Icon1() {
  return (
    <div className="absolute left-[116.83px] size-[32px] top-[5px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="Icon">
          <path d="M6.66667 16H25.3333" id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          <path d={svgPaths.p24247500} id="Vector_2" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
        </g>
      </svg>
    </div>
  );
}

function Button1() {
  return (
    <div className="absolute h-[42px] left-[40px] top-[574px] w-[325.328px]" data-name="Button">
      <p className="absolute css-ew64yg font-['Cousine:Bold',sans-serif] leading-[42px] left-[50.5px] not-italic text-[#0a0a0a] text-[28px] text-center top-0 translate-x-[-50%]">Acesse</p>
      <Icon1 />
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute contents left-[40px] top-[548px]">
      <Container3 />
      <Button1 />
    </div>
  );
}

function Container4() {
  return (
    <div className="absolute bg-[#d9d9d9] h-[637px] left-1/2 top-[197px] translate-x-[-50%] w-[566px]" data-name="Container">
      <Heading1 />
      <Container2 />
      <Paragraph1 />
      <Group1 />
    </div>
  );
}

function Heading2() {
  return (
    <div className="absolute h-[72px] left-[40px] top-[40px] w-[325.344px]" data-name="Heading 2">
      <p className="absolute css-ew64yg font-['Cousine:Bold',sans-serif] leading-[72px] left-0 not-italic text-[#0a0a0a] text-[48px] top-0">Camada 03</p>
    </div>
  );
}

function Container5() {
  return <div className="absolute bg-black h-[2px] left-[40px] top-[136px] w-[325.344px]" data-name="Container" />;
}

function Paragraph2() {
  return (
    <div className="absolute bottom-[115px] h-[360px] left-[40px] right-[32px]" data-name="Paragraph">
      <p className="absolute css-4hzbpn font-['Cousine:Regular',sans-serif] h-[273px] leading-[45.5px] left-0 not-italic right-0 text-[#0a0a0a] text-[26px] top-0">Este nível trata de testes automatizados, validação com tecnologias assistivas, conformidade com WCAG, documentação de acessibilidade e processos de revisão contínua.</p>
    </div>
  );
}

function Container6() {
  return <div className="absolute bg-black h-[2px] left-[32px] top-[546px] w-[325.344px]" data-name="Container" />;
}

function Icon2() {
  return (
    <div className="absolute left-[116.83px] size-[32px] top-[5px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="Icon">
          <path d="M6.66667 16H25.3333" id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          <path d={svgPaths.p24247500} id="Vector_2" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
        </g>
      </svg>
    </div>
  );
}

function Button2() {
  return (
    <div className="absolute h-[42px] left-[32px] top-[572px] w-[325.344px]" data-name="Button">
      <p className="absolute css-ew64yg font-['Cousine:Bold',sans-serif] leading-[42px] left-[50.5px] not-italic text-[#0a0a0a] text-[28px] text-center top-0 translate-x-[-50%]">Acesse</p>
      <Icon2 />
    </div>
  );
}

function Group2() {
  return (
    <div className="absolute contents left-[32px] top-[546px]">
      <Container6 />
      <Button2 />
    </div>
  );
}

function Container7() {
  return (
    <div className="absolute bg-[#d9d9d9] h-[637px] right-[29px] top-[197px] w-[584px]" data-name="Container">
      <Heading2 />
      <Container5 />
      <Paragraph2 />
      <Group2 />
    </div>
  );
}

function Container8() {
  return (
    <div className="bg-[#ce9869] h-[1099px] relative shrink-0 w-full" data-name="Container">
      <Camada />
      <Container4 />
      <Container7 />
    </div>
  );
}

function SiteDeChecklistsDeAcessibilidade() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col inset-0 items-start" data-name="Site de Checklists de Acessibilidade">
      <Container8 />
    </div>
  );
}

export default function Desktop() {
  return (
    <div className="bg-white relative size-full" data-name="Desktop">
      <SiteDeChecklistsDeAcessibilidade />
    </div>
  );
}