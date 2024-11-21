class FeedbackView {
    constructor() {
        this.redButton = document.getElementById('feedback-red');
        this.orangeButton = document.getElementById('feedback-orange');
        this.greenButton = document.getElementById('feedback-green');
        this.highlightAllButtons();
    }

    highlightAllButtons() {
        this.redButton.classList.add('active');
        this.orangeButton.classList.add('active');
        this.greenButton.classList.add('active');
    }

    highlightButton(feedback) {
        this.clearHighlights();
        if (feedback === 'red') {
            this.redButton.classList.add('active');
            this.orangeButton.classList.add('transparent');
            this.greenButton.classList.add('transparent');
        } else if (feedback === 'orange') {
            this.orangeButton.classList.add('active');
            this.redButton.classList.add('transparent');
            this.greenButton.classList.add('transparent');
        } else if (feedback === 'green') {
            this.greenButton.classList.add('active');
            this.redButton.classList.add('transparent');
            this.orangeButton.classList.add('transparent');
        }
    }

    clearHighlights() {
        this.redButton.classList.remove('active', 'transparent');
        this.orangeButton.classList.remove('active', 'transparent');
        this.greenButton.classList.remove('active', 'transparent');
    }

    bindFeedbackButtons(handler) {
        this.redButton.addEventListener('click', () => handler('red'));
        this.orangeButton.addEventListener('click', () => handler('orange'));
        this.greenButton.addEventListener('click', () => handler('green'));
    }
}