import { FirecharPage } from './app.po';

describe('firechar App', () => {
  let page: FirecharPage;

  beforeEach(() => {
    page = new FirecharPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
