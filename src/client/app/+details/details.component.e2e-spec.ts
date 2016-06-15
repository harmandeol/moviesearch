describe('Movie Details', () => {

  beforeEach( () => {
    browser.get('/tt0183505');
  });

  it('should have a header', () => {
    expect(element(by.css('movie-details h1')).isPresent()).toEqual(true);
  });

  it('should have max ten words with option to show more for plot', () => {
    expect(element(by.css('movie-details article')).getText())
      .toEqual('A nice-guy cop with dissociative identity disorder must protect a ... show more');
  });

});

