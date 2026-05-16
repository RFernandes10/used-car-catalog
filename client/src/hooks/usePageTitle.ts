import { useEffect } from "react";

const SITE_NAME = "Márcio Veículos";
const DEFAULT_DESC = "Encontre o carro seminovo perfeito na Márcio Veículos. Sedãs, SUVs e caminhonetes com procedência garantida no Rio de Janeiro.";

export function usePageTitle(title?: string, description?: string) {
  useEffect(() => {
    document.title = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} | Carros Semi-Novos no Rio de Janeiro`;

    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", description || DEFAULT_DESC);

    let ogMeta = document.querySelector('meta[property="og:title"]');
    if (!ogMeta) {
      ogMeta = document.createElement("meta");
      ogMeta.setAttribute("property", "og:title");
      document.head.appendChild(ogMeta);
    }
    ogMeta.setAttribute("content", title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} | Carros Semi-Novos no Rio de Janeiro`);
  }, [title, description]);
}
