<template>
   <div>

     <nav class="navbar navbar-expand-lg navbar-dark bg-default">
         <div class="container">
             <a class="navbar-brand" href="#">Manager</a>
             <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-default" aria-controls="navbar-default" aria-expanded="false" aria-label="Toggle navigation">
                 <span class="navbar-toggler-icon"></span>
             </button>
             <div class="collapse navbar-collapse" id="navbar-default">
                 <div class="navbar-collapse-header">
                     <div class="row">
                         <div class="col-6 collapse-brand">
                             <a href="index.html">

                             </a>
                         </div>
                         <div class="col-6 collapse-close">
                             <button type="button" class="navbar-toggler" data-toggle="collapse" data-target="#navbar-default" aria-controls="navbar-default" aria-expanded="false" aria-label="Toggle navigation">
                                 <span></span>
                                 <span></span>
                             </button>
                         </div>
                     </div>
                 </div>

                 <ul v-if="loged" class="navbar-nav ml-lg-auto" style="cursor: pointer">
                         <li class="navbar-brand">
                           <a class="nav-link nav-link-icon"  @click="logout()">
                              {{loged}} (logout)
                           </a>
                         </li>
                     <li class="nav-item dropdown">
                         <a class="nav-link nav-link-icon" href="#" id="navbar-default_dropdown_1" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                             <i class="ni ni-settings-gear-65"></i>
                             <span class="nav-link-inner--text d-lg-none">Settings</span>
                         </a>
                     </li>
                 </ul>

             </div>
         </div>
     </nav>

   </div>
</template>

<script>
 import {mapGetters} from 'vuex';

 export default {
   name: 'headcomponent',
   data(){
      return {  count:0 }
   },
   computed: {
      ...mapGetters({
          loged:'loged'
      })
   },
   methods: {
       logout: function () {
         this.$store.dispatch('logout');
       }
  }
 }
</script>
