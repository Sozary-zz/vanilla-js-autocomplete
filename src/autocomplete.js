class AutoComplete {
  constructor(items, id, color, title) {
    this.items = items;
    this.title = title;
    this.color = color;
    this.text = "";
    this.id = id;
    this.constraints = [];
    this.filteredItems = Object.keys(items);
    this.chips = [];
    this.showList = false;

    this.render();
  }

  getItems() {
    let keys = [];

    if (this.constraints.length === 0) {
      return Object.keys(this.items);
    }

    for (const item in this.items) {
      if (this.items[item].find((e) => this.constraints.includes(e))) {
        keys.push(item);
      }
    }
    return keys;
  }

  getDom() {
    const domElement = document.querySelector(this.id);

    if (!domElement) {
      console.error(`Node element ${this.id} not found`);
      return;
    }

    return domElement;
  }

  updateConstraints(constraints) {
    this.constraints = constraints;

    this.filteredItems = this.getItems();

    this.generateChips();
    this.generateList();
  }

  removeChildren(parent) {
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
  }

  addToChips(label) {
    this.chips.push(label);
    this.filteredItems.splice(this.filteredItems.indexOf(label), 1);

    this.generateChips();
    this.generateList();
  }

  addToList(label) {
    if (label.includes(this.text)) {
      this.filteredItems.push(label);
    }
    this.chips.splice(this.chips.indexOf(label), 1);

    this.generateChips();
    this.generateList();
  }

  generateChips() {
    const dom = document.querySelector(`${this.id} .ac-chips`);

    this.removeChildren(dom);

    this.chips.forEach((item) => {
      const elem = document.createElement("button");
      const close = document.createElement("i");

      elem.innerText = item;
      close.onclick = () => {
        this.addToList(item);
      };
      close.classList.add("far", "fa-times-circle");
      close.style.marginLeft = "5px";
      elem.appendChild(close);
      dom.appendChild(elem);
    });
  }

  generateList() {
    const dom = document.querySelector(`${this.id} .ac-body`);
    this.removeChildren(dom);

    this.filteredItems.forEach((item) => {
      const elem = document.createElement("button");

      elem.innerText = item;
      elem.onclick = () => {
        this.addToChips(item);
      };
      dom.appendChild(elem);
    });
  }

  renderDom(dom) {
    let html = `
    <div class="ac-container">
    <div class="ac-chips ${this.color}">
    </div>
    <div class="ac ${this.color}">
    <div class="ac-header ${this.color}">
    <input type="text" placeholder="${this.title}" />
    <i class="fas fa-chevron-down"></i>
    </div>
    <div class="ac-body ${this.color}">
    </div>
    </div>
    </div>`;

    dom.innerHTML = html;
  }

  generateInput() {
    const dom = document.querySelector(`${this.id} input`);

    dom.addEventListener("input", (e) => {
      const text = e.target.value;
      const arrow = document.querySelector(`${this.id} i`);

      this.text = text;
      if (!this.showList) {
        this.toggleDropdown(arrow);
      }
      if (text === "" && this.showList) {
        this.toggleDropdown(arrow);
      }

      this.filteredItems = this.getItems().filter((item) =>
        item.toLowerCase().includes(text.toLowerCase())
      );
      this.filteredItems = this.filteredItems.filter(
        (s) => !this.chips.find((c) => c === s)
      );

      this.generateList();
    });
  }

  toggleDropdown(e) {
    this.showList = !this.showList;
    e.style.transform = `rotate(${180 * +this.showList}deg)`;
    document.querySelector(`${this.id} .ac-body`).style.display = this.showList
      ? "flex"
      : "none";
  }

  generateDropdown() {
    const dom = document.querySelector(`${this.id} i`);

    dom.addEventListener("click", (e) => {
      this.toggleDropdown(e.target);
    });
  }

  render() {
    const dom = this.getDom();
    this.renderDom(dom);
    this.generateList();
    this.generateDropdown();
    this.generateInput();
  }
}
