describe 'fsCalendar', ->
  now = null
  reload = ->

  beforeEach ->
    now = new Date()
    browser.get('calendar.html')

  it 'should sets ng-model', ->
    expect(element(By.binding('value')).getText())
      .toBe('')
    $('.fs-calendar .day-current').click()

    now.setHours(0)
    now.setMinutes(0)
    now.setSeconds(0)

    expect(element(By.binding('value')).getText())
      .toBe now.toString()

    $('.fs-calendar .day-in-selected-month').click()
    now.setDate(1)

    expect(element(By.binding('value')).getText())
      .toBe now.toString()

  it 'should change month to next', ->
    $('.fs-calendar .fs-calendar-next').click()
    $('.fs-calendar .day-in-selected-month').click()

    now.setMonth(now.getMonth() + 1)
    now.setDate(1)
    now.setHours(0)
    now.setMinutes(0)
    now.setSeconds(0)

    expect(element(By.binding('value')).getText())
      .toBe now.toString()

  it 'should change month to previous', ->
    $('.fs-calendar .fs-calendar-prev').click()
    $('.fs-calendar .day-in-selected-month').click()

    now.setMonth(now.getMonth() - 1)
    now.setDate(1)
    now.setHours(0)
    now.setMinutes(0)
    now.setSeconds(0)

    expect(element(By.binding('value')).getText())
      .toBe now.toString()

  it 'should change month through month grid', ->
    $('.fs-calendar .fs-calendar-title').click()
    $('.fs-calendar .month').click()
    $('.fs-calendar .day-in-selected-month').click()

    now.setMonth(0)
    now.setDate(1)
    now.setHours(0)
    now.setMinutes(0)
    now.setSeconds(0)

    expect(element(By.binding('value')).getText())
      .toBe now.toString()

  it 'should change year through year grid', ->
    $('.fs-calendar .fs-calendar-title').click()
    $('.fs-calendar .fs-calendar-title').click()
    $('.fs-calendar .year').click()
    $('.fs-calendar .month').click()
    $('.fs-calendar .day-in-selected-month').click()

    now.setYear(2009)
    now.setMonth(0)
    now.setDate(1)
    now.setHours(0)
    now.setMinutes(0)
    now.setSeconds(0)

    expect(element(By.binding('value')).getText())
      .toBe now.toString()
