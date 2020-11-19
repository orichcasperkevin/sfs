<template>
    <div class="ml-4">
        <div class="d-flex">
                <h3 class="mb-4">
                    <i class="mr-2  fa fa-id-card-o" aria-hidden="true"></i>
                    settings
                </h3>
        </div>
        <!-- settings-->
        <h4 class="mt-5 mb-5">default settings</h4>
        <section>
            <div class="d-flex flex-wrap justify-content-between rounded shadow-sm bg-white">
                <div class="p-3 d-flex flex-column justify-content-between">
                    <label>seconds per slot</label>
                    <input type="text" class="col-8 form-control" v-model="settings.seconds_per_slot">
                </div> 
                <div class="p-3 d-flex flex-column justify-content-between">
                    <label>cost per slot</label>
                    <input type="text" class="col-8 form-control" v-model="settings.cost_per_slot">
                </div> 
                <div class="p-3 d-flex flex-column justify-content-between">
                    <label>ads per shop</label>
                    <input type="text" class="col-8 form-control" v-model="settings.ads_per_shop">
                </div> 
                <div class="p-3 d-flex flex-column justify-content-between">
                    <label>displays per ad per shop</label>
                    <input type="text" class="col-8 form-control" v-model="settings.displays_per_ad_per_shop">
                </div> 
                <div class="p-3 d-flex flex-column justify-content-between">
                    <label>monetary unit</label>
                    <input type="text" class="col-8 form-control" v-model="settings.monetary_unit">
                </div> 
                <div class="p-3 d-flex flex-column justify-content-between">
                    <label>ad interval</label>
                    <input type="text" class="col-8 form-control" v-model="settings.ad_interval">
                </div> 
                <div class="p-3 d-flex flex-column justify-content-between">
                    <label>ad slots</label>
                    <input type="text" class="col-8 form-control" v-model="settings.ad_slots">
                </div> 
                <div class="p-3 d-flex flex-column justify-content-between">
                    <label>report_interval</label>
                    <input type="text" class="col-8 form-control" v-model="settings.report_interval">
                </div>                
            </div>
            <div class="p-3 text-right">
                <button class="btn btn-sm btn-outline-primary" @click="updateSettings()">
                    save changes
                    <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" v-if="updating_settings"></span>
                </button>
            </div>            
        </section>        
    </div>
</template>
<script>
export default {
    name: 'settings',
    data(){
        return{
            search:null,
            settings:null,
            updating_settings: false,
        }
    },
    mounted(){
        this.getSettings()

    },
    methods:{		
        //get_settings
        getSettings: function(){
            this.users = null
            this.$http({
                method:'get',				
                url: this.$API_BASE_URL + `/api/settings/`,
                headers:{
                    Authorization: this.$store.getters.access_token
                },                   
            }).then((response)=>{
                var response_data = response.data
                this.settings = response_data[0]              
            }).catch((err)=>{
                this.$emit('alert',err)
            })
        },  
        //update settings.
        updateSettings: function(){            
            this.updating_settings = true
            this.$http({
                method:'patch',				
                url: this.$API_BASE_URL + `/api/settings/`,
                headers:{
                    Authorization: this.$store.getters.access_token
                },                   
                data: this.settings                
            }).then(()=>{
                this.updating_settings = false
                this.getSettings()
            }).catch((err)=>{
                this.updating_settings = false
                alert(err)
            })
        },              
        }
}
</script>