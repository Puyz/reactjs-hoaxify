import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { register } from 'timeago.js';

i18n.use(initReactI18next).init({
    resources: {
        en: {
            translations: {
                'Sign Up': 'Sign up',
                'Login': 'Login',
                'Logout': 'Logout',
                'User name': 'User name',
                'Display name': 'Display name',
                'Password': 'Password',
                'Password Repeat': 'Password repeat',
                'Password Mismatch': 'Password mismatch',
                'Users': 'Users',
                'Next': 'Next',
                'Previous': 'Previous',
                'Load Failure': 'An error occurred while listing.',
                'User not found': 'User not found.',
                'Edit': 'Edit',
                'Update': 'Update',
                'Close': 'Close',
                'Save': 'Save',
                'Delete': 'Delete',
                'Cancel': 'Cancel',
                'My Profile': 'My profile',
                'There are no hoaxes': 'There are no hoaxes',
                'Load old hoaxes': 'Load old hoaxes',
                'There are new hoaxes': 'There are new hoaxes',
                'Delete Hoax': 'Delete Hoax',
                'Are you sure to delete hoax?':'Are you sure to delete hoax?',
                'Delete My Account':'Delete My Account',
                'Are you sure to delete your account?':'Are you sure to delete your account?'
            }
        },
        tr: {
            translations: {
                'Sign Up': 'Kayıt ol',
                'Login': 'Giriş yap',
                'Logout': 'Çıkış yap',
                'User name': 'Kullanıcı adı',
                'Display name': 'Görünen isim',
                'Password': 'Şifre',
                'Password Repeat': 'Şifre tekrarı',
                'Password Mismatch': 'Şifre eşleşmiyor.',
                'Users': 'Kullanıcılar',
                'Next': 'Sonraki',
                'Previous': 'Önceki',
                'Load Failure': 'Listeleme sırasında bir hata oluştu.',
                'User not found': 'Kullanıcı bulunamadı.',
                'Edit': 'Düzenle',
                'Update': 'Güncelle',
                'Close': 'Kapat',
                'Save': 'Kaydet',
                'Delete': 'Sil',
                'Cancel': 'İptal Et',
                'My Profile': 'Profilim',
                'There are no hoaxes': 'Hoaxes bulunamadı',
                'Load old hoaxes': 'Geçmiş hoaxları getir',
                'There are new hoaxes': 'Yeni hoaxlar var',
                'Delete Hoax': `Hoax'u Sil`,
                'Are you sure to delete hoax?':`Hoax'u silmek istediğinizden emin misiniz?`,
                'Delete My Account':'Hesabımı Sil',
                'Are you sure to delete your account?':'Hesabınızı silmek istediğinizden emin misiniz?'

            }
        }
    },
    fallbackLng: 'tr',
    ns: ['translations'], // ns = namespace
    defaultNS: 'translations',
    keySeparator: false,
    interpolation: {
        escapeValue: false,
        formatSeparator: ','
    },
    react: {
        wait: true
    }
});


const timeagoTR = (number, index) => {
    return [
      ['az önce', 'şimdi'],
      ['%s saniye önce', '%s saniye içinde'],
      ['1 dakika önce', '1 dakika içinde'],
      ['%s dakika önce', '%s dakika içinde'],
      ['1 saat önce', '1 saat içinde'],
      ['%s saat önce', '%s saat içinde'],
      ['1 gün önce', '1 gün içinde'],
      ['%s gün önce', '%s gün içinde'],
      ['1 hafta önce', '1 hafta içinde'],
      ['%s hafta önce', '%s hafta içinde'],
      ['1 ay önce', '1 ay içinde'],
      ['%s ay önce', '%s ay içinde'],
      ['1 yıl önce', '1 yıl içinde'],
      ['%s yıl önce', '%s yıl içinde'],
    ][index];
  }

  register('tr', timeagoTR);

export default i18n;