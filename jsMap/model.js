class Model {
    constructor() {
      this.markers = [];
      this.favorites = new Set();
      this.feedback = null;
    }
  
    addMarker(marker) {
      this.markers.push(marker);
    }
  
    toggleFavorite(marker) {
      if (this.favorites.has(marker)) {
        this.favorites.delete(marker);
      } else {
        this.favorites.add(marker);
      }
    }
  
    isFavorite(marker) {
      return this.favorites.has(marker);
    }
  
    getRating(marker) {
      return marker.rating || 0;
    }
  
    setRating(marker, rating) {
      marker.rating = rating;
    }

    setFeedback(feedback) {
      this.feedback = feedback;
      console.log(`Feedback sélectionné : ${feedback}`);
      // Vous pouvez sauvegarder cela dans une base de données ou un localStorage
    }
  
    getFeedback() {
      return this.feedback;
    }
  }