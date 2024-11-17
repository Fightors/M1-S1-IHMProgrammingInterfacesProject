class Controler {
  constructor(model) {
    this.view = new View();
    this.model = model;
    this.view.initMap();
  }
  showAboutPage() {
    this.view.renderAboutPage();
  }

  showContactPage() {
    this.view.renderContactPage();
  }
}