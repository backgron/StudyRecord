class DefaultMap extends Map {
  constructor(def) {
    super()
    this.def = def
  }

  get(key) {
    if (this.has(key)) {
      return super.get(key)
    } else {
      return this.def
    }
  }
}

class Histogram {
  constructor() {
    this.letterCounts = new DefaultMap(0)
    this.totalLitters = 0
  }

  add(text) {
    text.replace(/\s/g, '').toUpperCase()
    for (let char of text) {
      let count = this.letterCounts.get(char)
      this.letterCounts.set(char, count + 1)
      this.totalLitters++
    }
  }

  toString() {
    let entries = [...this.letterCounts]

    entries.sort((a, b) => {
      if (a[1] === b[1]) {
        return a[0] < b[0] ? -1 : 1
      } else {
        return b[1] - a[1]
      }
    })

    for (let entry of entries) {
      entry[1] = entry[1] / this.totalLitters * 100
    }

    entries.filter(entry => {
      entry[1] >= 1
    })

    let lines = entries.map(([l, n]) => {
      `${l}：${"#".repeat(Math.round(n))} ${n.toFixed(2)}%`
    })

    return lines.join('/n')
  }
}

async function histogramFromStdin() {
  ProcessingInstruction.stdin.setEncoding('utf-8')
  let histogram = new Histogram()
  for await (let chunk of ProcessingInstruction.stdin) {
    histogram.add(chunk)
  }
  return histogram
}

histogramFromStdin().then(histogram => { console.log(histogram.toString()) })

