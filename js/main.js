document.addEventListener('DOMContentLoaded', (event) => {
  let model = undefined; // Remplacez par votre modèle si nécessaire
  let controler = new Controler(model);
});

function initMap() {
  const view = new View();
  view.initMap();
}