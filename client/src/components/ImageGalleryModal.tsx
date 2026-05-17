import { useState, useEffect, useCallback, useRef } from "react";
import { CaretLeft, CaretRight, X, ImageBroken, MagnifyingGlassPlus, MagnifyingGlassMinus, SpinnerGap } from "@phosphor-icons/react";

interface ImageGalleryModalProps {
  isOpen: boolean;
  images: string[];
  carTitle: string;
  onClose: () => void;
}

export const ImageGalleryModal: React.FC<ImageGalleryModalProps> = ({
  isOpen,
  images,
  carTitle,
  onClose,
}) => {
  if (!isOpen) return null;
  return <GalleryContent images={images} carTitle={carTitle} onClose={onClose} />;
};

function GalleryContent({ images, carTitle, onClose }: Omit<ImageGalleryModalProps, "isOpen">) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [failedImages, setFailedImages] = useState<Set<number>>(new Set());
  const [loadingImages, setLoadingImages] = useState<Set<number>>(new Set());
  const [zoomed, setZoomed] = useState(false);
  const indexRef = useRef(currentIndex);
  const imgRef = useRef<HTMLImageElement | null>(null);
  indexRef.current = currentIndex;

  const markFailed = useCallback((index: number) => {
    setFailedImages((prev) => new Set(prev).add(index));
    setLoadingImages((prev) => { const next = new Set(prev); next.delete(index); return next; });
  }, []);

  const markLoaded = useCallback((index: number) => {
    setLoadingImages((prev) => { const next = new Set(prev); next.delete(index); return next; });
  }, []);

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;
    const idx = indexRef.current;

    const onLoad = () => markLoaded(idx);
    const onError = () => markFailed(idx);

    img.addEventListener("load", onLoad);
    img.addEventListener("error", onError);

    if (img.complete) onLoad();

    return () => {
      img.removeEventListener("load", onLoad);
      img.removeEventListener("error", onError);
    };
  }, [currentIndex, markLoaded, markFailed]);

  const goToNext = useCallback(() => {
    const next = (indexRef.current + 1) % images.length;
    setCurrentIndex(next);
    setZoomed(false);
    setLoadingImages((prev) => new Set(prev).add(next));
  }, [images.length]);

  const goToPrevious = useCallback(() => {
    const prev = (indexRef.current - 1 + images.length) % images.length;
    setCurrentIndex(prev);
    setZoomed(false);
    setLoadingImages((prevSet) => new Set(prevSet).add(prev));
  }, [images.length]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      switch (e.key) {
        case "Escape": onClose(); break;
        case "ArrowLeft": goToPrevious(); break;
        case "ArrowRight": goToNext(); break;
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, goToNext, goToPrevious]);

  return (
    <>
      <div className="fixed inset-0 bg-black/80 z-40" onClick={onClose} aria-hidden="true" />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label={`Galeria: ${carTitle}`}>
        <div className="relative w-full max-w-5xl max-h-[90vh] flex flex-col bg-black rounded-lg overflow-hidden">
          <button onClick={onClose} className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors" aria-label="Fechar galeria">
            <X className="w-6 h-6" />
          </button>

          <div className="relative flex-1 flex items-center justify-center overflow-hidden bg-black"
            onClick={() => setZoomed(!zoomed)} role="img" aria-label={zoomed ? "Imagem ampliada, clique para reduzir" : "Clique para ampliar a imagem"}>
            {failedImages.has(currentIndex) ? (
              <ImageBroken className="w-16 h-16 text-white/50" />
            ) : (
              <>
                {loadingImages.has(currentIndex) && (
                  <div className="absolute inset-0 flex items-center justify-center z-10">
                    <SpinnerGap className="w-12 h-12 text-white/50 animate-spin" />
                  </div>
                )}
                <img
                  ref={imgRef}
                  src={images[currentIndex]}
                  alt={`${carTitle} - imagem ${currentIndex + 1} de ${images.length}`}
                  className={`transition-all duration-200 ${zoomed ? "max-w-none max-h-none w-full h-full object-contain scale-150" : "max-w-full max-h-full object-contain"} ${loadingImages.has(currentIndex) ? "opacity-0" : "opacity-100"}`}
                />
              </>
            )}
          </div>
          <button onClick={() => setZoomed(!zoomed)}
            className="absolute top-4 left-4 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
            aria-label={zoomed ? "Reduzir zoom" : "Ampliar zoom"}>
            {zoomed ? <MagnifyingGlassMinus className="w-5 h-5" /> : <MagnifyingGlassPlus className="w-5 h-5" />}
          </button>

          <div className="bg-black/90 px-4 py-4 flex items-center justify-between">
            <button onClick={goToPrevious} className="flex items-center justify-center w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors disabled:opacity-50" disabled={images.length <= 1} aria-label="Imagem anterior">
              <CaretLeft className="w-6 h-6" />
            </button>

            <div className="flex-1 mx-4">
              <div className="text-center text-white text-sm mb-3" role="status" aria-live="polite">{currentIndex + 1} / {images.length}</div>
              <div className="flex gap-2 overflow-x-auto justify-center pb-2" role="tablist" aria-label="Miniaturas">
                {images.map((image, index) => (
                  <button key={index} onClick={() => setCurrentIndex(index)}
                    role="tab"
                    aria-selected={index === currentIndex}
                    aria-label={`Imagem ${index + 1} de ${images.length}`}
                    className={`flex-shrink-0 w-16 h-16 rounded border-2 overflow-hidden transition-all ${index === currentIndex ? "border-accent ring-2 ring-accent" : "border-white/30 hover:border-white/50"}`}>
                    {failedImages.has(index) ? (
                      <div className="w-full h-full flex items-center justify-center bg-black/50">
                        <ImageBroken className="w-4 h-4 text-white/30" />
                      </div>
                    ) : (
                      <img src={image} alt={`Thumb ${index + 1}`} className="w-full h-full object-cover" onError={() => markFailed(index)} />
                    )}
                  </button>
                ))}
              </div>
            </div>

            <button onClick={goToNext} className="flex items-center justify-center w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors disabled:opacity-50" disabled={images.length <= 1} aria-label="Próxima imagem">
              <CaretRight className="w-6 h-6" />
            </button>
          </div>

          <div className="bg-black/90 px-4 py-3 text-white text-sm">
            <p className="font-semibold">{carTitle}</p>
            <p className="text-white/70 text-xs mt-1">Use as setas do teclado • ESC para fechar</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default ImageGalleryModal;
