import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import login from '../views/login.vue'
// clients
import clients from '../views/clients/clientsList.vue'
import clientdetails from '../views/clients/clientDetails.vue'
import campaigndetails from '../views/clients/campaignDetails.vue'
import adDetail from '../views/clients/adDetail.vue'
//companies
import companies from '../views/companies/companyList.vue'
import companyDetail from '../views/companies/companyDetail.vue'
import shopDetail from '../views/companies/shopDetail.vue'
//tablets
import tablets from '../views/tablets.vue'
//settings.
import settings from '../views/settings.vue'
//users
import users from '../views/users.vue'
//logs
import logs from '../views/logs.vue'


Vue.use(VueRouter)

const routes = [
	{
		path: '/login',
		name: 'login',
		component: login
	},
	{
		path: '/',
		name: 'Home',
		component: Home,
		meta:{
		"group": "home"
		}
	},
	//clients
	{
		path: '/clients',
		name: 'clients',
		component: clients,
		meta:{
		"group": "clients"
		}
	},
	{
		path: '/clients/:id',
		name: 'clientDetails',
		component: clientdetails,
		meta:{
		"group": "clients"
		}
	},
	{
		path: '/campaigns/:id',
		name: 'campaignDetails',
		component: campaigndetails,
		meta:{
		"group": "clients"
		}
	},
	{
		path: '/ad-detail/',
		name: 'adDetail',
		component: adDetail,
		meta:{
		"group": "clients"
		}
	},
	//companies
	{
		path: '/companies/:id',
		name: 'companyDetail',
		component: companyDetail,
		meta:{
		"group": "companies"
		}
	},
	{
		path: '/shops/:id',
		name: 'shopDetail',
		component: shopDetail,
		meta:{
		"group": "companies"
		}
	},

	{
	path: '/companies',
	name: 'companies',
	component: companies,
	meta:{
		"group": "companies"
	},
  },
	//tablets
	{
		path: '/tablets',
		name: 'tablets',
		component: tablets,
		meta:{
		"group": "tablets"
		}
	},
	//settings
	{
		path: '/settings',
		name: 'settings',
		component: settings,
		meta:{
		"group": "settings"
		}
	},
	//users
	{
		path: '/users',
		name: 'users',
		component: users,
		meta:{
		"group": "users"
		}
	},

	//logs
	{
		path: '/logs',
		name: 'logs',
		component: logs,
		meta:{
		"group": "logs"
		}
	},
]

const router = new VueRouter({
  routes
})

export default router
