<template>
  <div class="home">
    <h1>Головна сторінка</h1>
    <p>Ласкаво просимо до нашого магазину! Тут ви знайдете найкращі товари.</p>

    <!-- Форма фільтрації -->
    <div class="filters">
      <input v-model="filters.name" placeholder="Назва" @input="updateFilters" />
      <input v-model="filters.minPrice" type="number" placeholder="Мін. ціна" @input="updateFilters" />
      <input v-model="filters.maxPrice" type="number" placeholder="Макс. ціна" @input="updateFilters" />
      <select v-model="filters.category" @change="updateFilters">
        <option value="">Категорія</option>
        <option value="electronics">Електроніка</option>
        <option value="clothing">Одяг</option>
      </select>
    </div>

    <!-- Список товарів -->
    <section class="products">
      <h2>Популярні товари</h2>
      <div class="product-list">
        <div class="product-card" v-for="product in filteredProducts" :key="product.id">
          <img :src="product.image" :alt="product.name" class="product-image" />
          <h3>{{ product.name }}</h3>
          <p>{{ product.description }}</p>
          <p><strong>Ціна:</strong> {{ product.price }} грн</p>
          <p><strong>Розмір:</strong> {{ product.size }}</p>
          <button @click="addToCart(product)">Додати в кошик</button>
        </div>
      </div>
    </section>

    <!-- Пагінація -->
    <div class="pagination">
      <button @click="changePage(currentPage - 1)" :disabled="currentPage <= 1">Попередня</button>
      <button @click="changePage(currentPage + 1)">Наступна</button>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useCartStore } from '../stores/cart'; // Використовуємо Pinia

interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
  size: string;
  category?: string;
}

export default {
  name: 'Home',
  setup() {
    const cartStore = useCartStore(); // Імпортуємо магазин для кошика
    const route = useRoute();
    const router = useRouter();

    const currentPage = ref(Number(route.query.page) || 1);
    const limit = 10; // Кількість товарів на сторінці
    const filters = ref({
      name: '',
      minPrice: null,
      maxPrice: null,
      category: ''
    });

    // Список товарів (це просто приклад)
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

    // Обробка додавання товару в кошик
    const addToCart = (product: Product) => {
      cartStore.addToCart(product);
    };

    // Фільтрація товарів
    const filteredProducts = computed(() => {
      let filtered = products.value;

      if (filters.value.name) {
        filtered = filtered.filter((product) =>
          product.name.toLowerCase().includes(filters.value.name.toLowerCase())
        );
      }

      if (filters.value.minPrice !== null && filters.value.minPrice !== undefined) {
      filtered = filtered.filter((product) => product.price >= filters.value.minPrice);
      }

       if (filters.value.maxPrice !== null && filters.value.maxPrice !== undefined) {
        filtered = filtered.filter((product) => product.price <= filters.value.maxPrice);
      }

      if (filters.value.category) {
        filtered = filtered.filter((product) => product.category === filters.value.category);
      }

      // Пагінація: обрізаємо список товарів відповідно до сторінки та ліміту
      const start = (currentPage.value - 1) * limit;
      const end = start + limit;
      return filtered.slice(start, end);
    });

    // Оновлення фільтрів в URL
    const updateFilters = () => {
      router.push({
        query: {
          ...route.query,
          page: 1, // Скидаємо на першу сторінку при зміні фільтрів
          name: filters.value.name,
          minPrice: filters.value.minPrice,
          maxPrice: filters.value.maxPrice,
          category: filters.value.category
        }
      });
    };

    // Зміна сторінки
    const changePage = (page: number) => {
      if (page < 1) return;
      router.push({
        query: { ...route.query, page }
      });
    };

    return {
      products,
      addToCart,
      filters,
      filteredProducts,
      currentPage,
      changePage,
      updateFilters
    };
  },
};
</script>

<style scoped>
.home {
  padding: 20px;
}

.filters {
  margin-bottom: 20px;
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

.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
}
</style>
