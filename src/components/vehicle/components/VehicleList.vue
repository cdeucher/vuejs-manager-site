<template>

       <div class="row">
           <div  class="col" v-viewer="{movable: false}">
                  <img class="card-img-top" v-bind:src="imgHost" alt="Card image cap">
                  <img class="card-img-top-hidden" v-for="image in even(vehicle.imageList)" :src="host+'/'+image.path" :key="image.path">
           </div>
           <div  class="col">{{vehicle.modelo}}</div>
           <div  class="col">{{vehicle.renavan}}</div>
           <div  class="col">{{vehicle.placa}}</div>
           <div  class="col">R${{vehicle.value}}</div>
           <div  class="col">{{vehicle.ano_fabricacao}}/{{vehicle.ano_modelo}}</div>
           <div  class="col">{{vehicle.status}}</div>
           <div  class="col">{{owner.nome | null}}</div>
           <!-- div  class="col">{{vehicle.detalhes}}</div -->
           <div  class="col">
              <router-link
                   v-bind:to="`/vehicle/${vehicle._id}`"
                   class="btn btn-primary"
                   style="cursor: pointer">See</router-link>
               <router-link
                   v-bind:to="`/vehicle/${vehicle._id}/edit`"
                   class="btn btn-primary"
                   style="cursor: pointer">Edit</router-link>
            </div>                              
       </div>

</template>

<script>
 import {mapGetters} from 'vuex';

 export default {
   data(){
      return {
          imgHost : '/assets/custom/vehicles/vehicle-not-found.svg',
          owner : {},
      }
   },
   components: {
 
   },   
   mounted(){
     this.loadImg()
     this.checkOwner()
   },      
   props: ['vehicle'],
   computed: {
      ...mapGetters({
          token:'token',
          host:'host'
      })
   },
   methods: {
      loadImg: function(){
         for(let i in this.vehicle.imageList){
               if(this.vehicle.imageList[i].target != "doc"){
                   this.imgHost = this.host+'/'+this.vehicle.imageList[i].path;
                   break;
               }
         }
      },
      checkOwner: function(){
         if(this.vehicle.owner !== undefined){  
           this.owner = this.vehicle.owner;             
         }  
      },
      even: function (imageList) {
         return imageList.filter((image) =>{
            return image.target != "doc"
         })
      }     
   }   
 }
</script>

<style scoped>
 .row{
    padding-top: 5px;
 }
 .col {
    border-bottom: 1pt solid #ccc;
 }
 .col a {
    margin: 1px;
 }
 .card-img-top{
     max-width:100%;
     min-height: 80px;
     min-width: 80px;
     height:auto;   
 }  
 .card-img-top-hidden{
     max-width:100%;
     min-height: 80px;
     min-width: 80px;
     height:auto;
     display: none;
 }
</style>
