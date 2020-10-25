<template>
        <div class="ml-4">
            <div class="d-flex">
                    <h3 class="text-muted mb-4">
                        <i class="mr-2  fa fa-id-card-o" aria-hidden="true"></i>
                        <router-link to="/companies">                            
                            companies
                        </router-link>  
                        / {{company_name}}
                    </h3>               
            </div>
            <!-- list details -->
            <section>
                <div class="tab-pane fade show active" 
                    id="pills-home" 
                    role="tabpanel" 
                    aria-labelledby="pills-home-tab">
                    <div class="d-flex justify-content-between mb-5 mt-5">
                        <!-- right -->
                        <section class="d-flex">
                            <h4 class="mr-4 ">shops</h4>
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
                                    @click="$exportTable('expensesTable','details.csv')">                                                                
                                    export
                                </button>	
                            </div>
                        </section>
                        <!-- add buttons -->
                        <section>
                            <button class="btn btn -sm btn-primary">add new shop</button>
                        </section>
                    </div>
                    <!-- TABLE AND DEPENDENCIES -->
                    <div class="rounded shadow border border-light p-2 bg-white">
                        <table class="table table-borderless" id="expensesTable">
                            <thead >
                                <tr>
                                    <th scope="col">shop</th>
                                    <th scope="col">address</th>
                                    <th scope="col">screens</th>
                                    <th scope="col">opens</th>
                                    <th scope="col">closes</th>                                                                                    
                                    <th scope="col">open days</th>
                                    <th scope="col">ssh port</th>
                                </tr>
                            </thead>                    
                            <tbody v-if="details && shops.length">
                                <tr v-for="(shop,index) in shops" :key="index">                                
                                    <td>{{shop.name}} </td> 
                                    <td class="text-secondary">{{shop.address}}</td>
                                    <td class="text-secondary">{{shop.screens}}</td>                              
                                    <td class="text-muted">{{shop.opens | dateformat}}</td>
                                    <td class="text-muted">{{shop.closes | dateformat}}</td>   
                                    <td class="text-secondary">{{shop.running_days}}</td>                                   
                                    <td class="text-secondary">{{shop.ssh_port}}</td>                                    
                                </tr>                       
                            </tbody>
                        </table>
                        <div class="p-3 d-flex justify-content-center"
                            v-if="details && ! shops.length">
                            <span class="p-2">No records to show</span>                           
                        </div>
                        <div class="p-3 d-flex justify-content-center"
                            v-if="! details">
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
        name: 'companyDetail',
        props: {
            msg: String
        },
        data(){
            return{
                company_id: this.$route.params.id,
                company_name: this.$route.query.company_name,
                search:null,
                details:null,
                shops: [],
            }
        },
        mounted(){            
            this.getCompanyDetails()
        },
        methods:{		
            //get_products
            getCompanyDetails: function(){
                this.details = null
                this.$http({
                    method:'get',				
                    url: this.$API_BASE_URL + `/api/companies/${this.company_id}/`,
                    headers:{
                        Authorization: this.$store.getters.access_token
                    },                   
                }).then((response)=>{
                    this.details = response.data               
                    this.shops = this.details.shops
                }).catch((err)=>{
                    alert(err)
                })
            },                
            }
    }
    </script>