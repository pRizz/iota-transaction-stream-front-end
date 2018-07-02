/*!
* IOTA Transaction Stream Front End
* Copyright(c) 2018 Peter Ryszkiewicz
* MIT Licensed
*/

<template>
  <div id="app">

    <div class="container">
      <nav class="navbar">
        <div class="navbar-brand">
          <router-link :to="{ name: 'Home' }" class="navbar-item">
            <h1 class="heading title"></h1>
            <h1 class="heading title is-4">IOTA Transaction Stream Front End</h1>
          </router-link>
          <div class="navbar-burger" v-bind:class="{ 'is-active': navVisible }" @click="navVisible = !navVisible">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <div class="navbar-menu" v-bind:class="{ 'is-active': navVisible }">
          <div class="navbar-start">

          </div>
          <div class="navbar-end">
            <a href="https://github.com/pRizz/iota-transaction-stream-front-end" class="navbar-item" target="_blank">
              <span class="icon">
                <i class="fa fa-github"></i>
              </span>
              <span>&nbsp;Github</span>
            </a>
          </div>
        </div>
      </nav>
    </div>

    <router-view/>

    <footer class="footer">
      <div class="container">

        <div class="content has-text-centered">
          <div class="columns">
            <div class="column">
              <h1 class="heading title is-4">IOTA Transaction Stream Front End</h1>
              <h1 class="subtitle is-6">A visualizer for an <a target="_blank" href="https://www.npmjs.com/package/iota-transaction-stream"></a> IOTA Transaction Stream. Displays new transactions as they are emitted by an IOTA node.</h1>
            </div>
            <div class="column">
              <p>View source code at
                <a href="https://github.com/pRizz/iota-transaction-stream-front-end" class="button is-small" target="_blank">
                  <span class="icon">
                    <i class="fa fa-github"></i>
                  </span>
                  <span>&nbsp;Github</span>
                </a>
              </p>
              <a href="https://www.prizzventuresllc.com/PrivacyPolicy.txt" target="_blank">Privacy Policy</a>
            </div>
            <div class="column">
              <p>Copyright © 2018 Peter Ryszkiewicz</p>
              <p>MIT Licensed</p>
              <p>Check out my other crypto projects at <a href="https://www.prizzventuresllc.com" target="_blank">https://www.prizzventuresllc.com</a></p>
            </div>
          </div>
        </div>

        <div class="has-text-centered">
          <p>If you like these apps and want to support me making more, please consider tipping me at these addresses:</p>
          <div>
            IOTA: <code style="color: blue; overflow-wrap: break-word; ">WJKGMXJUQAKBBIVOFLEHUKOJLJFJVKOLFADHUIZAKBNHSWDAJAEIRQIWSFPKCLQG9TKXOSPBASN9MQGNWZJZYGYBAD</code>
          </div>
          <div>
            NANO:
            <code style="color: blue; overflow-wrap: break-word;">xrb_1gtwryf4qkk51shi8tbyr988kqkc9cnadtm1xym3ito5sy948e4q4y8mfifd</code>
          </div>
          <div>
            Thanks for your support!
          </div>
        </div>

      </div>
    </footer>

  </div>
</template>

<script>
  export default {
    name: 'App',
    data() {
      return {
        navVisible: false
      }
    },
    mounted() {}
  }
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 20px;
}
</style>
