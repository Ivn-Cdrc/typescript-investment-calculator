import { ChangeEvent, FormEvent, FormEventHandler, MouseEvent, useState } from "react";
import styles from './UserInput.module.css'

export interface UserInputData {
	currentSavings: number;
	yearlyContribution: number;
	expectedReturn: number;
	duration: number;
}

interface UserInputProps {
  onCalculate: (userInput: UserInputData) => void;
  onReset: () => void;
}

const initialUserInput: UserInputData = {
	currentSavings: 10000,
	yearlyContribution: 1200,
	expectedReturn: 7,
	duration: 10
}

function UserInput({onCalculate, onReset}: UserInputProps) {
	const [userInput, setUserInput] = useState<UserInputData>(initialUserInput);

  function submitHandler(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
		console.log(userInput);
    onCalculate(userInput);
  }

  function resetHandler(event: MouseEvent<HTMLElement>) {
    setUserInput(initialUserInput);
    onReset();
  }

  function inputChangeHandler(input: string, value: string) {
		setUserInput((prevInput: UserInputData) => {
			return {
				...prevInput, 
				[input]: Number(value) // converts value: string to a number
			};
		});
	}

  return (
    <form onSubmit={submitHandler} className={styles.form}>
      <div className={styles['input-group']}>
        <p>
          <label htmlFor="current-savings">Current Savings ($)</label>
          <input
            onChange={(event) =>
              inputChangeHandler("currentSavings", event.target.value)
            }
						value={userInput.currentSavings}
            type="number"
            id="current-savings"
          />
        </p>
        <p>
          <label htmlFor="yearly-contribution">Yearly Savings ($)</label>
          <input
            onChange={(event) =>
              inputChangeHandler("yearlyContribution", event.target.value)
            }
						value={userInput.yearlyContribution}
            type="number"
            id="yearly-contribution"
          />
        </p>
      </div>
      <div className={styles['input-group']}>
        <p>
          <label htmlFor="expected-return">
            Expected Interest (%, per year)
          </label>
          <input
            onChange={(event) =>
              inputChangeHandler("expectedReturn", event.target.value)
            }
						value={userInput.expectedReturn}
            type="number"
            id="expected-return"
          />
        </p>
        <p>
          <label htmlFor="duration">Investment Duration (years)</label>
          <input
            onChange={(event) =>
              inputChangeHandler("duration", event.target.value)
            }
						value={userInput.duration}
            type="number"
            id="duration"
          />
        </p>
      </div>
      <p className={styles.actions}>
        <button onClick={resetHandler} type="reset" className={styles.buttonAlt}>
          Reset
        </button>
        <button type="submit" className={styles.button}>
          Calculate
        </button>
      </p>
    </form>
  );
}

export default UserInput;
