import { defineStore } from 'pinia';

interface CartItem {
  id: number;
  name: string;
  price: number;
  size: string;
  image: string;
}

export const useCartStore = defineStore('cart', {
  state: () => ({
    cart: [] as CartItem[],
  }),
  getters: {
    total: (state) => state.cart.reduce((sum, item) => sum + item.price, 0),
  },
  actions: {
    addToCart(product: CartItem) {
      this.cart.push(product);
    },
    removeFromCart(id: number) {
      this.cart = this.cart.filter((item) => item.id !== id);
    },
    clearCart() {
      this.cart = [];
    },
  },
});
