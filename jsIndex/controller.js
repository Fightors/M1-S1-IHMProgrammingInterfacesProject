const Controller = {
    init() {
        this.updateView();

        const nextButton = document.getElementById("next-step");
        nextButton.addEventListener("click", () => {
            const currentStep = Model.currentStep;

            // Étape 1 : Présentation de l'app
            if (currentStep === 1) {
                Model.nextStep();
                this.updateView();
                return;
            }

            // Étape 2 : Selectionner des sports avant d'accèder à la carte
            if (currentStep === 2) {
                if (Model.selectedSports.length === 0) {
                    alert("Veuillez sélectionner au moins un sport.");
                    return;
                }
                window.location.href = "map.html";
                return;
            }
        });
    },

    updateView() {
        const stepData = Model.getCurrentStepData();
        View.renderHeader(stepData.header);

        if (Model.currentStep === 1) {
            View.renderMainContent(stepData.mainContent);
        } else if (Model.currentStep === 2) {
            View.renderMainContent(Model.sportsCategories);
            this.attachSportEvents();
        }

        View.renderFooterButton(stepData.buttonText);
    },

    attachSportEvents() {
        const cells = document.querySelectorAll(".sport-cell");
        cells.forEach(cell => {
            cell.addEventListener("click", () => {
                const sport = cell.getAttribute("data-sport");
                Model.toggleSport(sport);
                this.updateView();
            });
        });
    }
};
