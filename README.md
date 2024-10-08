# Online Quiz Uygulaması

Bu proje, 10 sorudan oluşan bir online quiz uygulamasıdır. Kullanıcılar, başlangıç ekranındaki "Teste Başla" butonuna tıklayarak testi başlatabilir ve her soru için 30 saniye süreleri olacaktır. Sorular ve cevap şıkları, belirli kurallara göre görüntülenecektir.

## Özellikler

- **Giriş Ekranı**: Teste başlamadan önce kullanıcıları bilgilendiren bir giriş ekranı bulunur. Ekranda, testi başlatmak için bir buton vardır.
- **Teste Başla Butonu**: Giriş ekranında bulunan butonun `id`'si "start" olarak ayarlanmıştır.
- **Soru Sayısı**: Test, toplamda 10 sorudan oluşur.
- **Zaman Yönetimi**: Her soru ekranda en fazla 30 saniye kalır. İlk 4 saniye cevap şıkları görünmez.
- **Otomatik Geçiş**: Bir cevap şıkkı seçildiğinde veya 30 saniye tamamlandığında bir sonraki soruya otomatik olarak geçilir.
- **Geçmiş Sorulara Geri Dönüş Yok**: Kullanıcılar, geçmiş sorulara geri dönemez.
- **Sonuç Ekranı**: Test bitiminde, kullanıcıya her soruya verilen yanıt, doğru ve yanlış sayıları ile birlikte gösterilir.

## Kurulum

Projeyi kendi yerel makinenizde çalıştırmak için aşağıdaki adımları izleyin:

1. Bu depoyu bilgisayarınıza klonlayın:
   ```bash
   git clone https://github.com/barismutluu/Question-App.git
   ```
2. Proje dizinine gidin:
   ```bash
   cd quiz-app
   ```
3. Gerekli bağımlılıkları yükleyin:
   ```bash
   npm install
   ```
4. Projeyi çalıştırın:
   ```bash
   npm start
   ```

Bu adımlardan sonra uygulama, yerel sunucunuzda çalışmaya başlayacaktır. Varsayılan olarak [http://localhost:3000](http://localhost:3000) adresinde çalışacaktır.

## Kullanılan Teknolojiler

- **React**: Kullanıcı arayüzünü oluşturmak için.
- **JavaScript**: Projenin işlevselliğini sağlamak için.
- **CSS**: Uygulamanın stilini ve düzenini ayarlamak için.

## Tasarım

- **Genişlik**: Proje tasarımı 1400px genişliğinde okunabilir ve kullanılabilir olacak şekilde optimize edilmiştir.
- **Responsive**: Kullanıcı deneyimini iyileştirmek için CSS ile duyarlı tasarım uygulanmıştır.

## Test İşleyişi

1. Uygulama başlatıldığında giriş ekranı görünür ve "Teste Başla" butonuna tıklanması beklenir.
2. Test başladıktan sonra, her soru ekranda en fazla 30 saniye boyunca görüntülenir.
3. İlk 4 saniye boyunca cevap şıkları kullanıcıya görünmeyecektir.
4. Kullanıcı bir cevap seçtiğinde veya süre dolduğunda, bir sonraki soruya geçilir.
5. Test sona erdiğinde, kullanıcıya doğru ve yanlış cevapların sayısı gösterilir.

## Canlı Demo

Projeyi aşağıdaki bağlantıya tıklayarak canlı olarak görüntüleyebilirsiniz:

[Canlı Site - Netlify Üzerinde](https://question-app-barismutluus-projects.vercel.app/)
