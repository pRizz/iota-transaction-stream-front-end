<template>
  <div class="container">
    <stream-controls :delegate="transactionStreamSubscriber"></stream-controls>
    <transaction-list :transactions="transactions" :is-collapsed="true">
    </transaction-list>
  </div>
</template>

<script>
  import TransactionStreamSubscriber from '../lib/TransactionStreamSubscriber'
  import TransactionList from './TransactionList'
  import StreamControls from './StreamControls'

  export default {
    name: 'Home',
    components: {StreamControls, TransactionList},
    props: ['clientCountCallback'],
    data() {
      return {
        transactions: [],
        transactionStreamSubscriber: null
      }
    },
    mounted() {
      this.transactionStreamSubscriber = TransactionStreamSubscriber({
        iotaTransactionStreamIP: process.env.IOTA_TRANSACTION_STREAM_IP,
        iotaTransactionStreamPort: process.env.IOTA_TRANSACTION_STREAM_PORT,
        isIotaTransactionStreamSecured: process.env.IS_IOTA_TRANSACTION_STREAM_SECURED
      })

      this.transactionStreamSubscriber.setTransactionCallback(tx => {
        this.transactions.unshift(tx)
        console.log(`got tx, `, tx)
      })

      this.transactionStreamSubscriber.eventEmitter.on('clientCount', (clientCount) => {
        this.clientCountCallback({ clientCount })
      })
    }
  }
</script>

<style scoped>

</style>
