import { useState } from 'react'

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>
        {text} {value}
      </td>
    </tr>
  )
}

const Statistics = ({ good, neutral, bad, all }) => {
  if (all !== 0)
    return (
      <table>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={all} />
          <StatisticLine text="average" value={Avg(good, bad, all)} />
          <StatisticLine text="positive" value={Positive(good, all)} />
        </tbody>
      </table>
    )
  return (<p>No feedback given</p>)
}

const Avg = (good, bad, all) => {
  if (all !== 0) {
    return ((good - bad) / all)
  }
}

const Positive = (good, all) => {
  if (all !== 0) {
    return ((good / all) * 100 + '%')
  }
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const all = good + neutral + bad

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={() => setGood(good + 1)} text="good" />
      <Button onClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button onClick={() => setBad(bad + 1)} text="bad" />

      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} all={all} />

    </div>
  )
}

export default App