import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
state: {
	authenticated: false,
	access_token: null,
	logged_in_user: null
},
getters:{
	access_token:()=>{		
		var token = localStorage.getItem("access_token")		
		if (token){
			return token
		}
		else{
			return null
		}
	}
},
mutations: {
	authenticate(state,payload){
		localStorage.setItem("access_token",payload.access)
		state.access_token = payload.access
		state.authenticated = true
	},
	logout(state){
		localStorage.clear()
		state.access_token = null
		state.authenticated = false		
	},
	login(state,payload){
		state.logged_in_user = payload
	}
},
actions: {
	// actions here
},
modules: {
	// modules here
}
})
