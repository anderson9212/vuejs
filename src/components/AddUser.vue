<template>
  <div class="container">
        <div class="card">
            <div class="card-header">
                <h3>Adicionar usuário</h3>
            </div>
            <div class="card-body">
                <form v-on:submit.prevent="addUser">
                    <div class="form-group">
                        <label>Nome:</label>
                        <input type="text" class="form-control" v-model="newUser.nome"/>
                    </div>
                    <div class="form-group">
                        <label>E-mail:</label>
                        <input type="email" class="form-control" v-model="newUser.email"/>
                    </div>
                    <div class="form-group">
                        <label>Senha:</label>
                        <input type="password" class="form-control" v-model="newUser.senha"/>
                    </div>
                    <div class="form-group">
                        <label>Data de nascimento:</label>
                        <input type="date" class="form-control" v-model="newUser.dtNascimento"/>
                    </div>
                    <div class="form-group">
                        <label>UF:</label>
                        <select class="form-control" v-model="newUser.uf">
                            <option>Bahia</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Cidade:</label>
                        <select class="form-control" v-model="newUser.cidade">
                            <option>Salvador</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Logradouro:</label>
                        <input type="text" class="form-control" v-model="newUser.logradouro">
                    </div>
                    <div class="form-group">
                        <label>Telefones:</label>
                        <input type="tel" class="form-control" v-model="newUser.telefones">
                    </div>
                    <div class="form-group">
                        <input type="submit" class="btn btn-success" value="Salvar"/>
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
		name: 'AddUser'
  },
  firebase: {
		usuarios: db.ref('usuarios')
  },
  data() {
		return {
			newUser: {
				nome: '',
				email: '',
				senha: '',
				dtNascimento: '',
				uf: '',
				cidade: '',
				logradouro: '',
				telefones: ''
			}
		}
  },
  methods: {
		addUser() {
			this.$firebaseRefs.usuarios.push({
				nome: this.newUser.nome,
				email: this.newUser.email,
				senha: this.newUser.senha,
				dtNascimento: this.newUser.dtNascimento,
				uf: this.newUser.uf,
				cidade: this.newUser.cidade,
				logradouro: this.newUser.logradouro,
				telefones: this.newUser.telefones
			})
			this.newUser.nome = '';
			this.newUser.email = '';
			this.newUser.senha = '';
			this.newUser.dtNascimento = '';
			this.newUser.uf = '';
			this.newUser.cidade = '';
			this.newUser.logradouro = '';
			this.newUser.telefones = '';
			
			this.$router.push('/index')
		}
  }
}
</script>