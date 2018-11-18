<template>
   <div>
      <Owner
        v-for="(owner, data) in ownersList"
        v-bind:key="data"
        v-bind:owner="owner"
      ></Owner>

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
 import Owner from './forms/Owner.vue';

 export default {
   data(){
      return {
         errors: [],
         ownersList: []
      }
   },
   components: {
      Owner: Owner
   },
   computed: {
      ...mapGetters({
          token:'token',
          host:'host',
          owners:'owners'
      })
   },
   created () {
       if(this.owners.length <= 0){
         this.pullOwner();
       }else{
         this.ownersList = this.owners;
       }
   },
   methods: {
       pullOwner: function () {
           const auth = {  headers: {
                 'Content-Type': 'application/json',
                 'Authorization': 'Bearer '+this.token
              }
           }
           axios.get(this.host+'/owner/',auth).then(response => {
                console.log('then',response.data.owners)
                this.$store.dispatch('pullOwners', response.data.owners);
                this.ownersList = response.data.owners;
           }).catch(e => {
                this.errors.push(e)
           })
       }
  }
 }
</script>
