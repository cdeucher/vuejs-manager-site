<template>
   <div>

     <div class="card">
       <div class="card-body">
         <h5 class="card-title">{{owner.nome}}</h5>
         <router-link
                 v-bind:to="`/owner/${ownerId}/edit`"
                 class="btn btn-primary"
                 style="cursor: pointer">Editar</router-link>
       </div>
     </div>

     <router-view></router-view>

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
        owner: {},
        ownerId: this.$route.params.id
     }
  },
  mounted(){

  },
  created () {
      this.pullOwner();
  },
  computed: {
     ...mapGetters({
         token:'token',
         host:'host'
     })
  },
  methods: {
      pullOwner: function () {
          const auth = {  headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+this.token
             }
          }
          axios.get(this.host+'/owner/'+this.ownerId,auth).then(response => {
               console.log('then',response.data.owner)
               this.owner = response.data.owner;
          }).catch(e => {
               this.errors.push(e)
          })
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
