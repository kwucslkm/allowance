import React, { useEffect, useState } from 'react';
import { fetchAllowances, createAllowance } from '../services/api.ts';

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

  return (
    <div>
      <h1>Allowance Tracker</h1>
      <ul>
        {allowances.map((allowance: any) => (
          <li key={allowance.id}>
            {allowance.description}: ${allowance.amount} on {allowance.date}
          </li>
        ))}
      </ul>
      <button onClick={handleAdd}>Add Allowance</button>
    </div>
  );
};

export default Home;