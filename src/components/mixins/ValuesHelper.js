export default {
  methods: {
    toStringValue (value, iota) {
      if(value > 0) {
        return 'IN  ' + this.toUnits(value, true, iota)
      } else {
        return 'OUT ' + this.toUnits(-value, true, iota)
      }
    },
    toUnits(val, short, iota) {
      val = Math.abs(val)
      const units = ['i', 'Ki', 'Mi', 'Gi', 'Ti', 'Pi']
      const unit = units[Math.floor((('' + val).length - 1) / 3)]
      let num = iota.utils.convertUnits(val, 'i', unit)
      if(short) {
        num = num.toFixed(Math.max(0, 3 - (Math.round(num) + '').length))
      }
      return `${num}${unit}`
    }
  }
}
