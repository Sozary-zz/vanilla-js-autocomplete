class AutoComplete {
  constructor(id, list, title, filterFunction) {
    this.title = title;
    this.list = list;
    this.sortedList = list;
    this.id = id;
    this.chips = [];
    this.showList = false;
    this.filterFunction = filterFunction;
    this.render();
  }

  toggleDropdown(element) {
    this.showList = !this.showList;
    element.style.transform = `rotate(${180 * +this.showList}deg)`;
    document.querySelector(`${this.id} .ac-body`).style.display = this.showList
      ? "flex"
      : "none";
  }

  applyFilter(text) {
    const arrow = document.querySelector(`${this.id} i`);
    if (!this.showList) {
      this.toggleDropdown(arrow);
    }
    if (text === "" && this.showList) {
      this.toggleDropdown(arrow);
    }

    this.sortedList = this.list.filter((e) => this.filterFunction(e, text));
    document.querySelector(`${this.id} .ac-body`).innerHTML = this.renderList();
  }

  getDom() {
    const domElement = document.querySelector(this.id);

    if (!domElement) {
      console.error(`Node element ${this.id} not found`);
      return;
    }

    return domElement;
  }

  renderList() {
    return this.sortedList.map((e) => `<button>${e}</button>`).join("");
  }

  renderChips() {
    return this.chips.map((e) => `<button>${e}</button>`).join("");
  }

  renderDom(dom) {
    let html = `
    <div class="ac-container">
    <div class="ac-chips">
    ${this.renderChips()}
    </div>
    <div class="ac">
    <div class="ac-header">
    <input type="text" placeholder="${this.title}" />
    <i class="fas fa-chevron-down"></i>
    </div>
    <div class="ac-body">
    ${this.renderList()}
    </div>
    </div>
    </div>`;

    dom.innerHTML = html;
  }

  handleEvents() {
    document.querySelectorAll(`${this.id} .ac-chips button`).forEach((e) => {
      e.addEventListener("click", (b) => {
        const label = b.target.innerText;
        this.sortedList.push(label);
        this.chips.splice(this.chips.indexOf(label), 1);

        document.querySelector(`${this.id} .ac-chips`).innerHTML =
          this.renderChips();
        document.querySelector(`${this.id} .ac-body`).innerHTML =
          this.renderList();
        this.handleEvents();
      });
    });

    document.querySelectorAll(`${this.id} .ac-body button`).forEach((e) => {
      e.addEventListener("click", (b) => {
        const label = b.target.innerText;
        this.chips.push(label);
        this.sortedList.splice(this.sortedList.indexOf(label), 1);

        document.querySelector(`${this.id} .ac-chips`).innerHTML =
          this.renderChips();
        document.querySelector(`${this.id} .ac-body`).innerHTML =
          this.renderList();
        this.handleEvents();
      });
    });

    document.querySelector(`${this.id} i`).addEventListener("click", (e) => {
      this.toggleDropdown(e.target);
    });

    document
      .querySelector(`${this.id} input`)
      .addEventListener("input", (e) => {
        this.applyFilter(e.target.value);
      });
  }

  render() {
    const dom = this.getDom();

    this.renderDom(dom);
    this.handleEvents();
  }
}
