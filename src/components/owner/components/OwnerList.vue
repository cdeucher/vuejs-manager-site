<template>

       <div class="row">
           <div  class="col">{{owner.nome}}</div>
           <div  class="col">{{owner.cpf}}</div>
           <div  class="col">{{owner.whats}}</div>
           <div  class="col">{{owner.endereco}}</div>
           <div  class="col"><button v-if="showCheck" @click="callParent(owner)" type="button" class="btn btn-primary">Check</button></div>
           <div  class="col"><router-link
                   v-bind:to="`/owner/${owner._id}`"
                   class="btn btn-primary"
                   style="cursor: pointer">See</router-link></div>
           <div  class="col"><router-link
                   v-bind:to="`/owner/${owner._id}/edit`"
                   class="btn btn-primary"
                   style="cursor: pointer">Edit</router-link></div>                   
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
 .row{
    padding-top: 5px;
 }
 .col {
    border-bottom: 1pt solid #ccc;
  }
</style>
