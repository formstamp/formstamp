takeScreenshot = (n)->
  fs = require('fs')
  browser.takeScreenshot().then (png) ->
    stream = fs.createWriteStream("/tmp/screenshot#{n}.png")

    stream.write(new Buffer(png, 'base64'))
    stream.end()

describe 'fsDate', ->
  beforeEach ->
    browser.get('date.html')

  it 'should open dropdown on click' , ->
    expect($('.fs-date .fs-calendar-wrapper').isPresent()).toBe(false)
    $('.fs-date input').click()
    expect($('.fs-date .fs-calendar-wrapper').isPresent()).toBe(true)

  it 'should allow to choose date', ->
    expect($('.fs-date input').getAttribute('value')).toBe('')
    $('.fs-date input').click()
    $('.fs-date .day-in-selected-month:first-child').click()
    expect($('.fs-date input').getAttribute('value')).toMatch(/\d{1,2}\/\d{1,2}\/\d{2,4}/)

  it 'should correctly set scope value', ->
    $('.fs-date input').click()

    dayNumber = $('.fs-date .day-in-selected-month:first-child').getText()
    now = new Date()

    $('.fs-date .day-in-selected-month:first-child').click()
    expect($("#day").getText()).toBe(dayNumber)
    expect($("#month").getText()).toBe(now.getMonth().toString())
    expect($("#year").getText()).toBe(now.getFullYear().toString())

  it 'should close dropdown on Esc', ->
    $('.fs-date input').click()
    $('.fs-date input').sendKeys(protractor.Key.ESCAPE)
    expect($('.fs-date .fs-calendar-wrapper').isPresent()).toBe false

  it "should preserve time component of date when new date is selected", ->
    $('#setNow').click()

    hours = $("#hours").getText()
    minutes = $("#minutes").getText()

    expect(hours).not.toBe('')
    expect(minutes).not.toBe('')

    $('.fs-date input').click()
    $('.fs-date .day-in-selected-month:last-child').click()

    expect($("#hours").getText()).toBe(hours)
    expect($("#minutes").getText()).toBe(minutes)

  it 'should not open dropdown when widget is disabled', ->
    $("#disable").click()
    $(".fs-date .glyphicon").click()
    expect($('.fs-date .fs-calendar-wrapper').isPresent()).toBe(false)

  it "should open dropdown on click on icon", ->
    $(".fs-date .glyphicon").click()
    expect($('.fs-date .fs-calendar-wrapper').isPresent()).toBe(true)

  it "should close dropdown when new date is selected", ->
    $('.fs-date input').click()
    $('.fs-date .day-in-selected-month:first-child').click()
    expect($('.fs-date .fs-calendar-wrapper').isPresent()).toBe(false)

  it "should allow to enter date via keyboard", ->
    $('.fs-date input').clear()
    $('.fs-date input').sendKeys("9/11/2001")

    expect($("#day").getText()).toBe('11')
    expect($("#month").getText()).toBe('8')
    expect($("#year").getText()).toBe('2001')

  it "should set value to null when input is cleared", ->
    $('.fs-date input').clear()
    expect($('#value').getText()).toEqual ''
