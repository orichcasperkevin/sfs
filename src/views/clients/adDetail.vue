<template>
    <div class="ml-4">
        <div class="d-flex">
                <h3 class="text-muted mb-4">
                    <i class="mr-2  fa fa-id-card-o" aria-hidden="true"></i>
                    <router-link to="/clients">                            
                        clients
                    </router-link>/                   
                    <router-link class="text-primary" 
                        :to="{ name: 'clientDetails',params:{ id : client_id }, query: { client_name : client_name }}">
                        {{client_name}}
                    </router-link>/
                    <router-link 
                        :to="{ name: 'campaignDetails', params:{ id : campaign_id}, query: { campaign_name : campaign_name , client_name:client_name  }}">
                        {{campaign_name}}
                    </router-link>/                
                    {{ad.name}}
                </h3>               
        </div>
        <!-- list details -->
        <section>
            <div class="tab-pane fade show active" 
                id="pills-home" 
                role="tabpanel" 
                aria-labelledby="pills-home-tab">     
                <!-- edit ad -->
                <section class="mb-4 mt-4 d-flex justify-content-end">
                    <button class="btn btn-sm btn-primary" data-toggle="modal" data-target="#editAdvertisementModal">
                        edit ad
                    </button>
                </section>           
                <!-- cards -->
                <div class="d-flex flex-row justify-content-start">    
                    <div class="ml-2 p-3 card rounded shadow-sm border-0" style="min-width: 200px">
                        <div>                                                               
                            <h5 class="text-muted">Status</h5>                                    
                            <span v-if="ad.is_running" class="badge badge-success">running</span>
                            <span v-else class="badge badge-danger">paused</span>
                            <small v-if="ad.is_running" class="d-flex justify-content-end">
                                <button class="p-1 btn btn-sm btn-outline-primary"
                                @click="ad.is_running = false; editAdvertisement()">pause
                            </button>
                            </small>
                            <small v-else class="d-flex justify-content-end">
                                <button class="p-1 btn btn-sm btn-outline-primary"
                                @click="ad.is_running = true; editAdvertisement()">start
                            </button>
                            </small>                              
                        </div>
                    </div>                                                           
                    <div class="ml-2 p-3 card rounded shadow-sm border-0" style="min-width: 200px">
                        <div>                                                               
                            <h5 class="text-muted">Slots</h5>
                            <h5>{{ad.slots | intcomma}}</h5>                                
                        </div>                         
                    </div>
                    <div class="ml-2 p-3 card rounded shadow-sm border-0" style="min-width: 200px">
                        <div>                                                               
                            <h5 class="text-muted">Required Impressions</h5>
                            <h5>{{ad.required_displays}}</h5>                                
                        </div>                         
                    </div>
                    <div class="ml-2 p-3 card rounded shadow-sm border-0" style="min-width: 200px">
                        <div>                                                               
                            <h5 class="text-muted">Impressions</h5>
                            <h5>{{ad.displayed_times}}</h5>                                
                        </div>                         
                    </div>                      
                </div>
                <div class="d-flex justify-content-between mb-5 mt-5">                        
                    <!-- right -->
                    <section class="d-flex">
                        <h4 class="mr-4 ">ad</h4>                                             
                    </section>                  
                </div>
                <!-- TABLE AND DEPENDENCIES -->
                <div class="rounded shadow border border-light p-2 bg-white">                     
                   <div class="d-flex mb-5">
                        <video id="videoWrapper" class="" style="border-radius: 15px; width: 100%; height: 100%;" controls>
                                <source id="videoSource" :key="ad.id" :src="video_source" ref="video" />
                        </video>  
                   </div>
                </div>            	                
            </div>
        </section>  
        <!-- modals       -->        
        <section>     
            <!-- edit video  -->
            <div class="modal fade" id="editAdvertisementModal" tabindex="-1" role="dialog" >                        
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                    <div class="modal-header border-0">                                    
                        <h5 class="modal-title" id="exampleModalCenterTitle" v-if="ad">{{ad.name}}</h5>
                        <button type="button" id="closeAddExpenseModal" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <form id="addExpenseForm">                                    
                        <div class="modal-body">                                                       
                            <div v-if="ad">                                          
                                    <div class="p-3 d-flex justify-content-between">
                                        <label>name</label>
                                        <input type="text" class="col-8 form-control" v-model="ad.name" >
                                    </div>                                                                 
                                    <div class="p-3 d-flex justify-content-between">
                                        <label>file</label>
                                        <uploadVideos v-model="ad.file"/>
                                    </div>  
                                    <div class="p-3 d-flex justify-content-between">
                                        <label>slots</label>
                                        <input type="number" class="col-8 form-control" v-model="ad.slots">
                                    </div>                
                                    <div class="p-3 d-flex justify-content-between">
                                        <label>required impressions</label>
                                        <input type="number" class="col-8 form-control" v-model="ad.required_displays">
                                    </div>
                                    <div class="p-3 d-flex justify-content-between">
                                        <label>impressions</label>
                                        <input type="number" class="col-8 form-control" v-model="ad.displayed_times">
                                    </div>
                                    <div class="p-3 d-flex justify-content-between">
                                        <label>active</label>
                                        <label class="switch">
                                            <input type="checkbox" v-model="ad.is_running">
                                            <span class="slider round"></span>
                                        </label>   
                                    </div>
                                    <div class="p-3 d-flex justify-content-between">
                                        <label>Default ad (runs when there are no paid ads)</label>
                                        <label class="switch">
                                            <input type="checkbox" v-model="ad.base_ad">
                                            <span class="slider round"></span>
                                        </label>   
                                    </div>                             
                            </div>                    
                        </div>
                        <div class="modal-footer border-0">                            
                            <button type="button" id="closeEditAdvertisementModal" class="btn btn-sm  btn-secondary" data-dismiss="modal">Close</button>                                        
                            <button class="btn btn-sm btn-primary"
                                @click="editAdvertisement()">                                                        
                                edit ad
                                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" v-if="editing_ad"></span>
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
    name: 'adDetails',
    components: {uploadVideos},
    props: {
        msg: String
    },
    data(){
        return{
            ad : this.$route.query.ad,
            campaign_id: this.$route.query.campaign_id,
            client_id: this.$route.query.client_id,
            client_name: this.$route.query.client_name,
            campaign_name: this.$route.query.campaign_name,
            search:null,
            details:null,        
            //show video            
            video_source: null,
            //add advertistrue.         
            name: null,
            file: null,
            slots: null,
            required_impressions: null,
            active: false,
            default_ad:false,
            //editing 
            editing_campaign : false,
            editing_ad: false
        }
    },
    mounted(){
        this.changeVideo(this.ad)
    },
    methods:{		
        changeVideo(ad){                         
            this.ad = ad       
            this.video_source = ad.file
            //Force video load.
            var vid = this.$refs.video    
            setTimeout(()=>{
                vid.load()
            },200)                           
        },  
        //edit advertisement
        editAdvertisement: function(){   
            var data = new FormData()                
            data.append("id", this.ad.id)
            data.append("campaign", this.campaign_id)
            data.append("name", this.ad.name)
            data.append("slots", this.ad.slots)
            data.append("required_displays", this.ad.required_displays)
            data.append("displayed_times", this.ad.displayed_times)
            data.append("is_running", this.ad.is_running)                
            data.append("base_ad", this.ad.base_ad)
            data.append("file", this.ad.file)             

            this.editing_ad = true
            this.$http({
                method:'patch',
                url: this.$API_BASE_URL + `/api/add-advertisement/`,
                headers:{
                    Authorization: this.$store.getters.access_token,
                    'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
                },                                
                data:data
            }).then(()=>{
                this.editing_ad = false
                document.getElementById('closeEditAdvertisementModal').click()              
            }).catch((err)=>{
                alert(err)
            })
        }, 

        }
}
</script>   