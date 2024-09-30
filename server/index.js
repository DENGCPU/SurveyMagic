require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const admin = require('firebase-admin');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// 初始化 Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  }),
});

// 从环境变量中获取 MongoDB 连接详情
const mongoHost = process.env.MONGO_HOST;
const mongoPort = process.env.MONGO_PORT;
const mongoDatabase = process.env.MONGO_DATABASE;
const mongoUser = process.env.MONGO_USER;
const mongoPassword = process.env.MONGO_PASSWORD;

const mongoURI = `mongodb://${mongoUser}:${mongoPassword}@${mongoHost}:${mongoPort}/${mongoDatabase}`;

// 连接到 MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('已连接到 MongoDB'))
  .catch((err) => console.error('连接 MongoDB 失败:', err));

// 创建问卷模型
const SurveySchema = new mongoose.Schema({
  userId: String,
  title: String,
  questions: [{ type: Object }],
  createdAt: { type: Date, default: Date.now },
});

const Survey = mongoose.model('Survey', SurveySchema);

// 中间件
app.use(cors());
app.use(express.json());

// Firebase 身份验证中间件
const authenticateUser = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: '未提供身份验证令牌' });
  }

  const token = authHeader.split('Bearer ')[1];
  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error('验证令牌失败:', error);
    res.status(401).json({ error: '无效的身份验证令牌' });
  }
};

// 路由
app.post('/api/saveSurvey', authenticateUser, async (req, res) => {
  try {
    const { title, questions } = req.body;
    const userId = req.user.uid;

    const newSurvey = new Survey({
      userId,
      title,
      questions,
    });

    await newSurvey.save();
    res.status(201).json({ message: '问卷已保存', surveyId: newSurvey._id });
  } catch (error) {
    console.error('保存问卷失败:', error);
    res.status(500).json({ error: '保存问卷时出错' });
  }
});

// 启动服务器
app.listen(port, () => {
  console.log(`服务器运行在端口 ${port}`);
});
