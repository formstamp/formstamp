describe 'fsSelect', ->
  $ptor = protractor

  beforeEach ->
    browser.get('select.html')

  it 'should open dropdown on click' , ->
    expect($('.fs-select .dropdown.fs-list').isPresent()).toBe(false)
    $('.fs-select-active').click()

    expect($('.fs-select .dropdown.fs-list').isPresent()).toBe(true)

  it 'should allow to select value with mouse click', ->
    $('.fs-select .fs-select-active').click()
    $('.fs-select .dropdown.fs-list li:first-child a').click()

    expect($('#valueId').getText()).toBe('1')

  it 'should allow to select value with enter key', ->
    $('.fs-select .fs-select-active').click()
    $('.fs-select input').sendKeys($ptor.Key.ENTER)
    expect($('#valueId').getText()).toBe('1')

  it 'should allow to navigate through list with arrows', ->
    $('.fs-select .fs-select-active').click()
    $('.fs-select input').sendKeys(($ptor.Key.ARROW_DOWN for [1..10]))
    $('.fs-select input').sendKeys($ptor.Key.ENTER)
    expect($('#valueId').getText()).toBe('2')
