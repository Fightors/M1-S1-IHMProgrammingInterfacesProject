class FavoritesView {
    constructor() {
        this.favoritesContainer = document.getElementById('favorites-container');
        this.createImageModal();
    }

    createImageModal() {
        const modal = document.createElement('div');
        modal.className = 'image-modal';
        modal.innerHTML = `
            <span class="close-modal">&times;</span>
            <img src="" alt="Zoomed Image">
        `;
        document.body.appendChild(modal);
        modal.querySelector('.close-modal').addEventListener('click', () => {
            modal.style.display = 'none';
        });
        this.imageModal = modal;
    }

    renderFavorites(favorites) {
        this.favoritesContainer.innerHTML = favorites.map(fav => `
            <div class="favorite" data-id="${fav.id}">
                <h3>${fav.name}</h3>
                <textarea class="description" data-id="${fav.id}">${fav.description}</textarea>
                <div class="rating">
                    ${[1, 2, 3, 4, 5].map(rating => `
                        <span class="fa fa-star ${rating <= fav.rating ? 'checked' : ''}" 
                              data-id="${fav.id}" data-rating="${rating}">
                        </span>
                    `).join('')}
                </div>
                <div class="photos">
                    ${fav.photos.map((photo, index) => `
                        <div class="photo-wrapper">
                            <img src="${photo}" alt="Photo" class="photo" data-id="${fav.id}" data-index="${index}">
                            <button class="remove-photo" data-id="${fav.id}" data-index="${index}">×</button>
                        </div>
                    `).join('')}
                </div>
                <input type="file" class="add-photo" data-id="${fav.id}">
                <button class="remove-btn" data-id="${fav.id}">Remove</button>
            </div>
        `).join('');
        this.renderAddFavoriteButton();
    }

    renderAddFavoriteButton() {
        const addButtonHTML = `
            <button id="add-favorite-btn" class="btn btn-primary">
                Add Favorite
            </button>
        `;
        if (!document.getElementById('add-favorite-btn')) {
            this.favoritesContainer.insertAdjacentHTML('beforeend', addButtonHTML);
        }
    }

    bindAddFavorite(handler) {
        this.favoritesContainer.addEventListener('click', event => {
            if (event.target.id === 'add-favorite-btn') {
                handler();
            }
        });
    }

    bindUpdateRating(handler) {
        this.favoritesContainer.addEventListener('click', event => {
            if (event.target.classList.contains('fa-star')) {
                const id = parseInt(event.target.dataset.id, 10);
                const rating = parseInt(event.target.dataset.rating, 10);
                handler(id, rating);
            }
        });
    }

    bindUpdateDescription(handler) {
        this.favoritesContainer.addEventListener('input', event => {
            if (event.target.classList.contains('description')) {
                const id = parseInt(event.target.dataset.id, 10);
                const description = event.target.value;
                handler(id, description);
            }
        });
    }

    bindAddPhoto(handler) {
        this.favoritesContainer.addEventListener('change', event => {
            if (event.target.classList.contains('add-photo')) {
                const id = parseInt(event.target.dataset.id, 10);
                const file = event.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = () => handler(id, reader.result);
                    reader.readAsDataURL(file);
                }
            }
        });
    }

    bindRemoveFavorite(handler) {
        this.favoritesContainer.addEventListener('click', event => {
            if (event.target.classList.contains('remove-btn')) {
                const id = parseInt(event.target.dataset.id, 10);
                handler(id);
            }
        });
    }

    bindRemovePhoto(handler) {
        this.favoritesContainer.addEventListener('click', event => {
            if (event.target.classList.contains('remove-photo')) {
                const id = parseInt(event.target.dataset.id, 10);
                const index = parseInt(event.target.dataset.index, 10);
                handler(id, index);
            }
        });
    }

    bindZoomImage() {
        this.favoritesContainer.addEventListener('click', event => {
            if (event.target.classList.contains('photo')) {
                const src = event.target.src;
                this.imageModal.querySelector('img').src = src;
                this.imageModal.style.display = 'flex';
            }
        });
    }
}
