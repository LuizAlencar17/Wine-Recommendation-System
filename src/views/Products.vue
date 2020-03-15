<template>
  <v-container fluid>
    
        <div class="conteudo">

        <v-card
          color="#FFFFFF"
          type="Line"
          style=""
          v-for="i in products"
        >
          <img 
            :src="require('../../img/'+i.id+'.png')"
            width="120px"
            height="120px"
            style="display: block;
            margin-left: auto;
            margin-right: auto"
          >
          <div class="description">
          name:
          <span class="red--text">{{i.name}}</span>&nbsp;<br>
          price:
          <span class="red--text">{{i.price}}</span>&nbsp;
          R$
          <br>
          description: {{i.description}}
          
          </div>
        </v-card>
        </div>
        
  </v-container>
</template>

<script>
  export default {
    data: () => ({
        products:[],
        distances:[],
        products_Recommended:[],
        username:'',
        datas_username:[],
    }),
    mounted(){
      this.checkLogin();
      this.products = require('../.././products.json');
    },
    methods: {
      checkLogin(){
        this.$store.state.name_user = "Luiz";
        this.username = this.$store.state.name_user;
        if(this.username == ""){
          this.$router.push('Login');
        }
      },
  }
}

</script>

<style>
.v-card{
  width: 280px; 
  height: 280px;
  display: inline-block; 
  margin-left: 50px; 
  margin-top: 25px;
  margin-bottom: 25px;
  overflow: auto;
}
.description{
  margin: 12px;
  text-align: justify;
}

.conteudo {
  background: url('../../img/fundo_wine.png') repeat;
  width: 100%;
  height: 100%;
  background-attachment:fixed;
}
</style>