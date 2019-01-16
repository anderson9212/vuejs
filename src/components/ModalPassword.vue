<template>
    <div class="modal" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <form v-on:submit.prevent="updateUser">
                    <div class="form-group">
                        <label>Senha antiga:</label>
                        <input type="password" class="form-control" v-model="newUser.nome"/>
                    </div>
                    <div class="form-group">
                        <label>Nova senha:</label>
                        <input type="password" class="form-control" v-model="newUser.email" />
                    </div>
                    <div class="form-group">
                        <label>Confirmação da nova senha:</label>
                        <input type="password" class="form-control" v-model="newUser.senha" />
                    </div>
                    <div class="form-group">
                        <input type="submit" class="btn btn-primary" value="Alterar"/>
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
      name: 'ModalPassword'
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