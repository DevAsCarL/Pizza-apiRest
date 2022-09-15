<template>
  <section class="main__container overflow-hidden">
    <span class="flex flex-col justify-between h-full">
      <div class="text__content flex flex-col">
        <h1 class="text-left sm:text-center md:text-left mt-14 md:mt-9">
          Pizzap
        </h1>
        <h2 class="text-left sm:text-center md:text-left ml-4">Piensa en Ti</h2>
      </div>
      <figure class="relative">
        <img
          src="src/assets/images/pizza.png"
          class="absolute bottom-4 right-6"
        />
        <img src="src/assets/images/mesa.png" alt="" srcset="" />
      </figure>
    </span>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
      <path
        fill="white"
        fill-opacity="1"
        d="M0,192L48,202.7C96,213,192,235,288,224C384,213,480,171,576,154.7C672,139,768,149,864,170.7C960,192,1056,224,1152,229.3C1248,235,1344,213,1392,202.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
      ></path>
    </svg>
  </section>

  <section
    class="
      bg-white
      h-auto
      mx-5
      my-10
      flex
      justify-center
      items-center
      gap-5
      flex-wrap
    "
  >
    <div
      class="max-w-sm rounded overflow-hidden shadow-xl"
      v-for="pizza in pizzas"
      :key="pizza.id"
    >
      <img class="bg-cover h-56 w-full" :src="pizza.image" alt="Pizza" />
      <div class="px-6 py-4">
        <div class="font-bold text-xl mb-2">{{ pizza.name }}</div>
        <p class="text-gray-700 text-base">
          {{ pizza.description }}
        </p>
      </div>
      <div class="px-6 pt-4 pb-2 flex justify-center">
        <button
          @click="saveCookie(pizza)"
          class="
            bg-amber-700
            hover:bg-amber-500
            cursor-pointer
            text-white
            font-bold
            py-2
            px-4
            rounded
            flex
            gap-2
          "
          :id="pizza.id"
        >
          <img src="src\assets\icons\ShoppingCartIcon.svg" class="w-5" /> Añadir
          al carrito
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, inject } from "vue";
import { useCookies } from "vue3-cookies";
import { useStore } from "vuex";
const { cookies } = useCookies();
const store = useStore();
// cookies.remove('basket')
// cookies.remove('total')


const shopping = computed(() => store.state.shopping);
store.dispatch("getPizzas");
const pizzas = computed(() => store.state.pizzas);
function saveCookie(object) {
  store.dispatch("addToCart", object);
}
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Calligraffitti&family=Pacifico&display=swap");
.main__container {
  width: 100%;
  height: calc(100vh - 4rem);
  background-image: url("src/assets/images/backgroundBanner.png");
  position: relative;
}
.main__container svg {
  position: absolute;
  bottom: 0;
}
.text__content {
  font-family: "Calligraffitti", cursive;
}
.text__content h1 {
  font-size: 15vw;
  color: rgb(245, 159, 0);
  font-family: "Pacifico", cursive;
  text-shadow: black 5px 5px;
}
.text__content h2 {
  font-size: 5vw;
  color: white;
}
@media (max-width: 850px) {
  .main__container {
    height: 100vw;
  }
}
</style>