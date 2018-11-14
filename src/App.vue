<template>
  <div id="app">
    <Barra></Barra>
    <hr>
       <router-link to="/">Home</router-link>
       <router-link to="/login">Login</router-link>
    </hr>
    <router-view></router-view>
  </div>
</template>

<script>
import Barra from './components/Barra.vue';
export default {
  name: 'app',
  data () {
    return {
    }
  },
  components: { Barra }
}
</script>
