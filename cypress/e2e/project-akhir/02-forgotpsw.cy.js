// cypress/e2e/02_forgotPassword.cy.js

import LoginPageclass from '../../support/pageObjects/loginPage';
import orangehrmData from '../../fixtures/orangehrmData.json';

describe('Forgot Password Feature Tests', () => {
    const loginPage = LoginPageclass;

    beforeEach(() => {
        loginPage.visitPage();
    });

    it('F01 - Permintaan reser Password berhasil dengan username yang benar', () => {
        loginPage.goToForgotPassword();
        loginPage.requestPasswordReset(orangehrmData.validUser.username);
        cy.contains('.oxd-text--h6', 'Reset Password link sent successfully', { timeout: 10000 })
        .should('be.visible');
    });

    it('F02 - Permintaan reset password gagal tidak mengisikan username', () => {
        loginPage.goToForgotPassword();
        loginPage.usernameField.clear();
        loginPage.resetPasswordButton.click();
        loginPage.assertRequiredField(1);
    });

    it('F03 - Permintaan reset password gagal mengisikan username yang salah', () => {
        loginPage.goToForgotPassword();
        loginPage.requestPasswordReset(' ');
        loginPage.assertRequiredField(1);
    });

    it('F04 - Dapat dialihkan kembali ke halaman login dari halaman reset', () => {
        loginPage.goToForgotPassword();
        cy.contains('button', 'Cancel').click();
        cy.url().should('include', '/web/index.php/auth/login');
    });
});