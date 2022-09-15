
<template>
<NavBar/>
<RouterView />
<Footer/>
</template>

<script setup>
import {  RouterLink, RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'

import Footer from './components/Footer.vue';

</script>
