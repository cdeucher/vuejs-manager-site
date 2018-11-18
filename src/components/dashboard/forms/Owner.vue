<template>
   <div>

     <div class="card">
       <div class="card-body">
         <h5 class="card-title">{{owner.nome}}</h5>
         <router-link
                 v-bind:to="`/owner/${owner._id}/edit`"
                 class="btn btn-primary"
                 style="cursor: pointer">Editar</router-link>
         <router-link
                 v-bind:to="`/owner/${owner._id}`"
                 class="btn btn-primary"
                 style="cursor: pointer">Ver</router-link>
       </div>
     </div>

   </div>
</template>

<script>
 import {mapGetters} from 'vuex';

 export default {
   data(){
      return {

      }
   },
   props: ['owner'],
   computed: {
      ...mapGetters({
          token:'token',
          host:'host'
      })
   },
   methods: {
   }
 }
</script>

<style scoped>
 .card{
    float: left;
    width: 14rem;
 }
</style>
