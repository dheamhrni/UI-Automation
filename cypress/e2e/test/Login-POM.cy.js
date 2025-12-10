import loginPage from "../../support/pageObjects/loginPage"
import logindata from "../../fixtures/loginData.json"
describe('OrangeHRM - Login Feature', () => {

    // 💡 BEFORE EACH: Jalankan ini sebelum setiap Test Case (it block)
    beforeEach(() => {
        // Hanya perlu visit sekali sebelum setiap tes
        loginPage.visitPage();
    });
    it('TC01 - Login berhasil dengan kredensial valid', () => {
        // Halaman sudah di-visit oleh beforeEach
        loginPage.inputUsername(logindata.validUsername)
        loginPage.inputPassword(logindata.validPassword)
        loginPage.clickSubmit()
        loginPage.assertionlogin()
    });
    
    it('TC02 - Login gagal dengan username salah', () => {
        // Halaman sudah di-visit oleh beforeEach
        loginPage.inputUsername(logindata.invalidUsername)
        loginPage.inputPassword(logindata.validPassword)
        loginPage.clickSubmit()
        loginPage.assertionErrorLogin()
    });
    
    it('TC03 - Login gagal dengan password salah', () => {
    loginPage.inputUsername(logindata.validUsername)
    loginPage.inputPassword(logindata.invalidPassword)
    loginPage.clickSubmit()
    loginPage.assertionErrorLogin()
});
    it('TC04 - Validasi error saat field kosong', () => {
    // Tidak memasukkan input apa pun
    loginPage.clickSubmit()
    loginPage.assertionErrorLogin()
});
it('TC05 - Validasi error ketika hanya username diisi', () => {
    loginPage.inputUsername(logindata.validUsername)
    loginPage.clickSubmit()
    loginPage.assertionErrorLogin()
});
    it('TC06 - Validasi error ketika hanya password diisi', () => {
    loginPage.inputPassword(logindata.validPassword)
    loginPage.clickSubmit()
    loginPage.assertionErrorLogin()
});
    it('TC07 - Validasi eror ketika salah mengisi username dan password', () => {
    loginPage.inputUsername(logindata.invalidUsername)
    loginPage.inputPassword(logindata.invalidPassword)
    loginPage.clickSubmit()
    loginPage.assertionErrorLogin()
    });
    it('TC08 - Validasi UI halaman login tampil lengkap', () => {
    loginPage.assertionUILengkap()
    });
    it('TC09 - Validasi Placeholder pada field Username dan Password', () => {
    loginPage.assertionPlaceholder()
    });
    it('TC10 - redirect kehalaman lupa password', () => {
        loginPage.redirectLupaPassword()
    });
});