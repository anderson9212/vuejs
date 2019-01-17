<template>
  <div class="container">
        <div class="card">
            <div class="card-header">
                <h3>Editar usuário</h3>
            </div>
            <div class="card-body">
                <form v-on:submit.prevent="updateUser">
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
                        <input type="date" class="form-control" v-model="newUser.dtNascimento" />
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
                        <label>cidade:</label>
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
                        <input type="text" class="form-control" v-model="newUser.logradouro" />
                    	</div>
										</div>
										<div class="col-md-6">
											<div class="form-group">
                        <label>Telefone:</label>
                        <input type="tel" class="form-control" v-model="newUser.telefone" />
                    	</div>
										</div>
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
import IbgeApi from '@/services/IbgeApi';
import toastr from 'toastr';

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
      newUser: {},
      uf: [],
      cidade: []
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
       telefone: usuario.telefone,
     }
  },
  methods: {
    updateUser() {
			this.$firebaseRefs.usuarios.child(this.$route.params.id).set(this.newUser);
			toastr.success('Usuário salvo com sucesso!');
      this.$router.push('/')
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

    if(this.newUser.uf) {
			IbgeApi.localidades(this.newUser.uf, localidade => {
				this.cidade = localidade.data;
			})
    }
	}
}
</script>