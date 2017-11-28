import { browser, element, by } from 'protractor';

function scrollTo(x: number = 0, y: number = 0) {
  browser.executeScript(`window.scrollTo(${x},${y})`);
  browser.sleep(200);
}

describe('InViewport Lib E2E Tests', function () {

  beforeEach(() => browser.get(''));

  beforeEach(() => browser.waitForAngular());

  beforeEach(() => scrollTo());

  afterEach(() => {
    browser.manage().logs().get('browser').then((browserLog: any[]) => {
      expect(browserLog).toEqual([]);
    });
  });

  it('should display lib', () => {
    expect(element(by.css('p')).getText()).toContain('Amet tempor excepteur occaecat nulla.');
  });

  it('should show `sn-viewport-out` class', () => {
    expect(element(by.css('.small-element.sn-viewport-out')).isPresent()).toBeTruthy();

    scrollTo(0, 768 / 2);
    expect(element(by.css('.small-element.sn-viewport-out')).isPresent()).toBeFalsy();
  });

  it('should show `sn-viewport-in` class', () => {
    scrollTo(0, 768 / 2);
    expect(element(by.css('.small-element.sn-viewport-in')).isPresent()).toBeTruthy();

    scrollTo(0, 0);

    expect(element(by.css('.small-element.sn-viewport-in')).isPresent()).toBeFalsy();
  });

  it('should run event handler `onInViewportChange`', () => {
    scrollTo(0, 768 / 2);

    expect(element(by.css('.small-element.highlight')).isPresent()).toBeTruthy();

    scrollTo();

    expect(element(by.css('.small-element.highlight')).isPresent()).toBeFalsy();
  });

  it('should add `in-viewport` class to large element', () => {
    scrollTo(0, 768 * 2);
    expect(element(by.css('.large-element.sn-viewport-in')).isPresent()).toBeTruthy();

    scrollTo();
    expect(element(by.css('.large-element.sn-viewport-in')).isPresent()).toBeFalsy();
  });

  it('should add `in-viewport` class to element inside a scrollable element', () => {
    scrollTo(0, 768 * 3);
    expect(element(by.css('.inside-scrollable.sn-viewport-in')).isPresent()).toBeFalsy();
    expect(element(by.css('.inside-scrollable.sn-viewport-out')).isPresent()).toBeTruthy();

    browser.executeScript(`document.getElementsByClassName('scrollable')[0].scrollTop = 768`);
    browser.sleep(200);
    expect(element(by.css('.inside-scrollable.sn-viewport-in')).isPresent()).toBeTruthy();
    expect(element(by.css('.inside-scrollable.sn-viewport-out')).isPresent()).toBeFalsy();

    browser.executeScript(`document.getElementsByClassName('scrollable')[0].scrollTop = 768 * 2`);
    browser.sleep(200);
    expect(element(by.css('.inside-scrollable.sn-viewport-in')).isPresent()).toBeFalsy();
    expect(element(by.css('.inside-scrollable.sn-viewport-out')).isPresent()).toBeTruthy();
  });

});
