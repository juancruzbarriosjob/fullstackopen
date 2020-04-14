import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = ({ title }) => <h1>{title}</h1>

const Button = ({ onClick, text }) => {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  if (good === 0 && neutral === 0 && bad === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }

  let all = good + neutral + bad;
  let average = (good - bad) / all;
  let goodPercentage = (good / all) * 100

  return (
    <div>
      <table>
        <tbody>
          <Statistic text={'Good'} value={good}></Statistic>
          <Statistic text={'Neutral'} value={neutral}></Statistic>
          <Statistic text={'Bad'} value={bad}></Statistic>
          <Statistic text={'All'} value={all}></Statistic>
          <Statistic text={'Average'} value={average}></Statistic>
          <Statistic text={'Positive'} value={goodPercentage}></Statistic>
        </tbody>
      </table>
    </div>
  )
}

const Statistic = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const goodReviewClick = () => {
    setGood(good + 1)
  }

  const neutralReviewClick = () => {
    setNeutral(neutral + 1)
  }

  const badReviewClick = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <Header title={'Give Feedback'}></Header>
      <Button onClick={goodReviewClick} text={'Good'}></Button>
      <Button onClick={neutralReviewClick} text={'Neutral'}></Button>
      <Button onClick={badReviewClick} text={'Bad'}></Button>
      <Header title={'Statistics'}></Header>
      <Statistics good={good} neutral={neutral} bad={bad}></Statistics>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)


