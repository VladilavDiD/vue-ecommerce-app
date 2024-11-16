<template>
  <div class="image-slider">
    <img :src="images[currentIndex]" alt="Image" class="slider-image"/>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const images = [
  require('@/assets/1.png'),
  require('@/assets/2.png'),
];

const currentIndex = ref(0);

const changeImage = () => {
  currentIndex.value = (currentIndex.value + 1) % images.length;
};

onMounted(() => {
  setInterval(changeImage, 5000);
});
</script>

<style scoped>
.image-slider {
  width: 100%;
  max-width: 800px; /* Обмежуємо максимальний розмір */
  margin: 20px auto; /* Центруємо з відступами */
  padding: 20px;
  text-align: center;
}

.slider-image {
  width: 100%; /* Задаємо ширину 100% */
  height: auto;
  border-radius: 10px; /* Додаємо округлені краї */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); /* Легенька тінь */
  transition: opacity 0.5s ease;
}
</style>
