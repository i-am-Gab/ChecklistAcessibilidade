import { useLayoutEffect } from "react";
import { useLocation } from "react-router";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    const titulo = document.querySelector("h1")?.textContent?.trim();
    document.title = titulo ? `${titulo} | Checklists Acessibilidade` : "Checklists Acessibilidade";
    window.scrollTo(0, 0);
    document.getElementById("conteudo-principal")?.focus({ preventScroll: true });
  }, [pathname]);

  return null;
}
