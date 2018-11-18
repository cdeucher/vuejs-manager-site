<template>
   <div>
     <div class="card">
       <img class="card-img-top" v-bind:src="`${host}/${imgHost}`" alt="Card image cap">
       <div class="card-body">
         <button type="button" class="btn btn-danger"  @click.prevent="imgSubmit">Excluir</button>
       </div>
     </div>
   </div>
</template>

<script>
import axios from 'axios';
import {mapGetters} from 'vuex';
export default {
  data(){
     return {
        imgHost : ''
     }
  },
  props: ['imgId','imgPath'],
  watch: {
    imgPath: function () {
      this.imgHost = this.imgPath;
    }
  },
  created () {
     this.imgHost = (this.imgPath) ? this.imgPath : 'uploads/vehicle-not-found.svg';
  },
  computed: {
     ...mapGetters({
         token:'token',
         host:'host'
     })
  },
  methods: {
    imgSubmit: function () {
        axios.post(this.host+'/img/delete/'+this.imgId,
           { path: this.imgPath },
           {  headers: {
                 'Content-Type': 'application/json',
                 'Authorization': 'Bearer '+this.token
              }
           }).then(response => {
                 console.log('then',response)
                 this.$parent.pullVehicle();                 
           }).catch(e => {
                 console.log('catch',e);
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
