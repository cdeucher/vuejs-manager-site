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
                 <label for="placa">VALOR</label>
                 <input type="number"
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
                @click.prevent="add">Add
            </button>
            <button
                class="btn btn-primary"
                @click.prevent="view">Ver
            </button>            
         </div>
      </div>
      <!-- success -->
      <ul v-if="success && success.length">
        <li v-for="(suc, data) in success" :key="data">
         {{data}}{{suc.message}}
        </li>
      </ul>
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

export default {
  data(){
     return {
        errors: [],
        success: [],
        vehicle: {owner:{}},
        vehicleId: this.$route.params.vehicleId,
        value: 0,
        detail: ''
     }
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
            }).catch(e => {
                 this.errors.push(e)
            })
      },
      add(){
          var tmp = confirm("Confirmar Custo ?")
          if(tmp){
              this.fieldValidation()
              if(this.errors.length == 0)
                this.createAdd()
          }else{
              console.log('Cancel Custo')
          }
      },
      createAdd(){
          var other = {
              "transactionId": this.vehicle.transactionId,
              "type": 'money',
              "financial":{
                "description":this.detail,
                "value":this.value,
                "include": true
              }
          }
          this.pushOperation(other)
      },
      pushOperation: function (other) {
          axios.post(this.host+'/other/', other,
             {  headers: {
                   'Content-Type': 'application/json',
                   'Authorization': 'Bearer '+this.token
                }
             }).then(response => {
                 //console.log('pushOperation',response)
                 this.success.push(response.data)
                 this.confirmUpdate()
             }).catch(e => {
                 this.errors.push(e)
             })
      },
      fieldValidation(){
          this.errors = []
          if(this.value  == 0 |
             this.detail == ''){
                this.errors.push({'message':'Field Validation Error'})
          }
      },
      confirmUpdate(){
          this.$router.replace('/vehicle/'+this.vehicleId)
      },
      view(){
          this.$router.replace('/vehicle/'+this.vehicleId)
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
