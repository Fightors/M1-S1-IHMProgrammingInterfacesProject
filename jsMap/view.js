class View {
  constructor(model) {
    this.model = model;
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
    let carouselItems = photoUrls.map((url, index) => `
      <div class="carousel-item ${index === 0 ? 'active' : ''}">
        <img src="${url}" class="d-block w-100" alt="Photo ${index + 1}">
      </div>
    `).join('');
  
    const starRating = this.generateStarRating(rating);
    const favoriteButtonText = isFavorite ? 'Supprimer de mes favoris' : 'Ajouter à mes favoris';
  
    return `
      <div>
        <h3>${name}</h3>
        <div id="photo-carousel" class="carousel slide" data-bs-ride="carousel">
          <div class="carousel-inner">
            ${carouselItems}
          </div>
          <button class="carousel-control-prev" type="button" data-bs-target="#photo-carousel" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button class="carousel-control-next" type="button" data-bs-target="#photo-carousel" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
        <p class="spot-description">${description}</p>
        <p class="spot-rating">Note globale: ${starRating}</p>
        <button class="favorite-link">${favoriteButtonText}</button>
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

  generateStarRating(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars += '<span class="fa fa-star checked"></span>';
      } else {
        stars += '<span class="fa fa-star"></span>';
      }
    }
    return stars;
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
  
}