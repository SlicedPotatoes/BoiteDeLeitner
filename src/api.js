import axios from "axios";

const BASE_URL = "https://boite.btb.wtf/api";

export const getDecks = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/decks`);
    return response.data;
  } catch (error) {
    throw new Error(`Erreur lors de la récupération des données: ${error.message}`);
  }
};

export const getDeck = async (deckId) => {
  try {
    const response = await axios.get(`${BASE_URL}/deck/${deckId}`);
    return response.data;
  } catch (error) {
    throw new Error(`Erreur lors de la récupération des données: ${error.message}`);
  }
};

export const addDeck = async (deck) => {
  try {
    const response = await axios.post(`${BASE_URL}/deck`, deck);
    return response.data;
  } catch (error) {
    throw new Error(`Erreur lors de la récupération des données: ${error.message}`);
  }
};

export const updateDeck = async (deckId, deck) => {
  try {
    const response = await axios.put(`${BASE_URL}/deck/${deckId}`, deck);
    return response.data;
  } catch (error) {
    throw new Error(`Erreur lors de la récupération des données: ${error.message}`);
  }
};

export const deleteDeck = async (deckId) => {
  try {
    const response = await axios.delete(`${BASE_URL}/deck/${deckId}`);
    return response.data;
  } catch (error) {
    throw new Error(`Erreur lors de la récupération des données: ${error.message}`);
  }
};

export const addCard = async (card) => {
  try {
    const response = await axios.post(`${BASE_URL}/carte`, card);
    return response.data;
  } catch (error) {
    throw new Error(`Erreur lors de la récupération des données: ${error.message}`);
  }
};

export const updateCard = async (cardId, card) => {
  try {
    const response = await axios.put(`${BASE_URL}/carte/${cardId}`, card);
    return response.data;
  } catch (error) {
    throw new Error(`Erreur lors de la récupération des données: ${error.message}`);
  }
};

export const deleteCard = async (cardId) => {
  try {
    const response = await axios.delete(`${BASE_URL}/carte/${cardId}`);
    return response.data;
  } catch (error) {
    throw new Error(`Erreur lors de la récupération des données: ${error.message}`);
  }
};

export const getBacs = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/bacs`);
    return response.data;
  } catch (error) {
    throw new Error(`Erreur lors de la récupération des données: ${error.message}`);
  }
};

export const addBac = async (bac) => {
  try {
    const response = await axios.post(`${BASE_URL}/bac`, bac);
    return response.data;
  } catch (error) {
    throw new Error(`Erreur lors de la récupération des données: ${error.message}`);
  }
};

export const updateBac = async (bacId, bac) => {
  try {
    const response = await axios.put(`${BASE_URL}/bac/${bacId}`, bac);
    return response.data;
  } catch (error) {
    throw new Error(`Erreur lors de la récupération des données: ${error.message}`);
  }
};

export const deleteBac = async (bacId) => {
  try {
    const response = await axios.delete(`${BASE_URL}/bac/${bacId}`);
    return response.data;
  } catch (error) {
    throw new Error(`Erreur lors de la récupération des données: ${error.message}`);
  }
};
