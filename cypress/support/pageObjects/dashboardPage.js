// cypress/support/pageObjects/DashboardPage.js

class DashboardPage {
    // ------------------------------------
    // 1. SELECTORS/ELEMENTS (Getter)
    // ------------------------------------
    // Elemen yang membuktikan kita berada di Dashboard
    get dashboardHeader() { return cy.contains('.oxd-text--h6', 'Dashboard') }
    // Menu Sidebar (Directory, PIM, dll.)
    get sideBarMenuItem() { return cy.get('.oxd-main-menu-item') }
    // Tombol Logout (Biasanya berada di dropdown user)
    get userDropdown() { return cy.get('.oxd-userdropdown') }


    // ------------------------------------
    // 2. ACTIONS/FUNCTIONS
    // ------------------------------------
    
    // Fungsi ini bisa digunakan jika kita ingin langsung ke dashboard tanpa login dari test lain
    assertOnDashboard() {
        this.dashboardHeader.should('be.visible')
        cy.url().should('include', '/dashboard/index')
    }

    goToMenu(menuName) {
        // Digunakan untuk navigasi ke menu manapun (PIM, Directory, Time, dll.)
        this.sideBarMenuItem.contains(menuName).click()
    }
    
    logout() {
        this.userDropdown.click()
        cy.contains('Logout').click()
    }


    // ------------------------------------
    // 3. ASSERTIONS
    // ------------------------------------
    
    // Opsional: Cek widget penting ada
    assertWidgetVisibility() {
        cy.contains('Time at Work').should('be.visible')
        cy.contains('My Actions').should('be.visible')
    }
}
export default new DashboardPage();