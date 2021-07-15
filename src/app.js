const countries = ["France", "Spain", "Irak", "Italy", "Denmark", "Poland"];
const countriesAutoComplete = new AutoComplete(
  "#countries",
  "#3282f7",
  countries,
  "Countries",
  (element, text) => element.toLowerCase().includes(text.toLowerCase())
);
