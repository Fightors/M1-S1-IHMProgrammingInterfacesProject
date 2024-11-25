const View = {
    renderHeader(headerText) {
        const header = document.getElementById("header");
        header.innerHTML = `
            <div class="header-container">
                <!-- Colonne gauche -->
                <div class="header-side">
                    <a href="index.html">
                        <img src="imgs/logo2-transparent.png" alt="Logo Spoty" class="header-logo">
                    </a>
                </div>
                <!-- Colonne centrale -->
                <div class="header-center">
                    <span class="header-text">${headerText}</span>
                </div>
                <!-- Colonne droite vide -->
                <div class="header-side"></div>
            </div>
        `;
    }
    ,
    

    renderMainContent(categories) {
        const stepData = Model.getCurrentStepData();

        if (Model.currentStep === 1) {
            // Afficher les images et le logo de l'étape 1
            const main = document.getElementById("main-content");
            main.innerHTML = `
                <div class="images-container">
                    <div class="row">
                        ${stepData.images1.map(image => `
                            <img src="${image}" alt="Sportif" class="sport-image">
                        `).join("")}
                    </div>
                    <div class="logo">
                        <img src="${stepData.logo}" alt="Logo de Spoty" class="logo-image">
                    </div>
                    <div class="row">
                        ${stepData.images2.map(image => `
                            <img src="${image}" alt="Sportif" class="sport-image">
                        `).join("")}
                    </div>
                </div>
            `;
        } else {
            const main = document.getElementById("main-content");
            main.innerHTML = `
                ${categories.map(category => `
                    <div>
                        <h3>
                            ${category.name}
                        </h3>
                        <table>
                            <tr>
                                ${category.sports.map(sport => `
                                    <td class="sport-cell ${Model.isSportSelected(sport) ? "selected" : ""}" 
                                        data-sport="${sport}">
                                        ${sport}
                                    </td>
                                `).join("")}
                            </tr>
                        </table>
                    </div>
                `).join("<hr>")}
    `;

    // Appelez la mise à jour de la liste des sports
    this.renderSelectedSports();
        }
    },

    renderSelectedSports() {
        const selectedSportsContainer = document.getElementById("selected-sports");
        const selectedSports = Model.getSelectedSports();
    
        /* Modification des styles de la barre pour la cacher si on est encore sur l'écran d'accueil */
        if (Model.currentStep === 1) {
            selectedSportsContainer.style.backgroundColor = "#1f44d8";
            selectedSportsContainer.style.height = "0";
            selectedSportsContainer.style.padding = "0";
            selectedSportsContainer.style.border = "none";
        } else {
            selectedSportsContainer.style.backgroundColor = "#f9f9f9";
            selectedSportsContainer.style.height = "auto";
            selectedSportsContainer.style.padding = "10px";
            selectedSportsContainer.style.border = "1px solid #ddd";
            
            if (selectedSports.length === 0) {
                // Aucun sport sélectionné
                selectedSportsContainer.innerHTML = `<span class="no-sports-message">Sélectionnez les sports que vous souhaitez pratiquer</span>`;
            } else {
                // Des sports sont sélectionnés
                selectedSportsContainer.innerHTML = `
                    <span> | </span>
                    ${selectedSports.map(sport => `
                        <span class="selected-sport" data-sport="${sport}">
                            ${sport} |
                        </span>
                    `).join("")}
                `;
            }
        }
    },

    renderFooterButton(buttonText) {
        const button = document.getElementById("next-step");
        button.textContent = buttonText;
    }
};
