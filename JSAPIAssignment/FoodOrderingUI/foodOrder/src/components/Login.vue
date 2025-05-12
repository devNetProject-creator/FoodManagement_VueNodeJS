<template>
 
    <div class ="form" style="margin-left: 371px;" >
        <div v-if="finalMessage!=''" class="alert alert-danger" role="alert">
  {{ finalMessage }}
</div>
<div class="row">
    <img class="logo" src="../assets/logo-images/food-delivery-logo.png"/>
  </div>
 <div class="row">
    
   <input  class=" col-md-12 register" v-model="email" type="text" placeholder="Enter Email"/>
</div>
<div class="row"><input class="col-md-12 register" v-model="password" type="password" placeholder="Enter Password"/></div>



<div class="row">
  
<button  class="col-md-6 btn btn-primary"   v-on:click="login" > Login</button> 


<router-link class="col-md-6 nav-link" to="/sign-up">Sign Up</router-link>
</div>




   


 
</div>

</template>
<script>
var finalMessage="";
import axios from 'axios'
export default{
    name:'login',
    data(){
      return {
       
        email:'',
        password:'',
        finalMessage:""
      }
    },
    methods:{
      async login(){

        let result= await axios.post("http://localhost:5555/login",{          
          email:this.email,
          password:this.password
        
        });
       // console.warn(result);
        if(result.status==200 ){
           console.log('logged in done');
            localStorage.setItem("user-info-token",JSON.stringify(result.data.token));
            localStorage.setItem("user-info",JSON.stringify(result.data.user))
            this.finalMessage="Logged in Successfully"
            this.$router.push({name:'FoodItem'})
           
        }
        else{
           // console.warn(result);
            this.finalMessage=result.response.statusText
            ;
            console.warn(result.response.statusText);
        }
      }
    },
    mounted(){
      //let user=localStorage.getItem();
    //  if(!user){
       // this.$router.push('/')
     // }
    }
}
</script>
<style >
.logo{
    width:250px;
    height: 206px;
    
    
}

input.register {

 width:300px;
 height:40px;padding-left: 20px;
 display:block;
 margin-bottom:30px;
 margin-right:auto;
 margin-left:auto;
 border:1px solid skyblue;
}

button.register {
  width:320px;
  height:40px;
  border:1px solid skyblue;
  background:skyblue;
  color:white;
  cursor:pointer;
  margin-left: 3px;
}
</style>
