describe('OrangeHRM - Login Feature with Intercept', () => {
    // 💡 BEFORE EACH: Jalankan ini sebelum setiap Test Case (it block)
    beforeEach(() => {
        // Hanya perlu visit sekali sebelum setiap tes
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    });

    const LOGIN_VALIDATE_API = 'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/auth/login';

    it('TC01 - Login berhasil dengan kredensial valid', () => {
        // Intercept request login
        cy.get('input[name="username"]').type('Admin');
        cy.get('input[name="password"]').type('admin123');    
        // Tunggu hingga request login selesai
        cy.intercept('GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/dashboard/employees/action-summary').as('actionSummary');
         cy.get('button[type="submit"]').click();
        cy.wait('@actionSummary').its('response.statusCode').should('eq', 200);  
    });

    it('TC02 - Login gagal dengan username salah', () => {
        // Intercept request login 
        cy.get('input[name="username"]').type('AdminSalah'); 
        cy.get('input[name="password"]').type('admin123');
        cy.intercept('GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/core/i18n/messages').as('messages');
        cy.get('button[type="submit"]').click();    
        // Tunggu hingga request login selesai
        cy.wait('@messages').its('response.statusCode').should('eq', 304);    
    });
    it('TC03 - Login gagal dengan password salah', () => {
        cy.get('input[name="username"]').type('Admin');
        cy.get('input[name="password"]').type('salahpassword'); 
        cy.intercept('GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/core/i18n/messages').as('messages');
        cy.get('button[type="submit"]').click();
        // Tunggu hingga request login selesai
        cy.wait('@messages').its('response.statusCode').should('eq', 304);
        // Verifikasi: Cek pesan error muncul
        cy.contains('.oxd-alert-content-text', 'Invalid credentials').should('be.visible');
    });
   it('TC04 - Validasi error saat field kosong (Intercept: TIDAK ADA Request)', () => {
        // Intercept 4: Monitoring request login
        cy.intercept('POST', LOGIN_VALIDATE_API).as('loginAttempt');

        // Aksi: Klik submit tanpa mengisi field
        cy.get('button[type="submit"]').click();
        
        // Verifikasi: Cek apakah request API 'loginAttempt' TIDAK PERNAH terjadi (have.length, 0)
        cy.get('@loginAttempt.all', { timeout: 1000 }).should('have.length', 0); // Timeout lebih singkat
        
        // Verifikasi UI: Pesan 'Required' muncul
        cy.get(':nth-child(2) > .oxd-input-group > .oxd-text').should('have.text', 'Required'); 
    });
        it('TC05 - Validasi error ketika hanya username diisi (Intercept: TIDAK ADA Request)', () => {
             cy.get('input[name="username"]').type('Admin');
                // Intercept 5: Monitoring request login
                cy.intercept('POST', LOGIN_VALIDATE_API).as('loginAttempt');
                // Aksi: Klik submit dengan hanya mengisi username
                cy.get('button[type="submit"]').click();
                // Verifikasi: Cek apakah request API 'loginAttempt' TIDAK PERNAH terjadi (have.length, 0)
                cy.get('@loginAttempt.all', { timeout: 1000 }).should('have.length', 0);
    });
    it('TC06 - Validasi error ketika hanya password diisi (Intercept: TIDAK ADA Request)', () => {
        cy.get('input[name="password"]').type('admin123'); // Isi Password
        // Intercept 6: Monitoring request login
        cy.intercept('POST', LOGIN_VALIDATE_API).as('loginAttempt');
        // Aksi: Klik submit dengan hanya mengisi password
        cy.get('button[type="submit"]').click();
        // Verifikasi: Cek apakah request API 'loginAttempt' TIDAK PERNAH terjadi (have.length, 0)
        cy.get('@loginAttempt.all', { timeout: 1000 }).should('have.length', 0);
    });
    it('TC07 - Salah mengisi username dan password', () => {
        cy.get('input[name="username"]').type('UserSalah');
        cy.get('input[name="password"]').type('PasswordSalah');
        // Intercept request login
        cy.intercept('GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/core/i18n/messages').as('messages');
        cy.get('button[type="submit"]').click();
        // Tunggu hingga request login selesai
        cy.wait('@messages').its('response.statusCode').should('eq', 304);
    });

});