<template>
   <div>

      <div class="row">
       <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
         <div class="card">
           <div class="card-body">
             <h5 class="card-title">Buy</h5>
             <p class="card-title">{{vehicle.modelo}}</p>
             <p class="card-text">{{vehicle.renavan}}</p>
             <p class="card-text">{{vehicle.descricao}}</p>
             <p class="card-text">{{vehicle.value}}</p>
             Owner: <p class="card-text">{{vehicle.owner.nome}}</p>
             Whats: <p class="card-text">{{vehicle.owner.whats}}</p>
           </div>
         </div>
        </div>
      </div>
      <!-- Owner -->
      <hr>
      <div class="row">
          <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
             <div class="form-group">
                <div class="row">
                    <h5>Owner</h5>
                    <OwnerModal
                         :vehicleId="vehicleId"
                         :errors="errors"
                         @changeOwner="owner = $event"
                    ></OwnerModal>
                    <OwnerMini
                          v-if="owner"
                          v-bind:owner="owner"
                    ></OwnerMini>
                </div>
             </div>
             <div class="form-group">
                 <label for="placa">VALOR</label>
                 <input type="text" id="value"
                                 class="form-control"
                                 v-model="value">
             </div>
             <div class="form-group">
                 <label for="message">DETALHES</label><br>
                 <textarea
                         rows="5"
                         class="form-control"
                         v-model="detail"></textarea>
             </div>
         </div>
      </div>
      <hr>
      <div class="row">
         <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
            <button
                class="btn btn-success"
                @click.prevent="buy">Buy
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
import imgGroup     from '../util/imgGroup.vue';
import OwnerModal   from '../owner/components/OwnerModal.vue';
import OwnerMini    from '../owner/components/OwnerMini.vue';

export default {
  data(){
     return {
        errors: [],
        vehicle: {owner:{}},
        vehicleId: this.$route.params.vehicleId,
        owner: '',
        value: 0,
        detail: ''
     }
  },
  components: {
    OwnerModal: OwnerModal,
      imgGroup: imgGroup,
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
                 console.log('then',response.data.vehicle)
                 this.vehicle = response.data.vehicle;
            }).catch(e => {
                 this.errors.push(e)
            })
      },
      buy(){
          this.createProposal()
          this.createBuy()
          this.updateVehicle()
      },
      createProposal(){
          var transaction = {
              "owner": this.vehicle.owner._id,
              "vehicle": this.vehicleId,
              "type": 'proposal',
              "financial":{
                "description":this.vehicle.detalhes,
                "value":(!this.vehicle.value) ? 0 : this.vehicle.value,
                "include": true
              }
          }
          this.pushOperation(transaction)
      },
      createBuy(){
          var transaction = {
              "owner": this.owner._id,
              "vehicle": this.vehicleId,
              "type": 'buy',
              "financial":{
                "description":this.detail,
                "value":this.value,
                "include": true
              }
          }
          this.pushOperation(transaction)
      },
      updateVehicle() {
        const tmp = { value:this.value
                     ,owner:this.owner._id
                    ,status:'Estoque' };
        //console.log('submitted',tmp)
        axios.post(this.host+'/vehicle/'+this.vehicleId, tmp,
           {  headers: {
                 'Content-Type': 'application/json',
                 'Authorization': 'Bearer '+this.token
              }
           }).then(response => {
                 //console.log('then',response)
                 this.errors.push(response.data)
                 this.confirmUpdate(this.vehicleId)
           }).catch(e => {
                 //console.log('catch',e);
                 this.errors.push(e)
           })
      },
      confirmUpdate(vehicleId){
          this.$router.replace('/vehicle/'+vehicleId)
      },
      pushOperation: function (transaction) {
          axios.post(this.host+'/transaction/', transaction,
             {  headers: {
                   'Content-Type': 'application/json',
                   'Authorization': 'Bearer '+this.token
                }
             }).then(response => {
                 console.log('pushOperation',response)
                 this.errors.push(response.data)
             }).catch(e => {
                 this.errors.push(e)
             })
      },
 }
}
</script>

<style>

  .row {
     margin-right: 0px !important;
     margin-left: 0px !important;
  }
</style>
