// https://www.youtube.com/watch?v=hQAHSlTtcmY&list=PLZlA0Gpn_vH_NT5zPVp18nGe_W9LqBDQK&index=7

import React, { useState } from 'react'
import TodoList from './TodoList'

function App() {
  const [todos, setTodos] = useState(['Todo 1', 'Todo 2'])
  return (
    <>
      <TodoList todos={todos} />
      <input type="text" />
      <button>Add Todo</button>
      <button>Completed</button>
      <div>0 left to do</div>
    </>
  );
}

export default App;
