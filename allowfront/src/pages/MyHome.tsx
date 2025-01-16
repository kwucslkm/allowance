import React, { useEffect, useState } from 'react';
import { fetchAllowances, createAllowance } from '../services/api';
import '../styles/home.css';
import { Allowance } from './AllowanceType'; // Allowance 클래스 임포트

const MyHome: React.FC = () => {
  const [allowances, setAllowances] = useState<Allowance[]>([]);
  const [memberId, setMemberId] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const userInfo = sessionStorage.getItem('memberInfo');
      if (userInfo) {
        try {
          const parsedUserInfo = JSON.parse(userInfo);
          setMemberId(parsedUserInfo.id); // ID 값 설정
          console.log("session memberId 1 = > ", parsedUserInfo.id);
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
        try {
          const findAllowancesByMemberId = await fetchAllowances(memberId);
          // const findAllow = [];
          // for (let i = 0 ; i<findAllowancesByMemberId.Allowances.length;i++){
          //   findAllow.push(findAllowancesByMemberId.Allowances[i]);
          // }
          const findAllow = findAllowancesByMemberId.Allowances.map((oneAllowance:Allowance) => {
            return oneAllowance; // 각 allowance를 그대로 반환
          });

          
          console.log(findAllow);
          setAllowances(findAllow); // allowances 상태 업데이트
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
      date: new Date().toISOString(),
      memberId,
    });
    setAllowances((prev) => [...prev, newAllowance]);
  };

  return (
    <div className="Home">
      <form
        onSubmit={(e:React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          // const desc = e.target.description.value;
          // const amount = parseFloat(e.target.amount.value);
          // const category = e.target.category.value;
          // const store = e.target.store.value;
          // const memberId = parseFloat(e.target.memberId.value);
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
        <div>오늘 사용한 지출을 입력하세요</div>
        <input type="text" name="category" placeholder="지출 구분을 입력(ex.간식)" />
        <input type="text" name="description" placeholder="구매 품목(item)을 입력하세요" />
        <input type="text" name="store" placeholder="지출처(store)를 입력하세요" />
        <input type="number" name="amount" placeholder="지출 금액을 입력하세요" />
        <input type="hidden" name="memberId" value={memberId}/>
        <input type="submit" value="지출입력" />
      </form>
      <h3>지출내역</h3>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Date</th>
            <th>category</th>
            <th>store</th>
            <th>Description</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {[...allowances].reverse().map((allowance: Allowance, index: number) => (
            <tr key={allowance.id}>
              <td>{index + 1}</td>
              <td>{new Date(allowance.date).toLocaleDateString('ko-KR')}</td>
              <td>{allowance.category}</td>
              <td>{allowance.store}</td>
              <td>{allowance.description}</td>
              <td>{allowance.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>  
    </div>
  );
};

export default MyHome;
