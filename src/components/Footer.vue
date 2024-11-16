<template>
  <footer class="footer">
    <div class="contact-info">
      <p>Контакти: info@vvclothes.com</p>
      <p>Телефон: +380123456789</p>
      <p>Адреса: Київ, Україна</p>
    </div>
    <div class="social-links">
      <!-- Соціальні мережі -->
      <a href="#">Facebook</a>
      <a href="#">Instagram</a>
    </div>
  </footer>
</template>

<script setup>
// Логіка для футера
</script>

<style scoped>
/* Стилі для футера */
.footer {
  background-color: #333;
  color: white;
  padding: 20px;
  text-align: center;
}

.footer .contact-info {
  margin-bottom: 20px;
}

.footer .social-links a {
  margin: 0 10px;
  text-decoration: none;
  color: white;
}

.footer .social-links a:hover {
  text-decoration: underline;
}
</style>
