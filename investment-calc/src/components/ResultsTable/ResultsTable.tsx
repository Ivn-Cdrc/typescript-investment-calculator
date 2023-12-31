import { YearlyData } from "../../App";
import styles from "./ResultsTable.module.css"

interface ResultsTableProps {
  data: YearlyData[];
  initialInvestment: number;
}

const formatter = new Intl.NumberFormat("en-AU", {
  style: "currency",
  currency: "AUD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

function ResultsTable({ data, initialInvestment }: ResultsTableProps) {
  return (
    <table className={styles.result}>
      <thead>
        <tr>
          <th>Year</th>
          <th>Total Savings</th>
          <th>Interest (Year)</th>
          <th>Total Interest</th>
          <th>Invested Capital</th>
        </tr>
      </thead>
      <tbody>
        {data.map((yearData) => (
          <tr key={yearData.year}>
            <td>{yearData.year}</td>
            <td>{formatter.format(yearData.savingsEndOfYear)}</td>
            <td>{formatter.format(yearData.yearlyInterest)}</td>
            <td>
              {formatter.format(
                yearData.savingsEndOfYear -
                  initialInvestment -
                  yearData.yearlyContribution * yearData.year
              )}
            </td>
            <td>
              {formatter.format(
                initialInvestment + yearData.yearlyContribution * yearData.year
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ResultsTable;
