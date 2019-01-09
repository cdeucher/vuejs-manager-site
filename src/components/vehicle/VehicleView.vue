<template>
   <div>

     <form>
      <div class="row">
       <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
         <div class="card">
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
         <div class="card">
           <OwnerMini
                v-if="vehicle.owner"
                v-bind:owner="vehicle.owner"
           ></OwnerMini>
         </div>
        </div>
      </div>
      <!-- Save button -->
      <hr>
      <div class="row">
         <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
            <button v-if="vehicle.status == 'Estoque'"
                class="btn btn-success"
                @click.prevent="submitted_sell">Vender
            </button>
            <button v-if="vehicle.status == 'Proposta' || vehicle.status == 'Vendido'"
                class="btn btn-success"
                @click.prevent="submitted_buy">Comprar
            </button>
         </div>
      </div>
     </form>

      <!-- Logs -->
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

import OwnerMini    from '../owner/components/OwnerMini.vue';

export default {
  data(){
     return {
        errors: [],
        vehicle: {},
        vehicleId: this.$route.params.id,
        imgHost : '/assets/custom/vehicles/vehicle-not-found.svg'
     }
  },
  components: {
     OwnerMini: OwnerMini
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
      submitted_sell: function () {
          //console.log('buy',this.vehicle)
          this.$router.replace('/transaction/'+this.vehicle._id+'/sell')
      },
      submitted_buy: function () {
          //console.log('buy',this.vehicle)
          this.$router.replace('/transaction/'+this.vehicle._id+'/buy')
      },
      loadImg: function () {
         for(let i in this.vehicle.imageList){
               if(this.vehicle.imageList[i].target != "doc"){
                  this.imgHost = this.host+'/'+this.vehicle.imageList[i].path;
                  break;
               }
         }
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
