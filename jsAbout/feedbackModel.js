class FeedbackModel {
    constructor() {
        this.selectedFeedback = null;
        this.observers = [];
    }

    setFeedback(feedback) {
        this.selectedFeedback = feedback;
        this.notifyObservers();
    }

    getFeedback() {
        return this.selectedFeedback;
    }

    addObserver(observer) {
        this.observers.push(observer);
    }

    notifyObservers() {
        this.observers.forEach(observer => observer());
    }
}