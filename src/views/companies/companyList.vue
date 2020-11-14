<template>
        <div class="ml-4">
            <div class="d-flex">
                    <h3 class="mb-4">
                        <i class="mr-2  fa fa-id-card-o" aria-hidden="true"></i>
                        companies
                    </h3>
                    <span class="p-3 font-weight-bold" v-if="companies">
                        <small>{{companies.length}} total</small>
                    </span>
            </div>
            <!-- list companies -->
            <section>
                <div class="tab-pane fade show active" 
                    id="pills-home" 
                    role="tabpanel" 
                    aria-labelledby="pills-home-tab">
                    <div class="d-flex justify-content-between mb-5 mt-5">
                        <!-- right -->
                        <section class="d-flex">
                            <h4 class="mr-4 ">companies</h4>
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
                                    @click="$exportTable('expensesTable','companies.csv')">                                                                
                                    export
                                </button>	
                            </div>
                        </section>
                        <!-- add buttons -->
                        <section>
                            <button class="btn btn-sm btn-primary" data-toggle="modal" data-target="#addCompanyModal">
                                add new company
                            </button>
                        </section>
                    </div>
                    <!-- TABLE AND DEPENDENCIES -->
                    <div class="rounded shadow border border-light p-2 bg-white">
                        <table class="table table-borderless" id="expensesTable">
                            <thead >
                                <tr>
                                    <th scope="col">name</th>
                                    <th scope="col">phone</th>
                                    <th scope="col">address</th>
                                    <th scope="col">bank</th>   
                                    <th scope="col">shops</th>                                                                                 
                                </tr>
                            </thead>                    
                            <tbody v-if="companies && companies.length">
                                <tr v-for="(company,index) in companies" :key="index">
                                    <td>                                    
                                        <router-link  
                                            :to="{ path: `companies/${company.id}/`, query: { company_name : company.name }}">
                                            {{company.name}}
                                        </router-link>
                                    </td>
                                    <td class="text-muted">{{company.phone}}</td>
                                    <td class="text-secondary">{{company.address}}</td>
                                    <td class="text-secondary">{{company.bank}}</td>                                    
                                    <td class="text-secondary">{{company.shops.length | intcomma}}</td> 

                                </tr>                       
                            </tbody>
                        </table>
                        <div class="p-3 d-flex justify-content-center"
                            v-if="companies && ! companies.length">
                            <span class="p-2">No records to show</span>                           
                        </div>
                        <div class="p-3 d-flex justify-content-center"
                            v-if="! companies">
                            <div class="spinner-border p-3 m-5" role="status">
                                <span class="sr-only">Loading...</span>
                            </div>
                        </div>	
                    </div>            	
                </div>
            </section>   
            <!-- modals       -->
            <!-- add comapny -->
            <section>                                                
                <div class="modal fade" id="addCompanyModal" tabindex="-1" role="dialog" >
                    <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">
                        <div class="modal-header border-0">
                            <h5 class="modal-title" id="exampleModalCenterTitle">add company</h5>
                            <button type="button" id="closeAddExpenseModal" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <form id="addExpenseForm">
                            <div class="modal-body">                    
                                    <div class="p-3 d-flex justify-content-between">
                                        <label>name</label>
                                        <input type="text" class="col-8 form-control" v-model="name" >
                                    </div>    
                                    <div class="p-3 d-flex justify-content-between">
                                        <label>address</label>
                                        <input type="text" class="col-8 form-control" v-model="address">
                                    </div>  
                                    <div class="p-3 d-flex justify-content-between">
                                        <label>bank</label>
                                        <input type="text" class="col-8 form-control" v-model="bank">
                                    </div>                
                                    <div class="p-3 d-flex justify-content-between">
                                        <label>phone</label>
                                        <input type="text" class="col-8 form-control" v-model="phone">
                                    </div>                                                                                                                                         
                            </div>
                            <div class="modal-footer border-0">                            
                                <button type="button" id="closeAddCompanyModalButton" class="btn btn-sm  btn-secondary" data-dismiss="modal">Close</button>
                                <button class="btn btn-sm btn-primary"
                                    @click="addCompany()">                                                        
                                    add company
                                    <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" v-if="adding_company"></span>
                                </button>
                            </div>
                        </form>                
                        </div>
                    </div>
                </div>
            </section>     
        </div>
    </template>
    <script>
    export default {
        name: 'companies',
        props: {
            msg: String
        },
        data(){
            return{
                search:null,
                companies:null,
                //add company
                adding_company: false,
                name:null,
                address:null,
                phone: null,
                bank: null,            
            }
        },
        mounted(){
            this.getCompanies()
    
        },
        methods:{		
            //get_products
            getCompanies: function(){
                this.companies = null
                this.$http({
                    method:'get',				
                    url: this.$API_BASE_URL + `/api/companies/`,
                    headers:{
                        Authorization: this.$store.getters.access_token
                    },                   
                }).then((response)=>{
                    var response_data = response.data
                    this.companies = response_data.results                
                }).catch((err)=>{
                    this.$emit('alert',err)
                })
            },  
            //add company.
            addCompany: function(){   
                this.adding_client = true
                this.$http({
                    method:'post',
                    url: this.$API_BASE_URL + `/api/companies/`,
                    headers:{
                        Authorization: this.$store.getters.access_token
                    },
                    data:{
                        name: this.name,
                        address : this.address,
                        bank: this.bank,
                        phone: this.phone,
                    }
                }).then(()=>{
                    this.adding_client = false
                    document.getElementById('closeAddCompanyModalButton').click()
                    this.getCompanies()
                }).catch((err)=>{
                    alert(err)
                })
            },          
            }
    }
    </script>