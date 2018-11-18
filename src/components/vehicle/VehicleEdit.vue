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
        </div>
        <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
            <div class="row">
               <div class="form-group">
                 <VehicleMini
                        v-bind:vehicle="vehicle"
                        v-bind:host="host"
                        :vehicleId="vehicleId"
                        :vehicleImage="vehicle.vehicleImage"></VehicleMini>
               </div>
               <div class="form-group">
                 <VehicleImg
                        v-for="(Image, data) in imageList"
                        v-bind:key="data"
                        v-bind:imgId="Image._id"
                        v-bind:imgPath="Image.path"></VehicleImg>
               </div>
               <div class="form-group">
                     <label>.</label>
                     <div class="btn btn-primary btn-sm float-left">
                         <label>Upload</label>
                         <input type="file"  @change="onFileChanged">
                     </div>
                     <button
                             class="btn btn-primary"
                             @click.prevent="imgSubmit">Upload
                     </button>
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
 import VehicleMini  from './components/VehicleMini.vue';
 import VehicleImg   from './components/VehicleImg.vue';

 export default {
     name: 'vehicleedit',
     data(){
        return {
           errors: [],
           vehicle: {},
           vehicleId: this.$route.params.id,
           vehicleImage: '',
           imageList: []
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
        VehicleMini:VehicleMini,
        VehicleImg:VehicleImg
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
         imgSubmit: function () {
             const formData = new FormData()
             formData.append('vehicleImage', this.vehicleImage, this.vehicleImage.name)
             axios.post(this.host+'/img/'+this.vehicleId, formData,
                {  headers: {
                      'Content-Type': 'multipart/form-data',
                      'Authorization': 'Bearer '+this.token
                   }
                }).then(response => {
                      //console.log('then',response)
                      this.errors.push(response.data)
                      this.pullVehicle();
                }).catch(e => {
                      console.log('catch',e);
                      this.errors.push(e)
                })
         },
         onFileChanged (event) {
             this.vehicleImage = event.target.files[0];
             //console.log(this.vehicleImage);
         },
         confirmRegister(vehicleId){
             this.$router.replace('/vehicle/'+vehicleId)
         }
    }
 }
</script>
