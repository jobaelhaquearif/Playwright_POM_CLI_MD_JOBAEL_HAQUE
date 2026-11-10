class InventoryPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.pageTitle = page.locator('[data-test="title"]'); 
    this.productList = page.locator('[data-test="inventory-item"]'); 
  }

async isLoaded() {
    try {
        await this.pageTitle.waitFor({
            state: 'visible',
            timeout: 10000
        });
        return true;
    } catch (error) {
        return false;
    }
}
}

module.exports = { InventoryPage };
