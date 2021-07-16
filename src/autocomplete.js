class AutoComplete {
  constructor(id, list, title, filterFunction, comparaisonFunction) {
    this.title = title;
    this.list = list;
    this.sortedList = list;
    this.id = id;
    this.chips = [];
    this.text = null;
    this.showList = false;
    this.filterFunction = filterFunction;
    this.comparaisonFunction = comparaisonFunction;
    this.render();
  }

  toggleDropdown(e) {
    this.showList = !this.showList;
    e.style.transform = `rotate(${180 * +this.showList}deg)`;
    document.querySelector(`${this.id} .ac-body`).style.display = this.showList
      ? "flex"
      : "none";
  }

  applyFilter(text) {
    this.text = text;
    const arrow = document.querySelector(`${this.id} i`);
    if (!this.showList) {
      this.toggleDropdown(arrow);
    }
    if (text === "" && this.showList) {
      this.toggleDropdown(arrow);
    }

    this.sortedList = this.list.filter((e) => this.filterFunction(e, text));
    this.sortedList = this.sortedList.filter(
      (s) => !this.chips.find((c) => this.comparaisonFunction(s, c))
    );

    document.querySelector(`${this.id} .ac-body`).innerHTML = this.renderList();
    this.handleEvents();
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

  chipsClick(b) {
    const label = b.innerText;
    this.sortedList.push(label);
    this.chips.splice(this.chips.indexOf(label), 1);
    console.log("Hey");
    let toAdd = this.sortedList.filter((s) => this.filterFunction(s, label));
    console.log(toAdd);

    this.removeChildren(`${this.id} .ac-chips`);
    this.removeChildren(`${this.id} .ac-body`);
    
    document.querySelector(`${this.id} .ac-chips`).innerHTML =
      this.renderChips();

    document.querySelector(`${this.id} .ac-body`).innerHTML = this.renderList();

    this.handleEvents();
  }

  removeChildren(element) {
    var first = element.firstElementChild;
    while (first) {
      first.remove();
      first = e.firstElementChild;
    }
  }

  handleEvents() {
    document.querySelectorAll(`${this.id} .ac-chips button`).forEach((e) => {
      e.addEventListener("click", (e) => {
        this.chipsClick(e.target);
      });
    });

    document.querySelectorAll(`${this.id} .ac-body button`).forEach((e) => {
      e.addEventListener("click", (b) => {
        const label = b.target.innerText;
        this.chips.push(label);
        this.sortedList.splice(this.sortedList.indexOf(label), 1);

        this.removeChildren(`${this.id} .ac-chips`);
        this.removeChildren(`${this.id} .ac-body`);

        document.querySelector(`${this.id} .ac-chips`).innerHTML =
          this.renderChips();
        document.querySelector(`${this.id} .ac-body`).innerHTML =
          this.renderList();

        this.handleEvents();
      });
    });
  }

  render() {
    const dom = this.getDom();

    this.renderDom(dom);

    document.querySelector(`${this.id} i`).addEventListener("click", (e) => {
      this.toggleDropdown(e.target);
    });
    document
      .querySelector(`${this.id} input`)
      .addEventListener("input", (e) => {
        this.applyFilter(e.target.value);
      });

    this.handleEvents();
  }
}
