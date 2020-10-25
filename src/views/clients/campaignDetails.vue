<template>
        <div class="ml-4">
            <div class="d-flex">
                    <h3 class="text-muted mb-4">
                        <i class="mr-2  fa fa-id-card-o" aria-hidden="true"></i>
                        <router-link to="/clients">                            
                            clients
                        </router-link>  
                        <router-link class="text-primary" 
                            :to="{ name: 'clientDetails',params:{ id : details.client }, query: { client_name : client_name }}">
                            / {{client_name}}
                        </router-link>
                        / {{campaign_name}}
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
                            <h4 class="mr-4 ">ads</h4>
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
                            <button class="btn btn-sm btn-primary">add new ad</button>
                        </section>
                    </div>
                    <!-- TABLE AND DEPENDENCIES -->
                    <div class="rounded shadow border border-light p-2 bg-white">
                        <table class="table table-borderless" id="expensesTable">
                            <thead >
                                <tr>
                                    <th scope="col">ad name</th>
                                    <th scope="col">slots</th>
                                    <th scope="col">required displays</th>
                                    <th scope="col">displayed times</th>                                                                                    
                                    <th scope="col">running</th>
                                </tr>
                            </thead>                    
                            <tbody v-if="details && ads.length">
                                <tr v-for="(ad,index) in ads" :key="index">                                
                                    <td>                                    
                                        <router-link
                                            :to="{ path: `ads/${ad.id}/`, query: { campaign_name : ad.name }}">
                                            {{ad.name}}
                                        </router-link>
                                    </td>                               
                                    <td class="text-muted">{{ad.slots | dateformat}}</td>
                                    <td class="text-muted">{{ad.required_displays | dateformat}}</td>
                                    <td class="text-secondary">{{ad.displayed_times | intcomma}}</td>
                                    <td class="text-secondary">{{ad.is_running}}</td>                                    
                                </tr>                       
                            </tbody>
                        </table>
                        <div class="p-3 d-flex justify-content-center"
                            v-if="details && ! ads.length">
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
        name: 'campaignDetails',
        props: {
            msg: String
        },
        data(){
            return{
                campaign_id: this.$route.params.id,
                client_name: this.$route.query.client_name,
                campaign_name: this.$route.query.campaign_name,
                search:null,
                details:null,
                ads: [],
            }
        },
        mounted(){
            console.log(this.$router.params)
            this.getCampaignDetails()
        },
        methods:{		
            //get_products
            getCampaignDetails: function(){
                this.details = null
                this.$http({
                    method:'get',				
                    url: this.$API_BASE_URL + `/api/campaigns/${this.campaign_id}/`,
                    headers:{
                        Authorization: this.$store.getters.access_token
                    },                   
                }).then((response)=>{
                    this.details = response.data               
                    this.ads = this.details.ads
                }).catch((err)=>{
                    alert(err)
                })
            },                
            }
    }
    </script>