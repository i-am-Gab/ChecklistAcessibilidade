import svgPaths from "./svg-11chwq4ay4";

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
      <p className="absolute css-4hzbpn font-['Cousine:Regular',sans-serif] h-[418px] leading-[45.5px] left-0 not-italic right-0 text-[#0a0a0a] text-[28px] top-0">Este nível concentra-se principalmente na forma como o conteúdo é escrito, estruturado e apresentado, abrangendo textos, links, imagens, tabelas, gráficos, arquivos para download e elementos interativos.</p>
      <Group />
    </div>
  );
}

export default function Camada() {
  return (
    <div className="bg-[#d9d9d9] relative size-full" data-name="Camada 01">
      <Heading />
      <Container />
      <Paragraph />
    </div>
  );
}