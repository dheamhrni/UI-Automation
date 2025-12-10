// cypress/e2e/ui-checks/03_Login-UI.cy.js

import loginPage from "../../support/pageObjects/loginPage"

describe('UI CHECKS - Validasi Tampilan Halaman Login', () => {

    beforeEach(() => {
        loginPage.visitPage();
    });

    it('TC08 - Validasi UI halaman login tampil lengkap', () => {
        loginPage.assertionUILengkap()
    });
    
    it('TC09 - Validasi Placeholder pada field Username dan Password', () => {
        loginPage.assertionPlaceholder()
    });
    
    it('TC10 - Redirect ke halaman lupa password', () => {
        loginPage.redirectLupaPassword()
    });
});