const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const mysql = require('mysql');

// middleware
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use(cors());
app.use(express.static('dist'));
app.set('view engine', 'ejs');

// mysql Connection
const pool = mysql.createPool({
  connectionLimit :  10,
  host            : '162.241.60.122',
  user            : 'techcour_shrinke',
  password        : 'n4mDKGcAbb[G',
  database        : 'techcour_raw'
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/dist/index.html'));
});

app.post('/getcourse/:name', (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) {
      res.send(err);
      return;
    }
    const originalName = Buffer.from(req.params.name, 'base64').toString();
    connection.query(`SELECT * FROM tnt_file where file_name = '${req.params.name}'`, (err, result) => {
      if (err) {
        console.log(err);
        res.send(err)
      } else {
        if (result.length) {
          var fileData = new Buffer.from(result[0].tnt);
          res.writeHead(200, {
            'Content-Disposition': `attachment; filename="${originalName}.torrent"`,
            'Content-Type': result[0].type,
            'Content-Length': fileData.length
          });
          res.write(fileData);
          res.end();
        } else {
          res.send(result);
        }
      }
    });
  })
});

app.listen(process.env.PORT || 4000, () => {
  console.log(`Server running on port ${process.env.PORT || 4000}`);
});
