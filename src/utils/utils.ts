export function create(tag: string, id: string) {
  const createEl = document.createElement(`${tag}`);
  createEl.classList.add(`${id}`);
  return createEl;
}
