<template>
  <div>
    <h1>Listagem de usuários</h1>
    <button class="btn btn-primary" @click="showModal">
      Alterar senha
    </button>
    <table class="table table-striped">
      <thead>
        <tr>
          <th>Nome</th>
          <th>E-mail</th>
          <th>Data de nascimento</th>
          <th colspan="2">Ação</th>
        </tr>
      </thead>
      <tbody>
          <tr v-for="usuario of usuarios" :key="usuario['.key']">
            <td>{{ usuario.nome }}</td>
            <td>{{ usuario.email }}</td>
            <td>{{ usuario.dtNascimento | moment("DD/MM/YYYY") }}</td>
            <td>
                <router-link :to="{ name: 'Edit', params: {id: usuario['.key']} }" class="btn btn-warning">
                  Editar
                </router-link>
            </td>
            <td>
                <button @click="deleteUsuario(usuario['.key'])" class="btn btn-danger">
                    Deletar
                </button>
            </td>
          </tr>
      </tbody>
    </table>
    <modal name="passwordModal">
      <form class="form_modal">
        <div class="row">
          <div class="col-md-12">
            <div class="form-group">
              <label>Nova senha:</label>
              <input type="password" class="form-control" required/>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-md-12">
            <div class="form-group">
              <label>Confirmação da nova senha:</label>
              <input type="password" class="form-control" required/>
            </div>
          </div>
        </div>

        <div class="form-group">
          <input type="submit" class="btn btn-success" value="Alterar"/>
        </div>
      </form>
    </modal>
  </div>
</template>

<style>
  .form_modal{
    padding: 20px;
  }
</style>

<script>

import { db } from '../config/db';

export default {
  components: {
      name: 'ListUser'
  },
  data() {
    return {
      usuarios: []
    }
  },
  firebase: {
    usuarios: db.ref('usuarios')
  },
  methods: {
      deleteUsuario(key) {
          this.$firebaseRefs.usuarios.child(key).remove();
      },
      showModal () {
        this.$modal.show('passwordModal');
      },
      hideModal () {
        this.$modal.hide('passwordModal');
      }
  }
}
</script>