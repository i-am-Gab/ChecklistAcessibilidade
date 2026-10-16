import { useEffect, useRef, useState } from "react";

// Agrupa ações rápidas em um único anúncio e permite repetir mensagens de reset.
export function useAnnouncement() {
  const [message, setMessage] = useState("");
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);
  const announce = (text: string) => {
    clearTimeout(timer.current);
    setMessage("");
    timer.current = setTimeout(() => setMessage(text), 600);
  };
  return { message, announce };
}
