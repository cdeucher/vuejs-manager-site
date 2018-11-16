<template>
  <div id="app">
    <Head></Head>
    <Bar></Bar>
    <hr>
    <router-view></router-view>
  </div>
</template>

<script>
import Head from './components/Head.vue';
import Bar from './components/Bar.vue';
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
     Bar: Bar
  }
}
</script>
