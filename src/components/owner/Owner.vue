<template>
  <div>
    <div class="card shadow">
      <div class="card-body">
         <transition name="slide" mode="out-in">
            <router-view></router-view>
         </transition>
       </div>
     </div>
 </div>
</template>

<script>
export default {
  data(){
     return {
     }
  }
}
</script>

<style>
    .slide-enter-active {
        animation: slide-in 200ms ease-out forwards;
    }
    .slide-leave-active {
        animation: slide-out 200ms ease-out forwards;
    }
    @keyframes slide-in {
        from {
            transform: translateY(-30px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
    @keyframes slide-out {
        from {
            transform: translateY(0);
            opacity: 1;
        }
        to {
            transform: translateY(-30px);
            opacity: 0;
        }
    }
</style>
