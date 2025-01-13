import React, { useEffect, useState } from 'react';
import { fetchAllowances, createAllowance } from '../services/api.ts';
import '../styles/home.css';
import { Allowance } from './AllowanceType.ts'; // Allowance 클래스 임포트

const Home: React.FC = () => {
  const [allowances, setAllowances] = useState<Allowance[]>([]);

  useEffect(() => {
    fetchAllowances().then(setAllowances);
  }, []);

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
        onSubmit={(e) => {
          e.preventDefault();
          const desc = e.target.description.value;
          const amount = parseFloat(e.target.amount.value);
          const category = e.target.category.value;
          const store = e.target.store.value;
          const memberId = parseFloat(e.target.memberId.value);
          console.log("send data = ",desc,amount,category,store,memberId);
          handleAdd(category, desc, store, amount, memberId);
        }}
      >
        <div>오늘 사용한 지출을 입력하세요</div>
        <input type="text" name="category" placeholder="지출 구분을 입력(ex.간식)" />
        <input type="text" name="description" placeholder="구매 품목(item)을 입력하세요" />
        <input type="text" name="store" placeholder="지출처(store)를 입력하세요" />
        <input type="number" name="amount" placeholder="지출 금액을 입력하세요" />
        <input type="hidden" name="memberId" value={1}/>
        <input type="submit" alue="지출입력" />
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

export default Home;
