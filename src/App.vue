<template>
  <div id="app">
    <Head></Head>
    <Menu></Menu>
      <transition name="slide" mode="out-in">
          <router-view></router-view>
      </transition>
  </div>
</template>

<script>
import Head from './components/Head.vue';
import Menu from './components/Menu.vue';
export default {
  name: 'app',
  data () {
    return {
    }
  },
  created () {
    this.$store.dispatch('tryAutoLogin')
  },
  components: {
     Head: Head,
     Menu: Menu
  }
}
</script>


<style>
    body {
        padding-left: 30px;
        padding-right: 30px;
        padding-bottom: 30px;
    }
    .slide-enter-active {
        animation: slide-in 200ms ease-out forwards;
    }
    .slide-leave-active {
        animation: slide-out 200ms ease-out forwards;
    }
    @keyframes slide-in {
        from {
            transform: translateY(-30px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
    @keyframes slide-out {
        from {
            transform: translateY(0);
            opacity: 1;
        }
        to {
            transform: translateY(-30px);
            opacity: 0;
        }
    }
</style>
