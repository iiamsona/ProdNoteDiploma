const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const cors = require('cors');

const { userRouter } = require('./router/user.router');
const { paperRouter } = require('./router/paper.router');
const { coverRouter } = require('./router/cover.router');
const { adminRouter } = require('./router/admin.router');
const { auth } = require('./middleware/auth.middleware');
const { adminMiddleware } = require('./middleware/admin.middleware');
const { templateRouter } = require('./router/template.router');
const { orderRouter } = require('./router/order.router');

const app = express();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './files')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    const fileExtension = file.originalname.split('.')[file.originalname.split('.').length - 1];
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + fileExtension)
  }
})
const upload = multer({ storage });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cors());

app.use('/user', userRouter);
app.use('/paper', paperRouter);
app.use('/cover', coverRouter);
app.use('/admin', adminRouter);
app.use('/template', templateRouter);
app.use('/order', orderRouter);
app.post('/upload', auth, adminMiddleware, upload.single('file'), (req, res, next) => {
  res.status(200).json({ filename: req.file.filename });
});

app.use('/files', express.static(path.join(__dirname, 'files')));

app.use((req, res, next) => {
  res.status(404).json({ msg: 'Տվյալները չեն գտնվել' });
});

app.use((err, req, res, next) => {
  console.log(err)
  res.status(500).json({ msg: 'Ծրագրային խնդիր' });
});

app.listen(8083);