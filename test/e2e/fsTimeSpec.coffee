describe 'fsTime', ->
  beforeEach ->
    browser.get('time.html')

  it 'should allow to select time', ->
    $('.fs-time input').clear()
    $('.fs-time input').sendKeys("12:24")

    expect($("#hours").getText()).toBe("12")
    expect($("#minutes").getText()).toBe("24")

  it 'should allow to select time from datalist', ->
    browser.actions().doubleClick($(".fs-time input")).perform()
    $(".fs-time datalist option:last-child").click()

    expect($("#hours").getText()).toBe("12")
    expect($("#minutes").getText()).toBe("24")

