<template>
  <div>
    <div class="panel-block txrow">
      <div class="columns">
        <div class="column is-one-quarter content">
          Hash
        </div>
        <div class="column is-three-quarters field control txvalue">
          <a :href="`${baseTangleExplorerURL}search/tx/${tx.hash}`" target="_blank">
            {{tx.hash}}
          </a>
        </div>
      </div>
    </div>

    <div class="panel-block txrow">
      <div class="columns">
        <div class="column is-one-quarter content">
          Address
        </div>
        <div class="column is-three-quarters field control txvalue">
          <a :href="`${baseTangleExplorerURL}search/address/${tx.address}`" target="_blank">
            {{tx.address}}
          </a>
        </div>
      </div>
    </div>

    <div class="panel-block txrow">
      <div class="columns">
        <div class="column is-one-quarter content">
          Tag
        </div>
        <div class="column is-three-quarters field control txvalue">
          <a :href="`${baseTangleExplorerURL}search/tag/${tx.tag}`" target="_blank">
            {{tx.tag}}
          </a>
        </div>
      </div>
    </div>

    <div class="panel-block txrow">
      <div class="columns">
        <div class="column is-one-quarter content">
          Value
        </div>
        <div class="column is-three-quarters field control txvalue">
          {{ valueFormatted }}
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import TryteCodec from 'tryte-utf8-json-codec'
  import IOTALib from 'iota.lib.js'
  import ValueHelper from './mixins/ValuesHelper'

  export default {
    name: 'transaction-detail',
    mixins: [ValueHelper],
    props: ['tx'],
    data() {
      return {
        iota: new IOTALib({}),
        baseTangleExplorerURL: 'https://open-iota.prizziota.com/#/'
      }
    },
    computed: {
      valueFormatted() {
        if(this.tx.value === 0) { return '0' }
        return `${this.toUnits(this.tx.value, false, this.iota)} (${this.tx.value.toLocaleString()} IOTA)`
      },
      decodedAsciiFromMessage() {
        let message = this.tx.signatureMessageFragment
        if (message.length <= 0) {
          return ''
        }
        if (message.length % 2 === 1) {
          message = message.slice(0, -1)
        }
        return this.iota.utils.fromTrytes(message)
      },
      decodedUTF8FromMessage() {
        return this.decodedUTF8FromString(this.tx.signatureMessageFragment)
      }
    },
    methods: {
      decodedUTF8FromString (string) {
        if(!string) { return }
        if (string.length <= 0) {
          return ''
        }
        try {
          return TryteCodec.utf8StringFromTrytes(string)
        } catch (e) {
          return ''
        }
      }
    }
  }
</script>

<style scoped>
  .txvalue {
    word-break: break-all;
    overflow-wrap: break-word;
  }

  .txrow {
    display: block;
  }

  .column {
    margin-bottom: 0 !important;
  }
</style>
