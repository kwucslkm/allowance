import React, { useEffect, useState } from 'react';
import { fetchAllowances, createAllowance } from '../services/api.ts';
import styles from  '../styles/Home.module.css';

const Home: React.FC = () => {
  const [allowances, setAllowances] = useState([]);

  useEffect(() => {
    fetchAllowances().then(setAllowances);
  }, []);

  const handleAdd = async () => {
    const newAllowance = await createAllowance({
      description: 'Sample Allowance',
      amount: 50,
      date: new Date().toISOString(),
    });
    setAllowances((prev) => [...prev, newAllowance]);
  };
  class Allowance  {
    public id!: number;
    public description!: string;
    public amount!: number;
    public date!: Date;
  }
  return (
    <article>
      <div className = {styles.home}>
        
        <ul>
          {allowances.map((allowance: Allowance) => (
            <li key={allowance.id}>
              {allowance.description}: ${allowance.amount} on {allowance.date}
            </li>
          ))}
        </ul>
        지출 추가 : <button onClick={handleAdd}>Add Allowance</button>
      </div>
    </article>
  );
};

export default Home;