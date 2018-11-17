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
                  <label for="exampleFormControlFile1">Imagem</label>
                  <input type="file"
                        class="form-control-file"
                           id="vehicleImage"
                      @change="onFileChanged">
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3 form-group">
                <label for="message">Detalhes</label><br>
                <textarea
                        id="detalhes"
                        rows="5"
                        class="form-control"
                        v-model="detalhes"></textarea>
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
     name: 'vehicle',
     data(){
        return {
           errors: [],
           modelo:'',
           renavan:'',
           placa:'',
           detalhes:'',
           vehicleImage:''
        }
     },
     computed: {
        ...mapGetters({
            token:'token'
        })
     },
     methods: {
         submitted: function () {
           const tmp = JSON.stringify({ modelo:this.modelo, renavan:this.renavan, placa:this.placa, detalhes:this.detalhes });
           const formData = new FormData()
           formData.append('vehicleImage', this.vehicleImage, this.vehicleImage.name)
           formData.append('data', tmp);
           axios.post('http://www:3000/vehicle/register', formData,
              {  headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': 'Bearer '+this.token
                 }
              }).then(response => {
                    console.log('then',response)
                    this.errors.push(response.data)
              }).catch(e => {
                    console.log('catch',e);
                    this.errors.push(e)
              })
         },
         onFileChanged (event) {
             this.vehicleImage = event.target.files[0];
             console.log(this.vehicleImage);
         }
    }
 }
</script>
