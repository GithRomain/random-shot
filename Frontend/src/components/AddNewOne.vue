<template>
  <div class="box-root padding-top--24 flex-flex flex-direction--column" style="flex-grow: 1; z-index: 9;">
    <div class="box-root padding-top--48 padding-bottom--24 flex-flex flex-justifyContent--center">
      <h1 class="slide-in-right">Form Parameters</h1>
    </div>
    <div class="formbg-outer slide-in-right">

      <div class="formbg">
        <div class="formbg-inner padding-horizontal--48">

          <span class="padding-bottom--15"><b>Create wew set</b></span>
          <form id="stripe-login" class="testwola">
            <div class="field padding-bottom--24">
              <label><b>Name of the set</b></label>
              <input type="text" name="name" placeholder="name" v-model="name">
            </div>
          </form>


          <span class="padding-bottom--15"><b>Parameters :</b></span>
          <form id="stripe-login" class="testwola test-align">
            <div v-if="parameters.length===0" style="font-size: 75px; margin-left: 30%">🫙</div>

            <div v-for="(param, index) in parameters" v-bind:key="index">
              <div style="display: flex; flex-direction: row; justify-content: center; align-items: center; gap: 5px; position: relative; margin-left: -35px">
                <div v-if="param.arrow==='right'" style="font-size: 30px">➡️</div>
                <div v-if="param.arrow==='up'" style="font-size: 30px">⬆️️</div>
                <div v-if="param.arrow==='down'" style="font-size: 30px">⬇️️</div>
                <div v-if="param.arrow==='left'" style="font-size: 30px">⬅️</div>

                <h4 style="font-size: 20px">{{param.variable}}</h4>

                <input type="range" id="volume" name="volume" min="0" max="100" v-model="parameters[index].scale" style="width: 75px">
                <div>{{parameters[index].scale}}</div>

                <i class='bx bxs-trash trash' v-on:click="delVar(index)"></i>
              </div>
            </div>
          </form>

          <span class="padding-bottom--15"><b>Adding parameters</b></span>
          <form id="stripe-login" class="testwola">
            <div class="field padding-bottom--24">
              <label><b>Variable</b></label>
              <input type="text" name="variable" placeholder="variable" v-model="variable">
            </div>
            <div class="rating-container">
              <div class="rating">
                <form class="rating-form">
                  <label for="super-happy">
                    <input type="radio" name="rating" class="super-happy" id="super-happy" value="left" v-model="arrow"/>
                    <svg width="100%" height="100%" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m10.978 14.999v3.251c0 .412-.335.75-.752.75-.188 0-.375-.071-.518-.206-1.775-1.685-4.945-4.692-6.396-6.069-.2-.189-.312-.452-.312-.725 0-.274.112-.536.312-.725 1.451-1.377 4.621-4.385 6.396-6.068.143-.136.33-.207.518-.207.417 0 .752.337.752.75v3.251h9.02c.531 0 1.002.47 1.002 1v3.998c0 .53-.471 1-1.002 1z" fill-rule="nonzero"/></svg>                </label>

                  <label for="happy">
                    <input type="radio" name="rating" class="happy" id="happy" value="up" v-model="arrow"/>
                    <svg width="100%" height="100%" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m9.001 10.978h-3.251c-.412 0-.75-.335-.75-.752 0-.188.071-.375.206-.518 1.685-1.775 4.692-4.945 6.069-6.396.189-.2.452-.312.725-.312.274 0 .536.112.725.312 1.377 1.451 4.385 4.621 6.068 6.396.136.143.207.33.207.518 0 .417-.337.752-.75.752h-3.251v9.02c0 .531-.47 1.002-1 1.002h-3.998c-.53 0-1-.471-1-1.002z" fill-rule="nonzero"/></svg>
                  </label>

                  <label for="neutral">
                    <input type="radio" name="rating" class="neutral" id="neutral" value="down" v-model="arrow"/>
                    <svg width="100%" height="100%" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m9.001 13.022h-3.251c-.412 0-.75.335-.75.752 0 .188.071.375.206.518 1.685 1.775 4.692 4.945 6.069 6.396.189.2.452.312.725.312.274 0 .536-.112.725-.312 1.377-1.451 4.385-4.621 6.068-6.396.136-.143.207-.33.207-.518 0-.417-.337-.752-.75-.752h-3.251v-9.02c0-.531-.47-1.002-1-1.002h-3.998c-.53 0-1 .471-1 1.002z" fill-rule="nonzero"/></svg>
                  </label>

                  <label for="sad">
                    <input type="radio" name="rating" class="sad" id="sad" value="right" v-model="arrow"/>
                    <svg width="100%" height="100%" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m13.022 14.999v3.251c0 .412.335.75.752.75.188 0 .375-.071.518-.206 1.775-1.685 4.945-4.692 6.396-6.069.2-.189.312-.452.312-.725 0-.274-.112-.536-.312-.725-1.451-1.377-4.621-4.385-6.396-6.068-.143-.136-.33-.207-.518-.207-.417 0-.752.337-.752.75v3.251h-9.02c-.531 0-1.002.47-1.002 1v3.998c0 .53.471 1 1.002 1z" fill-rule="nonzero"/></svg>                </label>
                </form>
              </div>
            </div>
            <br>
            <div class="field padding-bottom--24">
              <input type="button" name="submit" value="Add" v-on:click="addToList">
            </div>

            <div class="field padding-bottom--24">
              <input type="button" name="submit" value="Continue" v-on:click="sendData">
            </div>

          </form>

        </div>
      </div>
    </div>
  </div>

</template>

<script>
import http from "../http-common";

export default {
  name: "AddNewOne",
  data(){
    return {
      variable: "",
      arrow: "",
      parameters: [],
      name: ""
    }
  },
  computed: {},
  methods: {
    redirection() {
      if (this.$store.state.actualClient === null) {
        this.$router.push("/");
      }
    },
    addToList() {
      if (this.arrow === "" || this.variable === "") {
        alert("Missing parameters like arrow or name for the variable")
      }
      else if (this.variable.length > 10){
        alert("Lenght of the variable is too long")
      }
      else {
        this.parameters.push({
          variable: this.variable,
          arrow: this.arrow,
          scale: 0
        })
        this.variable = "";
        this.arrow = "";
      }
    },
    sendData() {
      let total = 0
      this.parameters.forEach(v => total += parseInt(v.scale, 10))

      if (this.name === "" || this.parameters.length === 0) {
        alert("Missing name of the set or there is any variable set")
      } else {
        if (total === 0 || total === 100) {
          if (total === 0) {
            alert("The draw will be equiprobable")
          }
          if (this.$store.state.indexHistory === null){
          this.$store.state.actualClient.history.push({
            name: this.name,
            cycles: [],
            parameters: this.parameters
          })
          }
          else {
            this.$store.state.actualClient.history[this.$store.state.indexHistory] ={
              name: this.name,
              cycles: this.$store.state.actualClient.history[this.$store.state.indexHistory].cycles,
              parameters: this.parameters
            }
          }
          http
              .put("/user/addHistory", this.$store.state.actualClient)
              .then(response => {
                this.$store.state.actualClient = response.data
                if (this.$store.state.indexHistory === null){
                  this.$store.state.indexHistory = this.$store.state.actualClient.history.length - 1
                }
                this.$router.push('/SetFrequency')
                this.parameters = [];
                this.name = "";
              })
              .catch(e => {
                if (e.response.status === 500) {
                  alert("One or many values are already used")
                }
              })
        } else if (total > 100) {
          alert("Be careful, you have exceeded the percentage bar, edit scales down <--")
        } else {
          alert("Be careful you are below the percentage bar, edit scales up -->")
        }
      }
    },
    delVar(index){
      this.parameters.splice(index, 1)
    },
    updateData(){
      if (this.$store.state.indexHistory !== null){
        this.parameters = this.$store.state.actualClient.history[this.$store.state.indexHistory].parameters;
        this.name = this.$store.state.actualClient.history[this.$store.state.indexHistory].name;
      }
    }
  },
  mounted: function () {
    this.$nextTick(this.redirection())
    this.$nextTick(this.updateData)
  }
}
</script>

<style scoped>
/* Google Font Link */
@import url("https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css");

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

a:link,
a:visited,
a:hover,
a:active {
  color: rgba(0, 0, 16, 0.8);
  text-decoration: none;
}
a:hover,
a:active {
  border-bottom: 0.1em solid rgba(0, 0, 16, 0.8);
  color: rgba(0, 0, 16, 0.8);
  text-decoration: none;
}
span {
  color: rgba(0, 0, 16, 0.4);
}
header {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  margin: auto;
  width: 34.6rem;
}
header h1 {
  font-size: 2.8em;
}
.rating-container {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: center;
  align-items: center;
  width: 140%;
}
.rating-text p {
  color: rgba(0, 0, 16, 0.8);
  font-size: 1.3rem;
  padding: 0.3rem;
}

.rating {
  background-color: rgba(0, 0, 16, 0.8);
  padding-top: 5px;
  border-radius: 2.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

svg {
  fill: rgb(242, 242, 242);
  height: 3.6rem;
  width: 3.6rem;
  margin: 0.2rem;
}

.rating-form-2 svg {
  height: 3rem;
  width: 3rem;
  margin: 0.5rem;
}

#radios label {
  position: relative;
}

input[type="radio"] {
  position: absolute;
  opacity: 0;
}

input[type="radio"] + svg {
  -webkit-transition: all 0.2s;
  transition: all 0.2s;
}

input + svg {
  cursor: pointer;
}

input[class="super-happy"]:hover + svg,
input[class="super-happy"]:checked + svg,
input[class="super-happy"]:focus + svg {
  fill: rgb(0, 109, 217);
}

input[class="happy"]:hover + svg,
input[class="happy"]:checked + svg,
input[class="happy"]:focus + svg {
  fill: rgb(0, 204, 79);
}

input[class="neutral"]:hover + svg,
input[class="neutral"]:checked + svg,
input[class="neutral"]:focus + svg {
  fill: rgb(232, 214, 0);
}

input[class="sad"]:hover + svg,
input[class="sad"]:checked + svg,
input[class="sad"]:focus + svg {
  fill: rgb(229, 132, 0);
}

input[class="super-sad"]:hover + svg,
input[class="super-sad"]:checked + svg,
input[class="super-sad"]:focus + svg {
  fill: rgb(239, 42, 16);
}

footer {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: end;
  -ms-flex-pack: end;
  justify-content: flex-end;
  text-align: right;
  width: 34.6rem;
  margin: auto;
}

.testwola{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

}

.test-align{
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
}

.trash{
  font-size: 25px;
  color: darkred;
}

.trash:active{
  font-size: 30px;
  color: red;
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