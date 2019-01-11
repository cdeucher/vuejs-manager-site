<template>
   <div>

      <div class="row">
        <div class="receipt-main col-xs-12 col-sm-12 col-md-12 col-xs-offset-1 col-sm-offset-1 col-md-offset-3">
          <div class="col-xs-6 col-sm-6 col-md-12 text-right">
          <VehicleMini
               v-if="vehicle.owner"
               v-bind:vehicle="vehicle"
          ></VehicleMini>
          </div>
          <div class="col-xs-6 col-sm-6 col-md-12 text-right">
          <OwnerMini
               v-if="vehicle.owner"
               v-bind:owner="vehicle.owner"
          ></OwnerMini>
          </div>
          <div class="col-xs-12 col-sm-12 col-md-12 text-left">
           <TransactionMini
                v-bind:transactions="transactions"
           ></TransactionMini>
          </div>
        </div>
      </div>
      <!-- Save button -->
      <hr>
      <div class="row">
         <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
            <button
                class="btn btn-primary"
                @click.prevent="edit">Editar
            </button>
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
import VehicleMini    from '../vehicle/components/VehicleMini.vue';
import TransactionMini    from '../transaction/components/TransactionMini.vue';

export default {
  data(){
     return {
        errors: [],
        vehicle: {},
        transactions: [],
        vehicleId: this.$route.params.id
     }
  },
  components: {
     OwnerMini: OwnerMini,
     TransactionMini:TransactionMini,
     VehicleMini:VehicleMini
  },
  created () {
      this.pullVehicle()
      this.pullTransactions()
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
           }).catch(e => {
                 this.errors.push(e)
           })
      },
      pullTransactions: function () {
            const auth = {  headers: {
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer '+this.token
               }
            }
            axios.get(this.host+'/transaction/'+this.vehicleId,auth).then(response => {
                 //console.log('then',response.data.transactions)
                 this.transactions = response.data.transactions;
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
      edit(){
          this.$router.replace('/vehicle/'+this.vehicleId+'/edit')
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
