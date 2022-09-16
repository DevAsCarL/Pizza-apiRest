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
        <img class="w-8 h-8 mr-2" src="/assets/images/logo.svg" alt="logo" />
        Pizzap
      </a>
      <div
        class="
          w-64
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
          <button @click="closeRegister=false"  type="button" class="w-8 text-white absolute top-0 right-0 hover:text-gray-300"><XIcon/></button>
          <form class="space-y-4 md:space-y-6" action="#" @submit.prevent="sendRegister">
            <div>
              <label
                for="name"
                class="
                  block
                  mb-2
                  text-sm
                  font-medium
                  text-gray-900
                  dark:text-white
                  required
                "
                >Nombre</label
              >
              <input
                type="text"
                name="name"
                id="name"
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
                placeholder="Carlos"
                required=""
                v-model="userForm.name"
              />
            </div>
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
                  required
                "
                >Usuario</label
              >
              <input
                type="text"
                name="username"
                id="username"
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
                v-model="userForm.username"
                placeholder="Usuario001"
                required=""
              />
            </div>
            <div>
              <label
                for="email"
                class="
                  block
                  mb-2
                  text-sm
                  font-medium
                  text-gray-900
                  dark:text-white
                  required
                "
                >Email</label
              >
              <input
                type="email"
                name="email"
                id="email"
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
                v-model="userForm.email"
                placeholder="email@email.com"
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
                  required
                "
                >Contraseña</label
              >
              <input
                type="password"
                name="password"
                id="password"
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
                v-model="userForm.password"
                required=""
              />
            </div>
            <div>
              <label
                for="password_confirmation"
                class="
                  block
                  mb-2
                  text-sm
                  font-medium
                  text-gray-900
                  dark:text-white
                  required
                "
                >Confirmar Contraseña</label
              >
              <input
                type="password"
                name="password_confirmation"
                id="password_confirmation"
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
                v-model="userForm.password_confirmation"
                required=""
              />
            </div>
            <div :class="messageForm.color.value">{{ messageForm.data }}</div>
            <button
              type="submit"
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
                border-transparent
                border-2
                hover:border-white
              "
            >
              Registrarse
            </button>
            
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import {
  XIcon
} from "@heroicons/vue/outline"
import { inject, ref } from "@vue/runtime-core"
import { useRouter } from "vue-router"
import { useStore } from "vuex"
const router = useRouter()
const store = useStore()

const userForm = {
  username:'',
  name:'',
  email:'',
  password:'',
  password_confirmation:''
}
const messageForm = {
  data: ref(),
  color: ref(''),
};

let closeRegister = inject('registerModal')

const sendRegister = async function () {
  const response = await store.dispatch("register", userForm);
  console.log(response);
  if (response.status!==null && response.status===201) {
    router.go('/inicio')
  }
  messageForm.color.value="bg-white text-red-600 text-center text-xs"
  messageForm.data.value=JSON.parse(response.response.data)
}

</script>

<style scoped>
.required::after{
  font-size: 1rem;
  content: " *";
  color: white;
  
}
</style>