const express = require('express');
const app = express();
const port = 5000;

const bodyParser = require('body-parser');
const { User } = require('./models/User');

const config = require('./config/key');

//아래는 각각 bodyParser가 각 포멧에 따라 분석하기 위한 설정
//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//application/json
app.use(bodyParser.json());

const mongoose = require('mongoose');
mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('MongoDB connected...'))
  .catch((err) => console.log(err));

//회원가입을 위한 라우트

app.get('/', (req, res) => res.send('Hello World! _nodemon started'));

app.post('/register', (req, res) => {
  //회원 가입 할때 필요한 정보들을 client에서 가져오면
  //그것들을 데이터 베이스에 넣어준다.
  //req.body 내부에 아래와 같이 들어 있다.(by bodyParser)
  // {
  //   id: 'hello',
  //   password: '123'
  // }
  const user = new User(req.body);

  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
});

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
