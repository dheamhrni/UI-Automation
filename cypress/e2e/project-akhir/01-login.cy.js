// cypress/e2e/01_login.cy.js
import LoginPageclass from '../../support/pageObjects/loginPage';
import orangehrmData from '../../fixtures/orangehrmData.json';

describe('Login Feature Tests', () => {
    const loginPage = LoginPageclass; 

    beforeEach(() => {
        loginPage.visitPage();
    });

    it('L01 - login berhasil username dan password benar', () => {
        loginPage.login(orangehrmData.validUser.username, orangehrmData.validUser.password);
        loginPage.assertLoginSuccess();
    });

    it('L02 - login gagal dengan username yang salah', () => {
        loginPage.login(orangehrmData.invalidUser.username, orangehrmData.validUser.password);
        loginPage.assertLoginError('Invalid credentials');
    });

    it('L03 - login gagal dengan password yang salah', () => {
        loginPage.login(orangehrmData.validUser.username, orangehrmData.invalidUser.password);
        loginPage.assertLoginError('Invalid credentials');
    });

    it('L04 - login gagal tidak mengisi username dan password', () => {
        loginPage.login(' ', ' '); // Mengirim spasi;
        loginPage.assertRequiredField(2); 
    });

    it('L05 - login gagal tidak mengisikan username', () => {
        loginPage.login(' ', orangehrmData.validUser.password);
        loginPage.assertRequiredField(1);
    });

    it('L06 - login gagal tidak mengisikan password', () => {
        loginPage.login(orangehrmData.validUser.username, ' ');
        loginPage.assertRequiredField(1);
    });
    it('L07 - Should display all UI elements correctly', () => {
        loginPage.assertUILengkap();
    });
});