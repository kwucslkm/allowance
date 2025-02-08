import React, { useEffect, useState } from 'react';
import { updateAllowance, fetchAllowances, createAllowance } from '../services/api';
import '../styles/home.css';
import { Allow } from '../../../ts_ts/types'; // Allowance 클래스 임포트
// import Table from 'react-bootstrap/Table';/

interface MyHomeProps {
  reloadPage: boolean;
}
const MyHome: React.FC<MyHomeProps> = ({reloadPage}) => {
  const [allowances, setAllowances] = useState<Allow[]>([]);
  const [memberId, setMemberId] = useState(0);
  const [oriYearAllow, setOriYearAllow] = useState(0);
  const [remainAllow, setRemainAllow] = useState(0);
  
  useEffect(() => {
    const fetchData = async () => {
      const userInfo = sessionStorage.getItem('memberInfo');
      if (userInfo) {
        try {
          const parsedUserInfo = JSON.parse(userInfo);
          setMemberId(parsedUserInfo.id); // ID 값 설정
          setOriYearAllow(parsedUserInfo.ori_yearAllowance); //처음 설정 용돈돈
          setRemainAllow(parsedUserInfo.yearAllowance); //남은 연간용돈
          console.log("돔 그리고  한 남은 용돈  0ㄴ= > ",remainAllow);
          console.log("session memberId 1 = > ", parsedUserInfo.id);
          console.log("session parsedUserInfo.ori_yearAllowance = > ", parsedUserInfo.ori_yearAllowance);
          console.log("session parsedUserInfo.yearAllowance = > ", parsedUserInfo.yearAllowance);
        } catch (error) {
          console.error("Error parsing user info from session storage:", error);
        }
      }
    };

    fetchData(); // 세션 데이터 처리
  }, []);
  useEffect(() => {
    const fetchAllowancesData = async () => {
      if (memberId) {
        try { // 로그인 한 id 로 용돈 사용 내역 가져와서 뿌리기
          const findAllowancesByMemberId = await fetchAllowances(memberId);
          const findAllow = findAllowancesByMemberId.Allow.map((oneAllowance:Allow) => {
            return oneAllowance; // 각 allowance를 그대로 반환
          });
          // console.log("findAllow 배열",findAllow);
          setAllowances(findAllow); // allowances 용돈내역 배열 상태 업데이트
        } catch (error) {
          console.error("Error fetching allowances:", error);
        }
      }
    };
    fetchAllowancesData(); // memberId가 변경될 때마다 실행
  }, [memberId]); // memberId가 변경될 때마다 호출
    
  const handleAdd = async (category: string, desc: string, store: string, 
                          amount: number, memberId: number) => {
    const newAllowance = await createAllowance({
      category,
      description: desc,
      store,
      amount,
      // date: new Date().toISOString(),
      memberId,
    });
    setAllowances((prev) => [...prev, newAllowance]);

    const minusAllowResult = await updateAllowance({
      amount,
      remainAllow,
      memberId,
    });
    console.log("minusAllowResult = > ", minusAllowResult);
    if(minusAllowResult.success) {
      console.log("minusAllowResult.newAllow = ",minusAllowResult.newAllow);
      setRemainAllow(minusAllowResult.newAllow); //db에 저장된 남은 용돈 값을 가져와 화면에 뿌려줌
      console.log("업데이트 한 남은 용돈  1= > ",remainAllow);
      
      // 1. 세션에서 데이터를 가져오기
      const savedMemberInfo = sessionStorage.getItem("memberInfo");
      if (savedMemberInfo) { //null 방지
        const memberInfo = JSON.parse(savedMemberInfo);
        console.log("memberInfo.yearAllowance  2= ",memberInfo.yearAllowance);
        memberInfo.yearAllowance = minusAllowResult.newAllow; // 예제 값
        console.log("memberInfo.yearAllowance  3= ",memberInfo.yearAllowance);
        sessionStorage.setItem("memberInfo", JSON.stringify(memberInfo));
        console.log("Updated sessionStorage:", sessionStorage.getItem("memberInfo")); // 세션 값 확인
      } else {
        console.error("세션에 memeberInfo 없음");
      }
    }
  };

  return (
    <div className="Home">
      <form
        onSubmit={(e:React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          const form = e.target as HTMLFormElement;
          const desc = (form.elements.namedItem("description") as HTMLInputElement).value;
          const amount = parseFloat((form.elements.namedItem("amount") as HTMLInputElement).value);
          const category = (form.elements.namedItem("category") as HTMLInputElement).value;
          const store = (form.elements.namedItem("store") as HTMLInputElement).value;
          const memberId = parseFloat((form.elements.namedItem("memberId") as HTMLInputElement).value);
          console.log("send data = ",desc,amount,category,store,memberId);
          handleAdd(category, desc, store, amount, memberId);
        }}
      >
        <div>오늘 사용한 지출을 입력하세요
          <span className='viewAllowOri'>
            연간 설정 용돈:&nbsp;{oriYearAllow.toLocaleString()}
          </span><br></br>
          <span className='viewAllow'>
            현재 남은 용돈:&nbsp;{remainAllow.toLocaleString()}&nbsp;
          </span >
        </div><br></br>
        <input type="text" name="category" placeholder="지출 구분 (ex.간식)" />
        <input type="text" name="description" placeholder="구매 품목(item) " />
        <input type="text" name="store" placeholder="지출처(store)" />
        <input type="number" name="amount" placeholder="지출 금액" />
        <input type="hidden" name="memberId" value={memberId}/>
        <input type="submit" value="지출입력" />
      </form>
      <br></br>
      <h3>지출내역</h3>
      <br></br>
      <table className="allowTable " >
        <colgroup>
        <col style={{ width: '5%' }} />
        <col style={{ width: '15%' }} />
        <col style={{ width: '20%' }} />
        <col style={{ width: '25%' }} />
        <col style={{ width: '20%' }} />
        <col style={{ width: '15%' }} />
        </colgroup>
        <thead>
          <tr style={{ fontWeight: "bold", backgroundColor: "#f0f0f0" }}>
            <th>번호(no)</th>
            <th>날짜(Date)</th>
            <th>구분(category)</th>
            <th>상점(store)</th>
            <th>품목(item)</th>
            <th>금액(Amount)</th>
          </tr>
        </thead>
        <tbody>
          {[...allowances].reverse().map((allowance: Allow, index: number) => (
            <tr key={allowance.id}>
              <td>{index + 1}</td>
              <td>{allowance.createdAt ? new Date(allowance.createdAt).toLocaleDateString('ko-KR'):""}</td>
              <td>{allowance.category}</td>
              <td>{allowance.store}</td>
              <td>{allowance.description}</td>
              <td>{allowance.amount.toLocaleString()}</td>
            </tr>
          ))}
          {/* 🔥 합계 금액 출력 */}
          <tr style={{ fontWeight: "bold", backgroundColor: "#f0f0f0" }}>
            <td colSpan={5} style={{ textAlign: "right" }}>합계금액:</td>
            <td>{allowances.reduce((sum, allowance) => sum + allowance.amount, 0).toLocaleString()} 원</td>
          </tr>
        </tbody>
      </table>  
    </div>
  );
};

export default MyHome;
