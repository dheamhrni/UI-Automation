// cypress/support/pageObjects/LoginPage.js
class LoginPage {
    // ------------------------------------
    // 1. SELECTORS/ELEMENTS (Getter)
    // ------------------------------------
    get usernameField() { return cy.get('input[placeholder="Username"]') }
    get passwordField() { return cy.get('input[placeholder="Password"]') }
    get loginButton() { return cy.get('button[type="submit"]') }
    get forgotPasswordLink() { return cy.contains('Forgot your password?') }
    get loginHeader() { return cy.contains('.oxd-text.oxd-text--h5', 'Login') }
    get errorAlert() { return cy.get('.oxd-alert-content-text') }
    get requiredMessages() { return cy.get('.oxd-input-field-error-message:contains("Required")')}
    get resetPasswordButton() { return cy.get('button[type="submit"]').contains('Reset Password'); 
    
    }
    visitPage() {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login') 
}
    login(username, password) {
        this.usernameField.type(username)
        this.passwordField.type(password)
        this.loginButton.click()
    }
    goToForgotPassword() {
        this.forgotPasswordLink.click();
        cy.url().should('include', '/auth/requestPasswordResetCode');
    }
        requestPasswordReset(username) {
        this.usernameField.type(username);
        cy.contains('button', 'Reset Password').click(); 
    }
    
    logout() {
    cy.get('.oxd-userdropdown').click();
    cy.contains('.oxd-dropdown-menu', 'Logout').click();
    cy.clearCookies();
    cy.visit('/web/index.php/auth/login');
    cy.url().should('include', '/auth/login'); 
    cy.contains('.oxd-text--h5', 'Login').should('be.visible');
}
    // ------------------------------------
    // 3. ASSERTIONS
    // ------------------------------------
    assertLoginSuccess() {
        cy.url().should('include', '/web/index.php/dashboard/index');
    }

    assertLoginError(message) {
        cy.url().should('not.include', '/web/index.php/dashboard/index');
        this.errorAlert.should('be.visible').and('contain', message);
    }
    
// ... di bagian assertions
    assertRequiredField(count = 1) { // Default count diubah menjadi 1
        this.requiredMessages.should('have.length', count).and('be.visible');
    }

    assertUILengkap() {
        this.loginHeader.should('be.visible');
        cy.get('.orangehrm-login-logo > img').should('be.visible');
        this.usernameField.should('be.visible').and('have.attr', 'placeholder', 'Username');
        this.passwordField.should('be.visible').and('have.attr', 'placeholder', 'Password');
        this.loginButton.should('be.visible').and('contain', 'Login');
    }
}
export default new LoginPage();