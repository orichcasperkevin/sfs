<template>
    <div class="ml-4">
        <div class="d-flex">
                <h3 class="mb-4">
                    <i class="mr-2  fa fa-id-card-o" aria-hidden="true"></i>
                    clients
                </h3>
                <span class="p-3 font-weight-bold" v-if="clients">
                    <small>{{clients.length}} total</small>
                </span>
        </div>
        <!-- list clients -->
        <section>
            <div class="tab-pane fade show active" 
                id="pills-home" 
                role="tabpanel" 
                aria-labelledby="pills-home-tab">
                <div class="d-flex justify-content-between mb-5 mt-5">
                    <!-- right -->
                    <section class="d-flex">
                        <h4 class="mr-4 ">clients</h4>
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
                                @click="$exportTable('expensesTable','clients.csv')">                                                                
                                export
                            </button>	
                        </div>
                    </section>
                    <!-- add buttons -->
                    <section>
                        <button class="btn btn-sm btn-primary">add new client</button>
                    </section>
                </div>
                <!-- TABLE AND DEPENDENCIES -->
                <div class="rounded shadow border border-light p-2 bg-white">
                    <table class="table table-borderless" id="expensesTable">
                        <thead >
                            <tr>
                                <th scope="col">name</th>
                                <th scope="col">phone</th>
                                <th scope="col">available funds</th>
                                <th scope="col">active campaigns</th>                                                                                    
                            </tr>
                        </thead>                    
                        <tbody v-if="clients && clients.length">
                            <tr v-for="(client,index) in clients" :key="index">
                                <td>                                    
                                    <router-link class="" 
                                        :to="{ path: `clients/${client.id}/`, query: { client_name : client.name }}">
                                        {{client.name}}
                                    </router-link>
                                </td>
                                <td class="text-muted">{{client.phone}}</td>
                                <td class="text-secondary">{{client.available_funds | intcomma}}</td>
                                <td class="text-secondary">{{client.campaigns_count | intcomma}}</td>                                    
                            </tr>                       
                        </tbody>
                    </table>
                    <div class="p-3 d-flex justify-content-center"
                        v-if="clients && ! clients.length">
                        <span class="p-2">No records to show</span>                           
                    </div>
                    <div class="p-3 d-flex justify-content-center"
                        v-if="! clients">
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
    name: 'clients',
    props: {
        msg: String
    },
    data(){
        return{
            search:null,
            clients:null,
        }
    },
    mounted(){
        this.getClients()

    },
    methods:{		
        //get_products
        getClients: function(){
            this.clients = null
            this.$http({
                method:'get',				
                url: this.$API_BASE_URL + `/api/clients/`,
                headers:{
                    Authorization: this.$store.getters.access_token
                },                   
            }).then((response)=>{
                var response_data = response.data
                this.clients = response_data.results                
            }).catch((err)=>{
                this.$emit('alert',err)
            })
        },                
        }
}
</script>