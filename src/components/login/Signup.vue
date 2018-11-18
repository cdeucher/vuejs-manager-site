<template>
   <div>

     <div class="card shadow">
         <div class="card-body">
           <div class="container">
             <h1 class="form-heading">Formulário de Registro</h1>
             <div class="login-form">
               <div class="main-div">
                   <div class="panel">
                  <h2>Registro</h2>
                  </div>
                       <div class="form-group">
                           <input type="email" v-model="email" class="form-control" id="inputEmail" placeholder="Email Address">
                           {{email}}
                       </div>
                       <div class="form-group">
                           <input type="password" v-model="password" class="form-control" id="inputPassword" placeholder="Password">
                           {{password}}
                       </div>
                       <button v-on:click="postPost()" class="btn btn-primary">Criar</button>
               </div>
               <p class="botto-text"></p>
            </div>

               <ul v-if="errors && errors.length">
                 <li v-for="(error, data) in errors" :key="data">
                   {{data}}{{error.message}}
                 </li>
               </ul>

           </div>
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
           posts: [],
           errors: [],
           email: 'admin1@admin.com',
           password: '123'
         }
     },
     mounted(){
       console.log('token:',this.token);
     },
     computed: {
        ...mapGetters({
            token:'token',
            loged:'loged'
        })
     },
     methods: {
         postPost: function () {
               axios.post('http://www:3000/user/signup',{email:this.email,password:this.password },
                  {
                    headers: {
                      'Content-Type': 'application/json',
                      'Authorization': 'Bearer '+this.token
                    }
                  }).then(response => {
                     console.log('then',response)
                     this.errors.push(response.data)
                  })
               .catch(e => {
                     this.errors.push(e)
               })
          }
    }
 }
</script>

<style scoped>
.form-heading { color:#fff;}
.panel h2{ color:#444444;  margin:0 0 8px 0;}
.panel p { color:#777777;  margin-bottom:30px; line-height:24px;}
.login-form .form-control {
  background: #f7f7f7 none repeat scroll 0 0;
  border: 1px solid #d4d4d4;
  border-radius: 4px;
  font-size: 14px;
  height: 50px;
  line-height: 50px;
}
.main-div {
  background: #ffffff none repeat scroll 0 0;
  border-radius: 2px;
  margin: 10px auto 30px;
  max-width: 38%;
  padding: 50px 70px 70px 71px;
}

.login-form .form-group {
  margin-bottom:10px;
}
.login-form{ text-align:center;}
.forgot a {
  color: #777777;
  text-decoration: underline;
}
.login-form  .btn.btn-primary {
  background: #f0ad4e none repeat scroll 0 0;
  border-color: #f0ad4e;
  color: #ffffff;
  width: 100%;
  height: 50px;
  line-height: 50px;
  padding: 0;
}
.botto-text {
  color: #ffffff;
  margin: auto;
}
.login-form .btn.btn-primary.reset {
  background: #ff9900 none repeat scroll 0 0;
}
.back { text-align: left; margin-top:10px;}
.back a {color: #444444; text-decoration: none;}
</style>
