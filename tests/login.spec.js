
const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { InventoryPage } = require('../pages/InventoryPage');
const testData = require('../data/users.json');

test.describe('Sauce Demo - POM Data Driven Login Tests', () => {

  testData.forEach(({ username, password, expected }) => {

    test(`Login test for user: "${username}" with expected outcome: "${expected}"`, async ({ page }) => {

      const loginPage = new LoginPage(page);
      const inventoryPage = new InventoryPage(page);

      // Navigate to login page
      await loginPage.navigate();

      // Login with test data
      await loginPage.login(username, password);

      // Verify expected result
      if (expected === 'success') {
        const isInventoryLoaded = await inventoryPage.isLoaded();
        expect(isInventoryLoaded).toBe(true);

      } else if (expected === 'error') {
        const errorText = await loginPage.getErrorMessage();
        expect(errorText).not.toBe('');
      }

    });

  });

});
