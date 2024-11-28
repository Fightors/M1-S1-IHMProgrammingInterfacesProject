class FavoritesModel {
    constructor() {
        this.favorites = [
            {
                id: 1,
                name: "Salle de Musculation Makadam Fitness",
                description: "Salle accueillante avec des coachs très éduqués en cardio et musculation.",
                rating: 4,
                photos: ["imgs/cardio_mk.jpg", "imgs/force_mk.jpg"],
            },
            {
                id: 2,
                name: "Terrain Calisthénie Charbonneau",
                description: "Propre et utilisateurs très amicaux !!!",
                rating: 5,
                photos: ["imgs/barre_ch.jpg", "imgs/terrain_ch.jpg"],
            },
        ];
    }

    getFavorites() {
        return this.favorites;
    }

    updateRating(id, newRating) {
        const favorite = this.favorites.find(fav => fav.id === id);
        if (favorite) favorite.rating = newRating;
    }

    updateDescription(id, newDescription) {
        const favorite = this.favorites.find(fav => fav.id === id);
        if (favorite) favorite.description = newDescription;
    }

    addPhoto(id, photoUrl) {
        const favorite = this.favorites.find(fav => fav.id === id);
        if (favorite) favorite.photos.push(photoUrl);
    }

    removeFavorite(id) {
        this.favorites = this.favorites.filter(fav => fav.id !== id);
    }
}
