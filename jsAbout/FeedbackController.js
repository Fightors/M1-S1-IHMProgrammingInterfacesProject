class FeedbackController {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        this.model.addObserver(() => this.updateView());
        this.view.bindFeedbackButtons(this.handleFeedback.bind(this));
    }

    handleFeedback(feedback) {
        this.model.setFeedback(feedback);
    }

    updateView() {
        const feedback = this.model.getFeedback();
        this.view.highlightButton(feedback);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const model = new FeedbackModel();
    const view = new FeedbackView();
    new FeedbackController(model, view);
});