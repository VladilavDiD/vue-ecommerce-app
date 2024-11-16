<template>
  <div class="review-box">
    <h2>Відгуки</h2>
    <div class="reviews">
      <div v-for="review in reviews" :key="review.id" class="review-card">
        <img :src="review.image" alt="review.name" class="review-image" />
        <div class="review-info">
          <h3>{{ review.name }}</h3>
          <p>{{ review.comment }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const reviews = [
  {
    id: 1,
    name: 'Іван',
    comment: 'Це чудовий товар!',
    image: '@/assets/vd1.png',
  },
  {
    id: 2,
    name: 'Марія',
    comment: 'Рекомендую цей товар, дуже зручний!',
    image: '@/assets/vd.png',
  },

];
</script>

<style scoped>
.review-box {
  padding: 20px;
  text-align: center;
}

.reviews {
  display: flex;
  justify-content: space-between;
  gap: 20px;
}

.review-card {
  width: 30%;
  border: 1px solid #ddd;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.review-image {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-bottom: 10px;
}

.review-info h3 {
  font-size: 1.1rem;
  margin-bottom: 5px;
}

.review-info p {
  font-size: 0.9rem;
  color: #555;
}
</style>
