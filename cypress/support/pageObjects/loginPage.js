class loginPage {
    visitPage() {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    }
    inputUsername(username) {
        cy.get('input[placeholder="Username"]').type(username).should('have.value', username)
    }
    inputPassword(password) {
        cy.get('input[placeholder="Password"]').type(password).should('have.value', password)
    }
    clickSubmit() {
        cy.get('button[type="submit"]').should('be.visible').click()
    }
    assertionlogin() {
        cy.url().should('include', '/web/index.php/dashboard/index');
    }
    assertionErrorLogin() {
        cy.url().should('not.include', '/web/index.php/dashboard/index');
    }
    assertionUILengkap() {
        // Verifikasi Judul/Header Login
        cy.contains('.oxd-text--h5', 'Login').should('be.visible'); 
        // Verifikasi Logo Perusahaan terlihat
        cy.get('.orangehrm-login-logo > img').should('be.visible');
        // Verifikasi Form Username dan Password terlihat   
        cy.get('input[name="username"]').should('be.visible');
        cy.get('input[name="password"]').should('be.visible');
        // Verifikasi Tombol Login terlihat
        cy.get('button[type="submit"]').should('be.visible').and('contain', 'Login');
}
    assertionPlaceholder() {
        cy.get('input[placeholder="Username"]').should('have.attr', 'placeholder', 'Username');
        cy.get('input[placeholder="Password"]').should('have.attr', 'placeholder', 'Password');
    }
    redirectLupaPassword() {
        cy.contains('Forgot your password?').should('be.visible').click();
        cy.url().should('include', '/web/index.php/auth/requestPasswordResetCode');
}
}
export default new loginPage();
