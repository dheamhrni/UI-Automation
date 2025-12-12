// cypress/support/pageObjects/DirectoryPage.js
class DirectoryPageClass {
    // ------------------------------------
    // 1. SELECTORS/ELEMENTS (Getter)
    // ------------------------------------
    get sideBarMenuItem() { return cy.get('.oxd-main-menu-item') }
    get searchNameField() { return cy.get('.oxd-input-field-bottom-space').eq(0).find('input') }
    get searchButton() { return cy.get('.oxd-form-actions > .oxd-button--secondary') }
    get resultTableRows() { 
        return cy.get('.orangehrm-container .oxd-grid-item') 
    }
    get noRecordsFound() { 
    return cy.contains('.orangehrm-horizontal-padding', 'No Records Found') 
    }

    // ------------------------------------
    // 2. ACTIONS/FUNCTIONS
    // ------------------------------------
    goToDirectory() {
        this.sideBarMenuItem.contains('Directory').click()
    }

        searchEmployee(name) {
        // Hapus type dari sini jika Anda ingin memisahkannya di file test
        this.searchNameField.type(name).should('have.value', name);
        this.searchButton.click();
    }

    // ------------------------------------
    // 3. ASSERTIONS
    // ------------------------------------
    assertDirectoryLoaded() {
        cy.url().should('include', '/directory/viewDirectory');
        cy.contains('.oxd-text--h5', 'Directory').should('be.visible');
    }
}
export default new DirectoryPageClass();