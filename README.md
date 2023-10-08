# dipay-backend-technical-test

Terdapat 2 folder, yaitu main-script dan mail-service. Yang dimana mail-script adalah script utama dari program dan mail-service berupa service mailer yang nantinya akan diintegrasikan pada SMTP yang digunakan.

**Cara penggunaan main-script:**
1. Pertama masuk ke dalam folder main-script, setelah itu jalankan

```bash
$ npm install
```
2. Setelahnya, ubah file **env.example.txt** menjadi **.env**, dan lakukan konfigurasi sesuai dengan database, dan juga konfigurasi JWT.
```bash
DB_URI=mongodb://localhost:27017/(isi dengan database)
JWT_SECRET=(isi sesuai dengan keinginan)
JWT_EXPIRES=(berapa lama JWT expired / kadaluarsa)
```

3. Setelah mengisi ENV, lakukan seeder agar data admin bisa masuk ke dalam collection admins, yang nantinya akan kita pakai. Silahkan untuk menjalan command dibawah ini.

```bash
$ npm run seed
```

4. Setelah menggunakan seeder, baru kita bisa menjalankan script dengan command

```bash
$ npm run start:dev
```

5. Saya juga telah menambahkan unit testing, untuk menjalankan unit testing bisa menggunakan command
   
```bash
$ npm run test
```

6. Setelah mencoba menjalankan main-script, silahkan lanjut ke tahap selanjutnya. Untuk menjalankan mail service.

**Cara penggunaan mail-service:**
1. Pertama masuk ke dalam folder main-script, setelah itu jalankan

```bash
$ npm install
```

2. Setelahnya, ubah **env.example.txt** menjadi **.env** lalu isi konfigurasi SMTP sesuai layanan SMTP yang dipakai.
```bash
host=(isi host dari SMTP)
port=(isi port dari SMTP)
secure=(true/false)
user=(isi username dari SMTP)
pass=(isi password dari SMTP)
```

3. setelah semuanya sudah terkonfigurasi, silahkan jalankan script dengan command
```bash
$ npm run start:dev
```

**Note**
1. Pastikan main-script dan mail-service jalan secara bersamaan
2. Main-script berjalan pada port 3000, sedangkan mail-service berjalan pada port 4000
