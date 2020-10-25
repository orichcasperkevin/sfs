<template>
        <div class="ml-4">
            <div class="d-flex">
                    <h3 class="mb-4">
                        <i class="mr-2  fa fa-id-card-o" aria-hidden="true"></i>
                        users
                    </h3>
                    <span class="p-3 font-weight-bold" v-if="users">
                        <small>{{users.length}} total</small>
                    </span>
            </div>
            <!-- list users -->
            <section>
                <div class="tab-pane fade show active" 
                    id="pills-home" 
                    role="tabpanel" 
                    aria-labelledby="pills-home-tab">
                    <div class="d-flex justify-content-between mb-5 mt-5">
                        <!-- right -->
                        <section class="d-flex">
                            <h4 class="mr-4 ">users</h4>
                            <div class="dropdown">
                                <a class="btn btn-outline-primary btn-sm dropdown-toggle" 
                                    href="#" role="button" id="dropdownMenuLink" 
                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    filter	
                                </a>
                                
                                <div class="dropdown-menu btn-sm shadow p-3" aria-labelledby="dropdownMenuLink" style="min-width: 25vw">
                                        <div class="form-group d-flex justify-content-between">
                                            <label class="p-2">Search</label>
                                            <input type="text" class="col-8 form-control" v-model="search"> 
                                        </div>                                                                                                       
                                </div>
                            </div>
                            <div class="ml-2">
                                <button class="btn btn-outline-primary btn-sm"
                                    @click="$exportTable('expensesTable','users.csv')">                                                                
                                    export
                                </button>	
                            </div>
                        </section>
                        <!-- add buttons -->
                        <section>
                            <button class="btn btn-sm btn-primary">add new user</button>
                        </section>
                    </div>
                    <!-- TABLE AND DEPENDENCIES -->
                    <div class="rounded shadow border border-light p-2 bg-white">
                        <table class="table table-borderless" id="expensesTable">
                            <thead >
                                <tr>
                                    <th scope="col">username</th>
                                    <th scope="col">email</th>                                                                                                                                                                                     
                                </tr>
                            </thead>                    
                            <tbody v-if="users && users.length">
                                <tr v-for="(user,index) in users" :key="index">                                
                                    <td class="text-primary">{{user.username}}</td>
                                    <td class="text-secondary">{{user.email}}</td>                                                                    
                                </tr>                       
                            </tbody>
                        </table>
                        <div class="p-3 d-flex justify-content-center"
                            v-if="users && ! users.length">
                            <span class="p-2">No records to show</span>                           
                        </div>
                        <div class="p-3 d-flex justify-content-center"
                            v-if="! users">
                            <div class="spinner-border p-3 m-5" role="status">
                                <span class="sr-only">Loading...</span>
                            </div>
                        </div>	
                    </div>            	
                </div>
            </section>        
        </div>
    </template>
    <script>
    export default {
        name: 'users',
        data(){
            return{
                search:null,
                users:null,
            }
        },
        mounted(){
            this.getUsers()
    
        },
        methods:{		
            //get_products
            getUsers: function(){
                this.users = null
                this.$http({
                    method:'get',				
                    url: this.$API_BASE_URL + `/api/users/`,
                    headers:{
                        Authorization: this.$store.getters.access_token
                    },                   
                }).then((response)=>{
                    var response_data = response.data
                    this.users = response_data.results                
                }).catch((err)=>{
                    this.$emit('alert',err)
                })
            },                
            }
    }
    </script>