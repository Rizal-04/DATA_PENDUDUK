const  express = require('express');
const mysql = require('mysql');
const hbs =  require('hbs');
const bodyParser = require('body-parser');

const  app = express();
const port = 7000;

app.set('view engine', 'hbs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


var koneksi =  mysql.createConnection({
   host: 'localhost',
   user: 'rizal',
   password: '0000',
   database: 'db_penduduk'
});

koneksi.connect((err) => {
   if(err) throw err;
   console.log("Koneksi Database Berhasil disambung ya boss");
});

app.get('/', (req, res) => {
   koneksi.query('SELECT * FROM data_penduduk', (err, hasil) => {
    if(err) throw err;
    res.render('home.hbs', {
        halaman: 'DATA_PENDUDUK',
        data: hasil
      });
   });
});

app.post('/data', (req, res) => {
  var nama = req.body.inputnama;
  var alamat = req.body.inputalamat;
  var ttl = req.body.inputttl;  
  var golongandarah = req.body.inputgolongandarah;
  var telepon= req.body.inputtelepon;
  koneksi.query('INSERT INTO data_penduduk( nama, alamat, ttl, golongan_darah, telepon) VALUES( ?, ?, ?, ?, ?)',
        [  nama, alamat, ttl, golongandarah,telepon ],
            (err, hasil) => {
                if(err) throw err;
                res.redirect('/');
                }
          )
});
app.listen(port, () => {
    console.log(`App berjalan pada port ${port}`);
});