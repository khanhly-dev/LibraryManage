import { LibraryManagerTemplatePage } from './app.po';

describe('LibraryManager App', function() {
  let page: LibraryManagerTemplatePage;

  beforeEach(() => {
    page = new LibraryManagerTemplatePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
