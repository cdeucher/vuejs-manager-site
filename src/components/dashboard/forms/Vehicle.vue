<template>
   <div class="card-top">

     <div class="card">
       <img class="card-img-top" v-bind:src="imgHost" alt="Card image cap">
       <div class="card-body">
         <h5 class="card-title">{{vehicle.modelo}}</h5>
         <p class="card-text">{{vehicle.status}}</p>         
         <router-link
                 v-bind:to="`/vehicle/${vehicle._id}/edit`"
                 class="btn btn-primary"
                 style="cursor: pointer">Editar</router-link>
         <router-link
                 v-bind:to="`/vehicle/${vehicle._id}`"
                 class="btn btn-primary"
                 style="cursor: pointer">Ver</router-link>
       </div>
     </div>

   </div>
</template>

<script>
 import {mapGetters} from 'vuex';

 export default {
   data(){
      return {
          imgHost : '/assets/custom/vehicles/vehicle-not-found.svg'
      }
   },
   mounted(){
     this.loadImg()
   },
   props: ['vehicle'],
   computed: {
      ...mapGetters({
          token:'token',
          host:'host'
      })
   },
   methods: {
       loadImg: function () {
          for(let i in this.vehicle.imageList){
                if(this.vehicle.imageList[i].target != "doc"){
                   this.imgHost = this.host+'/'+this.vehicle.imageList[i].path;
                   break;
                }
          }
       }
   }
 }
</script>

<style scoped>
 .card{
    float: left;
    width: 14rem;
 }
 .card-img-top{
    max-height: 140px;
 }
 *, *::before, *::after{
    box-sizing: content-box;
 }
</style>
