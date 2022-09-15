<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <Disclosure
    as="nav"
    class="bg-amber-700 fixed top-0 z-10 w-full"
    v-slot="{ open }"
  >
    <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
      <div class="relative flex items-center justify-between h-16">
        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <!-- Mobile menu button-->
          <DisclosureButton
            class="
              inline-flex
              items-center
              justify-center
              p-2
              rounded-md
              text-gray-400
              hover:text-white hover:bg-orange-900
              focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white
            "
          >
            <span class="sr-only">Open main menu</span>
            <MenuIcon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
            <XIcon v-else class="block h-6 w-6" aria-hidden="true" />
          </DisclosureButton>
        </div>
        <div
          class="
            flex-1 flex
            items-center
            justify-center
            sm:items-stretch sm:justify-start
          "
        >
          <a href="inicio" class="flex-shrink-0 flex items-center">
            <img
              class="block lg:hidden h-8 w-auto"
              src="src\assets\logo.svg"
              alt="Workflow"
            />
            <img
              class="hidden lg:block h-8 w-auto"
              src="src\assets\logo.svg"
              alt="Workflow"
            />
          </a>
          <div class="hidden sm:block sm:ml-6 w-full">
            <div class="flex space-x-4 justify-end">
              <RouterLink
                v-for="item in navigation"
                :key="item.name"
                :to="item.href"
                class="
                  text-gray-300
                  hover:bg-orange-900 hover:text-white
                  px-3
                  py-2
                  rounded-md
                  text-base
                  font-normal
                  flex
                  items-center
                  flex-col
                  relative
                "
                :aria-current="item.current ? 'page' : undefined"
                ><img :src="item.icon" class="w-8" />
                <div
                  v-if="item.current && counter > 0"
                  :class="item.breadcrumbs"
                >
                  {{ counter }}
                </div>
                {{ item.name }}</RouterLink
              >
            </div>
          </div>
        </div>
        <div class="flex h-16 ml-10" v-if="!store.state.authenticated">
          <a
            @click="logInModal = true"
            to=""
            class="
              text-gray-300
              hover:bg-orange-900 hover:text-white
              px-3
              py-1
              rounded-md
              text-base
              font-normal
              flex
              items-center
              flex-col
              relative
            "
            ><img src="src/assets/icons/LogInIcon.svg" class="w-8" />Ingresar</a
          >
          <a
            @click="registerModal = true"
            class="
              text-gray-300
              hover:bg-orange-900 hover:text-white
              px-3
              py-1
              rounded-md
              text-base
              font-normal
              flex
              items-center
              flex-col
              relative
            "
            ><ClipboardIcon class="text-white" />Registrarse</a
          >
        </div>
        <div
          class="
            absolute
            inset-y-0
            right-0
            flex
            items-center
            pr-2
            sm:static sm:inset-auto sm:ml-6 sm:pr-0
          "
          v-else
        >
          <button
            type="button"
            class="
              bg-amber-700
              p-1
              rounded-full
              text-gray-400
              hover:text-white
              focus:outline-none
              focus:ring-2
              focus:ring-offset-2
              focus:ring-offset-gray-800
              focus:ring-white
            "
          >
            <span class="sr-only">View notifications</span>
            <BellIcon class="h-6 w-6" aria-hidden="true" />
          </button>

          <!-- Profile dropdown -->
          <Menu as="div" class="ml-3 relative">
            <div>
              <MenuButton
                class="
                  bg-gray-800
                  flex
                  text-sm
                  rounded-full
                  focus:outline-none
                  focus:ring-2
                  focus:ring-offset-2
                  focus:ring-offset-gray-800
                  focus:ring-white
                  items-center
                  gap-2
                  pl-3
                "
              >
                <span class="sr-only">Open user menu</span>
                <div class="text-white ">
                {{ name }}
                </div>
                <img
                  class="h-8 w-8 rounded-full"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                />
              </MenuButton>
            </div>
            <transition
              enter-active-class="transition ease-out duration-100"
              enter-from-class="transform opacity-0 scale-95"
              enter-to-class="transform opacity-100 scale-100"
              leave-active-class="transition ease-in duration-75"
              leave-from-class="transform opacity-100 scale-100"
              leave-to-class="transform opacity-0 scale-95"
            >
              <MenuItems
                class="
                  origin-top-right
                  absolute
                  z-10
                  right-0
                  mt-2
                  w-48
                  rounded-md
                  shadow-lg
                  py-1
                  bg-white
                  ring-1 ring-black ring-opacity-5
                  focus:outline-none
                "
              >
                <MenuItem v-slot="{ active }">
                  <a
                    href="#"
                    :class="[
                      active ? 'bg-gray-100' : '',
                      'block px-4 py-2 text-sm text-gray-700',
                    ]"
                    >Perfil</a
                  >
                </MenuItem>
                <MenuItem v-slot="{ active }">
                  <a
                    href="#"
                    :class="[
                      active ? 'bg-gray-100' : '',
                      'block px-4 py-2 text-sm text-gray-700',
                    ]"
                    >Opciones</a
                  >
                </MenuItem>
                <MenuItem v-slot="{ active }">
                  <a
                    @click="logout"
                    :class="[
                      active ? 'bg-gray-100' : '',
                      'block px-4 py-2 text-sm text-gray-700',
                    ]"
                    >Salir</a
                  >
                </MenuItem>
              </MenuItems>
            </transition>
          </Menu>
        </div>
      </div>
    </div>

    <DisclosurePanel class="sm:hidden overflow-hidden">
      <div class="px-2 pt-2 pb-3 space-y-1">
        <RouterLink
          v-for="item in navigation"
          :key="item.name"
          :to="item.href"
          class="
            text-gray-300
            hover:bg-orange-900 hover:text-white
            px-3
            py-2
            rounded-md
            text-base
            font-medium
            flex
            items-center
            gap-3
          "
          :aria-current="item.current ? 'page' : undefined"
          ><img :src="item.icon" class="w-5" />{{ item.name }}
          <div
            v-if="item.current && counter > 0"
            class="bg-red-600 w-6 text-center rounded-full"
          >
            {{ counter }}
          </div></RouterLink
        >
      </div>
    </DisclosurePanel>
  </Disclosure>
  <div v-if="logInModal" class="fixed z-20 w-full">
    <LogInView />
  </div>
  <div v-if="registerModal" class="fixed z-20 w-full">
    <RegisterView />
  </div>
</template>

<script setup>
import LogInView from "../views/LogInView.vue";
import RegisterView from "../views/RegisterView.vue";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/vue";
import {
  BellIcon,
  MenuIcon,
  XIcon,
  ClipboardIcon,
} from "@heroicons/vue/outline";
import { computed, provide, ref } from "@vue/runtime-core";
import { useCookies } from "vue3-cookies";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
const router = useRouter()
const store = useStore();
const { cookies } = useCookies();
const navigation = [
  {
    name: "Inicio",
    href: "/inicio",
    icon: "src/assets/icons/HomeIcon.svg",
    current: false,
    breadcrumbs: "",
  },
  {
    name: "Carrito",
    href: "/carrito",
    icon: "src/assets/icons/ShoppingCartIcon.svg",
    current: true,
    breadcrumbs:
      "inline-flex absolute top-0 right-0 justify-center items-center w-6 h-6 text-xs font-bold text-white bg-red-500 rounded-full border-2 border-white dark:border-gray-900",
  },
];
let counter = computed(() => store.state.count);
const name = computed(() => store.state.user.name);
let logInModal = ref(false);
let registerModal = ref(false);
provide("logInModal", logInModal);
provide("registerModal", registerModal);

const logout = async function () {
  const token = cookies.get("token");
  const response = await store.dispatch("logout", token);
  console.log(response);
  if (response.status!==null && response.status==200) {
    cookies.remove("id");
    cookies.remove("name");
    cookies.remove("email");
    cookies.remove("token");
    cookies.remove("authenticated");
    router.go('/inicio')
  }
};
</script>



<style scoped>
.router-link-active {
  background-color: #9a3412;
  color: white;
}
</style>