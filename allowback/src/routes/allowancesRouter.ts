import express from 'express';
import Allowance from '../models/Allowance';
import Member from './../models/Member';

const router = express.Router();

router.get('/', async (_, res) => {
  const allowances = await Allowance.findAll();
  res.json(allowances);
});

router.post('/', async (req, res) => {
  const { category, store, description, amount, date, memberId } = req.body;
  const allowance = await Allowance.create({ category, store, description, amount, date, memberId });
  res.json(allowance);
});
router.post('/memberCreate', async (req, res) => { // 회원 가입
  const { userEmail,password,mobile,nickname,name,birthday,city } = req.body;
  const member = await Member.create({ userEmail,password,mobile,nickname,name,birthday,city });
  res.json(member);
});

// 로그인 체크
  router.post('/loginCheck', async (req, res) => {
    const { userEmail, password } = req.body;

    try {
      const user = await Member.findOne({
        where: {
          userEmail: userEmail,
          password: password, 
        },
      });

      if (user) {
        res.status(200).json({ success: true, message: '로그인 성공!!!', user });
      } else {
        res.status(401).json({ success: false, message: '로그인 실패 아이디 또는 비밀번호가 틀렸습니다.' });
      }
    } catch (error) {
      res.status(500).json({ success: false, message: 'Server error', error });
    }
  });

  export default router;
