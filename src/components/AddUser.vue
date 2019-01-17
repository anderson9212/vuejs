<template>
  <div class="container">
        <div class="card">
            <div class="card-header">
                <h3>Adicionar usuário</h3>
            </div>
            <div class="card-body">
							<form v-on:submit.prevent="addUser">
								<div class="row">
									<div class="col-md-6">
										<div class="form-group">
											<label>Nome:</label>
											<input type="text" class="form-control" v-model="newUser.nome" required/>
										</div>
									</div>
									<div class="col-md-6">
										<div class="form-group">
											<label>E-mail:</label>
											<input type="email" class="form-control" v-model="newUser.email" required/>
										</div>
									</div>
								</div>

								<div class="row">
									<div class="col-md-6">
										<div class="form-group">
											<label>Senha:</label>
											<input type="password" class="form-control" v-model="newUser.senha" required/>
										</div>
									</div>
									<div class="col-md-6">
										<div class="form-group">
											<label>Data de nascimento:</label>
											<input type="date" class="form-control" v-model="newUser.dtNascimento"/>
										</div>
									</div>
								</div>

								<div class="row">
									<div class="col-md-6">
										<div class="form-group">
											<label>UF:</label>
											<select class="form-control" v-model="newUser.uf" @change="comboCidade">
												<option value="">Selecione um UF</option>
												<option v-for="data in uf" :value="data.id" v-bind:key="data.id">
												{{ data.nome }}
												</option>
											</select>
										</div>
									</div>
									<div class="col-md-6">
										<div class="form-group">
											<label>Cidade:</label>
											<select class="form-control" v-model="newUser.cidade" :disabled="cidade.length == 0">
												<option value="">Selecione uma cidade</option>
												<option v-for="data in cidade" :value="data.id" v-bind:key="data.id">
												{{ data.nome }}
												</option>
											</select>
										</div>
									</div>
								</div>

								<div class="row">
									<div class="col-md-6">
										<div class="form-group">
											<label>Logradouro:</label>
											<input type="text" class="form-control" v-model="newUser.logradouro">
										</div>
									</div>
									<div class="col-md-6">
										<div class="form-group">
											<label>Telefone:</label>
											<input type="tel" class="form-control" v-model="newUser.telefone">
										</div>
									</div>
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
import IbgeApi from '@/services/IbgeApi';
import toastr from 'toastr';

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
				telefone: ''
			}, 
			uf: [],
			cidade: []
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
				telefone: this.newUser.telefone
			})
			this.newUser.nome = '';
			this.newUser.email = '';
			this.newUser.senha = '';
			this.newUser.dtNascimento = '';
			this.newUser.uf = '';
			this.newUser.cidade = '';
			this.newUser.logradouro = '';
			this.newUser.telefone = '';

			toastr.success('Usuário adicionado com sucesso!');

			this.$router.push('/');
		},
		comboCidade() {
			IbgeApi.localidades(this.newUser.uf, localidade => {
				this.cidade = localidade.data;
			})
		}
	},
	mounted() {
		IbgeApi.localidades(null, localidade => {
			this.uf = localidade.data;
		})
	}
}
</script>