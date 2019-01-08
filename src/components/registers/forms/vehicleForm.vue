<template>
  <div>

    <form>
        <div class="row">
            <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
                <h1>Vehicle</h1>
                <hr>
                <div class="form-group">
                    <label for="renavan">RENAVAN</label>
                    <input type="text" id="renavan"
                                    class="form-control"
                                  v-model="renavan">
                </div>
                <div class="form-group">
                    <label for="modelo">MODELO</label>
                    <input type="text"   id="modelo"
                                      class="form-control"
                                    v-model="modelo">
                </div>
                <div class="form-group">
                    <label for="placa">PLACA</label>
                    <input type="text" id="placa"
                                    class="form-control"
                                    v-model="placa">
                </div>
                <div class="form-group">
                    <label for="message">DETALHES</label><br>
                    <textarea
                            id="detalhes"
                            rows="5"
                            class="form-control"
                            v-model="detalhes"></textarea>
                </div>
                <div class="form-group">
                    <label for="sel1">Select Status:</label>
                    <select class="form-control" v-model="status">
                      <option v-for="option in options" v-bind:key="option.value" v-bind:value="option.value">
                        {{ option.text }}
                      </option>
                    </select>
                    <span>Selecionado: {{ status }}</span>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">

            </div>
        </div>
        <hr>
        <div class="row">
            <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
                <button
                        class="btn btn-primary"
                        @click.prevent="submitted">Cadastrar
                </button>
            </div>
        </div>
    </form>
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
     name: 'vehicleForm',
     data(){
        return {
           errors: [],
           modelo:'',
           renavan:'',
           placa:'',
           detalhes:'',
           status: 'Proposta'
        }
     },
     computed: {
        ...mapGetters({
            token:'token',
            host:'host',
            options:'options'
        })
     },
     methods: {
         submitted: function () {
           const vehicle = { modelo:this.modelo, renavan:this.renavan, placa:this.placa, detalhes:this.detalhes,status:this.status };
           console.log(vehicle)
           axios.post(this.host+'/vehicle/', vehicle,
              {  headers: {
                    //'Content-Type': 'multipart/form-data',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+this.token
                 }
              }).then(response => {
                    console.log('then',response)
                    this.errors.push(response.data)
                    this.confirmRegister(response.data.vehicle._id)
              }).catch(e => {
                    console.log('catch',e);
                    this.errors.push(e)
              })
         },
         confirmRegister(vehicleId){
             this.$router.replace('/vehicle/'+vehicleId+'/edit')
         }
    }
 }
</script>
