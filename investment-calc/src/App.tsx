import React, { useState } from 'react';
import './App.css';

import Header from './components/Header/Header';
import UserInput from './components/UserInput/UserInput';
import ResultsTable from './components/ResultsTable/ResultsTable';
import { UserInputData } from './components/UserInput/UserInput';

// TODO:
// - split the jsx code and overall app into components
// - handle submit and reset button click events
// - manage state. Identify the different pieces of state I might want to manage
// - output results conditionally. make sure the table is output conditionally
// - styling

export interface YearlyData {
  year: number;
  yearlyInterest: number;
  savingsEndOfYear: number;
  yearlyContribution: number;
}

function App() {
  const [userInput, setUserInput] = useState<UserInputData | null>(null);

  // triggered when the form is submitted
  function calculateHandler(userInput: UserInputData) {
    setUserInput(userInput);
  }

  const results: YearlyData[] = []; // per-year results

  if (userInput) {
    let currentSavings: number = userInput.currentSavings; 
    const yearlyContribution: number = userInput.yearlyContribution;
    const expectedReturn: number = userInput.expectedReturn / 100;
    const duration: number = userInput.duration;

    // The below code calculates yearly results (total savings, interest etc)
    for (let i = 0; i < duration; i++) {
      const yearlyInterest: number = currentSavings * expectedReturn;
      currentSavings += yearlyInterest + yearlyContribution;

      const row: YearlyData = {
        year: i + 1,
        yearlyInterest: yearlyInterest,
        savingsEndOfYear: currentSavings,
        yearlyContribution: yearlyContribution
      }
      results.push(row);
    }
  }

  return (
    <div>
      <Header />
      <UserInput onCalculate={calculateHandler} />

      {!userInput && <p>No investment calculated yet</p>}
      {userInput && <ResultsTable data={results} initialInvestment={userInput.currentSavings} />}
    </div>
  );
}

export default App;
