describe('Search', () => {

let searchTrigger = 'movie-app movie-toolbar input';
let search = {
  page: 'movie-app movie-search',
  searchBox: 'movie-app movie-search input',
  searchResults: 'movie-app movie-search ul li'
};

  beforeEach( () => {
    browser.get('/');
    element(by.css(searchTrigger)).sendKeys('');
  });

  describe('when searching for \'th\' ', () => {
    beforeEach( () => {
      element(by.css(search.page)).isDisplayed().then(
        () => {
          expect(element(by.css(search.searchBox)).isPresent()).toEqual(true);
          element(by.css(search.searchBox)).sendKeys('th');
          browser.actions().sendKeys(protractor.Key.ENTER).perform();
          expect(element(by.css(search.searchResults)).isDisplayed()).toBeTruthy;
        });
    });

    it('10 results should be displayed', () => {
      expect(element.all(by.css(search.searchResults)).count()).toBe(10);
    });

    it('clicking on first should open details page', () => {
      element(by.css(search.searchResults)).click();
      expect(element(by.css(search.searchResults)).isPresent()).toBe(true);
    });
  });
});





