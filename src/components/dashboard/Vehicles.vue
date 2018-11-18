<template>
   <div>
      <Vehicle
        v-for="(vehicle, data) in vehiclesList"
        v-bind:key="data"
        v-bind:vehicle="vehicle"
      ></Vehicle>

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
 import Vehicle from './forms/Vehicle.vue';

 export default {
   data(){
      return {
         errors: [],
         vehiclesList: []
      }
   },
   components: {
      Vehicle: Vehicle
   },
   computed: {
      ...mapGetters({
          token:'token',
          host:'host',
          vehicles:'vehicles'
      })
   },
   created () {
       //console.log('Vehicles - load',this.vehicles.length);
       if(this.vehicles.length <= 0){
         //console.log('pullVehicles');
         this.pullVehicles();
       }else{
         //console.log('vehiclesList',this.vehicles);
         this.vehiclesList = this.vehicles;
       }
   },
   methods: {
         pullVehicles: function () {
           const auth = {  headers: {
                 'Content-Type': 'application/json',
                 'Authorization': 'Bearer '+this.token
              }
           }
           axios.get(this.host+'/vehicle/',auth).then(response => {
                    //console.log('then',response.data.vehicles)
                    this.$store.dispatch('pullVehicle', response.data.vehicles);
                    this.vehiclesList = response.data.vehicles;
              }).catch(e => {
                    this.errors.push(e)
              })
       }
  }
 }
</script>
