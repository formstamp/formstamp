takeScreenshot = ->
  fs = require('fs')
  browser.takeScreenshot().then (png) ->
    stream = fs.createWriteStream("/tmp/screenshot.png")

    stream.write(new Buffer(png, 'base64'))
    stream.end()

describe 'fsCheckbox', ->
  beforeEach ->
    browser.get('checkbox.html')

  it 'should check item on click', ->
    expect($('#value').getText()).toBe ''
    $('.fs-checkbox:first-child > div:first-child > a').click()
    $('.fs-checkbox:first-child > div:last-child > a').click()

    takeScreenshot()
    expect($('#value').getText()).toMatch(/one/)
    expect($('#value').getText()).toMatch(/three/)

    $('.fs-checkbox:first-child > div:first-child > a').click()
    expect($('#value').getText()).not.toMatch(/one/)
