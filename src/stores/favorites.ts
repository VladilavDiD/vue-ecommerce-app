import { defineStore } from 'pinia';

export const useFavoritesStore = defineStore('favorites', {
  state: () => ({
    favorites: [] as number[], // Масив, що містить ID улюблених товарів
  }),
  actions: {
    addFavorite(productId: number) {
      if (!this.favorites.includes(productId)) {
        this.favorites.push(productId);
      }
    },
    removeFavorite(productId: number) {
      this.favorites = this.favorites.filter(id => id !== productId);
    },
    isFavorite(productId: number) {
      return this.favorites.includes(productId);
    }
  }
});
