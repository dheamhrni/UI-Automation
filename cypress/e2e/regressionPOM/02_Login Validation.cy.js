// cypress/e2e/validation/02_Login-Validation.cy.js

import loginPage from "../../support/pageObjects/loginPage"
import logindata from "../../fixtures/loginData.json"

describe('VALIDATION - Validasi Error Field Login', () => {

    beforeEach(() => {
        loginPage.visitPage();
    });

    it('TC04 - Validasi error saat field kosong', () => {
        loginPage.clickSubmit()
        // Kita harus memanggil assertion yang lebih spesifik untuk "Required"
        loginPage.assertionErrorLogin()
        loginPage.assertionErrorLogin()
    });
    
    it('TC05 - Validasi error ketika hanya username diisi', () => {
        loginPage.inputUsername(logindata.validUsername)
        loginPage.clickSubmit()
        loginPage.assertionErrorLogin() // Hanya Password yang kosong
    });
    
    // ... Tambahkan TC06 di sini ...
});