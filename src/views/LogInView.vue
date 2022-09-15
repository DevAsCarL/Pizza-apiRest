<template>
  <section class="bg-gray-900/75 h-screen w-screen inline-flex items-center">
    <div
      class="
        flex flex-col
        items-center
        justify-center
        px-6
        py-8
        mx-auto
        md:h-screen
        lg:py-0
      "
    >
      <a
        href="/"
        class="
          flex
          items-center
          mb-6
          text-2xl
          font-semibold
          text-gray-900
          dark:text-white
        "
      >
        <img class="w-8 h-8 mr-2" src="src\assets\logo.svg" alt="logo" />
        Pizzap
      </a>
      <div
        class="
          w-full
          bg-amber-700
          rounded-lg
          shadow
          dark:border
          md:mt-0
          sm:max-w-md
          xl:p-0
        "
      >
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8 relative">
          <button
            @click="closeLogIn = false"
            type="button"
            class="w-8 text-white absolute top-0 right-0 hover:text-gray-300"
          >
            <XIcon />
          </button>
          <form
            class="space-y-4 md:space-y-6"
            action="#"
            @submit.prevent="sendLogIn"
          >
            <div>
              <label
                for="username"
                class="
                  block
                  mb-2
                  text-sm
                  font-medium
                  text-gray-900
                  dark:text-white
                "
                >Usuario</label
              >
              <input
                type="text"
                name="username"
                id="username"
                v-model="userForm.username"
                class="
                  bg-gray-50
                  border border-gray-300
                  text-gray-900
                  sm:text-sm
                  rounded-lg
                  focus:ring-primary-600 focus:border-primary-600
                  block
                  w-full
                  p-2.5
                "
                placeholder="Usuario001"
                required=""
              />
            </div>
            <div>
              <label
                for="password"
                class="
                  block
                  mb-2
                  text-sm
                  font-medium
                  text-gray-900
                  dark:text-white
                "
                >Contraseña</label
              >
              <input
                type="password"
                name="password"
                id="password"
                v-model="userForm.password"
                placeholder="••••••••"
                class="
                  bg-gray-50
                  border border-gray-300
                  text-gray-900
                  sm:text-sm
                  rounded-lg
                  focus:ring-primary-600 focus:border-primary-600
                  block
                  w-full
                  p-2.5
                "
                required=""
              />
            </div>
            <div class="flex items-center justify-between gap-10">
              <div class="flex items-start">
                <div class="flex items-center h-5">
                  <input
                    id="remember"
                    aria-describedby="remember"
                    type="checkbox"
                    class="
                      w-4
                      h-4
                      border border-gray-300
                      rounded
                      bg-gray-50
                      focus:ring-3 focus:ring-primary-300
                    "
                  />
                </div>
                <div class="ml-1 text-sm">
                  <label for="remember" class="text-gray-300">Recordarme</label>
                </div>
              </div>
              <a
                href="#"
                class="
                  text-sm
                  font-medium
                  text-primary-600
                  hover:underline
                  dark:text-primary-500
                "
                >¿Olvidaste tu contraseña?</a
              >
            </div>
            <button
              class="
                w-full
                text-white
                bg-amber-600
                hover:bg-amber-700
                focus:ring-4 focus:outline-none focus:ring-primary-300
                font-medium
                rounded-lg
                text-sm
                px-5
                py-2.5
                text-center
                border-transparent border-2
                hover:border-white
              "
            >
              Ingresar
            </button>
            <div :class="messageForm.color.value">{{ messageForm.data }}</div>
            <p class="text-sm font-light text-gray-300">
              ¿No tienes una cuenta?
              <a href="#" class="font-medium text-primary-600 hover:underline"
                >Registrarse</a
              >
            </p>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { XIcon } from "@heroicons/vue/outline";

import { inject, ref } from "@vue/runtime-core";
import axios from "axios";
import { useRouter } from "vue-router";
import { useCookies } from "vue3-cookies";
import { useStore } from "vuex";
const { cookies } = useCookies();
const store = useStore();
const router = useRouter();

let closeLogIn = inject("logInModal");
const userForm = {
  username: "",
  password: "",
};
const messageForm = {
  data: ref(),
  color: ref(''),
};
  const sendLogIn = async function (e) {
  const response = await store.dispatch("login", userForm);

  if (response.status!==null && response.status===200) {
    cookies.set("id", response.data.user.id);
    cookies.set("name", response.data.user.name);
    cookies.set("email", response.data.user.email);
    cookies.set("token", `Bearer ${response.data.access_token}`);
    cookies.set("authenticated", true);
    router.go("/inicio");
  }
  messageForm.color.value="bg-white text-red-600 text-center"
  messageForm.data.value=response.response.data.error
};
</script>

<style scoped>
</style>