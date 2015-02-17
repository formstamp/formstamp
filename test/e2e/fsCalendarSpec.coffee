describe 'fsCalendar', ->
  year = null
  month = null
  day = null

  beforeEach ->
    now = new Date()
    year = now.getFullYear()
    month = now.getMonth()
    day = now.getDate()
    browser.get('calendar.html')

  it 'should sets ng-model', ->
    expect(element(By.binding('value')).getText())
      .toBe('')
    currentTd = $('.fs-calendar .day-current')
    day = currentTd.getText()
    currentTd.click()

    expect($('#year').getText()).toBe year.toString()
    expect($('#month').getText()).toBe month.toString()
    expect($('#day').getText()).toBe day

    $('.fs-calendar .day-in-selected-month').click()

    expect($('#day').getText()).toBe '1'

  it 'should change month to next', ->
    $('.fs-calendar .fs-calendar-next').click()
    $('.fs-calendar .day-in-selected-month').click()

    expect($('#year').getText()).toBe year.toString()
    expect($('#month').getText()).toBe (month+1).toString()
    expect($('#day').getText()).toBe '1'

  it 'should change month to previous', ->
    $('.fs-calendar .fs-calendar-prev').click()
    $('.fs-calendar .day-in-selected-month').click()

    expect($('#year').getText()).toBe year.toString()
    expect($('#month').getText()).toBe (month-1).toString()
    expect($('#day').getText()).toBe '1'

  it 'should change month through month grid', ->
    $('.fs-calendar .fs-calendar-title').click()
    $('.fs-calendar .month').click()
    $('.fs-calendar .day-in-selected-month').click()

    expect($('#year').getText()).toBe year.toString()
    expect($('#month').getText()).toBe '0'
    expect($('#day').getText()).toBe '1'

  it 'should change year through year grid', ->
    $('.fs-calendar .fs-calendar-title').click()
    $('.fs-calendar .fs-calendar-title').click()
    $('.fs-calendar .year').click()
    $('.fs-calendar .month').click()
    $('.fs-calendar .day-in-selected-month').click()

    expect($('#year').getText()).toBe String(year - 5)
    expect($('#month').getText()).toBe '0'
    expect($('#day').getText()).toBe '1'
