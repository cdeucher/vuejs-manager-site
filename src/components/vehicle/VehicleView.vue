<template>
   <div>

     <div class="card">
       <!-- img class="card-img-top" src="/assets/custom/vehicles/vehicle-not-found.svg" alt="Card image cap" -->
       <img class="card-img-top" v-bind:src="imgHost" alt="Card image cap">
       <div class="card-body">
         <h5 class="card-title">{{vehicle.modelo}}</h5>
         <p class="card-text">{{vehicle.renavan}}</p>
         <p class="card-text">{{vehicle.descricao}}</p>
         <router-link
                 v-bind:to="`/vehicle/${vehicleId}/edit`"
                 class="btn btn-primary"
                 style="cursor: pointer">Editar</router-link>
       </div>
     </div>

     <router-view></router-view>

     <ul v-if="errors && errors.length">
       <li v-for="(error, data) in errors" :key="data">
         {{data}}{{error.message}}
       </li>
     </ul>
   </div>
</template>

<script>
import axios from 'axios';
import {mapGetters} from 'vuex';

export default {
  data(){
     return {
        errors: [],
        vehicle: {},
        vehicleId: this.$route.params.id,
        imgHost : '/assets/custom/vehicles/vehicle-not-found.svg'
     }
  },
  mounted(){

  },
  created () {
      this.pullVehicle();
  },
  computed: {
     ...mapGetters({
         token:'token',
         host:'host'
     })
  },
  methods: {
        pullVehicle: function () {
            const auth = {  headers: {
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer '+this.token
               }
            }
            axios.get(this.host+'/vehicle/'+this.vehicleId,auth).then(response => {
                 //console.log('then',response.data.vehicle)
                 this.vehicle = response.data.vehicle;
                 this.loadImg()
           }).catch(e => {
                 this.errors.push(e)
           })
      },
      loadImg: function () {
         if(this.vehicle.imageList[0])
          this.imgHost = this.host+'/'+this.vehicle.imageList[0].path;
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
