import { useEffect, useRef, useState } from "react";

interface LinkFeedback {
  url: string;
  action: "copy" | "share";
  status: "pending" | "success" | "error" | "cancelled";
  message: string;
  copied: boolean;
}

export function useChecklistSharing(checklistUrl: string, title: string, announce: (message: string) => void) {
  const [result, setResult] = useState<LinkFeedback | null>(null);
  const request = useRef(0);
  const sharing = useRef(false);
  useEffect(() => () => { request.current += 1; }, [checklistUrl]);
  const feedback = result?.url === checklistUrl ? result : null;

  const absoluteUrl = () => new URL(
    `${import.meta.env.BASE_URL.replace(/\/$/, "")}${checklistUrl}`,
    window.location.origin,
  ).href;

  const finish = (attempt: number, action: LinkFeedback["action"], status: LinkFeedback["status"], message: string, copied = false) => {
    if (attempt !== request.current) return;
    setResult({ url: checklistUrl, action, status, message, copied });
    announce(message);
  };

  const copy = async (attempt: number, action: LinkFeedback["action"], notice = "") => {
    try {
      await navigator.clipboard.writeText(absoluteUrl());
      finish(attempt, action, "success", notice
        ? `${notice} Link copiado! Cole-o no aplicativo de sua preferência.`
        : "Link copiado! Agora você pode colá-lo para compartilhar este checklist.", true);
    } catch {
      finish(attempt, action, "error", "Não foi possível copiar o link. Tente novamente ou copie o endereço na barra do navegador.");
    }
  };

  const copyLink = async () => {
    const attempt = ++request.current;
    setResult({ url: checklistUrl, action: "copy", status: "pending", message: "Copiando o link…", copied: false });
    await copy(attempt, "copy");
  };

  const shareLink = async () => {
    if (sharing.current) return;
    const attempt = ++request.current;
    setResult({ url: checklistUrl, action: "share", status: "pending", message: "Abrindo as opções de compartilhamento…", copied: false });
    const data = { title, url: absoluteUrl() };
    if (typeof navigator.share !== "function") {
      await copy(attempt, "share", "O compartilhamento direto não está disponível neste navegador.");
      return;
    }
    sharing.current = true;
    try {
      // A chamada ocorre no clique; a plataforma decide quando a promessa resolve.
      await navigator.share(data);
      finish(attempt, "share", "success", "Opções de compartilhamento abertas no dispositivo.");
    } catch (error) {
      if (attempt !== request.current) return;
      if (typeof error === "object" && error !== null && "name" in error && error.name === "AbortError") {
        finish(attempt, "share", "cancelled", "Compartilhamento cancelado. Você pode tentar novamente ou copiar o link.");
      } else {
        await copy(attempt, "share", "Não foi possível abrir as opções de compartilhamento.");
      }
    } finally {
      sharing.current = false;
    }
  };

  return { feedback, copyLink, shareLink };
}
