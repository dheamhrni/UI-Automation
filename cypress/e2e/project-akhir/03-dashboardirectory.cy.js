// cypress/e2e/03_dashboardDirectory.cy.js

// Perbaikan 1: Pastikan impor benar dari folder 'project-akhir'
import LoginPageclass from '../../support/pageObjects/loginPage'; // Perlu 2x naik
import DirectoryPageClass from '../../support/pageObjects/directoryPage'; // Hanya 1x naik
import orangehrmData from '../../fixtures/orangehrmData.json';

describe('Directory Menu and Intercept Tests', () => {
    // Perbaikan 2: Wajib membuat instansi objek (new) dari class
    const loginPage = LoginPageclass;
    const directoryPage = DirectoryPageClass;

    beforeEach(() => {
        loginPage.visitPage();
        loginPage.login(orangehrmData.validUser.username, orangehrmData.validUser.password);
        loginPage.assertLoginSuccess();
    });

    it('D01 - Berhasil menavigasi ke halaman Direktori', () => {
        directoryPage.goToDirectory();
        directoryPage.assertDirectoryLoaded();
    });

    it('D02 - Should verify Directory search API call and status (Cypress Intercept)', () => {
        // 1. Definisikan Intercept SEBELUM aksi navigasi
        // OrangeHRM biasanya menggunakan GET untuk load pertama
        cy.intercept('GET', '**/directory/employees**').as('searchDirectoryAPI');
        // 2. Aksi: Navigasi ke Directory
        directoryPage.goToDirectory();
        cy.wait('@searchDirectoryAPI').its('response.statusCode').should('eq', 200);
        directoryPage.assertDirectoryLoaded();
    });

    it('D03 - Berhasil mencari karyawan yang terdaftar', () => {
        directoryPage.goToDirectory();
        cy.intercept('GET', '**/api/v2/directory/employees?nameOrId=**').as('finalSearch');
        directoryPage.searchEmployee(orangehrmData.existingEmployee);
        cy.wait('@finalSearch').its('response.statusCode').should('eq', 200);
        directoryPage.resultTableRows.should('have.length.greaterThan', 0);
    });

    it('D04 - Should show No Records Found for non-existing employee', () => {
        directoryPage.goToDirectory();
        directoryPage.searchEmployee(orangehrmData.nonExistingEmployee); 
        directoryPage.noRecordsFound.should('be.visible');
        directoryPage.resultTableRows.should('not.exist');
    });
    it('D05 - Harus berhasil menavigasi ke halaman PIM', () => {
        cy.contains('.oxd-main-menu-item', 'PIM').click();
        cy.url().should('include', '/pim/viewEmployeeList');
        cy.contains('.oxd-table-filter', 'Employee Information').should('be.visible');
    });
    it('D06 - Harus berhasil menavigasi ke halaman Waktu (Time)', () => {
        cy.contains('.oxd-main-menu-item', 'Time').click();
        cy.url().should('include', '/time/viewEmployeeTimesheet');
        cy.contains('.oxd-topbar-body-nav-tab', 'Timesheets').should('be.visible');
    });
    it('D07 - Harus memverifikasi semua widget utama di Dashboard terlihat', () => {
        cy.contains('.orangehrm-dashboard-widget', 'Time at Work').should('be.visible');
        cy.contains('.orangehrm-dashboard-widget', 'My Actions').should('be.visible');
        cy.contains('.orangehrm-dashboard-widget', 'Quick Launch').should('be.visible');
    });
    it('D08 - Harus memverifikasi opsi Logout terlihat di dropdown user', () => {
        cy.get('.oxd-userdropdown').click();
        cy.contains('.oxd-dropdown-menu', 'Logout').should('be.visible'); 
        cy.get('.oxd-userdropdown').click(); //
    });
    it('D09 - Harus berhasil melakukan Logout', () => {
    loginPage.logout(); // Aksi 1: Logout (Memuat logic dari POM)
    cy.visit('/web/index.php/dashboard/index'); // Aksi 2: Coba kunjungi Dashboard
    cy.url().should('include', '/auth/login'); // Assertion 1: Harusnya di Login
    cy.contains('.oxd-text--h5', 'Login').should('be.visible');
    });
});