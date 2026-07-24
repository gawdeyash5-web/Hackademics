class DoryController {
    constructor() {
        this.state = "idle";

        this.listeners = new Set();
    }

    subscribe(callback) {
        this.listeners.add(callback);

        callback(this.state);

        return () => {
            this.listeners.delete(callback);
        };
    }

    notify() {
        this.listeners.forEach((listener) => listener(this.state));
    }

    getState() {
        return this.state;
    }

    reset() {
        this.state = "idle";
        this.notify();
    }

    playerEnteredZone() {
    if (this.state !== "idle") return;

    this.state = "button";
    this.notify();
}

    playerLeftZone() {
        if (this.state === "button") {
            this.state = "idle";
            this.notify();
        }
    }

    openCoralInfo() {
        if (this.state !== "button") return;

        this.state = "info";
        this.notify();
    }

    startDialogue() {
        if (this.state !== "info") return;

        this.state = "dialogue";
        this.notify();
    }

    finishDialogue() {
    if (this.state !== "dialogue") return;

    this.state = "completed";
    this.notify();
}

    
}

const doryController = new DoryController();

export default doryController;