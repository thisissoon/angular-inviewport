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

  getScrollableInnerElement() {
    return element(by.css('.scrollable__inner'));
  }

  scrollTo(x: number = 0, y: number = 0) {
    browser.executeScript(`window.scrollTo(${x},${y})`);
    browser.sleep(200);
  }

  scrollableElementScrollTop(y: number = 0) {
    browser.executeScript(
      `document.getElementsByClassName('scrollable')[0].scrollTop = ${y}`
    );
    browser.sleep(200);
  }
}
