class InfoController {
  constructor() {
    this.active = null;
    this.listeners = new Set();
  }

  subscribe(callback) {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  notify() {
    this.listeners.forEach((cb) => cb(this.active));
  }

  show(point) {
    this.active = point;
    this.notify();
  }

  hide() {
    this.active = null;
    this.notify();
  }

  getActive() {
    return this.active;
  }
}

export default new InfoController();