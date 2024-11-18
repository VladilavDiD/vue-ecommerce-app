<template>
  <div class="cart">
    <h1>Кошик</h1>
    <div v-if="cart.length">
      <div class="cart-item" v-for="item in cart" :key="item.id">
        <img :src="item.image" :alt="item.name" class="cart-image" />
        <div>
          <h3>{{ item.name }}</h3>
          <p><strong>Ціна:</strong> {{ item.price }} грн</p>
          <p><strong>Розмір:</strong> {{ item.size }}</p>
        </div>
        <button @click="removeFromCart(item.id)">Видалити</button>
      </div>
      <p><strong>Загальна сума:</strong> {{ total }} грн</p>
      <button @click="checkout">Оформити замовлення</button>
    </div>
    <p v-else>Кошик порожній.</p>
  </div>
</template>

<script lang="ts">
import { useCartStore } from '../stores/cart';


export default {
  name: 'Cart',
  setup() {
    const cartStore = useCartStore();

    const removeFromCart = (id: number) => {
      cartStore.removeFromCart(id);
    };

    const checkout = () => {
      alert('Замовлення оформлено!');
      cartStore.clearCart();
    };

    return {
      cart: cartStore.cart,
      total: cartStore.total,
      removeFromCart,
      checkout,
    };
  },
};
</script>

<style scoped>
/* Стилі для кошика */
.cart-item {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}
.cart-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  margin-right: 10px;
}
</style>
