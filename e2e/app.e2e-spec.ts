import { EstropadakPage } from './app.po';

describe('estropadak App', () => {
  let page: EstropadakPage;

  beforeEach(() => {
    page = new EstropadakPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
