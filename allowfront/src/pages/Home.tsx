import React, { useEffect, useState } from 'react';
import { fetchAllowances, createAllowance } from '../services/api.ts';
import   '../styles/home.css';

const Home: React.FC = () => {
  const [allowances, setAllowances] = useState([]);

  useEffect(() => {
    fetchAllowances().then(setAllowances);
  }, []);

  const handleAdd = async (desc,amount) => {
    const newAllowance = await createAllowance({
      description: desc,
      amount: amount,
      date: new Date().toISOString(),
    });
    setAllowances((prev) => [...prev, newAllowance]);
  };
  // class Allowance  {
  //   public id!: number;
  //   public description!: string;
  //   public amount!: number;
  //   public date!: Date;
  // }
  
  interface Allowance  {
    id: number;
    description: string;
    amount: number;
    date: Date;
  }
  
  return (
   <div className = "Home">
        <form onSubmit={(e)=>{
          const desc = e.target.description.value;
          const amount = e.target.amount.value;
          handleAdd(desc,amount);
        }}>
          <div>오늘 사용한 지출을 입력하세요</div>
          <input type="text" name = "description" placeholder ="지출내역을 입력하세요"/>
          <input type="number" name = "amount" placeholder="지출금액을 입력하세요"/>
          <input type="submit" onClick={(e)=>{
            e.priventDefault();

          }} value="지출입력"/>
        </form>
        
        
        
        {/* 지출 추가 : <button onClick={handleAdd}>Add Allowance</button> */}
        <h3>지출내역</h3>
        <ul>
          {allowances.map((allowance: Allowance) => (
            <li key={allowance.id}>
              {allowance.description}: ${allowance.amount} on {allowance.date}
            </li>
          ))}
        </ul>
        
      </div>
    
  );
};

export default Home;