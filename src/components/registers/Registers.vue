<template>
   <div>
     <div class="card shadow">
       <div class="card-body">

           <div class="nav-wrapper">
             <ul class="nav nav-pills nav-fill flex-column flex-md-row" id="tabs-icons-text" role="tablist">
               <li class="nav-item">
                   <a class="nav-link mb-sm-3 mb-md-0 active" id="tabs-icons-text-1-tab" data-toggle="tab" href="#tabs-icons-text-1" role="tab" aria-controls="tabs-icons-text-1" aria-selected="true"><i class="ni ni-cloud-upload-96 mr-2"></i>Vehicle</a>
               </li>
             </ul>
           </div>

           <div class="card shadow">
             <div class="card-body">
               <div class="tab-content" id="myTabContent">
                 <div class="tab-pane fade show active" id="tabs-icons-text-1" role="tabpanel" aria-labelledby="tabs-icons-text-1-tab">

                   <Vehicle></Vehicle>

                 </div>
               </div>
             </div>
           </div>

         </div>
       </div>
   </div>
</template>

<script>
import Vehicle from './forms/vehicleForm.vue';

 export default {
   data(){
      return {
      }
   },
   components: {
      Vehicle: Vehicle
   }
 }
</script>
