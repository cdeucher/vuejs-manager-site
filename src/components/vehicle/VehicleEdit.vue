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
                       target="gallery"
                      :vehicleId="vehicleId"
                      :imageList="imageList"></imgGroup>
               </div>
          </div>
      </div>
    </div>
    <!-- Owner -->
    <hr>
    <h5>Owner</h5>
    <div class="local-border col-xs-12 col-sm-8 col-sm-offset-2 col-md-12 col-md-offset-3">
        <div v-if="vehicle.status=='Proposta'" class="row">
          <OwnerModal
               :vehicleId="vehicleId"
               :errors="errors"
          ></OwnerModal>
        </div>
        <div class="row">
           <div class="form-group">
               <OwnerMini
                    v-if="vehicle.owner"
                    v-bind:owner="vehicle.owner"
               ></OwnerMini>
           </div>
       </div>
    </div>
    <!-- Documentos -->
    <hr>
    <h5>Documentos</h5>
    <div class="local-border col-xs-12 col-sm-8 col-sm-offset-2 col-md-12 col-md-offset-3">
        <div class="row">
           <div class="form-group">
               <imgGroup
                   target="doc"
                  :vehicleId="vehicleId"
                  :imageList="imageList"></imgGroup>
           </div>
       </div>
    </div>
    <!-- Save button -->
    <hr>
    <div class="row">
        <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
            <button
                    class="btn btn-primary"
                    @click.prevent="submitted">Atualizar
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
 import axios        from 'axios';
 import {mapGetters} from 'vuex';
 import imgGroup     from '../util/imgGroup.vue';
 import OwnerModal   from '../owner/components/OwnerModal.vue';
 import OwnerMini    from '../owner/components/OwnerMini.vue';

 export default {
     name: 'vehicleedit',
     data(){
        return {
           errors: [],
           vehicle: {},
           vehicleId: this.$route.params.id,
           imageList: []
        }
     },
     computed: {
        ...mapGetters({
            token:'token',
            host:'host',
            options:'options'
        })
     },
     created () {
         this.pullVehicle();
     },
     components: {
       OwnerModal: OwnerModal,
         imgGroup: imgGroup,
        OwnerMini: OwnerMini
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
                    this.confirmUpdate(this.vehicleId)
              }).catch(e => {
                    //console.log('catch',e);
                    this.errors.push(e)
              })
         },
         confirmUpdate(vehicleId){
             this.$router.replace('/vehicle/'+vehicleId)
         },
         saveOwner: function (ownerMini) {
           const tmp = { owner: ownerMini._id };
           axios.post(this.host+'/vehicle/'+this.vehicleId, tmp,
              {  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+this.token
                 }
              }).then(response => {
                    this.errors.push(response.data)
                    this.pullVehicle();
              }).catch(e => {
                    this.errors.push(e)
              })
         }
    }
 }
</script>
<style scoped>
 .local-border{
    /* border:2px #ccc solid; */
 }
 .row {
    margin-right: 0px !important;
    margin-left: 0px !important;
 }
 .card{
    float: left;
    width: 14rem;
 }
</style>
