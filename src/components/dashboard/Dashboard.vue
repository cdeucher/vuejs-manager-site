<template>
   <div>
     <div class="card shadow">
       <div class="card-body">

               <div class="nav-wrapper">
                   <ul class="nav nav-pills nav-fill flex-column flex-md-row" id="tabs-icons-text" role="tablist">
                       <li class="nav-item">
                           <a class="nav-link mb-sm-3 mb-md-0 active" id="tabs-icons-text-1-tab" data-toggle="tab" href="#tabs-icons-text-1" role="tab" aria-controls="tabs-icons-text-1" aria-selected="true">
                             <i class="ni ni-cloud-upload-96 mr-2"></i>Vehicles</a>
                       </li>
                       <li class="nav-item">
                           <a class="nav-link mb-sm-3 mb-md-0" id="tabs-icons-text-2-tab" data-toggle="tab" href="#tabs-icons-text-2" role="tab" aria-controls="tabs-icons-text-2" aria-selected="false">
                             <i class="ni ni-bell-55 mr-2"></i>Owners</a>
                       </li>
                       <li class="nav-item">
                           <a class="nav-link mb-sm-3 mb-md-0" id="tabs-icons-text-3-tab" data-toggle="tab" href="#tabs-icons-text-3" role="tab" aria-controls="tabs-icons-text-3" aria-selected="false">
                             <i class="ni ni-calendar-grid-58 mr-2"></i>Others</a>
                       </li>
                       <li class="nav-item">
                           <a class="nav-link mb-sm-3 mb-md-0" id="tabs-icons-text-3-tab" data-toggle="tab" href="#tabs-icons-text-3" role="tab" aria-controls="tabs-icons-text-3" aria-selected="false">
                             <i class="ni ni-calendar-grid-58 mr-2"></i>Sales</a>
                       </li>
                   </ul>
               </div>

               <div class="card shadow">
                   <div class="card-body">
                       <div class="tab-content" id="myTabContent">
                           <div class="tab-pane fade show active" id="tabs-icons-text-1" role="tabpanel" aria-labelledby="tabs-icons-text-1-tab">
                               <Vehicles></Vehicles>
                           </div>
                           <div class="tab-pane fade" id="tabs-icons-text-2" role="tabpanel" aria-labelledby="tabs-icons-text-2-tab">
                               <Owners></Owners>
                           </div>
                           <div class="tab-pane fade" id="tabs-icons-text-3" role="tabpanel" aria-labelledby="tabs-icons-text-3-tab">
                               <p class="description">Others</p>
                           </div>
                           <div class="tab-pane fade" id="tabs-icons-text-4" role="tabpanel" aria-labelledby="tabs-icons-text-4-tab">
                               <p class="description">Sales</p>
                           </div>
                       </div>
                   </div>
               </div>

         </div>
       </div>
   </div>
</template>

<script>
 import Vehicles from './Vehicles.vue';
 import Owners from './Owners.vue';

 export default {
   data(){
      return {   }
   },
   components: {
      Vehicles: Vehicles,
      Owners:Owners
   }
 }
</script>
