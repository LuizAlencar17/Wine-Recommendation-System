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
      //Inicia a compute os vizinhos proximos
      this.compute_Recommendation();

      //Recupera as informações dos products Recommended através do ID de cada um
      this.products = this.datas_products(this.products_Recommended);

    },
    methods: {
      compute_Recommendation(){
        //datas de all os users
        const assessments = require('../.././evaluation.json');
        const users   = require('../.././users.json');

        //datas do user
        for(var i=0; i<assessments.length; i++){
          //Captura somente os datas do user
          if(assessments[i].username == this.username){
            this.datas_username.push(assessments[i]);
          }
        }

        //all os users
        for(var i=0; i<users.length; i++){

          //Se não for o mesmo user
          if(users[i].username != this.username){

            //Variavel para avaliações do Fulano
            var datas_fulano = [];

            //Captura as avaliações de cada Fulano
            for(var j=0; j<assessments.length; j++){

              //Captura somente os datas do user
              if(assessments[j].username == users[i].username){
                datas_fulano.push(assessments[j]);
              }

            }
            //Calcula result MANHATTAN
            var result_manhattan = this.Manhattan(this.datas_username, datas_fulano);
            
            if(result_manhattan != null){
              this.distances.push({result: result_manhattan, user: users[i].username});

            }
            
          }
        }
        //Ordena as distancias
        this.distances.sort(function (a, b) {
          if (a.result > b.result) {
            return 1;
          }
          if (a.result < b.result) {
            return -1;
          }
            return 0;
        });
        for(var i=0; i<this.distances.length; i++){
          if(this.distances[i].result != undefined){
            //Função que irá Recommendedr os products que o user não possui
            this.products_Recommended = this.Recommended(this.distances[i].user,this.datas_username);  
            break;
          }
        }
        
      },
      Manhattan(datas_user1, datas_user2){
        var distance = 0;
        var common_classifications = false;
        for (var i=0; i<datas_user1.length; i++){
          
          //check se o product foi encontrado no user 1 e user 2
          for(var j=0; j<datas_user2.length; j++){

            if(datas_user1[i].product == datas_user2[j].product){
              common_classifications = true;
              distance += Math.abs(datas_user1[i].result-datas_user2[j].result);
              //Sai do FOR porque ambos avaliaram o mesmo product, e adiciona a distancia
              break;
            }
          }
        }
        if(common_classifications){
          return distance;
        }else{
          return null;
        }
      },
      Recommended(fulano, datas_user1){
        const assessments = require('../.././evaluation.json');
        var fulano_assessments = [];

        //Pega todas as avaliações do Fulano mais proximo
        for(var i=0; i<assessments.length; i++){
          if(assessments[i].username == fulano){
            fulano_assessments.push(assessments[i]);
          }
        }

        var Recommendation = [];

        //check se não possui os mesmos products
        for(var i=0; i<fulano_assessments.length; i++){
          
          //Controla a existencia de um product different
          var product_different = true;
          var product_1;
          var product_2;

          for(var j=0; j<datas_user1.length; j++){
            
            product_1 = fulano_assessments[i].product;
            product_2 = datas_user1[j].product;

            if(product_1 == product_2){
              product_different = false;
            }
          }
          if(product_different){
              Recommendation.push(product_1);
            }
        }

        return Recommendation;
    },
    //Pega as informações dos products
    datas_products(id_products){
      //id_products é uma lista com o ID dos products que foram Recommended
      const all_products = require('../.././products.json');
      var description_products = [];
      //Percolorre all os products Recommended
      for(var i=0; i< id_products.length; i++){
        //Se encontrar o product adiciona suas informações na lista: description_products
        for(var j=0; j< all_products.length; j++){
          if(id_products[i] == all_products[j].id){
            
            description_products.push(all_products[j]);
          }
        }
      }

      return description_products;
    },
    checkLogin(){
        this.username = this.$store.state.name_user;
        if(this.username == ""){
          this.$router.push('Login');
        }
      }
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