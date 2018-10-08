import { browser, element, by } from 'protractor';
import { AppPage } from './app.po';

describe('InViewport Lib E2E Tests', function() {
  const page = new AppPage();

  beforeEach(() => page.navigateTo());

  beforeEach(() => browser.waitForAngular());

  beforeEach(() => page.scrollTo());

  afterEach(() => {
    browser
      .manage()
      .logs()
      .get('browser')
      .then((browserLog: any[]) => {
        expect(browserLog).toEqual([]);
      });
  });

  it('should display lib', () => {
    expect(element(by.css('p')).getText()).toContain(
      'Amet tempor excepteur occaecat nulla.'
    );
  });

  it('should show `sn-viewport--out` class', () => {
    expect(page.getSmallElement().getAttribute('class')).toContain(
      'sn-viewport--out'
    );

    page.scrollTo(0, 768 / 2);
    expect(page.getSmallElement().getAttribute('class')).not.toContain(
      'sn-viewport--out'
    );
  });

  it('should show `sn-viewport--in` class', () => {
    page.scrollTo(0, 768 / 2);
    expect(page.getSmallElement().getAttribute('class')).toContain(
      'sn-viewport--in'
    );

    page.scrollTo(0, 0);
    expect(page.getSmallElement().getAttribute('class')).not.toContain(
      'sn-viewport--in'
    );
  });

  it('should run event handler `onInViewportChange`', () => {
    page.scrollTo(0, 768 / 2);
    expect(page.getSmallElement().getAttribute('class')).toContain('highlight');

    page.scrollTo();
    expect(page.getSmallElement().getAttribute('class')).not.toContain(
      'highlight'
    );
  });

  it('should add `in-viewport` class to large element', () => {
    page.scrollTo(0, 768 * 2);
    expect(page.getLargeElement().getAttribute('class')).toContain(
      'sn-viewport--in'
    );

    page.scrollTo();
    expect(page.getLargeElement().getAttribute('class')).not.toContain(
      'sn-viewport--in'
    );
  });

  it('should add `sn-viewport` class to element inside a scrollable element', () => {
    page.scrollTo(0, 768 * 3);
    expect(
      page.getScrollableInnerElement().getAttribute('class')
    ).not.toContain('sn-viewport--in');
    expect(page.getScrollableInnerElement().getAttribute('class')).toContain(
      'sn-viewport--out'
    );

    page.scrollableElementScrollTop(768);
    expect(page.getScrollableInnerElement().getAttribute('class')).toContain(
      'sn-viewport--in'
    );
    expect(
      page.getScrollableInnerElement().getAttribute('class')
    ).not.toContain('sn-viewport--out');

    page.scrollableElementScrollTop(768 * 2);
    expect(
      page.getScrollableInnerElement().getAttribute('class')
    ).not.toContain('sn-viewport--in');
    expect(page.getScrollableInnerElement().getAttribute('class')).toContain(
      'sn-viewport--out'
    );
  });
});
