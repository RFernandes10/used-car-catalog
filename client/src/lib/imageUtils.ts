const MANIFEST_PATH = "/images/cars/manifest.json";

interface ImageManifest {
  [carId: string]: string[];
}

const manifest: ImageManifest = {};
let loaded = false;

const pending: Array<() => void> = [];

export function onManifestReady(fn: () => void) {
  if (loaded) { fn(); return; }
  pending.push(fn);
}

export function initImageManifest(): Promise<void> {
  if (loaded) return Promise.resolve();
  return fetch(MANIFEST_PATH)
    .then((r) => (r.ok ? r.json() : {}))
    .then((data: ImageManifest) => {
      Object.assign(manifest, data);
      loaded = true;
      pending.splice(0).forEach((fn) => fn());
    })
    .catch(() => {
      loaded = true;
      pending.splice(0).forEach((fn) => fn());
    });
}

export function getCarImage(carId: string, remoteUrl?: string): string {
  const files = manifest[carId];
  if (files?.length) return `/images/cars/${carId}/${files[0]}`;
  return remoteUrl ?? `/images/cars/${carId}/main.jpg`;
}

export function getCarGallery(carId: string, remoteImages?: string[]): string[] {
  const files = manifest[carId];
  if (files?.length) return files.map((f) => `/images/cars/${carId}/${f}`);
  return remoteImages ?? [];
}
