describe 'fsCalendar', ->
  browser.get('http://localhost:17405/spec/e2e/views/date.html')

  it 'sets ng-model', ->
    expect(element(By.binding('value')).getText())
      .toBe('')
    element(By.css('.fs-calendar .day-current')).click()

    expectedDate = new Date()
    expectedDate.setHours(0)
    expectedDate.setMinutes(0)
    expectedDate.setSeconds(0)

    expect(element(By.binding('value')).getText())
      .toBe(expectedDate.toString())

    element(By.css('.fs-calendar .day-in-selected-month:nth-child(3)')).click()
    expectedDate.setDate(4)
    expectedDate.setHours(0)
    expectedDate.setMinutes(0)
    expectedDate.setSeconds(0)

    expect(element(By.binding('value')).getText())
      .toBe(expectedDate.toString())

