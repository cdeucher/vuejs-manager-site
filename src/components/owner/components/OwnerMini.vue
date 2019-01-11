<template>
   <div>

     <!-- div class="card">
       <div class="card-body">
         <h5 class="card-title">{{owner.nome}}</h5>
         <button v-if="showCheck" @click="callParent(owner)" type="button" class="btn btn-primary">Check</button>
         <router-link
                 v-bind:to="`/owner/${owner._id}`"
                 class="btn btn-primary"
                 style="cursor: pointer">See</router-link>
       </div>
     </div-->

     <div class="card">
       <div class="col-xs-12 col-sm-12 col-md-12">
         <div class="receipt-left">
           <h5>{{owner.nome}}</h5>
           <p><i class="fa fa-phone"> {{owner.cpf}} </i></p>
           <p><i class="fa fa-envelope-o"> {{owner.whats}} </i></p>
           <p><i class="fa fa-location-arrow"> {{owner.endereco}} </i></p>
           <button v-if="showCheck" @click="callParent(owner)" type="button" class="btn btn-primary">Check</button>
           <router-link
                   v-bind:to="`/owner/${owner._id}`"
                   class="btn btn-primary"
                   style="cursor: pointer">See</router-link>
         </div>
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
    padding: 15px;
 }
</style>
