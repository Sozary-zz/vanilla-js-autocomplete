const ingredients = { "Lait de coco": [4, 6], lait: [1, 2], ail: [0, 1, 5] };
const ingredientsAucomplete = new AutoComplete(
  ingredients,
  "#ingredients",
  "blue",
  "Ingrédients"
);
ingredientsAucomplete.updateConstraints([1, 5]);
