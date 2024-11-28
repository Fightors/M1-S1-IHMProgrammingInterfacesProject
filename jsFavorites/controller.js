class FavoritesController {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        // Render initial favorites
        this.renderFavorites();

        // Bind actions to user interactions
        this.view.bindUpdateRating(this.handleUpdateRating.bind(this));
        this.view.bindUpdateDescription(this.handleUpdateDescription.bind(this));
        this.view.bindAddPhoto(this.handleAddPhoto.bind(this));
        this.view.bindRemoveFavorite(this.handleRemoveFavorite.bind(this));
        this.view.bindAddFavorite(this.handleAddFavorite.bind(this));
        this.view.bindZoomImage();
        this.view.bindRemovePhoto(this.handleRemovePhoto.bind(this));
    }

    // Render all favorites
    renderFavorites() {
        const favorites = this.model.getFavorites();
        if (favorites && Array.isArray(favorites)) {
            this.view.renderFavorites(favorites);
        } else {
            console.error("Favorites data is invalid:", favorites);
        }
    }

    handleUpdateRating(id, rating) {
        this.model.updateRating(id, rating);
        this.renderFavorites();
    }

    handleUpdateDescription(id, description) {
        this.model.updateDescription(id, description);
    }

    handleAddPhoto(id, photoUrl) {
        this.model.addPhoto(id, photoUrl);
        this.renderFavorites();
    }

    handleRemoveFavorite(id) {
        this.model.removeFavorite(id);
        this.renderFavorites();
    }

    handleAddFavorite() {
        const newFavorite = {
            id: Date.now(), // Use a timestamp for a unique ID
            name: `New Spot`,
            description: `Add a description...`,
            rating: 0,
            photos: [],
        };
        this.model.getFavorites().push(newFavorite); // Add new favorite to the model
        this.renderFavorites(); // Refresh the view
    }

    handleRemovePhoto(id, index) {
        const favorite = this.model.getFavorites().find(fav => fav.id === id);
        if (favorite) {
            favorite.photos.splice(index, 1);
            this.renderFavorites();
        }
    }
}

// Initialize the app when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    const model = new FavoritesModel();
    const view = new FavoritesView();
    new FavoritesController(model, view);
});
