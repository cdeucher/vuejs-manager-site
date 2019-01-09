<template>
   <div>

     <div class="card">
       <div class="card-body">
         <h5 class="card-title">{{owner.nome}}</h5>
         <button v-if="showCheck" @click="callParent(owner)" type="button" class="btn btn-primary">Check</button>
         <router-link
                 v-bind:to="`/owner/${owner._id}`"
                 class="btn btn-primary"
                 style="cursor: pointer">See</router-link>
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
   props: ['owner','showCheck'],
   computed: {
      ...mapGetters({
          token:'token',
          host:'host'
      })
   },
   methods: {
      callParent: function(me){
         try{
            this.$emit('action', me)
         } catch(e){
            console.log('ownerMini - callParent',e)
         }
      }
   }
 }
</script>

<style scoped>
 .card{
    float: left;

 }
</style>
