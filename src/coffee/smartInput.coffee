fixChain = {
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
fixInput = (v)->
  chain = fixChain[v.length]
  if chain
    for [exp,rep] in chain
      v = v.replace(exp,rep)
  v
  # if v.length > 2
  #   v.replace(/^(\d\d)([^:]*)$/, "$1:$2")
  # else
  #   v

exports.timeInput = fixInput
