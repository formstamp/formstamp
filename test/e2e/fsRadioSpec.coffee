describe 'fsRadio', ->
  beforeEach ->
    browser.get('radio.html')

  it 'should select option on click', ->
    expect(element.all(By.css('input[type=radio]:checked')).count()).toBe 0
    $('.fs-radio .fs-radio-item label').click()
    expect(element.all(By.css('input[type=radio]:checked')).count()).toBe 1

    element.all(By.css('.fs-radio .fs-radio-item label')).last().click()
    expect(element.all(By.css('input[type=radio]:checked')).count()).toBe 1
