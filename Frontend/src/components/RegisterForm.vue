<template>
      <div class="box-root padding-top--24 flex-flex flex-direction--column" style="flex-grow: 1; z-index: 9;">
        <div class="box-root padding-top--48 padding-bottom--24 flex-flex flex-justifyContent--center">
          <h1 class="slide-in-right">Random Shot</h1>
        </div>
        <div class="formbg-outer slide-in-right">
          <div class="formbg">
            <div class="formbg-inner padding-horizontal--48">
              <span class="padding-bottom--15"><b>Register</b></span>
              <form id="stripe-login">
                <div class="field padding-bottom--24">
                  <label><b>First Name</b></label>
                  <input type="text" name="name" placeholder="First Name" v-model="nom">
                </div>
                <div class="field padding-bottom--24">
                  <label><b>Second Name</b></label>
                  <input type="text" name="prenom" placeholder="Second Name" v-model="prenom">
                </div>
                <div class="field padding-bottom--24">
                  <label><b>Email</b></label>
                  <input type="email" name="email" placeholder="Email" v-model="mail">
                </div>
                <div class="field padding-bottom--24">
                  <div class="grid--50-50">
                    <label><b>Password</b></label>
                  </div>
                  <input type="password" name="password" placeholder="Password" v-model="password" @keyup.enter="register">
                </div>
                <div class="field padding-bottom--24">
                  <input type="button" name="submit" value="Continue" v-on:click="register">
                </div>

              </form>
            </div>
          </div>
          <div class="footer-link padding-top--24">

            <div class="listing padding-top--24 padding-bottom--24 flex-flex center-center">
              <span><a href="#">Random Shot</a></span>
              <span><a href="#">Contact</a></span>
              <span><a href="#">Privacy & terms</a></span>
            </div>
          </div>
        </div>
      </div>
</template>

<script>
import http from "../http-common";

export default {
  name: "RegisterForm",
  data() {
    return {
      nom: "",
      prenom: "",
      mail: "",
      password: "",
    };
  },
  mounted() {
  },
  methods:{
    register(){
      const newUser = {
        nom: this.nom,
        prenom: this.prenom,
        mail: this.mail,
        password: this.password
      }
      http
          .post("/user/register", newUser)
          .then(response => {
            this.$store.state.actualClient = response.data
            this.$router.push('HomePage')
          })
          .catch(e => {
            console.log(e)
          })
    }
  },
}
</script>

<style scoped>
* {
  color: #1a1f36;
  box-sizing: border-box;
  word-wrap: break-word;
  font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Ubuntu,sans-serif;
}
template
{
  overflow: hidden;
}

body {
  overflow: hidden;
  background-color: #ffffff;
}
h1 {
  letter-spacing: -1px;
}
a {
  color: #5469d4;
  text-decoration: unset;
}
.flex-flex {
  display: flex;
}
.center-center {
  align-items: center;
  justify-content: center;
}
.box-root {
  box-sizing: border-box;
}
.flex-direction--column {
  -ms-flex-direction: column;
  flex-direction: column;
}
.padding-top--24 {
  padding-top: 24px;
}
.padding-top--48 {
  padding-top: 48px;
}
.padding-bottom--24 {
  padding-bottom: 24px;
}
.padding-horizontal--48 {
  padding: 48px;
}
.padding-bottom--15 {
  padding-bottom: 15px;
}
.flex-justifyContent--center {
  -ms-flex-pack: center;
  justify-content: center;
}
.formbg {
  margin: 0px auto;
  width: 100%;
  max-width: 300px;
  background: white;
  border-radius: 4px;
  box-shadow: rgba(60, 66, 87, 0.12) 0px 7px 14px 0px, rgba(0, 0, 0, 0.12) 0px 3px 6px 0px;
}
span {
  display: block;
  font-size: 20px;
  line-height: 28px;
  color: #1a1f36;
}
label {
  margin-bottom: 10px;
}
.field input {
  font-size: 16px;
  line-height: 28px;
  padding: 8px 16px;
  width: 100%;
  min-height: 44px;
  border: unset;
  border-radius: 4px;
  outline-color: rgb(84 105 212 / 0.5);
  background-color: rgb(255, 255, 255);
  box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px,
  rgba(0, 0, 0, 0) 0px 0px 0px 0px,
  rgba(0, 0, 0, 0) 0px 0px 0px 0px,
  rgba(60, 66, 87, 0.16) 0px 0px 0px 1px,
  rgba(0, 0, 0, 0) 0px 0px 0px 0px,
  rgba(0, 0, 0, 0) 0px 0px 0px 0px,
  rgba(0, 0, 0, 0) 0px 0px 0px 0px;
}
input[name="submit"] {
  background-color: rgb(84, 105, 212);
  box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px,
  rgba(0, 0, 0, 0) 0px 0px 0px 0px,
  rgba(0, 0, 0, 0.12) 0px 1px 1px 0px,
  rgb(84, 105, 212) 0px 0px 0px 1px,
  rgba(0, 0, 0, 0) 0px 0px 0px 0px,
  rgba(0, 0, 0, 0) 0px 0px 0px 0px,
  rgba(60, 66, 87, 0.08) 0px 2px 5px 0px;
  color: #fff;
  font-weight: 600;
  cursor: pointer;
  text-align: center;
}
.field-checkbox input {
  width: 20px;
  height: 15px;
  margin-right: 5px;
  box-shadow: unset;
  min-height: unset;
}
.field-checkbox label {
  display: flex;
  align-items: center;
  margin: 0;
}
.footer-link span {
  font-size: 14px;
  text-align: center;
}
.listing a {
  color: #697386;
  font-weight: 600;
  margin: 0 10px;
}
@keyframes animationLeftRight {
  0% {
    transform: translateX(0px);
  }
  50% {
    transform: translateX(1000px);
  }
  100% {
    transform: translateX(0px);
  }
}
@keyframes animationRightLeft {
  0% {
    transform: translateX(0px);
  }
  50% {
    transform: translateX(-1000px);
  }
  100% {
    transform: translateX(0px);
  }
}
.slide-in-right {
  animation: slide-in-right 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
  animation-delay: 0.3s;
}
@keyframes slide-in-right {
  0% {
    transform: translateX(1000px);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
}
</style>