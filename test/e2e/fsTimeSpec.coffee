describe 'fsTime', ->
  $ptor = protractor

  beforeEach ->
    browser.get('time.html')

  it 'should open dropdown', ->
    expect($('.fs-time .dropdown.fs-list').isPresent()).toBe(false)
    $('.fs-time input').click()
    expect($('.fs-time .dropdown.fs-list').isPresent()).toBe(true)

  it 'should open dropdown when icon is clicked', ->
    expect($('.fs-time .dropdown.fs-list').isPresent()).toBe(false)
    $('.fs-time .glyphicon').click()
    expect($('.fs-time .dropdown.fs-list').isPresent()).toBe(true)

  it 'should not open dropdown when widget is disabled and icon is clicked', ->
    expect($('.fs-time .dropdown.fs-list').isPresent()).toBe(false)
    $('#disable').click()
    $('.fs-time .glyphicon').click()
    expect($('.fs-time .dropdown.fs-list').isPresent()).toBe(false)

  it 'should allow to select value from dropdown (issue #1)', ->
    $('.fs-time input').click()
    $('.fs-time input').sendKeys('1212', $ptor.Key.ENTER)

    expect($('.fs-time input').getAttribute('value')).toBe '12:12'
    expect($('#value').getText()).toBe '12:12'

  it 'should allow to select value with mouse click', ->
    $('.fs-time input').click()
    $('.fs-time .dropdown.fs-list li:first-child a').click()
    expect($('.fs-time input').getAttribute('value')).toBe '00:00'

  it 'should allow use keyboard for selecting values', ->
    $('.fs-time input').sendKeys($ptor.Key.DOWN, $ptor.Key.ENTER)
    expect($('.fs-time input').getAttribute('value')).toBe '00:15'

  it 'should close dropdown after value is selected', ->
    $('.fs-time input').click()
    $('.fs-time .dropdown.fs-list li:first-child a').click()
    expect($('.fs-time .dropdown.fs-list').isPresent()).toBe(false)

  it 'should close dropdown on escape', ->
    $('.fs-time input').click()
    $('.fs-time input').sendKeys($ptor.Key.ESCAPE)
    expect($('.fs-time .dropdown.fs-list').isPresent()).toBe(false)

  it 'should allow to enter value form keyboard', ->
    $('.fs-time input').click()
    $('.fs-time input').sendKeys('11:00')
    expect($('.fs-time input').getAttribute('value')).toBe '11:00'

