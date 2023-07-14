import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getSmallElement() {
    return element(by.css('.element--small'));
  }

  getLargeElement() {
    return element(by.css('.element--large'));
  }

  getElementWithOptions() {
    return element(by.css('.element--has-options'));
  }

  getScrollableInnerElement() {
    return element(by.css('.scrollable__inner'));
  }

  scrollTo(x: number = 0, y: number = 0) {
    void browser.executeScript(`window.scrollTo(${x},${y})`);
    void browser.sleep(200);
  }

  scrollableElementScrollTop(y: number = 0) {
    void browser.executeScript(
      `document.getElementsByClassName('scrollable')[0].scrollTop = ${y}`
    );
    void browser.sleep(200);
  }
}
