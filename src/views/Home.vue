<template>
  <div class="home">
    <h1>Головна сторінка</h1>
    <p>Ласкаво просимо до нашого магазину! Тут ви знайдете найкращі товари.</p>

    <!-- Приклад списку товарів -->
    <section class="products">
      <h2>Популярні товари</h2>
      <div class="product-list">
        <div class="product-card" v-for="product in products" :key="product.id">
          <img :src="product.image" :alt="product.name" class="product-image" />
          <h3>{{ product.name }}</h3>
          <p>{{ product.description }}</p>
          <p><strong>Ціна:</strong> {{ product.price }} грн</p>
          <p><strong>Розмір:</strong> {{ product.size }}</p>
          <button @click="addToCart(product)">Додати в кошик</button>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import { useCartStore } from '../stores/cart'; // Використовуємо Pinia

interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
  size: string;
}

export default {
  name: 'Home',
  setup() {
    const cartStore = useCartStore(); // Імпортуємо магазин для кошика

    // Список популярних товарів
    const products = ref<Product[]>([
      {
        id: 1,
        name: 'Худі “Angel”',
        description: 'Завжди бути в тренді та ефектно виділитися з одноманітного сірого натовпу!',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDNYdIXWNvaydVALlxJMZZ_fdbwxBzZrYk0w&s',
        price: 800,
        size: 'M',
      },
      {
        id: 2,
        name: 'Джинси Revolver',
        description: 'Наймодніші та трендовіші в цьому сезоні широкі джинси баггі.',
        image: 'https://content.rozetka.com.ua/goods/images/big/418152440.jpg',
        price: 1200,
        size: 'L',
      },
      {
        id: 3,
        name: 'Чоловіча футболка "Salo Chasnyk Tsybulia"',
        description: 'Футболка з принтом "Salo Chasnyk Tsybulia", Український тренд.',
        image: 'https://images.prom.ua/4528471203_w600_h600_4528471203.jpg',
        price: 500,
        size: 'S',
      },
    ]);

    // Додати товар у кошик
    const addToCart = (product: Product) => {
      cartStore.addToCart(product); // Виклик функції магазину
    };

    return {
      products,
      addToCart,
    };
  },
};
</script>


<style scoped>
.home {
  padding: 20px;
}

.products {
  margin-top: 30px;
}

.product-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.product-card {
  border: 1px solid #ccc;
  padding: 15px;
  border-radius: 8px;
  width: 200px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
.product-image {
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 4px;
  margin-bottom: 10px;
}



.product-card h3 {
  font-size: 1.2rem;
}

.product-card p {
  color: #555;
  font-size: 0.9rem;
}

.product-card button {
  margin-top: 10px;
  padding: 8px 16px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.product-card button:hover {
  background-color: #45a049;
}
</style>
