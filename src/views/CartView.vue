<template>
  <section class="bg-gray-100 py-20">
  <div class="container mx-auto">
    <div class="flex shadow-md my-10 flex-col md:flex-row">
      <div class="w-full bg-white px-10 py-10">
        <div class="flex justify-between border-b pb-8">
          <h1 class="font-semibold text-2xl">Carrito de Compras</h1>
          <h2 class="font-semibold text-2xl">Articulos</h2>
        </div>
        <div class="flex mt-10 mb-5">
          <h3 class="font-semibold text-gray-600 text-xs uppercase w-2/5">Detalles de compra</h3>
          <h3 class="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">Cantidad</h3>
          <h3 class="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">Precio</h3>
          <h3 class="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">Total</h3>
        </div>
        <div class="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5" v-for="(pizza) in pizzas" :key="pizza.id">
          <div class="flex w-2/5" > <!-- product -->
            <div class="w-24">
              <img class="h-14 md:h-24" :src="pizza.image" alt="">
            </div>
            <div class="flex flex-col justify-between ml-4 flex-grow">
              <span class="font-bold text-sm">{{pizza.name}}</span>
              <span class="text-red-500 text-xs">{{pizza.name}}</span>
              <a href="#" @click="store.commit('deleteItem',pizza)" class="font-semibold hover:text-red-500 text-gray-500 text-xs">Remover</a>
            </div>
          </div>
          <div class="flex justify-center w-1/5">
            <svg @click="store.dispatch('removeToCart',pizza)"  class="fill-current text-gray-600 w-3 cursor-pointer hover:text-amber-700" viewBox="0 0 448 512"><path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"/>
            </svg>

            <input class="mx-2 border text-center w-8" type="text" :value="pizza.quantity" disabled>
            {{pizza.quatity}}
            <svg @click="store.dispatch('addToCart',pizza)" class="fill-current text-gray-600 w-3 cursor-pointer hover:text-amber-700" viewBox="0 0 448 512">
              <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"/>
            </svg>
          </div>
          <span class="text-center w-1/5 font-semibold text-sm">S/.{{pizza.price}}</span>
          <span class="text-center w-1/5 font-semibold text-sm">S/.{{totalPrice(pizza.id)}}</span>
        </div>

        <RouterLink to="/inicio" class="flex font-semibold text-indigo-600 text-sm mt-10">
      
          <svg class="fill-current mr-2 text-indigo-600 w-4" viewBox="0 0 448 512"><path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z"/></svg>
          Continuar comprando
        </RouterLink>
      </div>

      <div id="summary" class="md:w-1/4  w-full px-8 py-10">
        <h1 class="font-semibold text-2xl border-b pb-8">Resumen de la orden</h1>
        <div class="flex justify-between mt-10 mb-5">
          <span class="font-semibold text-sm uppercase">Items {{counter}}</span>
          <span class="font-semibold text-sm">S/.{{total}}</span>
        </div>
        <div>
          <label class="font-medium inline-block mb-3 text-sm uppercase">Envio</label>
          <select class="block p-2 text-gray-600 w-full text-sm">
            <option>Envio estandar - S/.10.00</option>
          </select>
        </div>
        <div class="py-10">
          <label for="promo" class="font-semibold inline-block mb-3 text-sm uppercase">Codigo de Promocion</label>
          <input type="text" id="promo" placeholder="Ingresa tu codigo" class="p-2 text-sm w-full">
        </div>
        <button class="bg-red-500 hover:bg-red-600 px-5 py-2 text-sm text-white uppercase">Aplicar</button>
        <div class="border-t mt-8">
          <div class="flex font-semibold justify-between py-6 text-sm uppercase">
            <span>Costo total</span>
            <span>S/.{{shipping.plus(total)}}</span>
          </div>
          <button class="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full">Comprar</button>
        </div>
      </div>

    </div>
  </div>
  </section>
</template>

<script setup>
import { computed, watch } from "@vue/runtime-core";
import { useStore } from "vuex";
import {Decimal} from 'decimal.js';
const store = useStore();
store.dispatch('getPizzas')
const pizzas = computed(()=>store.state.basket)
const counter = computed(()=>store.state.count)
const total = computed(()=>store.state.total)
const shipping = new Decimal(10)
function totalPrice(id) { 
store.commit('totalPrice',id)
const totalPrice = computed(()=>store.state.totalPrice)
return totalPrice.value
}


// watch(counter,
//   ()=> {
//     const newPizzas = computed(()=>store.state.basket)
//     console.log('pizzas');
//   }
// )

</script>

<style>

</style>