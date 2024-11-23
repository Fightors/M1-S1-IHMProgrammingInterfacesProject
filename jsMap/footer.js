document.addEventListener('DOMContentLoaded', (event) => {
    const footerHTML = `
      <footer class="footer bg-white">
        <div class="container">
          <div class="row text-center">
            <div class="col">
              <a href="map.html" class="text-dark">
                <i class="fas fa-map-pin"></i>
                <p>Carte</p>
              </a>
            </div>
            <div class="col">
              <a href="favorites.html" class="text-dark">
                <i class="fas fa-star"></i>
                <p>Favoris</p>
              </a>
            </div>
            <div class="col">
              <a href="about.html" class="text-dark">
                <i class="fas fa-ellipsis-h"></i>
                <p>A propos</p>
              </a>
            </div>
          </div>
        </div>
      </footer>
    `;
    document.getElementById('footer-container').innerHTML = footerHTML;
  });