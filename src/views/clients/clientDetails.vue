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
                        <button class="btn btn-primary">add new campaign</button>
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
        }
}
</script>