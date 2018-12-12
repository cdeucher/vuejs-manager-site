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
    <modal name="owner-modal"   height="auto"  :scrollable="true">
        <div class="modal-content">
            <div class="modal-header">
                <h5>Owners</h5>
            </div>
            <div class="modal-body">

              <OwnerMini
                v-for="(owner, data) in ownersList"
                v-bind:key="data"
                v-bind:owner="owner"
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
       errors: [],
       ownersList: [],
       modalShow: false
     }
  },
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
               console.log('owners - then',response.data.owners)
               this.$store.dispatch('pullOwners', response.data.owners);
               this.ownersList = response.data.owners;
          }).catch(e => {
               this.errors.push(e)
          })
      },
      openModal: function () {
          console.log('this.owners.length',this.owners.length)
          if(this.owners.length <= 0){
               this.pullOwner();
          }else{
               this.ownersList = this.owners;
          }

          //open - modal
          this.$modal.show('owner-modal',{
          buttons: [
              {
                title: 'Deal with it',
                handler: () => { alert('Woot!') }
              },
              {
                title: '',       // Button title
                default: true,    // Will be triggered by default if 'Enter' pressed.
                handler: () => {} // Button click handler
              },
              {
                title: 'Close'
              }
          ]});
      },
      closeModal () {
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
 .modal-dialog{
    max-width: 1200px;
 }
 .bounce-enter-active {
   animation: bounce-in .5s;
 }
 .bounce-leave-active {
   animation: bounce-in .5s reverse;
 }
 @keyframes bounce-in {
   0% {
     transform: scale(0);
   }
   50% {
     transform: scale(1.5);
   }
   100% {
     transform: scale(1);
   }
 }
</style>
