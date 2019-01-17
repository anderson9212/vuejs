<template>
  <div id="app" class="container">
    <nav class="navbar_gen navbar navbar-expand bg-light">
      <ul class="navbar-nav">
        <li class="nav-item">
          <router-link :to="{ name: 'List' }" class="nav-link">Listar usuários</router-link>
        </li>
        <li class="nav-item">
          <router-link :to="{ name: 'Add' }" class="nav-link">Adicionar usuário</router-link>
        </li>
      </ul>
    </nav>
    <div class="gap">
      <router-view></router-view>
    </div>
  </div>
</template>

<style lang="css">
  @import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
  @import '../node_modules/toastr/build/toastr.min.css';
  @import 'assets/style.css';
</style>

<script>

export default {
  name: 'app'
}
</script>
