<template>
  <div style="margin-left: 371px;" >
<div>
    <img class="logo" src="../assets/logo-images/food-delivery-logo.png"/>
  </div>
 <div>
 <input class="register" v-model="fname" type="text" placeholder="Enter First Name"/>
  <input class="register" v-model="lname" type="text" placeholder="Enter Last Name"/>
   <input  class="register" v-model="email" type="text" placeholder="Enter Email"/>
<input class="register" v-model="password" type="password" placeholder="Enter Password"/>
<button  v-on:click="signUp"  class="register"> Sign Up</button>

 </div>
 
</div>
</template>
<script>
import axios from 'axios'
export default{
    name:'SignUp',
    data(){
      return {
        fname:'',
        lname:'',
        email:'',
        password:''
      }
    },
    methods:{
      async signUp(){

        let result= await axios.post("http://localhost:5555/signup",{
          firstName:this.fname,
          lastName:this.lname,
          email:this.email,
          password:this.password
        
        });
        console.warn(result);
        if(result.status==201){
            alert('sign-up done');
            localStorage.setItem("user-info",JSON.stringify(result.data))
            this.$router.push({name:'FoodItem'})
        }
      }
    },
    mounted(){
      let user=localStorage.getItem();
      if(!user){
        this.$router.push({name:'FoodItem'})
      }
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
