<template>
  <header class="navbar">
    <div class="logo">
      <img src="../assets/logo.png" alt="Logo" />

      <h1>VVclothes</h1>
    </div>
    <nav>
      <ul>
        <li><router-link to="/">Головна</router-link></li>
        <li><router-link to="/favorites">Улюблений</router-link></li>
        <li><router-link to="/:catchAll(.*)">404</router-link></li>
        <li><router-link to="/cart">Корзина</router-link></li>
      </ul>
    </nav>
  </header>
</template>

<style scoped>
/* Стилі для navbar */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #333;
  color: white;
}

.logo {
  display: flex;
  align-items: center;
}

.logo img {
  width: 50px;
  height: 50px;
  margin-right: 10px;
}

nav ul {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
}

nav ul li {
  margin-left: 20px;
}

nav ul li a {
  color: white;
  text-decoration: none;
  font-weight: bold;
}

nav ul li a:hover {
  text-decoration: underline;
}
</style>
