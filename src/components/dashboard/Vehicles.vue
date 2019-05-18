<template>
   <div class="buttons">
       <button v-for="(button, index) in options"
               v-bind:key="button.text"
               @click="filterOption(button,index)"
               v-bind:class= "[button.activated == true ? 'btn-primary' : 'btn-default']"
               type="button" class="btn">{{button.text}}</button>
       <hr>
      <VehicleList
        v-for="(vehicle, data) in even(vehiclesList)"
        v-bind:key="data"
        v-bind:vehicle="vehicle"
      ></VehicleList>      

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
 import VehicleList    from '../vehicle/components/VehicleList.vue';

 export default {
   data(){
      return {
         errors: [],
         vehiclesList: [],
         optionsList: []
      }
   },
   components: {
        VehicleList: VehicleList
   },
   computed: {
      ...mapGetters({
          token:'token',
          host:'host',
          vehicles:'vehicles',
          options:'options'
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
       },
       even: function (vehiclesList) {
         if(this.filter != undefined){
             return vehiclesList.filter((vehicle) =>{
               return vehicle.status == this.filter
             })
         }else{
             return this.vehiclesList
         }
       },
       filterOption: function (option) {
          //console.log('updateOption',option)
          this.filter = (option.activated == true) ? undefined : option.text
          this.$store.dispatch('updateOption', option);
       }
  }
 }
</script>

<style scoped>
   hr { margin-bottom: 0px; }
</style>
