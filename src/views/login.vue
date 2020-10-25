<template>
        <div class="d-flex flex-column justify-content-center" style="height:100vh">
            <div class="d-flex justify-content-center">		
                <div class="bg-white w-40 shadow p-4 rounded" style="width: 400px">     
                    <h2 class="mb-5 text-muted">Login</h2>           			
                    <ul v-if="login_error.length" class="text-center list-unstyled">
                        <li v-for="error in login_error" :key="error">
                            <small class="text-danger">{{ error }}</small>
                        </li>
                    </ul>
        
                    <ul v-if="login_info.length" class="text-center list-unstyled">
                        <li v-for="error in login_info" :key="error" class="text-info">
                            <small>{{ error }}</small>
                        </li>
                    </ul>
        
                    <div class="form-group">
                        <label for="phone">username</label>
                        <input type="text" class="form-control"
                                id="phone" placeholder="username" 
                                v-model="username"
                                @keyup.enter="getToken()">                    					                   
                    </div>
                    <div class="form-group">
                        <label for="password">password</label>
                        <input type="password" class="form-control"
                                id="password" placeholder="password"
                                v-model="password"
                                @keyup.enter="getToken()">				
                        <br>                    				                 
                    </div>				
                    <!-- /.submit button -->
                    <div class="" @keyup.enter="getToken()">
                        <button class="btn btn-primary btn-block btn-flat"
                            @click="getToken()">
                            login
                        </button>
                    </div>                  
                </div>
            </div>
        </div>   
    </template>
    <script>
    export default {
        name: 'login',
        data() {
        return {     
            //form data   				
            username: null,
            password: null,
            //view state
            login_error: [],
            login_info: [],
            //logged in user
            logged_in_user:null,
            logged_in_user_location_id:null
        }
        },	
        methods: {	
        //get access token
        getToken: function () { 
            //clear errors and info   		
            this.login_info = []
            this.login_error = []
            //get token from network
            this.login_info.push("authenticating...")		
            this.$http({
                method: 'post',
                url: this.$API_BASE_URL + '/api/token/obtain/',
                data: {
                    username: this.username,
                    password: this.password
                }
                }).then((response) => {
                    var response_data = response.data
                    this.$store.commit('login',this.username)
                    this.$store.commit('authenticate',response_data)
                    //clear errors and info
                    this.login_info = []
                    this.login_error = []   
                    this.$router.push("/")	                   
    
                }).catch((err) => {
                    //clear errors and info
                    this.login_info = []
                    this.login_error = []                
                    //if error has no response,
                    if(! err.response){
                        this.login_error.push(err)
                    }
                    //error has a response
                    else{					
                        this.login_error.push("Invalid credentials")
                    }  
                })
        },
        //inform App.vue of a new login
        emitToParent () {     		                        
            this.$emit('newLogin', this.logged_in_user)
        },
        }
    }
    </script>