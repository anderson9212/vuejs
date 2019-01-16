<template>
  <div class="container">
        <div class="card">
            <div class="card-header">
                <h3>Editar usuário</h3>
            </div>
            <div class="card-body">
                <form v-on:submit.prevent="updateUser">
                    <div class="form-group">
                        <label>Nome:</label>
                        <input type="text" class="form-control" v-model="newUser.nome"/>
                    </div>
                    <div class="form-group">
                        <label>E-mail:</label>
                        <input type="email" class="form-control" v-model="newUser.email" />
                    </div>
                    <div class="form-group">
                        <label>Senha:</label>
                        <input type="password" class="form-control" v-model="newUser.senha" />
                    </div>
                    <div class="form-group">
                        <label>Data de nascimento:</label>
                        <input type="date" class="form-control" v-model="newUser.dtNascimento" />
                    </div>
                    <div class="form-group">
                        <label>UF:</label>
                        <select class="form-control" v-model="newUser.uf">
                            <option>Bahia</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>cidade:</label>
                        <select class="form-control" v-model="newUser.cidade">
                            <option>Salvador</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Logradouro:</label>
                        <input type="text" class="form-control" v-model="newUser.logradouro" />
                    </div>
                    <div class="form-group">
                        <label>Telefones:</label>
                        <input type="tel" class="form-control" v-model="newUser.telefones" />
                    </div>
                    <div class="form-group">
                        <input type="submit" class="btn btn-primary" value="Salvar"/>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>

import { db } from '../config/db';

export default {
  components: {
      name: 'EditUser'
  },
  firebase: {
    usuarios: db.ref('usuarios'),
    usuariosObj: {
      source: db.ref('usuarios'),
      asObject: true
    }
  },
  data () {
    return {
      newUser: {}
    }
  },
  created() {
     let usuario = this.usuariosObj[this.$route.params.id]
     this.newUser = {
       nome: usuario.nome,
       email: usuario.email,
       senha: usuario.senha,
       dtNascimento: usuario.dtNascimento,
       uf: usuario.uf,
       cidade: usuario.cidade,
       logradouro: usuario.logradouro,
       telefones: usuario.telefones,
     }
  },
  methods: {
    updateUser() {
      this.$firebaseRefs.usuarios.child(this.$route.params.id).set(this.newUser);
      this.$router.push('/index')
    }
  }
}
</script>