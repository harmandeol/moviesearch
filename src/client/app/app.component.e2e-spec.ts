describe('App', () => {

  beforeEach( () => {
    browser.get('/');
  });

  it('should have a title', () => {
    expect(browser.getTitle()).toEqual('Movie Search');
  });

  it('should have navbar', () => {
    expect(element(by.css('movie-app movie-toolbar .navbar')).isPresent()).toEqual(true);
  });

  it('should open search overlay on clicking search input box', () => {
    element(by.css('movie-app movie-toolbar input')).sendKeys('f');
    expect(element(by.css('movie-app movie-search input')).isDisplayed()).toBeTruthy();
  });

});
