<template>
  <div>

    <ul class="nav nav-pills nav-pills-circle" id="tabs_2" role="tablist">
      <li class="nav-item">
        <a @click="openModal" data-toggle="modal" data-target="#ownerModal" class="nav-link rounded-circle active" aria-controls="home" aria-selected="true">
          <span class="nav-link-icon d-block"><i class="ni ni-atom"></i></span>
        </a>
      </li>
    </ul>
    <!-- Modal -->
    <modal name="owner-modal" :adaptive="true" :delay="10" :scrollable="true" height="auto" >
        <div class="modal-content">
            <div class="modal-header">
                <h5>Owners</h5>
            </div>
            <div class="modal-body">

              <OwnerMini
                v-for="(owner, data) in ownersList"
                v-bind:key="data"
                v-bind:owner="owner"
                :actionCheck="true"
              ></OwnerMini>

            </div>
            <div class="modal-footer">
              <button @click="closeModal" type="button" class="btn btn-secondary">Close</button>
              <!-- button type="button" class="btn btn-primary">Save changes</button -->
            </div>
        </div>
    </modal>

 </div>
</template>

<script>
import axios from 'axios';
import {mapGetters} from 'vuex';

import OwnerMini  from './OwnerMini.vue';

export default {
  name: 'OwnerModal',
  data(){
     return {
       ownersList: []
     }
  },
  props: ['vehicleId','errors'],
  computed: {
     ...mapGetters({
         token:'token',
         host:'host',
         owners:'owners'
     })
  },
  beforeDestroy() {
     this.closeModal()
  },
  components: {
     OwnerMini:OwnerMini
  },
  methods: {
      pullOwner: function () {
          const auth = {  headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+this.token
             }
          }
          axios.get(this.host+'/owner/',auth).then(response => {
               //console.log('owners - then',response.data.owners)
               this.$store.dispatch('pullOwners', response.data.owners);
               this.ownersList = response.data.owners;
          }).catch(e => {
               this.errors.push(e)
          })
      },
      actionCheck: function (ownerMini) {
        const tmp = { owner: ownerMini._id };
        axios.post(this.host+'/vehicle/'+this.vehicleId, tmp,
           {  headers: {
                 'Content-Type': 'application/json',
                 'Authorization': 'Bearer '+this.token
              }
           }).then(response => {
                 this.errors.push(response.data)
                try{
                  this.$parent.saveOwner(ownerMini)
                  this.closeModal()
                }catch(e){
                  console.log('OwnerModal - actionCheck', e)
                }
           }).catch(e => {
                 this.errors.push(e)
           })
      },
      openModal: function () {
          if(this.owners.length <= 0){
               this.pullOwner();
          }else{
               this.ownersList = this.owners;
          }
          //open - modal
          this.$modal.show('owner-modal');
      },
      closeModal: function () {
          this.$modal.hide('owner-modal');
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
