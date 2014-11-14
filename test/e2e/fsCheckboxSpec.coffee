describe 'fsCheckbox', ->
  beforeEach ->
    browser.get('checkbox.html')

  it 'should check item on click', ->
    expect($('#value').getText()).toBe ''
    $('.fs-checkbox:first-child > div:first-child > .fs-racheck-item').click()
    $('.fs-checkbox:first-child > div:last-child > .fs-racheck-item').click()

    expect($('#value').getText()).toMatch(/one/)
    expect($('#value').getText()).toMatch(/three/)

    $('.fs-checkbox:first-child > div:first-child > .fs-racheck-item').click()
    expect($('#value').getText()).not.toMatch(/one/)
