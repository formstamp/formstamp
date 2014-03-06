describe 'fsDate', ->
  reload = ->
    browser.get('date.html')

  it 'should open dropdown on click' , ->
    expect($('.fs-date .fs-calendar-wrapper').isPresent()).toBe(false)
    $('.fs-date input').click()
    expect($('.fs-date .fs-calendar-wrapper').isPresent()).toBe(true)

