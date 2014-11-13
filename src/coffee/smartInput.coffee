timeInputChain = {
  1: [
    [/^([^0-9])$/,'']
    [/^([0-2])$/,'$1']
    [/^([3-9])$/,'0$1:']
  ],
  2: [
    [/^([0-1][0-9]|2[0-3])$/,'$1:']
    [/^2[^0-3]$/,'2']
  ]
}
timeInput = (v)->
  chain = timeInputChain[v.length]
  if chain
    for [exp,rep] in chain
      v = v.replace(exp,rep)
  v

timeFixChain = [
  [/^([0-1][0-9]|2[0-3])$/,'$1:00']
  [/^([0-1][0-9]|2[0-3]):$/,'$1:00']
  [/^([0-1][0-9]|2[0-3]):([0-9])$/,'$1:0$2']
]

timeLastFix = (v)->
  for [exp,rep] in timeFixChain
    v = v.replace(exp,rep)
  v

exports.timeInput = timeInput
exports.timeLastFix = timeLastFix
