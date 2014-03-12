takeScreenshot = ->
  fs = require('fs')
  browser.takeScreenshot().then (png) ->
    stream = fs.createWriteStream("/tmp/screenshot.png")

    stream.write(new Buffer(png, 'base64'))
    stream.end()

describe 'fsSelect', ->
  $ptor = protractor

  beforeEach ->
    browser.get('select.html')

  it 'should open dropdown on click' , ->
    expect($('.first-select .dropdown.fs-list').isPresent()).toBe(false)
    $('.first-select .fs-select-active').click()

    expect($('.first-select .dropdown.fs-list').isPresent()).toBe(true)

  it 'should allow to select value with mouse click', ->
    $('.first-select .fs-select-active').click()
    $('.first-select .dropdown.fs-list li:first-child a').click()

    expect($('#valueId').getText()).toBe('1')

  it 'should allow to select value with enter key', ->
    $('.first-select .fs-select-active').click()
    $('.first-select input').sendKeys($ptor.Key.ENTER)
    expect($('#valueId').getText()).toBe('1')

  it 'should allow to navigate through list with arrows', ->
    $('.first-select .fs-select-active').click()
    $('.first-select input').sendKeys($ptor.Key.DOWN) for [1..10]
    takeScreenshot()
    $('.first-select input').sendKeys($ptor.Key.ENTER)
    expect($('#valueId').getText()).toBe('2')

  it 'should allow to enter freetext if freetext is enabled', ->
    $('.second-select .fs-select-active').click()
    $('.second-select input').sendKeys("hello freetext")
    expect($('.second-select .dropdown-menu li:first-child a').getText()).toBe("hello freetext")

    $('.second-select input').sendKeys($ptor.Key.ENTER)
    expect($('#ftValue').getText()).toBe('hello freetext')

  it 'should filter dropdown items with entered text', ->
    $('.first-select .fs-select-active').click()
    input = $('.first-select input')
    input.sendKeys("label")
    expect(element.all(By.css(".first-select .dropdown-menu li")).count()).toBe(3)

    input.clear()
    input.sendKeys("first")
    filteredItems = element.all(By.css(".first-select .dropdown-menu li"))

    expect(filteredItems.count()).toBe(1)
    expect(filteredItems.first().getText()).toBe('first label')

  it 'should clear entered text on blur', ->
    $('.first-select .fs-select-active').click()
    input = $('.first-select input')
    input.sendKeys("foobar")

    # focus second widget
    $('.second-select .fs-select-active').click()

    # focus first widget again
    $('.first-select .fs-select-active').click()
    expect(input.getAttribute('value')).toBe('')

  it 'should not select anything on Enter when items doesnt match entered search text', ->
    $('.first-select .fs-select-active').click()
    input = $('.first-select input')
    input.sendKeys("foobarbaz")

    $('.first-select input').sendKeys($ptor.Key.ENTER)
    expect($('#valueId').getText()).toBe('')
