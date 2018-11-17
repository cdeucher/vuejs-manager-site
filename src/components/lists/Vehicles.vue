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
          vehicles:'vehicles'
      })
   },
   created () {
       console.log('Vehicles - created',this.vehicles.length);
       if(this.vehicles.length <= 0){
         console.log('pullVehicles');
         this.pullVehicles();
       }else{
         console.log('vehiclesList',this.vehicles);
         this.vehiclesList = this.vehicles;
       }
   },
   methods: {
         pullVehicles: function () {
           console.log('pullVehicles',this.token);
           axios.post('http://www:3000/vehicle/search',{ },
              {  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+this.token
                 }
              }).then(response => {
                    console.log('then',response.data.vehicles)
                    this.$store.dispatch('pullVehicle', response.data.vehicles);
                    this.vehiclesList = response.data.vehicles;
              }).catch(e => {
                    this.errors.push(e)
              })
       }
  }
 }
</script>
