import { Angular2SkeletonPage } from './app.po';

describe('angular2-skeleton App', function() {
  let page: Angular2SkeletonPage;

  beforeEach(() => {
    page = new Angular2SkeletonPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
