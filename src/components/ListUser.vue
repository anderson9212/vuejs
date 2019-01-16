<template>
  <div>
    <h1>Listagem de usuários</h1>
    <table class="table table-striped">
      <thead>
        <tr>
          <th>Nome</th>
          <th>E-mail</th>
          <th>Data de nascimento</th>
          <th colspan="3">Ação</th>
        </tr>
      </thead>
      <tbody>
          <tr v-for="usuario of usuarios" :key="usuario['.key']">
            <td>{{ usuario.nome }}</td>
            <td>{{ usuario.email }}</td>
            <td>{{ usuario.dtNascimento }}</td>
            <td>
                <router-link :to="{ name: 'Edit', params: {id: usuario['.key']} }" class="btn btn-warning">
                  Editar
                </router-link>
            </td>
            <td>
                <button @click="deleteUsuario(usuario['.key'])" class="btn btn-danger">Deletar</button>
            </td>
          </tr>
      </tbody>
    </table>
  </div>
</template>

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
      }
  }
}
</script>