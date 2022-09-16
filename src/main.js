import { createApp } from "vue";
import { createStore } from "vuex";
import App from "./App.vue";
import router from "./router";
import "./assets/main.css";
import { useCookies } from "vue3-cookies";
import { Decimal } from "decimal.js";
const { cookies } = useCookies();
import axios from "axios";
axios.defaults.baseURL = "https://larapizza-api.herokuapp.com/api/";
// Create a new store instance.
const store = createStore({
  state() {
    return {
      pizzas: {},
      count: cookies.get("basket")
        ? Object.entries(cookies.get("basket")).reduce(
            (sum, value) => sum + value[1].quantity,
            0
          )
        : 0,
      basket: cookies.get("basket") != null ? cookies.get("basket") : {},
      totalPrice: 0,
      total: cookies.get("total") ?? 0,
      user: {
        id: cookies.get("id") ?? null,
        name: cookies.get("name") ?? null,
        email: cookies.get("email") ?? null,
        token: cookies.get("token") ?? null,
      },
      authenticated: cookies.get("authenticated") ?? false,
    };
  },
  mutations: {
    addPizzas(state, payload) {
      state.pizzas = payload;
    },
    increment(state, payload) {
      state.count++;
    },
    decrement(state) {
      state.count--;
    },
    addToCart(state, payload) {
      state.basket[payload.id] = payload;
      state.total = new Decimal(state.total).plus(payload.price);
      cookies.set("total", state.total);
      cookies.set("basket", state.basket);
    },
    removeToCart(state, payload) {
      if (payload.quantity == 0) {
        delete state.basket[payload.id];
      }
      state.total = new Decimal(state.total).minus(payload.price);
      cookies.set("total", state.total);
      cookies.set("basket", state.basket);
    },
    deleteItem(state, payload) {
      state.count -= payload.quantity;
      delete state.basket[payload.id];
      cookies.set("total", state.total);
    },
    totalPrice(state, payload) {
      state.totalPrice = new Decimal(state.basket[payload].price).mul(
        state.basket[payload].quantity
      );
    },
  },
  actions: {
    async getPizzas({ commit }) {
      await axios
        .get("pizzas")
        .then((data) => commit("addPizzas", data.data))
        .catch((error) => alert(error));

      // fetch('http://pizza-api.local/api/pizzas')
      // .then(response => response.json())
      // .then(data => commit('addPizzas',data)).catch(error => alert(error));

      // const res = await fetch('/pizzas.json');
      // const data = await res.json();
      // commit('addPizzas',data)
    },
    addToCart({ state, commit }, product) {
      state.basket.hasOwnProperty(product.id)
        ? (product.quantity = state.basket[product.id].quantity + 1)
        : (product.quantity = 1);
      commit("addToCart", product);
      commit("increment");
    },
    removeToCart({ state, commit }, product) {
      if (
        state.basket.hasOwnProperty(product.id) &&
        state.basket[product.id].quantity > 0
      ) {
        product.quantity = state.basket[product.id].quantity - 1;
      }
      commit("removeToCart", product);
      commit("decrement");
    },  

    async register({}, request) {
      try {
        return await axios.post("register", request);
      } catch (error) {
        return error;
      }
    },

    async login({}, request) {
      try {
        return await axios.post("login", request);
      } catch (error) {
        return error;
      }
    },
    async logout({},request) {
      try {
        return await axios.post("logout",{},{
          headers: {
            Authorization: request
          },
        }) ;
      } catch (error) {
        return error;
      }
     

    },
  },
});

const app = createApp(App);

app.use(router).use(store);
app.mount("#app");
