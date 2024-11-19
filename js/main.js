function initMap() {
  const model = new Model();
  const view = new View(model);
  const controller = new Controller(model, view);
}

document.addEventListener('DOMContentLoaded', () => {
  initMap();
});