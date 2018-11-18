<template>
   <div>

     <div class="card">
       <img class="card-img-top" v-bind:src="`${host}/${imgHost}`" alt="Card image cap">
       <div class="card-body">
         <h5 class="card-title">{{vehicle.modelo}}</h5>
         <p class="card-text">{{vehicle.renavan}}</p>
         <p class="card-text">{{vehicle.descricao}}</p>
         <router-link
                 v-bind:to="`/vehicle/${vehicleId}`"
                 class="btn btn-primary"
                 style="cursor: pointer">Ver</router-link>
       </div>
     </div>
   </div>
</template>

<script>
export default {
  data(){
     return {
        imgHost : 'uploads/vehicle-not-found.svg'
     }
  },
  props: ['vehicle','host','vehicleId','vehicleImage'],
  watch: {
    vehicleImage: function () {
      this.imgHost = this.vehicleImage
    }
  },
  created () {

  },
  computed: {

  },
  methods: {
  }
}
</script>
<style scoped>
 .card{
    float: left;
    width: 14rem;
 }
</style>
