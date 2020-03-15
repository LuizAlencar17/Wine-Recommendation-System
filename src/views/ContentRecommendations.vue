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
        alert: true,
      
    }),
    mounted(){
      this.checkLogin();
      //Inicia a compute os vizinhos proximos
      this.compute_Recommendation();
      
      //Recupera as informações dos products Recommended
      this.products = this.products_Recommended;
    },
    methods: {
      compute_Recommendation(){
        //datas de all as shopping
        const shopping    = require('../.././evaluation.json');
        //datas de all os products
        const wines   = require('../.././products.json');
        //datas de all os users
        const users   = require('../.././users.json');
        
        //shopping do user
        for(var i=0; i<shopping.length; i++){
          //Captura somente os shopping do user
          if(shopping[i].username == this.username){
            this.datas_username.push(shopping[i]);
          }
        }
        //Armazena os wines que o user comprou
        var wines_user = [];

        //Captura products que o user comprou
        for(var i=0; i<this.datas_username.length; i++){
          for(var j=0; j<wines.length; j++){
            //Pega as informações dos wines que o user comprou
            if(this.datas_username[i].product == wines[j].id){
              wines_user.push(wines[j]);
            }
          }
        }
        //Armazena os wines purchaseds ou não pelo user
        var wine_not_purchased = null;
        var wine_purchased     = null;

        //all os wines que o user comprou
        for(var i=0; i<wines.length; i++){
          //all os wines
          wine_not_purchased = wines[i];

          for(var j=0; j<wines_user.length; j++){
            wine_purchased   = wines_user[j];
            //check se o user ja comprou o mesmo product
            if(wines[i].id == wines_user[j].id ){
              wine_not_purchased = null;
              wine_purchased     = null;
              break;
            }
          }

          if(!(wine_not_purchased == null)){
            //console.log("product não purchased: "+wine_not_purchased.name);
            //Calcula result da euclidean
            var result_euclidean = this.euclidean(wine_purchased, wine_not_purchased);
            
            //check se result euclidean foi calculado
            if(result_euclidean != null){
              this.distances.push({result: result_euclidean, product: wine_not_purchased});
              //console.log("Distancia entre " + wine_not_purchased.id + " - " +wine_purchased.id + ": " +result_manhattan);
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
        this.products_Recommended = this.Recommended(this.distances);  
           
      },
      euclidean(product1, product2){
        var distance = 0;
        
        distance += Math.sqrt(
          ((product1.color      - product2.Cor)**2)+
          ((product1.Sweetness   - product2.Sweetness)**2)+
          ((product1.Acidity   - product2.Acidity)**2)+
          ((product1.Alcohol   - product2.Alcohol)**2)+
          ((product1.Body    - product2.Body)**2)+
          ((product1.Tannins  - product2.Tannins)**2)
        );
        
        return distance;
      },
      Recommended(distancias_products){
        var Recommendation = [];
                
        //Recommended os 10 products mais proximos
        for(var i=0; i<distancias_products.length && i<12; i++){
          Recommendation.push(distancias_products[i].product);
        }
        
        return Recommendation;
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