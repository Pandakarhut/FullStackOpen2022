import { useState } from "react";

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>
const Vote = ({ vote }) => <p>has {vote} votes</p>

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))
  const mostVoted = votes.indexOf(Math.max(...votes))

  const randomNumber = () => {
    let random = Math.floor(Math.random() * Math.floor(anecdotes.length))
    setSelected(random)
  }

  const handleVote = () => {
    const copyVotes = [...votes]
    copyVotes[selected] += 1
    setVotes(copyVotes)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <Vote vote={votes[selected]} />
      <Button onClick={handleVote} text="vote" />
      <Button onClick={randomNumber} text="next anecdote" />
      <h1>Anecdote with most votes</h1>
      {anecdotes[mostVoted]}
      <Vote vote={votes[mostVoted]} />
    </div>
  )
}

export default App