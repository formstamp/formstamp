describe 'fsDate', ->
  beforeEach ->
    browser.get('datetime.html')

  it 'should open date dropdown on click' , ->
    expect($('.fs-datetime .fs-calendar-wrapper').isPresent()).toBe(false)
    $('.fs-datetime .fs-date input').click()
    expect($('.fs-datetime .fs-calendar-wrapper').isPresent()).toBe(true)

  it 'should allow to choose date', ->
    expect($('.fs-datetime input').getAttribute('value')).toBe('')
    $('.fs-datetime .fs-date input').click()
    $('.fs-datetime .day-in-selected-month:first-child').click()
    expect($('.fs-datetime input').getAttribute('value')).toMatch(/\d{1,2}\/\d{1,2}\/\d{2,4}/)

  it 'should allow to choose date and time', ->
    $('.fs-datetime .fs-date input').click()
    $('.fs-datetime .fs-date .day-current').click()

    $('.fs-datetime .fs-time input').sendKeys('12:01')

    now = new Date()
    [day, month, year] = [now.getDate(), now.getMonth(), now.getFullYear()].map String
    expect($('#hours').getText()).toBe '12'
    expect($('#minutes').getText()).toBe '1'
    expect($('#day').getText()).toBe day
    expect($('#month').getText()).toBe month
    expect($('#year').getText()).toBe year

  it "should close dropdown when new date is selected", ->
    $('.fs-datetime .fs-date input').click()
    $('.fs-datetime .fs-date .day-in-selected-month:first-child').click()
    expect($('.fs-datetime .fs-date .fs-calendar-wrapper').isPresent()).toBe(false)

  it "should allow to enter date via keyboard", ->
    $('.fs-datetime .fs-date input').clear()
    $('.fs-datetime .fs-date input').sendKeys("9/11/01")

    expect($("#day").getText()).toBe('11')
    expect($("#month").getText()).toBe('8')
    expect($("#year").getText()).toBe('2001')

  it "should set value to null when input is cleared", ->
    $('.fs-date input').clear()
    expect($('.fs-datetime .fs-date input').getAttribute('value')).toEqual ''
    expect($('.fs-datetime .fs-time input').getAttribute('value')).toEqual ''
    expect($('#value').getText()).toEqual ''
