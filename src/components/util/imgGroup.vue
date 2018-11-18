<template>
   <div>
     <div class="row">
    
         <ImgComponent   v-for="(Image, data) in imgList"
                v-bind:key="data"
                v-bind:imgId="Image._id"
                v-bind:imgPath="Image.path"></ImgComponent>

    </div>
    <div class="row">
     <div class="form-group">
           <label>.</label>
           <div class="btn btn-primary btn-sm float-left">
               <label>Upload</label>
               <input type="file"  @change="onFileChanged">
           </div>
           <button
                   class="btn btn-primary"
                   @click.prevent="imgSubmit">Upload
           </button>
     </div>
    </div>
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
import ImgComponent from './Img.vue';

export default {
  data(){
     return {
        errors: [],
        vehicleImage:{},
        imgList:[]
     }
  },
  props: ['vehicleId','imageList'],
  computed: {
     ...mapGetters({
         token:'token',
         host:'host'
     })
  },
  watch: {
    imageList: function () {
       this.imgList = this.imageList;
    }
  },
  mounted(){
     if(this.imageList == undefined){
        this.pullImg()
     }
  },
  components: {
     ImgComponent:ImgComponent
  },
  methods: {
    pullImg: function () {
        const auth = {  headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer '+this.token
           }
        }
        axios.get(this.host+'/img/'+this.vehicleId,auth).then(response => {
             console.log('then',response.data)
             this.imgList = response.data.vehicle.imageList;
        }).catch(e => {
             this.errors.push(e)
        })
    },
    imgSubmit: function () {
        const formData = new FormData()
        formData.append('vehicleImage', this.vehicleImage, this.vehicleImage.name)
        axios.post(this.host+'/img/'+this.vehicleId, formData,
           {  headers: {
                 'Content-Type': 'multipart/form-data',
                 'Authorization': 'Bearer '+this.token
              }
           }).then(response => {
                 console.log('then',response.data)
                 this.errors.push(response.data)
                 this.imgList.push(response.data.img)
           }).catch(e => {
                 console.log('catch',e);
                 this.errors.push(e)
           })
    },
    onFileChanged (event) {
        this.vehicleImage = event.target.files[0];
        //console.log(this.vehicleImage);
    },
    removeImg(imgId){
        //console.log(imgId)
        for(var index in this.imageList){
           if(imgId == this.imageList[index]._id){
               this.imageList.splice(index,1)
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
</style>
