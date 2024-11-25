const Model = {
    currentStep: 1, // Étape de départ
    selectedSports: [],

    sportsCategories: [
        { 
            name: "Sports collectifs",
            sports: ["Football", "Basketball", "Handball", "Rugby"]
        },
        { 
            name: "Sports de rampe",
            sports: ["Skateboard", "BMX", "Trottinette", "Roller"]
        },
        {
            name: "Sports de raquette",
            sports: ["Tennis", "Ping-pong", "Badminton", "Squash"]
        },
        {
            name: "Sports de marche",
            sports: ["Randonnée", "Marche Nordique", "Trail", "Trekking"]
        },
        {
            name: "Force, Gainage et Musculation",
            sports: ["Crossfit", "Callisthénie", "Musculation", "Parkour"]
        }
    ],

    stepContent: [
        {
            header: "Bienvenue sur Spoty",
            buttonText: "Commencer",
            images1: [
                "imgs/sportifs1.jpg",
                "imgs/sportifs2.jpg",
                "imgs/sportifs3.jpg",
                "imgs/sportifs4.jpg",
                "imgs/sportifs5.jpg"
            ],
            images2: [
                "imgs/sportifs6.jpg",
                "imgs/sportifs7.jpg",
                "imgs/sportifs8.jpg",
                "imgs/sportifs9.jpg"
            ],
            logo: "imgs/logo1-transparent.png",  // Image du logo
        },
        {
            header: "Choisissez vos sports favoris",
            buttonText: "Valider",
        }
    ],

    // Méthodes de gestion des sports
    toggleSport(sport) {
        const index = this.selectedSports.indexOf(sport);
        if (index === -1) {
            this.selectedSports.push(sport); // Ajouter si non sélectionné
        } else {
            this.selectedSports.splice(index, 1); // Retirer si déjà sélectionné
        }
    },

    isSportSelected(sport) {
        return this.selectedSports.includes(sport);
    },

    toggleSportSelection(sport) {
        if (this.isSportSelected(sport)) {
            this.selectedSports = this.selectedSports.filter(s => s !== sport); // Retirer
        } else {
            this.selectedSports.push(sport); // Ajouter
        }
    },

    getSelectedSports() {
        return this.selectedSports; // Retourner la liste actuelle
    },

    nextStep() {
        if (this.currentStep < this.stepContent.length) {
            this.currentStep++;
        }
    },

    getCurrentStepData() {
        return this.stepContent[this.currentStep - 1];
    }
};
