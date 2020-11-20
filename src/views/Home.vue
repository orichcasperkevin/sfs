<template>
  <div class="home"> 
	<div class="d-flex">
			<h3 class="">
					<i class="mr-2 fa fa-tachometer" aria-hidden="true"></i>
				dashboard
			</h3>			
	</div> 
	<div class="d-flex justify-content-between mb-5 mt-5">	
		<!-- add buttons -->                        
	</div>
    <!-- numbers -->
    <div class="d-flex flex-row">
		<!-- clients -->
		<div class="mr-3 d-flex justify-content-start shadow rounded bg-white" style="height:200px; width: 300px">
			<!-- icon -->
			<div class="float-left d-flex flex-column justify-content-center" style="height:100px; width: 100px">
				<div class="text-center">
					<h1 class="text-primary"><i class="mr-2  fa fa-id-card-o" aria-hidden="true"></i></h1>
				</div>
			</div>
			<!-- content -->
			<div class="p-5 text-muted d-flex flex-column justify-content-center">
				<div>
					<h1 style="font-size: 50px" v-if="dashboard_data">
						{{dashboard_data.clients | intcomma}}
					</h1>
				</div>
				<div class="text-right">
					<small>clients</small>
				</div>
			</div>
		</div>
		<!-- campaigns -->
		<div class="mr-3 d-flex justify-content-start shadow rounded bg-white" style="height:200px; width: 300px">
				<!-- icon -->
				<div class="float-left d-flex flex-column justify-content-center" style="height:100px; width: 100px">
					<div class="text-center">
						<h1 class="text-primary"><i class="fa fa-bullhorn" aria-hidden="true"></i></h1>
					</div>
				</div>
				<!-- content -->
				<div class="p-5 text-muted d-flex flex-column justify-content-center">
					<div>
						<h1 style="font-size: 50px" v-if="dashboard_data">
							{{ dashboard_data.campaigns | intcomma}}
						</h1>
					</div>
					<div class="text-right">
						<small>campaigns</small>
					</div>
				</div>
		</div>
		<!-- ads -->
		<div class="mr-3 d-flex justify-content-start shadow rounded bg-white" style="height:200px; width: 300px">
				<!-- icon -->
				<div class="float-left d-flex flex-column justify-content-center" style="height:100px; width: 100px">
					<div class="text-center">
						<h1 class="text-primary"><i class="fa fa-play" aria-hidden="true"></i></h1>
					</div>
				</div>
				<!-- content -->
				<div class="p-5 text-muted d-flex flex-column justify-content-center">
					<div>
						<h1 style="font-size: 50px" v-if="dashboard_data">
							{{ dashboard_data.ads | intcomma}}
						</h1>
					</div>
					<div class="text-right">
						<small>ads</small>
					</div>
				</div>
		</div>
	</div>
	
	<!-- second row -->
	<div class="d-flex mt-5">
		<!-- displays -->
		<div class="mr-3 d-flex justify-content-start shadow rounded bg-white" style="height:200px; width: 300px">
				<!-- icon -->
				<div class="float-left d-flex flex-column justify-content-center" style="height:100px; width: 100px">
					<div class="text-center">
						<h1 class="text-primary"><i class="fa fa-television" aria-hidden="true"></i></h1>
					</div>
				</div>
				<!-- content -->
				<div class="p-5 text-muted d-flex flex-column justify-content-center">
					<div>
						<h1 style="font-size: 50px" v-if="dashboard_data">
							{{ dashboard_data.total_displays | intcomma}}
						</h1>
					</div>
					<div class="text-right">
						<small>displays</small>
					</div>
				</div>
		</div>

		<!-- company slots -->
		<div class="mr-3 d-flex justify-content-start shadow rounded bg-white" style="height:200px; width: 300px">
				<!-- icon -->
				<div class="float-left d-flex flex-column justify-content-center" style="height:100px; width: 100px">
					<div class="text-center">
						<h1 class="text-primary"><i class="mr-2  fa fa-building-o" aria-hidden="true"></i></h1>
					</div>
				</div>
				<!-- content -->
				<div class="p-5 text-muted d-flex flex-column justify-content-center">
					<div>
						<h1 style="font-size: 50px" v-if="dashboard_data">
							{{ dashboard_data.bus_slots | intcomma}}
						</h1>
					</div>
					<div class="text-right">
						<small>company slots</small>
					</div>
				</div>
		</div>

		<!-- displays -->
		<div class="mr-3 d-flex justify-content-start shadow rounded bg-white" style="height:200px; width: 300px">
				<!-- icon -->
				<div class="float-left d-flex flex-column justify-content-center" style="height:100px; width: 100px">
					<div class="text-center">
						<h1 class="text-primary"><i class="fa fa-braille" aria-hidden="true"></i></h1>
					</div>
				</div>
				<!-- content -->
				<div class="p-5 text-muted d-flex flex-column justify-content-center">
					<div>
						<h1 style="font-size: 50px" v-if="dashboard_data">
							{{ dashboard_data.ad_slots | intcomma}}
						</h1>
					</div>
					<div class="text-right">
						<small>ad slots</small>
					</div>
				</div>
		</div>
	</div>

	<!-- spacer -->
	<div class="mt-5 mb-5">
		.
	</div>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
    name: 'home',
    data(){
        return{            
            dashboard_data:null,
        }
    },
    mounted(){       
        this.getDashboardData()
    },
    methods:{		
        //get_products
        getDashboardData: function(){
            this.details = null
            this.$http({
                method:'get',				
                url: this.$API_BASE_URL + `/api/dashboard/`,
                headers:{
                    Authorization: this.$store.getters.access_token
                },                   
            }).then((response)=>{
                this.dashboard_data = response.data                               
            }).catch((err)=>{
                alert(err)
            })
        },                
        }
}
</script>
