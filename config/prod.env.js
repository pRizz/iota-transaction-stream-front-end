'use strict'
module.exports = {
  NODE_ENV: '"production"',
  IOTA_TRANSACTION_STREAM_IP: process.env.IOTA_TRANSACTION_STREAM_IP ? `"${process.env.IOTA_TRANSACTION_STREAM_IP}"` : '"localhost"',
  IOTA_TRANSACTION_STREAM_PORT: process.env.IOTA_TRANSACTION_STREAM_PORT || 8008,
  IS_IOTA_TRANSACTION_STREAM_SECURED: process.env.IS_IOTA_TRANSACTION_STREAM_SECURED || false
}