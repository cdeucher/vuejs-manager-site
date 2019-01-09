<template>
   <div>

     <div class="card">
       <div class="card-body">
         <p class="card-text">{{index}}) {{transaction.type}}</p>
         <p class="card-text">{{transaction.owner.nome}}</p>
         <p class="card-text">{{transaction.financial.description}}</p>
         <p class="card-text">R${{transaction.financial.value}}</p>
         <p class="card-text">{{transaction.date}}</p>
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
   props: ['transaction','index'],
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
     min-width: 400px
  }
</style>
