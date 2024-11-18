class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.mapOptions = {
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

    this.map = this.view.initMap(this.mapOptions);
    this.searchBox = this.view.createSearchBox();

    this.searchBox.addListener('places_changed', () => this.onPlacesChanged());
    this.map.addListener('click', (event) => this.onMapClick(event));
    this.view.closeFormButton.addEventListener('click', () => this.onCloseForm());

    this.view.form.onsubmit = (e) => this.onFormSubmit(e);
    this.view.initStarRating();
    
    this.view.addFeedbackListener();
  }

  onPlacesChanged() {
    const places = this.searchBox.getPlaces();
    if (places.length == 0) {
      return;
    }
    this.model.markers.forEach((marker) => {
      marker.setMap(null);
    });
    this.model.markers = [];
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
      const marker = new google.maps.Marker({
        map: this.map,
        icon: icon,
        title: place.name,
        position: place.geometry.location
      });
      this.model.addMarker(marker);
      if (place.geometry.viewport) {
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    this.map.fitBounds(bounds);
  }

  onMapClick(event) {
    const marker = new google.maps.Marker({
      position: event.latLng,
      map: this.map
    });
    this.view.showForm();
    this.currentMarker = marker;
  }

  onCloseForm() {
    this.view.hideForm();
    if (this.currentMarker) {
      this.currentMarker.setMap(null);
      this.currentMarker = null;
    }
  }

  onFormSubmit(e) {
    e.preventDefault();
    const { name, photos, description, rating } = this.view.getFormData();

    if (photos.length > 10) {
      alert('Vous pouvez sélectionner jusqu\'à 10 photos.');
      return;
    }

    const photoUrls = [];
    let photosLoaded = 0;

    for (let i = 0; i < photos.length; i++) {
      const reader = new FileReader();
      reader.onload = (event) => {
        photoUrls.push(event.target.result);
        photosLoaded++;
        if (photosLoaded === photos.length) {
          const infoWindow = new google.maps.InfoWindow({
            content: this.view.getInfoWindowContent(name, photoUrls, description, rating, this.model.isFavorite(this.currentMarker))
          });

          this.currentMarker.addListener('click', () => {
            infoWindow.open(this.map, this.currentMarker);
            document.querySelector('.favorite-link').addEventListener('click', (e) => {
              e.preventDefault();
              this.model.toggleFavorite(this.currentMarker);
              infoWindow.setContent(this.view.getInfoWindowContent(name, photoUrls, description, rating, this.model.isFavorite(this.currentMarker)));
              alert(this.model.isFavorite(this.currentMarker) ? 'Spot ajouté aux favoris' : 'Spot retiré des favoris');
            });

            this.view.initPhotoCarousel(photoUrls);
          });

          this.model.setRating(this.currentMarker, rating);
          this.model.addMarker(this.currentMarker);
          this.view.hideForm();
          this.view.resetForm();
        }
      };
      reader.readAsDataURL(photos[i]);
    }
  }

  showAboutPage() {
    this.view.renderAboutPage();
  }

  showContactPage() {
    this.view.renderContactPage();
  }
  renderAboutPage() {
    document.getElementById('about-section').style.display = 'block';
    document.getElementById('contact-section').style.display = 'none';
  
    // Ajouter la gestion des clics sur les icônes
    this.view.addFeedbackListener();
  }
  
}