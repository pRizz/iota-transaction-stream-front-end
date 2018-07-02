<template>
  <div>
    <br/>
    <b-switch size="is-large" v-model="isStreaming" @input="playingChanged" :disabled="!delegate">{{ buttonActionText }}</b-switch>
    <br/>
    <br/>
    <p class="title">
      {{ tps }} TPS
    </p>
    <p>
      {{ connectedToText }}
    </p>
  </div>
</template>

<script>
  export default {
    name: 'StreamControls',
    props: ['delegate'],
    data() {
      return {
        isStreaming: true,
        tps: 0
      }
    },
    methods: {
      playingChanged(isStreaming) {
        if(isStreaming) {
          this.delegate.start()
        } else {
          this.delegate.stop()
        }
      }
    },
    computed: {
      buttonActionText() {
        return this.isStreaming ? 'Stream Enabled' : 'Stream Disabled'
      },
      connectedToText() {
        const webSocketProtocol = (process.env.IS_IOTA_TRANSACTION_STREAM_SECURED === true || process.env.IS_IOTA_TRANSACTION_STREAM_SECURED === 'true') ? 'wss' : 'ws'
        return `${this.isStreaming ? 'Connected' : 'Not connected'} to ${webSocketProtocol}://${process.env.IOTA_TRANSACTION_STREAM_IP}:${process.env.IOTA_TRANSACTION_STREAM_PORT}`
      }
    },
    mounted() {
      setInterval(() => {
        this.tps = this.delegate.getTransactionsPerSecond().toLocaleString(undefined, {
          maximumFractionDigits: 1,
          minimumFractionDigits: 1
        })
      }, 600)
    }
  }
</script>

<style scoped>

</style>
