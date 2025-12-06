describe('OrangeHRM - Login Feature', () => {

    // 💡 BEFORE EACH: Jalankan ini sebelum setiap Test Case (it block)
    beforeEach(() => {
        // Hanya perlu visit sekali sebelum setiap tes
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    });
    it('TC01 - Login berhasil dengan kredensial valid', () => {
        // Halaman sudah di-visit oleh beforeEach
        cy.get('input[name="username"]').type('Admin');
        cy.get('input[name="password"]').type('admin123');
        cy.get('button[type="submit"]').click();
        cy.url().should('include', '/web/index.php/dashboard/index');
    });
    it('TC02 - Login gagal dengan username salah', () => {
        // Halaman sudah di-visit oleh beforeEach
        cy.get('input[name="username"]').type('AdminSalah'); 
        cy.get('input[name="password"]').type('admin123');
        cy.get('button[type="submit"]').click();
        cy.contains('.oxd-alert-content-text', 'Invalid credentials').should('be.visible');
    });
    
    it('TC03 - Login gagal dengan password salah', () => {
    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('salahpassword'); 
    cy.get('button[type="submit"]').click();
    // Verifikasi: Cek pesan error muncul
    cy.contains('.oxd-alert-content-text', 'Invalid credentials').should('be.visible');
});
    it('TC04 - Validasi error saat field kosong', () => {
    // Tidak memasukkan input apa pun
    cy.get('button[type="submit"]').click();
    // Verifikasi: Cek pesan 'Required' muncul di bawah field username
    cy.get(':nth-child(2) > .oxd-input-group > .oxd-text').should('have.text', 'Required');
    // Cek pesan 'Required' muncul di bawah field password
    cy.get(':nth-child(3) > .oxd-input-group > .oxd-text').should('have.text', 'Required');
});
   it('TC05 - Validasi error ketika hanya username diisi', () => {
    cy.get('input[name="username"]').type('Admin');
    cy.get('button[type="submit"]').click();
    // 2. Verifikasi: Gunakan selector yang Anda temukan untuk pesan error 'Required'
    cy.get('.oxd-text.oxd-text--span.oxd-input-field-error-message.oxd-input-group__message')
      .should('be.visible')
      // Tambahkan verifikasi teks untuk memastikan itu adalah pesan 'Required' yang benar
      .and('have.text', 'Required'); 
});
    it('TC06 - Validasi error ketika hanya password diisi', () => {
    cy.get('input[name="password"]').type('admin123'); // Isi Password
    cy.get('button[type="submit"]').click();
    // 2. Verifikasi: Gunakan selector yang Anda temukan untuk pesan error 'Required'
    cy.get('.oxd-text.oxd-text--span.oxd-input-field-error-message.oxd-input-group__message')
      .should('be.visible')
      // Tambahkan verifikasi teks untuk memastikan itu adalah pesan 'Required' yang benar
      .and('have.text', 'Required'); 
});
    it('TC07 - Validasi UI halaman login tampil lengkap', () => {
    // Verifikasi Judul/Header Login
    cy.contains('.oxd-text--h5', 'Login').should('be.visible');
    // Verifikasi Logo Perusahaan terlihat
    cy.get('.orangehrm-login-logo > img').should('be.visible');
    // Verifikasi Form Username dan Password terlihat
    cy.get('input[name="username"]').should('be.visible');
    cy.get('input[name="password"]').should('be.visible');
    // Verifikasi Tombol Login terlihat
    cy.get('button[type="submit"]').should('be.visible').and('contain', 'Login');

    // Verifikasi Tautan Lupa Password terlihat
    cy.contains('.orangehrm-login-forgot-header', 'Forgot your password?').should('be.visible');
});
    it('TC08 - Placeholder text sesuai', () => {
    // Verifikasi: Cek placeholder text di field Username
    cy.get('input[name="username"]').should('have.attr', 'placeholder', 'Username');
    // Verifikasi: Cek placeholder text di field Password
    cy.get('input[name="password"]').should('have.attr', 'placeholder', 'Password');
});
    it('TC09 - Redirect ke halaman lupa password', () => {
    // Klik tautan "Forgot your password?"
    cy.contains('.orangehrm-login-forgot-header', 'Forgot your password?').click();
    // Verifikasi: Pastikan URL mengarah ke halaman lupa password
    cy.url().should('include', '/web/index.php/auth/requestPasswordResetCode');    
    });
});