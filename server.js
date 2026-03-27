const express = require('express');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});

const upload = multer({ storage });

let database = [];

function fakeAI() {
  return {
    model: "iPhone 14 Pro Max",
    ios: "iOS 17",
    serial: "ABC123XYZ",
    parts: ["Pin", "Màn hình"]
  };
}

app.post('/submit', upload.fields([
  { name: 'iphone', maxCount: 2 },
  { name: 'cccd', maxCount: 2 }
]), (req, res) => {
  const data = {
    id: Date.now(),
    ...req.body,
    iphone: req.files.iphone,
    cccd: req.files.cccd,
    ai: fakeAI()
  };
  database.push(data);
  res.json({ success: true, ai: data.ai });
});

app.get('/admin/data', (req, res) => {
  res.json(database);
});

app.listen(3000, () => console.log("Running..."));
