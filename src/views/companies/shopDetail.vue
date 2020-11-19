<template>
    <div class="ml-4">
        <div class="d-flex">
                <h3 class="mb-4">
                    <i class="mr-2  fa fa-id-card-o" aria-hidden="true"></i>
                    <router-link to="/companies">                        
                        companies
                    </router-link>/                                  
                    <router-link class="text-primary" 
                        :to="{ name: 'companyDetail',params:{ id : company_id }, query: { company_name : company_name }}">
                    {{company_name}}
                    </router-link>
                    / {{shop_name}}
                </h3>               
        </div>
        <!-- list details -->
        <section>
            <div class="tab-pane fade show active" 
                id="pills-home" 
                role="tabpanel" 
                aria-labelledby="pills-home-tab">
                <!-- summary -->
                <div class="d-flex justify-content-between p-3">
                    <!-- right -->
                    <section class="d-flex">                                              
                    </section>
                    <!-- add buttons -->
                    <section>
                        <button class="btn btn-outline-primary btn-sm" data-toggle="modal" data-target="#editShopModal">
                            edit shop
                        </button>
                    </section>
                </div>
                <div class="d-flex justify-content-start">
                    <div class="p-3 card rounded border-0 shadow-sm" style="min-width: 200px">
                        <div>                                                               
                            <h5 class="text-muted">screens</h5>
                            <h5>{{details.screens | intcomma}}</h5>                                
                        </div>                          
                    </div>
                    <div class="ml-3 p-3 card rounded border-0 shadow-sm" style="min-width: 200px">
                        <div>                                                               
                            <h5 class="text-muted">Opens at</h5>
                            <h5>{{details.open_at}}</h5>                                
                        </div>                          
                    </div>
                    <div class="ml-3 p-3 card rounded border-0 shadow-sm" style="min-width: 200px">
                        <div>                                                               
                            <h5 class="text-muted">Opens at</h5>
                            <h5>{{details.close_at}}</h5>                                
                        </div>                          
                    </div>                    
                </div>
                <div class="d-flex justify-content-between mb-5 mt-5">
                    <!-- right -->
                    <section class="d-flex">
                        <h4 class="mr-4 ">devices</h4>
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
                        <button class="btn btn-primary btn-sm" data-toggle="modal" data-target="#addClientModal">
                            add new device
                        </button>
                    </section>
                </div>
                <!-- TABLE AND DEPENDENCIES -->
                <div class="rounded shadow border border-light p-2 bg-white">            
                    <table class="table table-borderless" id="expensesTable">
                        <thead >
                            <tr>
                                <th scope="col">name</th>
                                <th scope="col">address</th>
                                <th scope="col">views</th>                                
                            </tr>
                        </thead>                    
                        <tbody v-if="details && tablets.length">
                            <tr v-for="(tablet,index) in tablets" :key="index">                                
                                <td>{{tablet.name}}</td>                               
                                <td class="text-muted">{{tablet.address}}</td>
                                <td class="text-secondary">{{tablet.views}}</td>
                            </tr>                       
                        </tbody>
                    </table>
                    <div class="p-3 d-flex justify-content-center"
                        v-if="details && ! tablets.length">
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

        <!-- modals       -->
        <!-- add campaign -->
        <section>  
            <!-- edit client -->
            <div class="modal fade" id="editShopModal" tabindex="-1" role="dialog" >
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                    <div class="modal-header border-0">
                        <h5 class="modal-title" id="exampleModalCenterTitle">edit shop</h5>
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
                                <label>running days</label>
                                <input type="text" placeholder="mon,tue,wed,thu,fri,sat,sun" class="col-8 form-control" v-model="details.running_days">
                            </div>                
                            <div class="p-3 d-flex justify-content-between">
                                <label>screens</label>
                                <input type="text" class="col-8 form-control" v-model="details.screens">
                            </div>                                                      
                            <div class="p-3 d-flex justify-content-between">
                                <label>opens</label>
                                <input type="time" class="col-8 form-control" v-model="details.open_at">
                            </div>  
                            <div class="p-3 d-flex justify-content-between">
                                <label>closes</label>
                                <input type="time" class="col-8 form-control" v-model="details.close_at">
                            </div>   
                            <div class="p-3 d-flex justify-content-between">
                                <label>port</label>
                                <input type="number" class="col-8 form-control" v-model="details.ssh_port" >
                            </div>                                                                                  
                    </div>
                        <div class="modal-footer border-0">                            
                            <button type="button" id="closeEditShopModal" class="btn btn-sm  btn-secondary" data-dismiss="modal">Close</button>
                            <button class="btn btn-sm btn-primary"
                                @click="editShop()">                                                        
                                save changes
                                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" v-if="editing_shop"></span>
                            </button>
                        </div>
                    </form>                
                    </div>
                </div>
            </div>
            <!-- edit shop -->
            <div class="modal fade" id="addFundsModal" tabindex="-1" role="dialog" >
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                    <div class="modal-header border-0">
                        <h5 class="modal-title" id="exampleModalCenterTitle">add funds</h5>
                        <button type="button" id="closeAddExpenseModal" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <form >
                        <div class="modal-body">                    
                                <div class="p-3 d-flex justify-content-between">
                                    <label>name</label>
                                    <input type="text" class="col-8 form-control" v-model="details.name" >
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
                            <button type="button" id="closeAddFundsModal" class="btn btn-sm  btn-secondary" data-dismiss="modal">Close</button>
                            <button class="btn btn-sm btn-primary"
                                @click="editShop('add_funds')">                                                        
                                save changes
                                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" v-if="editing_shop"></span>
                            </button>
                        </div>
                    </form>                
                    </div>
                </div>
            </div>
            <!-- add campaign -->
            <div class="modal fade" id="addClientModal" tabindex="-1" role="dialog" >
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                    <div class="modal-header border-0">
                        <h5 class="modal-title" id="exampleModalCenterTitle">add device</h5>
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
                        </div>
                        <div class="modal-footer border-0">                            
                            <button type="button" id="closeAddDeviceModal" class="btn btn-sm  btn-secondary" data-dismiss="modal">Close</button>
                            <button class="btn btn-sm btn-primary"
                                @click="addDevice()">                                                        
                                add device
                                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" v-if="adding_device"></span>
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
    name: 'details',
    props: {
        msg: String
    },
    data(){
        return{
            shop_id: this.$route.params.id,
            shop_name: this.$route.query.shop_name,
            company_id: this.$route.query.company_id,
            company_name: this.$route.query.company_name,
            search:null,
            details:null,
            tablets: [],
            //add campaign.
            adding_device:false,
            name:null,              
            //edit client.         
            editing_shop: false
        }
    },
    mounted(){        
        this.getShopDetails()
    },
    methods:{		
        //get_products
        getShopDetails: function(){
            this.details = null
            this.$http({
                method:'get',				
                url: this.$API_BASE_URL + `/api/shops/${this.shop_id}/`,
                headers:{
                    Authorization: this.$store.getters.access_token
                },                   
            }).then((response)=>{
                this.details = response.data               
                this.tablets = this.details.tablets
            }).catch((err)=>{
                alert(err)
            })
        },      
        // edit shop details  
        editShop: function(){              
            this.editing_shop = true
            this.$http({
                method:'patch',				
                url: this.$API_BASE_URL + `/api/shops/${this.shop_id}/`,
                headers:{
                    Authorization: this.$store.getters.access_token
                },                   
                data:{
                    name: this.details.name,                    
                    address: this.details.address,
                    screens: this.details.screens,
                    running_days: this.details.running_days,
                    close_at: this.details.close_at,
                    open_at: this.details.open_at,
                    ssh_port: this.details.ssh_port
                }
            }).then(()=>{
                this.company_name = this.details.name
                this.editing_shop = false
                document.getElementById('closeEditShopModal').click()                                
                this.getShopDetails()                
            }).catch((err)=>{
                alert(err)
                this.editing_shop = false
            })
        }, 
        //add campaign
        addDevice: function(){
            this.adding_device = true
            this.$http({
                method:'post',
                url: this.$API_BASE_URL + `/api/tablets/`,
                headers:{
                    Authorization: this.$store.getters.access_token
                },            
                data:{
                    shop : this.shop_id,                  
                    name: this.name,
                    views: 0
                }       
            }).then(()=>{
                this.adding_device = false
                document.getElementById('closeAddDeviceModal').click()
                this.getShopDetails()
            }).catch((err)=>{
                alert(err)
            })
        },         
        }
}
</script>