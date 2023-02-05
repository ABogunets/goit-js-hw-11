export default class LoadMoreBtn {
  constructor({selector, isHidden = false}) {
    this.button = this.getButton(selector)
    isHidden && this.hideBtn();
  }
  getButton(selector) {
    return document.querySelector(selector);
  }

  hideBtn() {
    this.button.classList.add("is-hidden");
  }

  showBtn() {
    this.button.classList.remove("is-hidden");
  }

  enableBtn() {
    this.button.disabled = false;
    this.button.textContent = "Load more";
  }

  disableBtn() {
    this.button.disabled = true;
    this.button.textContent = "Loading...";
  }
}