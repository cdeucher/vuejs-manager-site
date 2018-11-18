<template>
   <div>

     <div class="card">
       <img class="card-img-top" v-bind:src="imgHost" alt="Card image cap">
       <div class="card-body">
         <h5 class="card-title">{{vehicle.modelo}}</h5>
         <p class="card-text">{{vehicle.renavan}}</p>
         <p class="card-text">{{vehicle.descricao}}</p>
         <router-link
                 v-bind:to="`/vehicle/${vehicle._id}/edit`"
                 class="btn btn-primary"
                 style="cursor: pointer">Editar</router-link>
         <router-link
                 v-bind:to="`/vehicle/${vehicle._id}`"
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
          imgHost : '/assets/custom/vehicles/vehicle-not-found.svg'
      }
   },
   mounted(){
     this.loadImg()
   },
   props: ['vehicle'],
   computed: {
      ...mapGetters({
          token:'token',
          host:'host'
      })
   },
   methods: {
       loadImg: function () {
           this.imgHost = this.host+'/'+this.vehicle.vehicleImage
       }
   }
 }
</script>

<style scoped>
 .card{
    float: left;
    width: 14rem;
 }
</style>
