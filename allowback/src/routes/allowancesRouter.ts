import bcrypt from 'bcryptjs';
import express from 'express';
import Allowances from '../models/Allowance';
import Member from './../models/Member';

const router = express.Router();

// const app = express();
// app.use(bodyParser.json());

/** ✅ 목록 or 헬스 체크 용 GET 엔드포인트 추가 */
router.get('/', async (_req, res) => {
  try {
    const rows = await Allowances.findAll();   // 필요시 where 조건 넣어도 됨
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch allowances' });
  }
});

router.get('/members', async (_, res) => {
  try{
    const members = await Member.findAll();
    res.json(members);
  } catch (error) {
    console.error('Error creating allowance:', error);
    res.status(500).json({ error: 'Failed to create allowance' });
  }
});
// interface  {
//   category?: string; 
//   store?: string;    
//   description: string;
//   amount: number;
//   date?: string;     
//   memberId: string;
// }

router.post('/', async (req, res) => {
  try{
    const { category, store, description, amount, memberId } = req.body;
    
    const allowance = await Allowances.create({ category, store, description, amount, memberId });
    res.json(allowance);
  }catch(error){
    console.error('Error creating allowance:', error);
    res.status(500).json({ error: 'Failed to create allowance' });
  }
});

router.post('/memberCreate', async (req, res) => { // 회원 가입
  // const memberCreate: RequestHandler = async (req, res) => {
  try{
    console.log("회원가입 요청 body = ",req.body);
    let {nickname, password, birthday, name, city, mobile, userEmail, ori_yearAllowance,yearAllowance } = req.body;
    // 1. 닉네임 중복 체크
    const existingMember = await Member.findOne({ where: { nickname } });
    if (existingMember) {
      res.status(400).json({ error: '이미 사용 중인 닉네임입니다.' });
      return ;
    }
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);
    
    const member = await Member.create({nickname, password, birthday, name, city, mobile, userEmail, ori_yearAllowance, yearAllowance });
    res.json(member);
  }catch(error){
    console.error('Error creating allowance:', error);
    res.status(500).json({ error: 'Failed to create allowance' });
  }
});

// 로그인 체크
  router.post('/loginCheck', async (req, res) => {
    let { nickname, password } = req.body;

    try {
      // const salt = await bcrypt.genSalt(10);
      // password = await bcrypt.hash(password, salt);
      console.log("password = > ",password);
      const user = await Member.findOne({
        where: {
          nickname
          // password: password, /
        }
      });
      if (!user) {
        res.status(401).json({ success: false, message: '로그인 실패 아이디 또는 비밀번호가 틀렸습니다.' });
      }else{
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
          res.status(401).json({ success: false, message: '로그인 실패 아이디 또는 비밀번호가 틀렸습니다.' });
        }else res.status(200).json({ success: true, message: '로그인 성공!!!', user });
      } 
    }catch (error) {
      res.status(500).json({ success: false, message: 'Server error', error });
    }
  });
  
  // 아이디로 지출내역 select 해오기
  router.post('/findAlloanceByMemberId', async (req, res) => {
    const  {memberId}  = req.body;
    console.log("router memberId to db = 3 >",memberId);
    try {
      const Allow = await Allowances.findAll({
        where: {
            memberId: memberId,
        },
      });
      console.log("회원지출내역조회 1 ",Allow);
      if (Allow) {
        res.status(200).json({ success: true, message: '회원지출내역 조회 성공!!!', Allow });
      } else {
        res.status(401).json({ success: false, message: '지출 내역 조회 실패' });
      }
    } catch (error) {
      res.status(500).json({ success: false, message: 'Server error', error });
    }
  });

    // memberId 로 지출 받아서 연간용돈 업데이트 하기
    router.post('/updateMemberAllowance', async (req, res) => {
      let { amount, remainAllow, memberId } = req.body;

      try {
        const newAllow = remainAllow - amount;
        const result = await Member.update(
          { yearAllowance: newAllow }, // 업데이트할 값
          { where: { id:memberId } } // 조건
        );
        if (!result) {
          res.status(401).json({ success: false, message: '업데이트에 실패 하였습니다.' });
        }else{
          res.status(200).json({ success: true, message: '업데이트 성공!!!', result, newAllow });
        } 
      }catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error });
      }
    });


  export default router;
