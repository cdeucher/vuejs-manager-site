<template>

     <table class="table table-bordered">
        <thead>
            <tr>
                <th>Transaction</th>
                <th>Owner</th>
                <th>Date</th>
                <th>Value</th>
                <th>Description</th>
            </tr>
        </thead>
        <tbody>
          <tr v-for="(transaction, data) in transactions"
              v-bind:key="data"
              v-bind:index="data">

              <td>{{transaction.type}}</td>
              <td>{{transaction.owner.nome}}</td>
              <td>{{transaction.date}}</td>
              <td>R${{transaction.financial.value}}</td>
              <td class="col-sm">{{transaction.financial.description}}</td>
          </tr>
        </tbody>
     </table>

</template>

<script>
 import {mapGetters} from 'vuex';

 export default {
   data(){
      return {

      }
   },
   props: ['transactions','index'],
   computed: {
      ...mapGetters({
          token:'token',
          host:'host'
      })
   },
   methods: {

   }
 }
</script>

<style scoped>
  .card{
     min-width: 400px
  }
</style>
