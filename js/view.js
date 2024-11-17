class View {
  constructor() {
    this.mapElement = document.getElementById('map');
    this.searchBoxElement = document.getElementById('pac-input');
    this.currentMarker = null;
    this.markers = []; // Liste pour stocker les marqueurs
    this.favorites = new Set(); // Set pour stocker les favoris
  }

  initMap() {
    const mapOptions = {
      zoom: 8,
      center: { lat: 48.8566, lng: 2.3522 }, // Coordinates for Paris
      mapTypeControl: false,
      fullscreenControl: true,
      streetViewControl: true,
      zoomControl: false,
      fullscreenControlOptions: {
        position: google.maps.ControlPosition.RIGHT_TOP // Adjust position to avoid footer
      },
      streetViewControlOptions: {
        position: google.maps.ControlPosition.LEFT_TOP // Adjust position to avoid footer
      }
    };
    this.map = new google.maps.Map(this.mapElement, mapOptions);

    // Create the search box and link it to the UI element.
    const searchBox = new google.maps.places.SearchBox(this.searchBoxElement);
    this.map.controls[google.maps.ControlPosition.TOP_CENTER].push(this.searchBoxElement);

    // Bias the SearchBox results towards current map's viewport.
    this.map.addListener('bounds_changed', () => {
      searchBox.setBounds(this.map.getBounds());
    });

    // Listen for the event fired when the user selects a prediction and retrieve
    searchBox.addListener('places_changed', () => {
      const places = searchBox.getPlaces();
      if (places.length == 0) {
        return;
      }
      // Clear out the old markers.
      this.markers.forEach((marker) => {
        marker.setMap(null);
      });
      this.markers = [];
      // For each place, get the icon, name and location.
      const bounds = new google.maps.LatLngBounds();
      places.forEach((place) => {
        if (!place.geometry || !place.geometry.location) {
          console.log("Returned place contains no geometry");
          return;
        }
        const icon = {
          url: place.icon,
          size: new google.maps.Size(71, 71),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(17, 34),
          scaledSize: new google.maps.Size(25, 25)
        };
        // Create a marker for each place.
        const marker = new google.maps.Marker({
          map: this.map,
          icon: icon,
          title: place.name,
          position: place.geometry.location
        });
        this.markers.push(marker);
        if (place.geometry.viewport) {
          // Only geocodes have viewport.
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
      });
      this.map.fitBounds(bounds);
    });

    // Add click event listener to the map
    this.map.addListener('click', (event) => {
      this.addMarker(event.latLng);
    });

    // Close form event listener
    document.getElementById('close-form').addEventListener('click', () => {
      this.closeForm();
    });

    // Star rating event listeners
    const stars = document.querySelectorAll('#star-rating .fa');
    stars.forEach(star => {
      star.addEventListener('click', (e) => {
        const rating = e.target.getAttribute('data-rating');
        document.getElementById('spot-rating').value = rating;
        stars.forEach(s => s.classList.remove('checked'));
        for (let i = 0; i < rating; i++) {
          stars[i].classList.add('checked');
        }
      });
    });
  }

  addMarker(location) {
    const marker = new google.maps.Marker({
      position: location,
      map: this.map
    });

    // Set the current marker to the new marker
    this.currentMarker = marker;

    // Show the form to add spot details
    const formContainer = document.getElementById('spot-form-container');
    formContainer.style.display = 'block';

    const form = document.getElementById('spot-form');
    form.onsubmit = (e) => {
      e.preventDefault();
      const name = document.getElementById('spot-name').value;
      const photo = document.getElementById('spot-photo').value;
      const description = document.getElementById('spot-description').value;
      const rating = document.getElementById('spot-rating').value;

      // Create an info window with the spot details
      const infoWindow = new google.maps.InfoWindow({
        content: this.getInfoWindowContent(name, photo, description, rating, marker)
      });

      marker.addListener('click', () => {
        infoWindow.open(this.map, marker);
        document.querySelector('.favorite-link').addEventListener('click', (e) => {
          e.preventDefault();
          this.toggleFavorite(marker);
          infoWindow.setContent(this.getInfoWindowContent(name, photo, description, rating, marker));
          alert(this.favorites.has(marker) ? 'Spot ajouté aux favoris' : 'Spot retiré des favoris');
        });
      });

      // Add the marker to the list of markers
      this.markers.push(marker);

      // Hide the form
      formContainer.style.display = 'none';
      form.reset();
    };
  }

  getInfoWindowContent(name, photo, description, rating, marker) {
    const isFavorite = this.favorites.has(marker);
    const favoriteText = isFavorite ? 'Supprimer des favoris' : 'Ajouter aux favoris';
    return `
      <div class="info-window-content">
        <h3>${name}</h3>
        <img src="${photo}" alt="${name}">
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

  closeForm() {
    const formContainer = document.getElementById('spot-form-container');
    formContainer.style.display = 'none';
    if (this.currentMarker) {
      this.currentMarker.setMap(null);
      this.currentMarker = null;
    }
  }

  toggleFavorite(marker) {
    if (this.favorites.has(marker)) {
      this.favorites.delete(marker);
    } else {
      this.favorites.add(marker);
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
}