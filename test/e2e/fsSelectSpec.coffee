describe 'fsSelect', ->
  $ptor = protractor

  # Issue https://github.com/angular/protractor/issues/614
  pressEnter = (element) ->
    element.sendKeys("\n")

  beforeEach ->
    browser.get('select.html')

  it 'should open dropdown on click' , ->
    expect($('.first-select .dropdown.fs-list').isPresent()).toBe(false)
    $('.first-select .activate-button').click()

    expect($('.first-select .dropdown.fs-list').isPresent()).toBe(true)

  it 'should allow to select value with mouse click', ->
    $('.first-select .activate-button').click()
    $('.first-select .dropdown.fs-list li:first-child a').click()

    expect($('#valueId').getText()).toBe('1')

  it 'should allow to select value with enter key', ->
    $('.first-select .activate-button').click()
    pressEnter($('.first-select input'))
    expect($('#valueId').getText()).toBe('1')

  it 'should allow to navigate through list with arrows', ->
    $('.first-select .activate-button').click()
    $('.first-select input').sendKeys($ptor.Key.DOWN) for [1..10]
    pressEnter($('.first-select input'))
    expect($('#valueId').getText()).toBe('2')

  it 'should allow to enter freetext if freetext is enabled', ->
    $('.second-select .activate-button').click()
    $('.second-select input').sendKeys("hello freetext")
    expect($('.second-select .dropdown-menu li:first-child a').getText()).toBe("hello freetext")

    pressEnter($('.second-select input'))
    expect($('#ftValue').getText()).toBe('hello freetext')

  it 'should filter dropdown items with entered text', ->
    $('.first-select .activate-button').click()
    input = $('.first-select input')
    input.sendKeys("label")
    expect(element.all(By.css(".first-select .dropdown-menu li")).count()).toBe(3)

    input.clear()
    input.sendKeys("first")
    filteredItems = element.all(By.css(".first-select .dropdown-menu li"))

    expect(filteredItems.count()).toBe(1)
    expect(filteredItems.first().getText()).toBe('first label')

  it 'should clear entered text on blur', ->
    $('.first-select .activate-button').click()
    input = $('.first-select input')
    input.sendKeys("foobar")

    # focus second widget
    $('.second-select .activate-button').click()

    # focus first widget again
    $('.first-select .activate-button').click()
    expect(input.getAttribute('value')).toBe('')

  it 'should not select anything on Enter when items doesnt match entered search text', ->
    $('.first-select .activate-button').click()
    input = $('.first-select input')
    input.sendKeys("foobarbaz")

    $('.first-select input').sendKeys($ptor.Key.ENTER)
    expect($('#valueId').getText()).toBe('')
