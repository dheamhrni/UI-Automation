# 🍊 OrangeHRM Automation Testing (Cypress & POM)

Proyek ini adalah otomasi pengujian untuk website **OrangeHRM Demo** menggunakan **Cypress**. Fokus utama proyek ini adalah mengimplementasikan desain pola **Page Object Model (POM)** dan penggunaan **Cypress Intercept** untuk verifikasi API yang lebih akurat.

## 🚀 Fitur yang Diuji
Proyek ini mencakup skenario pengujian komprehensif untuk fitur berikut:
1.  **Login:** Validasi kredensial, proteksi keamanan, dan manajemen sesi.
2.  **Forgot Password:** Alur pemulihan akun dan validasi pengiriman pesan.
3.  **Dashboard (Directory):** Pencarian karyawan, navigasi menu, dan validasi data hasil pencarian.

## 🛠️ Tech Stack
- **Framework:** [Cypress](https://www.cypress.io/)
- **Bahasa:** JavaScript
- **Pola Desain:** Page Object Model (POM)
- **Verifikasi Network:** `cy.intercept()` (untuk memantau dan memverifikasi permintaan API backend)

## 📁 Struktur Folder
Proyek ini disusun secara modular untuk memudahkan pemeliharaan kode:
```text
cypress/
├── e2e/               # File test case (Spec files)
├── pages/             # Page Objects (Locator & Action)
├── support/           # Custom commands dan konfigurasi global
├── fixtures/          # Data statis untuk pengujian
