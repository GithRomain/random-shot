<template>
  <div class="box-root padding-top--24 flex-flex flex-direction--column" style="flex-grow: 1; z-index: 9;">
    <div class="box-root padding-top--48 padding-bottom--24 flex-flex flex-justifyContent--center">
      <h1 class="slide-in-right">Exercice Time</h1>
    </div>
    <div class="formbg-outer slide-in-right">

      <div class="formbg">
        <div class="formbg-inner padding-horizontal--48">

          <span class="padding-bottom--15"><b>Timer :</b></span>
          <div style="font-size: 50px; text-align: center; margin-bottom: 5px">
            {{minutes}} : {{secondes}}
          </div>
          <div class="div-button">
            <div class="field padding-bottom--24 bouton" style="display: flex; flex-direction: row; gap: 5px">
              <input type="button" name="submit" value="Start" v-on:click="startChrono">
              <input type="button" name="submit" value="Pause" v-on:click="pauseChrono" style="background-color: gray">
              <input type="button" name="submit" value="Stop" v-on:click="stopChrono" style="background-color: darkred">
            </div>
          </div>

          <span class="padding-bottom--15"><b>Follow instructions :</b></span>
          <div style="font-size: 40px; text-align: center; margin-bottom: 5px">
            {{variable}}
          </div>
          <div style="font-size: 50px; text-align: center; margin-bottom: 5px">
            <div v-if="arrow ==='right'" style="font-size: 75px">➡️</div>
            <div v-if="arrow ==='up'" style="font-size: 75px">⬆️️</div>
            <div v-if="arrow ==='down'" style="font-size: 75px">⬇️️</div>
            <div v-if="arrow ==='left'" style="font-size: 75px">⬅️</div>
            <div v-if="arrow === null" style="font-size: 75px">⌛</div>
          </div>

          <div class="div-button">
            <div class="field padding-bottom--24 bouton">
              <input type="button" name="submit" value="Finish" v-on:click="goToCongrats">
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: "TiragePage",
  data(){
    return{
      minutes: 0,
      secondes: 0,
      pause: false,
      stop: false,
      arrow: null,
      variable: "Instruction in comming",
      indexTimer: 0,
      indexFrequency: 0
    };
  },
  computed: {},
  methods:{
    redirection() {
      if (this.$store.state.actualClient === null) {
        this.$router.push("/");
      }
    },
    addTime(){
      if (this.secondes === 60){
        this.secondes = 0;
        this.minutes += 1;
      }
      else {
        this.secondes += 1;
      }
    },
    delay(){
      return new Promise((resolve) => setTimeout(function(){
        resolve();
      }, 1000))
    },
    startChrono(){
      this.tirageAleatoire()
      this.pause = false;
      this.stop = false;
      (async () => {
        while (!this.pause){
          this.addTime();
          await this.delay();
          this.tirageSurCycle();
        }
      })();
    },
    pauseChrono(){
      this.pause = true;
    },
    stopChrono(){
      this.minutes = 0;
      this.secondes = 0;
      this.pause = true;
      this.variable = "Instruction in comming";
      this.arrow = null;
      this.indexTimer = 0;
    },
    sommeCycleAvant(){
      const history = this.$store.state.actualClient.history[this.$store.state.indexHistory]
      const cycles = history.cycles;
      let total = 0
      for (let i = 0; i < this.indexTimer; i++){
        total += cycles[i].time
      }
      return total;
    },
    tirageAleatoire(){
      const history = this.$store.state.actualClient.history[this.$store.state.indexHistory]
      const parameters = history.parameters;

      let totalScales = 0;
      parameters.forEach(v => totalScales += v.scale)

      if (totalScales === 0){
        const randomIndex = Math.floor(Math.random() * parameters.length);
        const item = parameters[randomIndex];

        this.variable = item.variable;
        this.arrow = item.arrow

        this.play()
      }
      else {
        //write after
      }
    },
    play() {
      var audio = new Audio('https://media.geeksforgeeks.org/wp-content/uploads/20190531135120/beep.mp3');
      audio.play();
},
    tirageSurCycle(){
      const history = this.$store.state.actualClient.history[this.$store.state.indexHistory]
      const cycles = history.cycles;
      const time = this.minutes * 60 + this.secondes - this.sommeCycleAvant();

      this.indexFrequency += 1;
      this.tirageSurFrequency()

      if(time === cycles[this.indexTimer].time){
        this.indexTimer += 1;
        if (this.indexTimer === cycles.length){
          this.stopChrono();
        }
      }
    },
    tirageSurFrequency(){
      const history = this.$store.state.actualClient.history[this.$store.state.indexHistory]
      const cycles = history.cycles;

      if(this.indexFrequency === cycles[this.indexTimer].frequency){
        this.tirageAleatoire();
        this.indexFrequency = 0;
      }
    },
    goToCongrats(){
      this.$router.push("/Homepage");
    }
  },
  mounted: function (){
    this.$nextTick(this.redirection())
  },
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