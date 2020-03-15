<template>

<div class="conteudo">

  <img class="logo"
    :src="require('../../img/Suawine_icone.png')"
    width="420px"
    height="120px"
    style="display: block;
    margin-left: auto;
    margin-right: auto"
  >
    <v-form
      class="loginScreen"
      ref="form"
      v-model="valid"
      lazy-validation
    >
      <v-text-field
        v-model="name"
        :counter="20"
        :rules="nameRules"
        label="Name"
        required
      ></v-text-field>

      <v-text-field
        v-model="password"
        :rules="passwordRules"
        label="password"
        required
      ></v-text-field>

      <v-btn
        :disabled="!valid"
        color="error"
        class="mr-4"
        @click="validate"
      >
        Log in
      </v-btn>

    </v-form>
</div>
</template>

<script>
  export default {
    data: () => ({
      valid: true,
      name: '',
      nameRules: [
        v => !!v || 'Informe seu name de user',
        v => (v && v.length <= 20) || 'name de user invalido',
      ],
      password: '',
      passwordRules: [
        v => !!v || 'Informe sua password',
        v => (v && v.length >= 5) || 'password Invalido',
      ]
    }),

    methods: {
      validate () {
        if (this.$refs.form.validate()) {
          this.snackbar = true
          //datas de all os users
          var users   = require('../.././users.json');

          for(var i=0;i<users.length;i++){
            if(users[i].username == this.name && this.password==users[i].password){
              this.$store.state.name_user = this.name
              localStorage.setItem("nameDeuser", this.name);
              this.$router.push('products')
              break;
            }
          }
        }
      },
    },
  }
</script>

<style>
.loginScreen{
  margin: 80px;
  margin-left: 30%;
  margin-right: 30%;
}

.logo{
  margin-top: 5%;
  text-align: center;
}
</style>