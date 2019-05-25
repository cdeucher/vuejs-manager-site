<template>
   <div>

   <div class="row">
     <div class="card">
       <div class="card-body">
         <h5 class="card-title">{{owner.nome}}</h5>
         <p class="card-text">{{owner.endereco}}</p>
         <p class="card-text">{{owner.whats}}</p>
         <router-link
                 v-bind:to="`/owner/${ownerId}/edit`"
                 class="btn btn-primary"
                 style="cursor: pointer">Editar</router-link>
       </div>
     </div>
   </div>
   <div class="row">
     <VehicleList
          v-for="(vehicle, data) in vehicles"
          v-bind:key="data"
          v-bind:vehicle="vehicle"
     ></VehicleList>
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
//import VehicleMini    from '../vehicle/components/VehicleMini.vue';
import VehicleList    from '../vehicle/components/VehicleList.vue';

export default {
  data(){
     return {
        errors: [],
        owner: {},
        vehicles: [],
        ownerId: this.$route.params.id
     }
  },
  components: {
     VehicleList: VehicleList
  },
  created () {
      this.pullOwner()
      this.pullVehicles()
  },
  computed: {
     ...mapGetters({
         token:'token',
         host:'host'
     })
  },
  methods: {
      pullOwner: function () {
          const auth = {  headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+this.token
             }
          }
          axios.get(this.host+'/owner/'+this.ownerId,auth).then(response => {
               //console.log('then',response.data.owner)
               this.owner = response.data.owner;
          }).catch(e => {
               this.errors.push(e)
          })
      },
      pullVehicles: function () {
          const auth = {  headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+this.token
             }
          }
          axios.get(this.host+'/vehicle/owner/'+this.ownerId,auth).then(response => {
               //console.log('then',response.data.vehicles)
               this.vehicles = response.data.vehicles;
          }).catch(e => {
               this.errors.push(e)
          })
      },
 }
}
</script>
<style scoped>
 .card{
    float: left;
    width: 14rem;
 }
</style>
