/*!
 * IOTA Transaction Stream Front End
 * Copyright(c) 2018 Peter Ryszkiewicz
 * MIT Licensed
 */

let webSocketClient = null
let iotaTransactionStreamIP, iotaTransactionStreamPort, isIotaTransactionStreamSecured
let tps = 0
const tpsInterval = 600 // ms
let transactionsWithinInterval = 0

function getWebSocketURL() {
  const webSocketProtocol = (isIotaTransactionStreamSecured === true || isIotaTransactionStreamSecured === 'true') ? 'wss' : 'ws'
  return `${webSocketProtocol}://${iotaTransactionStreamIP}:${iotaTransactionStreamPort}`
}

function makeWebSocket() {
  return new WebSocket(getWebSocketURL())
}

function tryWebSocketConnection() {
  console.log(`${new Date().toISOString()}: Trying to create a new transaction stream WebSocket`)

  webSocketClient = makeWebSocket()

  webSocketClient.addEventListener('open', () => {
    console.log(`${new Date().toISOString()}: Opened transaction stream WebSocket`)
  })

  webSocketClient.addEventListener('message', message => {
    try {
      console.log(`${new Date().toISOString()}: got message`)
      const transaction = JSON.parse(Buffer.from(message.data).toString())
      transactionCallback(transaction)
      ++transactionsWithinInterval
    } catch (e) {
      console.error('An error occurred while deserializing', e)
    }
  })

  webSocketClient.addEventListener('close', function() {
    console.warn(`${new Date().toISOString()}: The transaction stream WebSocket closed`)
    if(this !== webSocketClient) { return }
    setTimeout(tryWebSocketConnection, 3000 + Math.random() * 1000)
  })

  webSocketClient.addEventListener('error', (error) => {
    console.warn(`${new Date().toISOString()}: The transaction stream WebSocket got an error: ${error}`)
  })
}

let transactionCallback = () => {}

function setTransactionCallback(callback) {
  transactionCallback = callback
}

function start() {
  stop()
  tryWebSocketConnection()
}

function stop() {
  if(!webSocketClient) { return }
  const localWebSocketClient = webSocketClient
  webSocketClient = null
  localWebSocketClient.close()
}

function getTransactionsPerSecond() {
  return tps
}

setInterval(() => {
  tps = transactionsWithinInterval / tpsInterval * 1000.0
  transactionsWithinInterval = 0
}, tpsInterval)

module.exports = function ({ iotaTransactionStreamIP: localIotaTransactionStreamIP,
                             iotaTransactionStreamPort: localIotaTransactionStreamPort,
                             isIotaTransactionStreamSecured: localIsIotaTransactionStreamSecured
}) {
  iotaTransactionStreamIP = localIotaTransactionStreamIP
  iotaTransactionStreamPort = localIotaTransactionStreamPort
  isIotaTransactionStreamSecured = localIsIotaTransactionStreamSecured

  tryWebSocketConnection()

  return {
    setTransactionCallback,
    start,
    stop,
    getTransactionsPerSecond
  }
}
