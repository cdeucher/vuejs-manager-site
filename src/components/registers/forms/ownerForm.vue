<template>
  <div>

    <form>
        <div class="row">
            <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
                <h1>Owner</h1>
                <hr>
                <div class="form-group">
                    <label for="nome">NOME</label>
                    <input type="text" id="nome"
                                    class="form-control"
                                  v-model="nome">
                </div>
                <div class="form-group">
                    <label for="cpf">CPF</label>
                    <input type="text"   id="cpf"
                                      class="form-control"
                                    v-model="cpf">
                </div>
                <div class="form-group">
                    <label for="rg">RG</label>
                    <input type="text" id="rg"
                                    class="form-control"
                                    v-model="rg">
                </div>
                <div class="form-group">
                    <label for="endereco">ENDEREÇO</label>
                    <input type="text" id="endereco"
                                    class="form-control"
                                    v-model="endereco">
                </div>
                <div class="form-group">
                    <label for="email">EMAIL</label>
                    <input type="text" id="email"
                                    class="form-control"
                                    v-model="email">
                </div>
                <div class="form-group">
                    <label for="telefone">TELEFONE</label>
                    <input type="text" id="telefone"
                                    class="form-control"
                                    v-model="telefone">
                </div>
                <div class="form-group">
                    <label for="whats">WHATS</label>
                    <input type="text" id="whats"
                                    class="form-control"
                                    v-model="whats">
                </div>
                <div class="form-group">
                    <label for="message">DETALHES</label><br>
                    <textarea
                            id="detalhes"
                            rows="5"
                            class="form-control"
                            v-model="detalhes"></textarea>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">

            </div>
        </div>
        <hr>
        <div class="row">
            <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
                <button
                        class="btn btn-primary"
                        @click.prevent="submitted">Cadastrar
                </button>
            </div>
        </div>
    </form>
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

 export default {
     name: 'ownerForm',
     data(){
        return {
           errors: [],
           nome:'',
           cpf:'',
           rg:'',
           endereco:'',
           email:'',
           telefone:'',
           whats:'',
           detalhes:''
        }
     },
     computed: {
        ...mapGetters({
            token:'token',
            host:'host'
        })
     },
     methods: {
         submitted: function () {
           const owner = { nome:this.nome, cpf:this.cpf, rg:this.rg, endereco:this.endereco,email:this.email,telefone:this.telefone,whats:this.whats,detalhes:this.detalhes };
           console.log(owner)
           axios.post(this.host+'/owner/', owner,
              {  headers: {
                    //'Content-Type': 'multipart/form-data',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+this.token
                 }
              }).then(response => {
                    console.log('then',response)
                    this.errors.push(response.data)
                    this.confirmRegister(response.data.owner._id)
              }).catch(e => {
                    console.log('catch',e);
                    this.errors.push(e)
              })
         },
         confirmRegister(ownerId){
             this.$router.replace('/owner/'+ownerId+'/edit')
         }
    }
 }
</script>
