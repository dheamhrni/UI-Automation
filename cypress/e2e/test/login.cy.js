describe ('Scenario Login', () => {
    it('TC-001 - Akses Login', ()=>{
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
        cy.get('input[name="username"]').type('Admin')
        cy.get('input[name="password"]').type('admin123')
        cy.get('button[type="submit"]').click()
         cy.url().should('include', '/dashboard')
  })
    it('TC-002 - gagal login dan password salah', ()=>{
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
        cy.get('input[name="username"]').type('Admin')
        cy.get('input[name="password"]').type('admin12')
        cy.get('button[type="submit"]').click()
            cy.get('.oxd-alert-content-text').should('contain', 'Invalid credentials')

})
    it ('TC-003 - gagal login dan username salah', ()=>{
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
        cy.get('input[name="username"]').type('Admi')
        cy.get('input[name="password"]').type('admin123')
        cy.get('button[type="submit"]').click()
            cy.get('.oxd-alert-content-text').should('contain', 'Invalid credentials')
})
})

describe ('Dashboard Elements', () => {
     beforeEach(() => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
        cy.get('input[name="username"]').type('Admin')
        cy.get('input[name="password"]').type('admin123')
        cy.get('button[type="submit"]').click()
        cy.url().should('include', '/dashboard')
    })
    it('TC-004 - Cek elemen dashboard', () => {
           cy.get('.oxd-topbar-header-breadcrumb > .oxd-text', { timeout: 10000 })
      .should('contain', 'Dashboard')
         cy.get('.oxd-sidepanel',{timeout: 10000 }).should('be.visible')
            cy.get('.oxd-topbar-header-userarea',{timeout: 10000 }).should('be.visible')

     }) 
    it('TC-005 - Logout dari aplikasi', () => {
   cy.get('.oxd-userdropdown-name', { timeout: 10000 }).should('be.visible').click()
cy.contains('Logout').should('be.visible').click()
    cy.url().should('include', '/auth/login')
    })
 })  