const SIZE = 12

const f = (mode = 'co', subarr, i) => {
  if (subarr.length === 1) return subarr

  let ones = 0
  let zeroes = 0

  for (let bin of subarr) {
    Number(bin[i]) ? ones++ : zeroes++
  }

  if (mode === 'oxygen') {
    return subarr.filter((x) => Number(x[i]) === Number(ones < zeroes))
  } else {
    return subarr.filter((x) => Number(x[i]) === Number(!(ones < zeroes)))
  }
}

const t = (arr) => {
  let oxygen = [...arr]
  let co = [...arr]

  for (let i = 0; i < SIZE; i++) {
    if (oxygen.length === 1 && co.length === 1) break
    oxygen = f('oxygen', oxygen, i)
    co = f(null, co, i)
  }

  console.log(parseInt(oxygen[0], 2) * parseInt(co[0], 2))
}

const main = () => {
  fs.readFile('./input/day3.txt', 'utf8', (err, data) => {
    if (err) return console.log(err)
    t(data.split('\n').map((x) => x.substring(0, SIZE)))
  })
}

main()
