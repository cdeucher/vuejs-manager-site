<template>
  <div>
    <div class="row">
        <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
            <h1>Vehicle</h1>
            <hr>
            <div class="form-group">
                <label for="renavan">RENAVAN</label>
                <input type="text" id="renavan"
                                class="form-control"
                              v-model="vehicle.renavan">
            </div>
            <div class="form-group">
                <label for="modelo">MODELO</label>
                <input type="text"   id="modelo"
                                  class="form-control"
                                v-model="vehicle.modelo">
            </div>
            <div class="form-group">
                <label for="placa">PLACA</label>
                <input type="text" id="placa"
                                class="form-control"
                                v-model="vehicle.placa">
            </div>
            <div class="form-group">
                <label for="message">DETALHES</label><br>
                <textarea
                        id="detalhes"
                        rows="5"
                        class="form-control"
                        v-model="vehicle.detalhes"></textarea>
            </div>
            <div class="form-group">
                <label for="sel1">Select Status:</label>
                <select class="form-control" v-model="vehicle.status">
                  <option v-for="option in options" v-bind:key="option.value" v-bind:value="option.value">
                    {{ option.text }}
                  </option>
                </select>
                <span>Selecionado: {{ vehicle.status }}</span>
            </div>
        </div>
        <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
            <div class="row">
               <div class="form-group">
                   <imgGroup
                      :vehicleId="vehicleId"
                      :imageList="imageList"></imgGroup>
               </div>
          </div>
      </div>
    </div>
    <hr>
    <div class="row">
        <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
            <button
                    class="btn btn-primary"
                    @click.prevent="submitted">Atualizar
            </button>
        </div>
    </div>

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
 //import VehicleMini  from './components/VehicleMini.vue';
 import imgGroup   from '../util/imgGroup.vue';

 export default {
     name: 'vehicleedit',
     data(){
        return {
           errors: [],
           vehicle: {},
           vehicleId: this.$route.params.id,
           imageList: [],
           options: [
                { text: 'Proposta', value: 'Proposta' },
                { text: 'Vendido', value: 'Vendido' },
                { text: 'Estoque', value: 'Estoque' },
                { text: 'Alienado', value: 'Alienado' }
              ]
        }
     },
     computed: {
        ...mapGetters({
            token:'token',
            host:'host'
        })
     },
     created () {
         this.pullVehicle();
     },
     components: {
        //VehicleMini:VehicleMini,
        imgGroup:imgGroup
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
                  this.imageList = response.data.vehicle.imageList;
             }).catch(e => {
                  this.errors.push(e)
             })
         },
         submitted: function () {
           //console.log(this.vehicle)
           const tmp = {
                         modelo:this.vehicle.modelo
                       ,renavan:this.vehicle.renavan
                         ,placa:this.vehicle.placa
                      ,detalhes:this.vehicle.detalhes
                        ,status:this.vehicle.status
                    };
           axios.post(this.host+'/vehicle/'+this.vehicleId, tmp,
              {  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+this.token
                 }
              }).then(response => {
                    //console.log('then',response)
                    this.errors.push(response.data)
                    this.confirmRegister(this.vehicleId)
              }).catch(e => {
                    //console.log('catch',e);
                    this.errors.push(e)
              })
         },
         confirmRegister(vehicleId){
             this.$router.replace('/vehicle/'+vehicleId)
         }
    }
 }
</script>
