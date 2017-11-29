import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getSmallElement() {
    return element(by.css('.small-element'));
  }

  getLargeElement() {
    return element(by.css('.large-element'));
  }

  getInsideScrollableElement() {
    return element(by.css('.inside-scrollable'));
  }

  scrollTo(x: number = 0, y: number = 0) {
    browser.executeScript(`window.scrollTo(${x},${y})`);
    browser.sleep(200);
  }

  scrollableElementScrollTop(y: number = 0) {
    browser.executeScript(`document.getElementsByClassName('scrollable')[0].scrollTop = ${y}`);
    browser.sleep(200);
  }
}
