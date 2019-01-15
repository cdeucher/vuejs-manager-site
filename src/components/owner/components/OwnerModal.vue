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
    <modal name="owner-modal"
        :adaptive="true"
        :delay="10"
        :scrollable="true"
        :minWidth="800"
        height="auto" >
        <div class="modal-content">
            <div class="modal-header">
                <h5>Owners</h5>
            </div>
            <div class="modal-body">

              <OwnerList
                v-for="(owner, data) in ownersList"
                v-bind:key="data"
                v-bind:owner="owner"
                :showCheck="true"
                @action="actionCheck"
              ></OwnerList>

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

import OwnerList  from './OwnerList.vue';

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
     OwnerList:OwnerList
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
          //console.log('changeOwner',ownerMini)
          this.$emit('changeOwner', ownerMini)
          this.closeModal()
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
 }

</style>
