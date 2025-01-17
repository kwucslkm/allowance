import express from 'express';
import Allowance from '../models/Allowance';
import Member from './../models/Member';
import bcrypt from 'bcrypt';
import bodyParser from 'body-parser';

const router = express.Router();

const app = express();
app.use(bodyParser.json());
// router.get('/', async (_, res) => {
//   try{
//     const allowances = await Allowance.findAll();
//     res.json(allowances);
//   } catch (error) {
//     console.error('Error creating allowance:', error);
//     res.status(500).json({ error: 'Failed to create allowance' });
//   }
// });
interface AllowanceRequest {
  category?: string; // 선택적 필드
  store?: string;    // 선택적 필드
  description: string;
  amount: number;
  date?: string;     // 선택적 필드
  memberId: string;
}

router.post('/', async (req, res) => {
  try{
    const { category, store, description, amount, date, memberId } = req.body;
    
    const allowance = await Allowance.create({ category, store, description, amount, date, memberId });
    res.json(allowance);
  }catch(error){
    console.error('Error creating allowance:', error);
    res.status(500).json({ error: 'Failed to create allowance' });
  }
});
router.post('/memberCreate', async (req, res) => { // 회원 가입
  try{
    let { userEmail,password,mobile,nickname,name,birthday,city } = req.body;
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);
    
    const member = await Member.create({ userEmail,password,mobile,nickname,name,birthday,city });
    res.json(member);
  }catch(error){
    console.error('Error creating allowance:', error);
    res.status(500).json({ error: 'Failed to create allowance' });
  }
});

// 로그인 체크
  router.post('/loginCheck', async (req, res) => {
    let { userEmail, password } = req.body;

    try {
      // const salt = await bcrypt.genSalt(10);
      // password = await bcrypt.hash(password, salt);
      console.log("password = > ",password);
      const user = await Member.findOne({
        where: {
          userEmail
          // password: password, /
        }
      });
      if (!user) {
        res.status(401).json({ success: false, message: '로그인 실패 아이디 또는 비밀번호가 틀렸습니다.' });
      }else{
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
          res.status(401).json({ success: false, message: '로그인 실패 아이디 또는 비밀번호가 틀렸습니다.' });
        }else{
          res.status(200).json({ success: true, message: '로그인 성공!!!', user });
        }
      } 
    }catch (error) {
      res.status(500).json({ success: false, message: 'Server error', error });
    }
  });
  
  // 아이디로 지출내역 select 해오기
  router.post('/findAlloanceByMemberId', async (req, res) => {
    const  {memberId}  = req.body;
    console.log("memberId to db = >",memberId);
    try {
      const Allowances = await Allowance.findAll({
        where: {
            memberId: memberId,
        },
      });
      console.log("회원지출내역조회 1 ",Allowances);
      if (Allowances) {
        res.status(200).json({ success: true, message: '회원지출내역 조회 성공!!!', Allowances });
      } else {
        res.status(401).json({ success: false, message: '지출 내역 조회 실패' });
      }
    } catch (error) {
      res.status(500).json({ success: false, message: 'Server error', error });
    }
  });


  export default router;
