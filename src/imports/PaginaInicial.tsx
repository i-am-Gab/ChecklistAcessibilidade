import svgPaths from "./svg-xxruinbc2x";

const imgPersonFrontComputerWorkingHtml1 = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1920' height='1280' viewBox='0 0 1920 1280'%3E%3Crect fill='%23e0e0e0' width='1920' height='1280'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' fill='%23999' font-size='48' font-family='Arial'%3EImagem de Fundo%3C/text%3E%3C/svg%3E";

function Frame() {
  return (
    <div className="absolute h-[1280px] left-[-1px] top-[-102px] w-[1920px]">
      <div className="absolute h-[1280px] left-0 top-0 w-[1920px]" data-name="person-front-computer-working-html 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover opacity-75 pointer-events-none size-full" src={imgPersonFrontComputerWorkingHtml1} />
      </div>
      <p className="absolute css-ew64yg font-['Alfa_Slab_One:Regular',sans-serif] leading-[normal] left-[233px] not-italic text-[48px] text-white top-[640px]">Checklist Acessibilidade para Desenvolvimento Acessível</p>
      <div className="absolute bg-[#d9d9d9] h-[72px] left-[745px] rounded-[20px] top-[728px] w-[405px]" />
    </div>
  );
}

function Group() {
  return (
    <div className="absolute contents left-[1312px] top-[19px]">
      <div className="absolute bg-[#afafaf] h-[53px] left-[1312px] top-[19px] w-[163px]" />
      <p className="absolute css-4hzbpn font-['Cousine:Regular',sans-serif] h-[31px] leading-[normal] left-[1326px] not-italic text-[32px] text-black top-[26px] w-[197px]">Início</p>
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute contents left-[126px] top-[746px]">
      <p className="absolute css-4hzbpn font-['Cousine:Bold',sans-serif] h-[38px] leading-[normal] left-[126px] not-italic text-[28px] text-black top-[746px] w-[467px]">Acesse</p>
      <div className="absolute h-0 left-[250px] top-[761px] w-[65px]">
        <div className="absolute inset-[-14.73px_-3.08%_-14.73px_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 67 29.4558">
            <path d={svgPaths.p3d783f00} fill="var(--stroke-0, black)" id="Arrow 1" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function PaginaListagemDeChecklists() {
  return (
    <div className="absolute bg-white h-[1080px] left-0 overflow-clip top-[1178px] w-[1920px]" data-name="Página Listagem de Checklists">
      <div className="absolute bg-[#afafaf] border-2 border-black border-solid h-[87px] left-[-10px] top-[-6px] w-[1938px]" />
      <Group />
      <p className="absolute css-4hzbpn font-['Cousine:Regular',sans-serif] h-[31px] leading-[normal] left-[1523px] not-italic text-[32px] text-black top-[26px] w-[197px]">Sobre</p>
      <div className="absolute bg-[#ce9869] h-[914px] left-0 top-[81px] w-[1920px]" />
      <div className="absolute bg-[#d9d9d9] left-[76px] size-[572px] top-[254px]" />
      <div className="absolute bg-[#d9d9d9] left-[1290px] size-[572px] top-[254px]" />
      <div className="absolute bg-[#d9d9d9] left-[683px] size-[572px] top-[254px]" />
      <p className="absolute css-4hzbpn font-['Cousine:Bold',sans-serif] h-[46px] leading-[normal] left-[733px] not-italic text-[48px] text-black top-[297px] w-[472px]">Camada 02</p>
      <p className="absolute css-4hzbpn font-['Cousine:Bold',sans-serif] h-[46px] leading-[normal] left-[1340px] not-italic text-[48px] text-black top-[297px] w-[472px]">Camada 03</p>
      <p className="absolute css-4hzbpn font-['Cousine:Bold',sans-serif] h-[46px] leading-[normal] left-[116px] not-italic text-[48px] text-black top-[297px] w-[472px]">Camada 01</p>
      <div className="absolute h-0 left-[118px] top-[377px] w-[470px]">
        <div className="absolute inset-[-1px_0_0_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 470 1">
            <line id="Line 2" stroke="var(--stroke-0, black)" x2="470" y1="0.5" y2="0.5" />
          </svg>
        </div>
      </div>
      <div className="absolute h-0 left-[118px] top-[714px] w-[470px]">
        <div className="absolute inset-[-1px_0_0_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 470 1">
            <line id="Line 2" stroke="var(--stroke-0, black)" x2="470" y1="0.5" y2="0.5" />
          </svg>
        </div>
      </div>
      <p className="absolute css-4hzbpn font-['Cousine:Regular',sans-serif] h-[287px] leading-[normal] left-[122px] not-italic text-[28px] text-black top-[409px] w-[476px]">Este nível concentra-se principalmente na forma como o conteúdo é escrito, estruturado e apresentado, abrangendo textos, links, imagens, tabelas, gráficos, arquivos para download e elementos interativos.</p>
      <Group1 />
    </div>
  );
}

export default function PaginaInicial() {
  return (
    <div className="bg-white relative size-full" data-name="Página Inicial">
      <Frame />
      <PaginaListagemDeChecklists />
    </div>
  );
}