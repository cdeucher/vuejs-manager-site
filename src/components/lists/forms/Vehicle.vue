<template>
   <div>

     <div class="card" style="width: 18rem;">
       <!-- img class="card-img-top" src="/assets/custom/vehicles/vehicle-not-found.svg" alt="Card image cap" -->
       <img class="card-img-top" v-bind:src="host+vehicle.vehicleImage" alt="Card image cap">
       <div class="card-body">
         <h5 class="card-title">{{vehicle.modelo}}</h5>
         <p class="card-text">{{vehicle.renavan}}</p>
         <p class="card-text">{{vehicle.descricao}}</p>
         <a href="#" class="btn btn-primary">Go</a>
       </div>
     </div>

   </div>
</template>

<script>

 export default {
   data(){
      return {
         host: 'http://www:3000/'
      }
   },
   created () {
       //console.log('Vehicle',vehicle);
   },
   props: ['vehicle']
 }
</script>

<style scoped>
 .card{
    float: left;
 }
</style>
