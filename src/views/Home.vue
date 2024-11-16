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
          <div class="product-buttons">
            <button @click="addToCart(product)" class="btn btn-add-to-cart">Додати в кошик</button>
            <button @click="addToFavorites(product)" class="btn btn-add-to-favorites">Додати в улюблені</button>
          </div>
        </div>
      </div>
    </section>

    <!-- Пагінація -->
    <div class="pagination">
      <button @click="changePage(currentPage - 1)" :disabled="currentPage <= 1" class="btn btn-pagination">Попередня</button>
      <button @click="changePage(currentPage + 1)" class="btn btn-pagination">Наступна</button>
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
  font-family: 'Arial', sans-serif;
}

.filters {
  margin-bottom: 20px;
  display: flex;
  gap: 10px;
}

.filters input,
.filters select {
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #ddd;
  font-size: 14px;
}

.filters input:focus,
.filters select:focus {
  outline: none;
  border-color: #4CAF50;
}

.products {
  margin-top: 30px;
}

.product-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

.product-card {
  border-radius: 10px;
  overflow: hidden;
  width: 280px;
  background: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.3s, box-shadow 0.3s;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
}

.product-image {
  width: 100%;
  height: 180px;
  object-fit: cover;
}

.product-card h3 {
  font-size: 1.4rem;
  margin-top: 10px;
  font-weight: bold;
  color: #333;
}

.product-card p {
  color: #777;
  font-size: 0.9rem;
}

.product-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
}

.product-buttons .btn {
  padding: 10px 20px;
  font-size: 14px;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
}

.product-buttons .btn:hover {
  transform: scale(1.05);
}

.btn-add-to-cart {
  background-color: #4CAF50;
  color: white;
}

.btn-add-to-cart:hover {
  background-color: #45a049;
}

.btn-add-to-favorites {
  background-color: #ff4081;
  color: white;
}

.btn-add-to-favorites:hover {
  background-color: #e73370;
}

.pagination {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 30px;
}

.btn-pagination {
  background-color: #007bff;
  color: white;
  padding: 8px 20px;
  border-radius: 25px;
  border: none;
  cursor: pointer;
}

.btn-pagination:hover {
  background-color: #0056b3;
}
</style>
