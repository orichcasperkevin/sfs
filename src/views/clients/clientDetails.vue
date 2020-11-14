<template>
    <div class="ml-4">
        <div class="d-flex">
                <h3 class="mb-4">
                    <i class="mr-2  fa fa-id-card-o" aria-hidden="true"></i>
                    <router-link to="/clients">                        
                        clients
                    </router-link>  
                    / {{client_name}}
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
                        <button class="btn btn-outline-primary btn-sm" data-toggle="modal" data-target="#editClientModal">
                            edit client
                        </button>
                    </section>
                </div>
                <div class="d-flex justify-content-start">
                    <div class="p-3 card rounded border-0 shadow-sm" style="min-width: 200px">
                        <div>                                                               
                            <h5 class="text-muted">campaigns</h5>
                            <h5>{{details.campaigns_count | intcomma}}</h5>                                
                        </div>                          
                    </div>
                    <div class="ml-3 p-3 card rounded border-0 shadow-sm" style="min-width: 200px">
                        <div>                                                               
                            <h5 class="text-muted">Estimated cost</h5>
                            <h5>{{details.estimated_cost | intcomma}}</h5>                                
                        </div>                          
                    </div>
                    <div class="ml-3 p-3 card rounded border-0 shadow-sm" style="min-width: 200px">
                        <div class="d-flex flex-column">                                                                                                                               
                            <h5 class="text-muted">Available funds</h5>
                            <h5>{{details.available_funds | intcomma}}</h5>                                
                            <small>funds : {{details.funds | intcomma}}</small>
                            <small>
                                used: {{details.used_funds | intcomma}}
                            </small>
                            <small class="d-flex justify-content-end float-right">
                                <button class="p-1 btn btn-sm btn-outline-primary"  data-toggle="modal" data-target="#addFundsModal">add funds</button>
                            </small>
                        </div>                          
                    </div>
                </div>
                <div class="d-flex justify-content-between mb-5 mt-5">
                    <!-- right -->
                    <section class="d-flex">
                        <h4 class="mr-4 ">campaigns</h4>
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
                            add new campaign
                        </button>
                    </section>
                </div>
                <!-- TABLE AND DEPENDENCIES -->
                <div class="rounded shadow border border-light p-2 bg-white">            
                    <table class="table table-borderless" id="expensesTable">
                        <thead >
                            <tr>
                                <th scope="col">campaign</th>
                                <th scope="col">start</th>
                                <th scope="col">end</th>
                                <th scope="col">frequency</th>                                                                                    
                                <th scope="col">running</th>
                            </tr>
                        </thead>                    
                        <tbody v-if="details && campaigns.length">
                            <tr v-for="(campaign,index) in campaigns" :key="index">                                
                                <td>                                    
                                    <router-link 
                                        :to="{ name: 'campaignDetails', params:{ id : campaign.id}, query: { campaign_name : campaign.name , client_name:client_name  }}">
                                        {{campaign.name}}
                                    </router-link>
                                </td>                               
                                <td class="text-muted">{{campaign.start_date | dateformat}}</td>
                                <td class="text-muted">{{campaign.end_date | dateformat}}</td>
                                <td class="text-secondary">{{campaign.frequency | intcomma}}</td>
                                <td class="text-secondary">{{campaign.is_running}}</td>                                    
                            </tr>                       
                        </tbody>
                    </table>
                    <div class="p-3 d-flex justify-content-center"
                        v-if="details && ! campaigns.length">
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
            <div class="modal fade" id="editClientModal" tabindex="-1" role="dialog" >
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
                                <div class="p-3 d-flex justify-content-between">
                                    <label>available funds</label>
                                    <input type="number" class="col-8 form-control" v-model="details.available_funds">
                                </div>                                                                                                            
                        </div>
                        <div class="modal-footer border-0">                            
                            <button type="button" id="closeEditClientModal" class="btn btn-sm  btn-secondary" data-dismiss="modal">Close</button>
                            <button class="btn btn-sm btn-primary"
                                @click="editClientDetails('edit_client')">                                                        
                                save changes
                                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" v-if="editing_client"></span>
                            </button>
                        </div>
                    </form>                
                    </div>
                </div>
            </div>
            <!-- edit client -->
            <div class="modal fade" id="addFundsModal" tabindex="-1" role="dialog" >
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                    <div class="modal-header border-0">
                        <h5 class="modal-title" id="exampleModalCenterTitle">add funds</h5>
                        <button type="button" id="closeAddExpenseModal" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <form id="addExpenseForm">
                        <div class="modal-body">                    
                                <div class="p-3 d-flex justify-content-between">
                                    <label>amount</label>
                                    <input type="number" class="col-8 form-control" v-model="amount">
                                </div>                                                                                                            
                        </div>
                        <div class="modal-footer border-0">                            
                            <button type="button" id="closeAddFundsModal" class="btn btn-sm  btn-secondary" data-dismiss="modal">Close</button>
                            <button class="btn btn-sm btn-primary"
                                @click="editClientDetails('add_funds')">                                                        
                                save changes
                                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" v-if="editing_client"></span>
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
                        <h5 class="modal-title" id="exampleModalCenterTitle">add campaign</h5>
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
                                    <label>start date</label>
                                    <input type="datetime-local" class="col-8 form-control" v-model="start_date">
                                </div>  
                                <div class="p-3 d-flex justify-content-between">
                                    <label>end date</label>
                                    <input type="datetime-local" class="col-8 form-control" v-model="end_date">
                                </div>
                                <div class="p-3 d-flex justify-content-between">
                                    <label>slots</label>
                                    <input type="number" class="col-8 form-control" v-model="slots">
                                </div>                
                                <div class="p-3 d-flex justify-content-between">
                                    <label>frequency</label>
                                    <input type="number" class="col-8 form-control" v-model="frequency">
                                </div> 
                                <div class="p-3 d-flex justify-content-between">
                                    <label>running days</label>
                                    <input type="text" placeholder="eg. Mon,Tue,Wed,Thu,Fri" class="col-8 form-control" v-model="running_days">
                                </div>                                                                                                            
                        </div>
                        <div class="modal-footer border-0">                            
                            <button type="button" id="closeAddCampaignModal" class="btn btn-sm  btn-secondary" data-dismiss="modal">Close</button>
                            <button class="btn btn-sm btn-primary"
                                @click="addCampaign()">                                                        
                                add campaign
                                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" v-if="adding_campaign"></span>
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
            client_id: this.$route.params.id,
            client_name: this.$route.query.client_name,
            search:null,
            details:null,
            campaigns: [],
            //add campaign.
            adding_campaign:false,
            name:null,
            start_date:null,
            end_date:null,
            slots:null,
            frequency:null,
            running_days:null,
            //edit client.
            amount: null,
            editing_client: false
        }
    },
    mounted(){
        console.log(this.$router.params)
        this.getClientDetails()
    },
    methods:{		
        //get_products
        getClientDetails: function(){
            this.details = null
            this.$http({
                method:'get',				
                url: this.$API_BASE_URL + `/api/clients/${this.client_id}/`,
                headers:{
                    Authorization: this.$store.getters.access_token
                },                   
            }).then((response)=>{
                this.details = response.data               
                this.campaigns = this.details.campaigns
            }).catch((err)=>{
                alert(err)
            })
        },      
        // edit client details  
        editClientDetails: function(context){        
            var available_funds
            if (context === 'edit_client'){
                available_funds = parseInt(this.details.available_funds)
            }   
            else{
                available_funds = parseInt(this.details.available_funds) + parseInt(this.amount)
            }
            this.editing_client = true
            this.$http({
                method:'patch',				
                url: this.$API_BASE_URL + `/api/clients/${this.client_id}/`,
                headers:{
                    Authorization: this.$store.getters.access_token
                },                   
                data:{
                    name: this.details.name,
                    address: this.details.address,
                    bank: this.details.bank,
                    phone: this.details.phone,
                    available_funds : available_funds
                }
            }).then(()=>{
                this.client_name = this.details.name
                this.editing_client = false
                document.getElementById('closeEditClientModal').click()                
                document.getElementById('closeAddFundsModal').click()
                this.getClientDetails()                
            }).catch((err)=>{
                alert(err)
                this.editing_client = false
            })
        }, 
        //add campaign
        addCampaign: function(){
            this.adding_campaign = true
            this.$http({
                method:'post',
                url: this.$API_BASE_URL + `/api/campaigns/`,
                headers:{
                    Authorization: this.$store.getters.access_token
                },            
                data:{
                    client : this.client_id,
                    "name" : this.name,
                    "start_date" : this.start_date,
                    "end_date" : this.end_date,
                    "slots" : this.slots,
                    "frequency": this.frequency,
                    "running_days": this.running_days,
                }       
            }).then(()=>{
                this.adding_campaign = false
                document.getElementById('closeAddCampaignModal').click()
                this.getClientDetails()
            }).catch((err)=>{
                alert(err)
            })
        },         
        }
}
</script>