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
                    <section class="p-3 d-flex justify-content-end">                        
                        <div class="ml-2">
                            <button class="btn btn-outline-primary btn-sm" data-toggle="modal" data-target="#editCompanyModal">                                                                
                                edit company
                            </button>	
                        </div>
                    </section>
                    <!-- cards -->
                    <div class="d-flex justify-content-start">                          
                            <div class="ml-2 p-3 card rounded shadow-sm border-0" style="min-width: 200px">
                                <div>                                                               
                                    <h5 class="text-muted">Phone</h5>
                                    <h5>{{details.phone}}</h5>                                
                                </div>                         
                            </div>
                            <div class="ml-2 p-3 card rounded shadow-sm border-0" style="min-width: 200px">
                                <div>                                                               
                                    <h5 class="text-muted">Address</h5>
                                    <h5>{{details.address}}</h5>                                
                                </div>                         
                            </div>
                            <div class="ml-2 p-3 card rounded shadow-sm border-0" style="min-width: 200px">
                                <div>                                                               
                                    <h5 class="text-muted">Shops</h5>
                                    <h5>{{details.shops.length}}</h5>                                
                                </div>                         
                            </div>                           
                    </div>
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
                            <button class="btn btn-sm btn-primary" data-toggle="modal" data-target="#addShopModal">
                                add new shop
                            </button>
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
                                    <td>
                                        <router-link 
                                            :to="{ name: 'shopDetail', params:{ id : shop.id}, query: { shop_name : shop.name ,company_id: company_id, company_name:company_name  }}">
                                            {{shop.name}}
                                        </router-link>
                                    </td>
                                    <td class="text-secondary">{{shop.address}}</td>
                                    <td class="text-secondary">{{shop.screens}}</td>                              
                                    <td class="text-muted">{{shop.open_at}}</td>
                                    <td class="text-muted">{{shop.close_at}}</td>   
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
            <!-- modals -->
            <section>
                <!-- edit client -->
                <div class="modal fade" id="editCompanyModal" tabindex="-1" role="dialog" >
                    <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">
                        <div class="modal-header border-0">
                            <h5 class="modal-title" id="exampleModalCenterTitle">edit client</h5>
                            <button type="button" id="closeAddExpenseModal" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <form id="addExpenseForm">
                            <div class="modal-body">                    
                                    <div class="p-3 d-flex justify-content-between">
                                        <label>name</label>
                                        <input type="text" class="col-8 form-control" v-model="details.name" >
                                    </div>    
                                    <div class="p-3 d-flex justify-content-between">
                                        <label>address</label>
                                        <input type="text" class="col-8 form-control" v-model="details.address">
                                    </div>  
                                    <div class="p-3 d-flex justify-content-between">
                                        <label>bank</label>
                                        <input type="text" class="col-8 form-control" v-model="details.bank">
                                    </div>                
                                    <div class="p-3 d-flex justify-content-between">
                                        <label>phone</label>
                                        <input type="text" class="col-8 form-control" v-model="details.phone">
                                    </div>                                                                                                                                          
                            </div>
                            <div class="modal-footer border-0">                            
                                <button type="button" id="closeEditCompanyModal" class="btn btn-sm  btn-secondary" data-dismiss="modal">Close</button>
                                <button class="btn btn-sm btn-primary"
                                    @click="editCompany()">                                                        
                                    save changes
                                    <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" v-if="editing_company"></span>
                                </button>
                            </div>
                        </form>                
                        </div>
                    </div>
                </div>
                <!-- add shop -->
                <div class="modal fade" id="addShopModal" tabindex="-1" role="dialog" >
                    <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">
                        <div class="modal-header border-0">
                            <h5 class="modal-title" id="exampleModalCenterTitle">add shop</h5>
                            <button type="button" id="closeAddExpenseModal" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <form >
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
                                        <label>running days</label>
                                        <input type="text" placeholder="mon,tue,wed,thu,fri,sat,sun" class="col-8 form-control" v-model="running_days">
                                    </div>                
                                    <div class="p-3 d-flex justify-content-between">
                                        <label>screens</label>
                                        <input type="text" class="col-8 form-control" v-model="screens">
                                    </div>                                                      
                                    <div class="p-3 d-flex justify-content-between">
                                        <label>opens</label>
                                        <input type="time" class="col-8 form-control" v-model="open_at">
                                    </div>  
                                    <div class="p-3 d-flex justify-content-between">
                                        <label>closes</label>
                                        <input type="time" class="col-8 form-control" v-model="close_at">
                                    </div>   
                                    <div class="p-3 d-flex justify-content-between">
                                        <label>port</label>
                                        <input type="number" class="col-8 form-control" v-model="ssh_port" >
                                    </div>                                                                                  
                            </div>
                            <div class="modal-footer border-0">                            
                                <button type="button" id="closeAddShopModalButton" class="btn btn-sm  btn-secondary" data-dismiss="modal">Close</button>
                                <button class="btn btn-sm btn-primary"
                                    @click="addShop()">                                                        
                                    add shop
                                    <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" v-if="adding_shop"></span>
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
                //edit company.
                editing_company:false,
                //add shop
                adding_shop:false,
                name: null,
                screens:null,
                address:null,
                running_days:null,
                close_at:null,
                open_at:null,
                ssh_port:null,
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
            // edit client details  
            editCompany: function(){        
                this.editing_company = true
                this.$http({
                    method:'patch',				
                    url: this.$API_BASE_URL + `/api/companies/${this.company_id}/`,
                    headers:{
                        Authorization: this.$store.getters.access_token
                    },                   
                    data:{
                        name: this.details.name,
                        address: this.details.address,
                        bank: this.details.bank,
                        phone: this.details.phone,
                    }
                }).then(()=>{
                    this.company_name = this.details.name
                    this.editing_company = false
                    document.getElementById('closeEditCompanyModal').click()                                   
                    this.getCompanyDetails()                
                }).catch((err)=>{
                    alert(err)
                    this.editing_company = false
                })
            }, 
            //add company            
            addShop: function(){   
                var data={
                        company: this.company_id,
                        name: this.name,                        
                        address : this.address,
                        running_days: this.running_days,
                        close_at: this.close_at,
                        open_at: this.open_at,
                        ssh_port: this.ssh_port
                }
                console.log(data)
                this.adding_shop = true
                this.$http({
                    method:'post',
                    url: this.$API_BASE_URL + `/api/shops/`,
                    headers:{
                        Authorization: this.$store.getters.access_token
                    },
                    data:{
                        company: this.company_id,
                        name: this.name,                        
                        address : this.address,
                        running_days: this.running_days,
                        close_at: this.close_at,
                        open_at: this.open_at,
                        ssh_port: this.ssh_port
                    }
                }).then(()=>{
                    this.adding_shop = false
                    document.getElementById('closeAddShopModalButton').click()
                    this.getCompanyDetails()
                }).catch((err)=>{
                    alert(err)
                })
            }, 
            }
    }
    </script>