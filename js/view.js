class View {
  constructor() {
    this.mapElement = document.getElementById('map');
    this.searchBoxElement = document.getElementById('pac-input');
    this.formContainer = document.getElementById('spot-form-container');
    this.form = document.getElementById('spot-form');
    this.closeFormButton = document.getElementById('close-form');
    this.starRatingElements = document.querySelectorAll('#star-rating .fa');
  }

  initMap(mapOptions) {
    this.map = new google.maps.Map(this.mapElement, mapOptions);
    return this.map;
  }

  createSearchBox() {
    const searchBox = new google.maps.places.SearchBox(this.searchBoxElement);
    this.map.controls[google.maps.ControlPosition.TOP_CENTER].push(this.searchBoxElement);
    return searchBox;
  }

  showForm() {
    this.formContainer.style.display = 'block';
  }

  hideForm() {
    this.formContainer.style.display = 'none';
  }

  getFormData() {
    const name = document.getElementById('spot-name').value;
    const photos = document.getElementById('spot-photos').files;
    const description = document.getElementById('spot-description').value;
    const rating = document.getElementById('spot-rating').value;
    return { name, photos, description, rating };
  }

  resetForm() {
    this.form.reset();
  }

  getInfoWindowContent(name, photoUrls, description, rating, isFavorite) {
    const favoriteText = isFavorite ? 'Supprimer des favoris' : 'Ajouter aux favoris';
    const photoHtml = photoUrls.length > 0 ? `<img src="${photoUrls[0]}" alt="${name}" id="spot-photo">` : '';
    const photoNavigation = photoUrls.length > 1 ? `
      <button id="prev-photo">&lt;</button>
      <button id="next-photo">&gt;</button>
    ` : '';
    return `
      <div class="info-window-content">
        <h3>${name}</h3>
        <div id="photo-container">
          ${photoHtml}
          ${photoNavigation}
        </div>
        <p>${description}</p>
        <div class="stars">${this.getStarsHTML(rating)}</div>
        <p><a href="#" class="favorite-link">${favoriteText}</a></p>
      </div>
    `;
  }

  getStarsHTML(rating) {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;
    return `
      ${'<span class="fa fa-star checked"></span>'.repeat(fullStars)}
      ${'<span class="fa fa-star-half-alt checked"></span>'.repeat(halfStar)}
      ${'<span class="fa fa-star"></span>'.repeat(emptyStars)}
    `;
  }

  initStarRating() {
    this.starRatingElements.forEach(star => {
      star.addEventListener('click', (e) => {
        const rating = e.target.getAttribute('data-rating');
        document.getElementById('spot-rating').value = rating;
        this.updateStarRating(rating);
      });
    });
  }

  updateStarRating(rating) {
    this.starRatingElements.forEach(star => star.classList.remove('checked'));
    for (let i = 0; i < rating; i++) {
      this.starRatingElements[i].classList.add('checked');
    }
  }

  renderAboutPage() {
    document.getElementById('about-section').style.display = 'block';
    document.getElementById('contact-section').style.display = 'none';
  }

  renderContactPage() {
    document.getElementById('about-section').style.display = 'none';
    document.getElementById('contact-section').style.display = 'block';
  }
  addFeedbackListener() {
    const feedbackIcons = document.querySelectorAll('#feedback-section i');
  
    feedbackIcons.forEach(icon => {
      icon.addEventListener('click', () => {
        feedbackIcons.forEach(i => i.classList.remove('active'));
        icon.classList.add('active');
  
        // Sauvegarder dans le modèle
        const feedback = icon.getAttribute('data-feedback');
        this.model.setFeedback(feedback);
      });
    });
  }
  
}