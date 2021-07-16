const countries = ["France", "Spain", "Irak", "Italy", "Denmark", "Poland"];
const countriesAutoComplete = new AutoComplete(
  "#countries",
  countries,
  "Countries",
  (element, text) => element.toLowerCase().includes(text.toLowerCase()),
  (a, b) => a.toLowerCase().includes(b.toLowerCase())
);
