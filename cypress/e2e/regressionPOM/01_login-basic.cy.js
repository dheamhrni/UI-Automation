// cypress/e2e/regression/01_Login-Basic.cy.js

import loginPage from "../../support/pageObjects/loginPage"
import logindata from "../../fixtures/loginData.json"

describe('REGRESSION - Login Fungsionalitas Dasar', () => {

    beforeEach(() => {
        loginPage.visitPage();
    });

    it('TC01 - Login berhasil dengan kredensial valid (POSITIF)', () => {
        loginPage.inputUsername(logindata.validUsername)
        loginPage.inputPassword(logindata.validPassword)
        loginPage.clickSubmit()
        loginPage.assertionlogin()
    });

    it('TC02 - Login gagal dengan username salah (NEGATIF)', () => {
        loginPage.inputUsername(logindata.invalidUsername)
        loginPage.inputPassword(logindata.validPassword)
        loginPage.clickSubmit()
        loginPage.assertionErrorLogin()
    });
    
    // ... Tambahkan TC03 dan TC07 di sini ...
});