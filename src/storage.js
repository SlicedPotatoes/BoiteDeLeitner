import { reactive, watch } from "vue";
import { getDecks, getDeck, getDayCards } from "./api.js";

// Lire depuis le local storage ou définir une valeur par défaut
const currPageLS = localStorage.getItem("currPage") || "home";
const selectedDeckLS = localStorage.getItem("selectedDeck") || null;

// Récupération de donnée API
const decksData = await getDecks();
const defaultDeckData = await getDeck("null");
const dayliCardData = await getDayCards();

// Mélanger les cartes du jour
for (let i = 0; i < dayliCardData.length; i++) {
  for (let j = dayliCardData[i].cartes.length - 1; j >= 0; j--) {
    const index = Math.floor(Math.random() * (j + 1));
    [dayliCardData[i].cartes[j], dayliCardData[i].cartes[index]] = [dayliCardData[i].cartes[index], dayliCardData[i].cartes[j]];
  }
}

// En faire des variables réactives
const currPage = reactive({ value: currPageLS });
const decks = reactive(decksData);
const defaultDeck = reactive({ iddeck: null, nom: "default", module: "", nbcarte: defaultDeckData.length, cartes: defaultDeckData });
const selectedDeck = reactive({ value: selectedDeckLS });
const dayliCard = reactive(dayliCardData);

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

export { currPage, decks, defaultDeck, selectedDeck, dayliCard };
