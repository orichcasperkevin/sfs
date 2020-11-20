<template>
  <div id="app">

	<!-- side navigation -->
	<div class="p-3 sidenav rounded bg-white shadow rounded" v-if="authenticated">
		<!-- branding -->
		<div class="mt-5 mb-5 d-flex justify-content-center">
			<span class="mr-5">
				<h1>
					<i class="mr-2  fa fa-user-o" aria-hidden="true"></i>
				</h1>			
				{{logged_in_user}}	
			</span> 
		</div>
		<div class="mt-5">
			<ul class="list-unstyled">
				<li class="nav-item" :class="{ 'text-primary' : current_route_group == 'home'}"
					@click="goto('/')">
					<i class="mr-2 fa fa-tachometer" aria-hidden="true"></i>
					dashboard
				</li>
				<li class="nav-item" :class="{ 'text-primary' : current_route_group == 'clients'}"
					@click="goto('/clients')">
					<i class="mr-2  fa fa-id-card-o" aria-hidden="true"></i>				
					clients
				</li>				
				<li class="nav-item" :class="{ 'text-primary' : current_route_group == 'companies'}"
					@click="goto('/companies')">
					<i class="mr-2  fa fa-building-o" aria-hidden="true"></i>
					companies
				</li>
				<li class="nav-item" :class="{ 'text-primary' : current_route_group == 'tablets'}"
					@click="goto('/tablets')">
					<i class="mr-2  fa fa-tablet" aria-hidden="true"></i>
					devices
				</li>
				<li class="nav-item" :class="{ 'text-primary' : current_route_group == 'users'}"
					@click="goto('/users')">
					<i class="mr-2  fa fa-user-o" aria-hidden="true"></i>
					users
				</li>
				<li class="nav-item" :class="{ 'text-primary' : current_route_group == 'logs'}"
					@click="goto('/logs')">
					<i class="mr-2  fa fa-list-ol" aria-hidden="true"></i>
					logs
				</li>
				<li class="nav-item" :class="{ 'text-primary' : current_route_group == 'settings'}"
					@click="goto('/settings')">
					<i class="mr-2 fa fa-cog" aria-hidden="true"></i>
					settings
				</li>
				<!-- spacer -->
				<div style="height: 50px"></div>
				<li class="nav-item" @click="logout()">
					<i class="mr-2  fa fa-sign-out" aria-hidden="true"></i>
					logout
				</li>
			</ul>
		</div>
	</div>

	<!-- app lives here -->
	<div id="main-app" class="main-app p-5 bg-light" style="height: 100vh">
		<router-view/>
	</div>
	
  </div>
</template>
<script>
// @ is an alias to /src
export default {
	name: 'App',
	data () {
		return{				
		}
	},
	computed:{
		logged_in_user(){
			return this.$store.state.logged_in_user
		},
		authenticated(){
			return this.$store.state.authenticated
		},
		current_route_group(){
			return this.$route.meta.group
		}
	},
	watch:{
		authenticated(){
			if (! this.authenticated){
				this.$router.push("/login")	
			}
		}
	},
	mounted(){
		if (! this.authenticated){
			this.$router.push("/login")				
		}
	},
	methods:{
		logout: function(){
			this.$store.commit("logout")
		},
		goto: function(route_name){
			this.$router.push(route_name)
		},
	}
}
</script>

<style lang="scss">
	@import './assets/styles/main.scss'
</style>
