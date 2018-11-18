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
                                  v-model="owner.nome">
                </div>
                <div class="form-group">
                    <label for="cpf">CPF</label>
                    <input type="text"   id="cpf"
                                      class="form-control"
                                    v-model="owner.cpf">
                </div>
                <div class="form-group">
                    <label for="rg">RG</label>
                    <input type="text" id="rg"
                                    class="form-control"
                                    v-model="owner.rg">
                </div>
                <div class="form-group">
                    <label for="endereco">ENDEREÇO</label>
                    <input type="text" id="endereco"
                                    class="form-control"
                                    v-model="owner.endereco">
                </div>
                <div class="form-group">
                    <label for="email">EMAIL</label>
                    <input type="text" id="email"
                                    class="form-control"
                                    v-model="owner.email">
                </div>
                <div class="form-group">
                    <label for="telefone">TELEFONE</label>
                    <input type="text" id="telefone"
                                    class="form-control"
                                    v-model="owner.telefone">
                </div>
                <div class="form-group">
                    <label for="whats">WHATS</label>
                    <input type="text" id="whats"
                                    class="form-control"
                                    v-model="owner.whats">
                </div>
                <div class="form-group">
                    <label for="message">DETALHES</label><br>
                    <textarea
                            id="detalhes"
                            rows="5"
                            class="form-control"
                            v-model="owner.detalhes"></textarea>
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
                        @click.prevent="submitted">Atualizar
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
           ownerId: this.$route.params.id,
           owner: {},
        }
     },
     computed: {
        ...mapGetters({
            token:'token',
            host:'host'
        })
     },
     created () {
         this.pullOwner();
     },
     methods: {
       pullOwner: function () {
           const auth = {  headers: {
                 'Content-Type': 'application/json',
                 'Authorization': 'Bearer '+this.token
              }
           }
           axios.get(this.host+'/owner/'+this.ownerId,auth).then(response => {
                console.log('then',response.data.owner)
                this.owner = response.data.owner;
           }).catch(e => {
                this.errors.push(e)
           })
       },
       submitted: function () {
         const newOps = {};
         for (let ops in this.owner) {
           newOps[ops] = this.owner[ops];
         }
         axios.post(this.host+'/owner/'+this.ownerId, newOps,
            {  headers: {
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer '+this.token
               }
            }).then(response => {
                  //console.log('then',response)
                  this.errors.push(response.data)
                  this.confirmRegister(this.ownerId)
            }).catch(e => {
                  //console.log('catch',e);
                  this.errors.push(e)
            })
       },
       confirmRegister(ownerId){
           this.$router.replace('/owner/'+ownerId)
       }
    }
 }
</script>
