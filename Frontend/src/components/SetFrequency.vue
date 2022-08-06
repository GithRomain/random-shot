<template>
  <div class="box-root padding-top--24 flex-flex flex-direction--column" style="flex-grow: 1; z-index: 9;">
    <div class="box-root padding-top--48 padding-bottom--24 flex-flex flex-justifyContent--center">
      <h1 class="slide-in-right">Form Frequency</h1>
    </div>
    <div class="formbg-outer slide-in-right">

      <div class="formbg">
        <div class="formbg-inner padding-horizontal--48">

          <span class="padding-bottom--15"><b>Cycles :</b></span>
          <form id="stripe-login" class="testwola test-align">
            <div v-if="cycles.length===0" style="font-size: 75px; margin-left: 30%">️⌚</div>

            <div v-for="(cycle, index) in cycles" v-bind:key="index">
              <div style="display: flex; flex-direction: row; justify-content: center; align-items: center; gap: 5px; position: relative">
                <div style="font-size: 30px">⏱️️</div>
                <h4 style="font-size: 20px; margin-top: 7px">{{cycle.time}}</h4>
                <p style="color: white">aze</p>
                <div style="font-size: 30px">🔥️️</div>
                <h4 style="font-size: 20px; margin-top: 7px">{{cycle.frequency}}</h4>
                <p style="color: white">a</p>
                <i class='bx bxs-trash trash' v-on:click="delVar(index)"></i>

                <div>
                  <i class='bx bx-up-arrow uparrow' v-on:click="down(index)"></i>
                  <i class='bx bx-down-arrow downarrow' v-on:click="up(index)"></i>
                </div>
              </div>
            </div>
          </form>

          <span class="padding-bottom--15"><b>Adding cycle</b></span>
          <form id="stripe-login" class="testwola">
            <div class="field padding-bottom--24">
              <label><b>Time cycle</b></label>
              <div style="display: flex; flex-direction: row; justify-content: center; align-items: center; gap: 5px">
              <input min="0" type="number" name="time" placeholder="min" v-model="timeMin">
                <p style="font-size: 25px; position:relative; margin-top: 10px">:</p>
              <input min="0" type="number" name="time" placeholder="sec" v-model="timeSec">
              </div>
            </div>
            <div class="field padding-bottom--24">
            <label><b>Frequency</b></label>
            <input min="0" type="number" name="frequency" placeholder="frequency" v-model="frequency">
            </div>
            <div class="field padding-bottom--24">
              <input type="button" name="submit" value="Add" v-on:click="addCycle">
            </div>

            <div class="field padding-bottom--24">
              <input type="button" name="submit" value="Continue" v-on:click="sendCycle">
            </div>

          </form>

        </div>
      </div>
    </div>
  </div>

</template>

<script>
import http from "@/http-common";

export default {
  name: "SetFrequency",
  data(){
    return {
      time: 0,
      timeMin: null,
      timeSec: null,
      frequency: 0,
      cycles: [],
    }
  },
  computed: {},
  methods: {
    redirection() {
      if (this.$store.state.actualClient === null) {
        this.$router.push("/");
      }
    },
    addCycle(){
      this.time += this.timeMin * 60 + this.timeSec;
      const cycle = {
        time: this.time,
        frequency: this.frequency,
      }
      if (this.time === 0 || this.frequency === 0){
        alert("Missing time value or frequency value of the cycle");
      }
      else if (this.timeSec < 0 || this.timeMin < 0 || this.frequency < 0){
        alert("Time and frequency of a cycle can't be negative")
      }
      else if (this.time < this.frequency){
        alert("you can't have a time < frequency")
      }
      else {
        this.cycles.push(cycle);
        this.time = 0;
        this.frequency = 0
      }
    },
    delVar(index){
      this.cycles.splice(index, 1)
    },
    up(index) {
      if (index !== this.cycles.length - 1) {
        this.cycles.splice(index, 0, this.cycles.splice(index + 1, 1)[0])
      }
    },
    down(index){
      if (index !== 0){
      this.cycles.splice(index, 0, this.cycles.splice(index-1, 1)[0])
      }
    },
    sendCycle() {
      if (this.cycles.length === 0) {
        alert("There is no cycle set, add one")
      } else {
          this.$store.state.actualClient.history[this.$store.state.indexHistory].cycles = this.cycles;
          http
              .put("/user/addHistory", this.$store.state.actualClient)
              .then(response => {
                this.$store.state.actualClient = response.data
                this.$router.push('/TiragePage')
                this.cycles = [];
              })
              .catch(e => {
                if (e.response.status === 500) {
                  alert("One or many values are already used")
                }
              })
      }
    },
    updateData(){
      if (this.$store.state.indexHistory !== null){
        this.cycles = this.$store.state.actualClient.history[this.$store.state.indexHistory].cycles;
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

.uparrow:active{
  font-size: 20px;
  color: darkblue;
}

.downarrow:active{
  font-size: 20px;
  color: darkblue;
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