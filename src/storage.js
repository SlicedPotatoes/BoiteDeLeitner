import { reactive, watch } from "vue";
import { getDecks, getDeck, getBacs } from "./api.js";

// Lire depuis le local storage ou définir une valeur par défaut
const currPageLS = localStorage.getItem("currPage") || "home";
const selectedDeckLS = localStorage.getItem("selectedDeck") || null;

// Récupération de donnée API
const decksData = await getDecks();
const defaultDeckData = await getDeck("null");
const bacsData = await getBacs();

// En faire des variables réactives
const currPage = reactive({ value: currPageLS });
const decks = reactive(decksData);
const defaultDeck = reactive({ iddeck: null, nom: "default", module: "", nbcarte: defaultDeckData.length, cartes: defaultDeckData });
const bacs = reactive(bacsData);
const selectedDeck = reactive({ value: selectedDeckLS });

if (selectedDeck.value == "null") {
  selectedDeck.value = null;
}

// Mettre à jour le local storage chaque fois la valeur change
watch(currPage, (newValue) => {
  localStorage.setItem("currPage", newValue.value);
});
watch(selectedDeck, (newValue) => {
  localStorage.setItem("selectedDeck", newValue.value);
});

export { currPage, decks, defaultDeck, selectedDeck, bacs };
