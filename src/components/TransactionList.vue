<template>
  <div>

    <br/>
    <h2 class="title" v-if="transactions.length === 0">
      Waiting for transactions... <i class="fa fa-spinner fa-spin"></i>
    </h2>

    <b-pagination
      :total.sync="transactions.length"
      :current.sync="currentPage"
      :per-page="pageSize">
    </b-pagination>
    <br>

    <ul>
      <transition-group name="list">
      <li v-for="(tx) in displayedTransactions" v-bind:key="tx.hash">
        <b-panel collapsible :open="!inBundle && !isCollapsed" has-custom-template>
            <span slot="header">
              <span>
                 <b-taglist attached style="float: right">
                   <b-tag v-if="isValueTransfer(tx)" :type="valueType(tx)" style="float: right">{{ toStringValue(tx.value, iota)}}</b-tag>
                 </b-taglist>
              </span>
              <span class="title is-5 is-marginless" style="display:inline-block;">Transaction {{ bundleStatus(tx) }}</span>
              <br>
              <span class="subtitle is-6" style="display:inline-block; width: calc(100% - 24px)">{{ tx.hash }}</span>
            </span>
          <transaction-detail :tx="tx">
          </transaction-detail>
        </b-panel>
        <br/>
      </li>
      </transition-group>
    </ul>

  </div>
</template>

<script>

  import ValueHelper from './mixins/ValuesHelper'
  import IOTALib from 'iota.lib.js'

  import TransactionDetail from './TransactionDetail'
  export default {
    components: {TransactionDetail},
    name: 'transaction-list',
    mixins: [ValueHelper],
    props: ['transactions', 'overallStatus', 'inBundle', 'isCollapsed'],
    data() {
      return {
        iota: new IOTALib({}),
        currentPage: 1,
        pageSize: 8
      }
    },
    filters: {
      shorten (str) {
        return str.length > 40 ? str.slice(0, 40) + ' . . .' : str
      },
      toStatus (tx) {
        if (typeof tx === 'undefined') {
          return 'Unknown'
        } else {
          return tx ? 'Confirmed' : 'Pending'
        }
      },
      toStatusType (tx) {
        if (typeof tx === 'undefined') {
          return 'is-warning'
        } else {
          return tx ? 'is-info' : 'is-warning'
        }
      }
    },
    methods: {
      isValueTransfer (tx) {
        return tx.value !== 0
      },
      valueType(tx) {
        return tx.value > 0 ? 'is-success' : 'is-danger'
      },
      bundleStatus (tx) {
        return tx.lastIndex === 0 ? '' : `(${tx.currentIndex + 1}/${tx.lastIndex + 1})`
      }
    },
    computed: {
      displayedTransactions() {
        const firstIndex = (this.currentPage - 1) * this.pageSize
        return this.transactions.slice(firstIndex, firstIndex + this.pageSize)
      }
    }
  }
</script>

<style scoped>
  .tag {
    font-size: 0.9rem;
  }
</style>
<style>
  .panel-content[style*="display: none;"] {
    max-height: 0
  }
  .panel-content.fade-enter-active {
    max-height: 10000px
  }
  .panel-content.fade-leave-active {
    max-height: 0
  }

  .panel-content {
    transition: all 0.2s ease;
    max-height: 10000px
  }

  .list-enter-active, .list-leave-active {
    transition: all 0.1s;
  }
  .list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
    opacity: 0;
    transform: translateY(-30px);
  }

</style>
