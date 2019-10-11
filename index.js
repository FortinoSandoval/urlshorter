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
const connection = mysql.createConnection({
  host     : '162.241.60.122',
  user     : 'techcour_adm',
  password : 'Fortielchilo',
  database : 'techcour_raw'
});



app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/dist/index.html'));
});

app.post('/getcourse/:name', (req, res) => {
  connection.connect();
  const originalName = Buffer.from(req.params.name, 'base64').toString();
  connection.query(`SELECT * FROM tnt_file where file_name = '${originalName}'`, (err, result) => {
    if (err) {
      console.log(err);
      res.send('error')
    } else {
      if (result.length) {
        var fileData = new Buffer.from(result[0].tnt);
        res.writeHead(200, {
          'Content-Type': result[0].type,
          'Content-Disposition': `attachment; filename=${originalName}.torrent`,
          'Content-Length': fileData.length
        });
        res.write(fileData);
        res.end();
      } else {
        res.send('something went wrong');
      }
    }
  });
  connection.end();
});

app.listen(process.env.PORT || 4000, () => {
  console.log(`Server running on port ${process.env.PORT || 4000}`);
});