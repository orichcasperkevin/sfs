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
                            <button class="btn btn-sm btn-primary" data-toggle="modal" data-target="#addAdvertisementModal">
                                add new ad
                            </button>
                        </section>
                    </div>
                    <!-- TABLE AND DEPENDENCIES -->
                    <div class="rounded shadow border border-light p-2 bg-white">
                        <table class="table table-borderless" id="expensesTable">
                            <thead >
                                <tr>
                                    <th scope="col">ad name</th>
                                    <th scope="col">slots</th>
                                    <th scope="col">required impressions</th>
                                    <th scope="col">impressions</th>                                                                                    
                                    <th scope="col">running</th>
                                </tr>
                            </thead>                    
                            <tbody v-if="details && ads.length">
                                <tr v-for="(ad,index) in ads" :key="index">                                
                                    <td>                                    
                                        <a class="text-primary cursor-pointer" style="cursor: pointer" data-toggle="modal" 
                                            data-target="#viewAdvertisementModal" @click="changeVideo(ad)">
                                            <i class="fa fa-play" aria-hidden="true"></i>
                                            {{ad.name}}
                                        </a>
                                    </td>                               
                                    <td class="text-muted">{{ad.slots | intcomma}}</td>
                                    <td class="text-muted">{{ad.required_displays | intcomma}}</td>
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
            <!-- modals       -->
            <!-- add expenses -->
            <section>              
                    <div class="modal fade" id="viewAdvertisementModal" tabindex="-1" role="dialog" >                        
                            <div class="modal-dialog modal-dialog-centered" role="document">
                                <div class="modal-content">
                                <div class="modal-header border-0">                                    
                                    <h5 class="modal-title" id="exampleModalCenterTitle" v-if="ad">{{ad.name}}</h5>
                                    <button type="button" id="closeAddExpenseModal" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <form id="addExpenseForm">                                    
                                    <small class="p-2">{{video_source}}</small>
                                    <div class="modal-body">                    
                                        <video id="videoWrapper" class="" style="border-radius: 15px; width: 100%; height: 100%;" controls>
                                                <source id="videoSource" :key="video_source" :src="video_source" ref="video" />
                                        </video>                          
                                    </div>
                                    <div class="modal-footer border-0">                            
                                        <button type="button" id="closeAddAdvertisementModal" class="btn btn-sm  btn-secondary" data-dismiss="modal">Close</button>                                        
                                    </div>
                                </form>                
                                </div>
                            </div>
                            </div>                                  
                <!-- view video -->                
                <div class="modal fade" id="addAdvertisementModal" tabindex="-1" role="dialog" >
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                    <div class="modal-header border-0">
                        <h5 class="modal-title" id="exampleModalCenterTitle">add advertisement</h5>
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
                                    <label>file</label>
                                    <uploadVideos v-model="file"/>
                                </div>  
                                <div class="p-3 d-flex justify-content-between">
                                    <label>slots</label>
                                    <input type="number" class="col-8 form-control" v-model="slots">
                                </div>                
                                <div class="p-3 d-flex justify-content-between">
                                    <label>required impressions</label>
                                    <input type="number" class="col-8 form-control" v-model="required_impressions">
                                </div>
                                <div class="p-3 d-flex justify-content-between">
                                    <label>active</label>
                                    <label class="switch">
                                        <input type="checkbox" v-model="active">
                                        <span class="slider round"></span>
                                    </label>   
                                </div>
                                <div class="p-3 d-flex justify-content-between">
                                    <label>Default ad (runs when there are no paid ads)</label>
                                    <label class="switch">
                                        <input type="checkbox" v-model="default_ad">
                                        <span class="slider round"></span>
                                    </label>   
                                </div>                             
                        </div>
                        <div class="modal-footer border-0">                            
                            <button type="button" id="closeAddAdvertisementModal" class="btn btn-sm  btn-secondary" data-dismiss="modal">Close</button>
                            <button class="btn btn-sm btn-primary"
                                @click="addAdvertisement()">                                                        
                                add ad
                                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" v-if="adding_advertisement"></span>
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
    import uploadVideos from '@/components/uploadVideos'
    export default {
        name: 'campaignDetails',
        components: {uploadVideos},
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
                //show video
                ad: null,
                video_source: null,
                //add advertistrue.
                adding_advertisement: false,
                name: null,
                file: null,
                slots: null,
                required_impressions: null,
                active: false,
                default_ad:false
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
            changeVideo(ad){         
                this.ad = ad       
                this.video_source = ad.file
                //Force video load.
                var vid = this.$refs.video
                console.log(vid)
                vid.load();

            },
            //add advertisement
            //add campaign
            addAdvertisement: function(){   
                var data = new FormData()                
                data.append("campaign", this.campaign_id)
                data.append("name", this.name)
                data.append("slots", this.slots)
                data.append("required_displays", this.required_impressions)
                data.append("is_running", true)
                data.append("base_ad", this.default_ad)
                data.append("file", this.file)             

                this.adding_advertisement = true
                this.$http({
                    method:'post',
                    url: this.$API_BASE_URL + `/api/add-advertisement/`,
                    headers:{
                        Authorization: this.$store.getters.access_token,
                        'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
                    },                                
                    data:data
                }).then(()=>{
                    this.adding_advertisement = false
                    document.getElementById('closeAddAdvertisementModal').click()
                    this.getCampaignDetails()
                }).catch((err)=>{
                    alert(err)
                })
            },              
            }
    }
    </script>   