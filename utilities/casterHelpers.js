const calculateScore = (takes) => {
  let quantity = 0
  let rollingTotal = 0
  takes.forEach((take) => {
    if (take.result === -1) return
    rollingTotal += take.result
    quantity++
  })
  return rollingTotal / quantity
}

const addTakeToAverage = (currentScore, takeResult) => {
  if (takeResult === -1) return
  return (currentScore + takeResult) / 2
}

module.exports = {
  addTakeToAverage,
  calculateScore,
}
