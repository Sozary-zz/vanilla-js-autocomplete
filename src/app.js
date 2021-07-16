const countries = ["France", "Spain", "Irak", "Italy", "Denmark", "Poland"];
const countriesAutoComplete = new AutoComplete(
  "#countries",
  countries,
  "Countries",
  (element, text) => element.toLowerCase().includes(text.toLowerCase()),
  (a, b) => a.toLowerCase().includes(b.toLowerCase())
);
const noms = [1, 2, 3, 4, 5, 6];
const nomsAutoComplete = new AutoComplete(
  "#noms",
  noms,
  "Noms",
  (element, text) => element.toLowerCase().includes(text.toLowerCase()),
  (a, b) => a.toLowerCase().includes(b.toLowerCase())
);
