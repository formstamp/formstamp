describe 'fsMultiselect', ->
  $ptor = protractor

  #
  pressEnter = (element) ->
    element.sendKeys("\n")

  beforeEach ->
    browser.get('multiselect.html')

  it 'should open dropdown on focus' , ->
    expect($('.first-select .dropdown.fs-list').isPresent()).toBe(false)
    $('.first-select input').click()

    expect($('.first-select .dropdown.fs-list').isPresent()).toBe(true)
    expect(element.all(By.css(".first-select .dropdown-menu li")).count()).toBe(3)

  it 'should allow to select multiple values', ->
    input = $('.first-select input')
    input.click()
    pressEnter(input)
    pressEnter(input)

    # check that dropdown wasn't closed
    expect(element.all(By.css(".first-select .dropdown-menu li")).count()).toBe(1)
    expect($('.first-select .dropdown.fs-list').isPresent()).toBe(true)

    # check that selected values was added to scope
    expect($("#firstValue").getText()).toMatch(/one/)
    expect($("#firstValue").getText()).toMatch(/two/)

    # check that selected values are displayed in widget
    expect(element.all(By.css(".first-select .fs-multiselect-selected-items a")).count()).toBe(2)

  it 'should allow to deselect selected values', ->
    $('#selectValues').click()
    $(".first-select .fs-multiselect-selected-items a:first-child").click()

    expect($("#firstValue").getText()).not.toMatch(/one/)
    expect($("#firstValue").getText()).toMatch(/two/)
    expect(element.all(By.css(".first-select .fs-multiselect-selected-items a")).count()).toBe(1)

  it 'should filter not selected items in popup menu', ->
    $('#selectValues').click()
    $('.first-select input').click()

    expect(element.all(By.css(".first-select .dropdown-menu li")).count()).toBe(1)
    expect($(".first-select .dropdown-menu li a:first-child").getText()).toBe('three')

  it 'should use custom item template', ->
    $('#selectValues').click()

    expect(element.all(By.css(".first-select .fs-multiselect-selected-items a .foo")).count()).toBe(2)
    $('.first-select input').click()

    expect($(".first-select .dropdown-menu li a .foo").isPresent()).toBe(true)

  it 'should support freetext attribute', ->
    input = $('.second-select input')
    input.click()
    input.sendKeys("gzigzigzeo")
    pressEnter(input)

    expect($(".second-select .fs-multiselect-selected-items a").getText()).toBe("gzigzigzeo")
    expect($("#secondValue").getText()).toMatch(/gzigzigzeo/)

  it 'should clear entered text on blur', ->
    input = $('.first-select input')
    input.click()
    input.sendKeys("foobar")

    # focus other widget
    $('.second-select input').click()
    expect(input.getAttribute('value')).toBe('')

  it 'should not select anything on Enter when items doesnt match entered search text', ->
    expect($("#firstValue").getText()).toBe('')
    input = $('.first-select input')
    input.sendKeys("foobarbazzzz")
    input.sendKeys($ptor.Key.ENTER)

    expect($("#firstValue").getText()).toBe('')
