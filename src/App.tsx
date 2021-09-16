import React, { useState, Fragment } from 'react';
import './App.css';

interface Todo {
  id: number;
  content: string;
  isDone: boolean;
}

/**
 * TODOS列表
 * @param props 
 * @returns 
 */
function List(props: { todos: Todo[] }): JSX.Element {
  return (
    <>
      {props.todos.map((item: Todo) => (
        <Fragment key={item.id}>
          <div className="item" >{item.isDone ? ' done' : 'doing'} : {item.content}</div>
        </Fragment>
      ))}
    </>
  )
}

/**
 * 底部切换栏
 * @returns 
 */
function Tabs(props: {curShowing : number}) {
  return (
    <footer>
      <div className="todo-count">* items left</div>
      <div className="filters">
        <li><a href="#/">ALL</a></li>
        <li><a href="#/active">Active</a></li>
        <li><a href="#/completed">Completed</a></li>
      </div>
    </footer>
  )
}

function App() {

  const [inputText, setInputText] = useState('') //输入文本
  const [todos, setTodos] = useState<Todo[]>([]) //todos列表
  const [curShowing, setCurShowing] = useState<number>(0) //当前展示区类别

  /**
   * 监听输入事件
   * @param e inputEvent
   */
  function handleInput(e: any) {
    const text = e.target.value
    setInputText(text)
  }

  /**
   * 核对输入内容是否合法
   * @param {string} txt 输入框文本
   * @returns {Boolean}
   */
  function checkInputText(txt: string) {
    if (txt === '') {
      alert('Please enter something')
      return false
    } else {
      return true
    }
  }

  /**
   * 监听回车键
   * @param e inputEvent
   */
  function checkInput(e: any) {
    if (e.keyCode === 13) {
      if (checkInputText(inputText)) {
        setTodos([...todos, { id: (new Date()).getTime(), content: inputText, isDone: false }])
        setInputText('')
      }
    }
  }

  return (
    <div className="App">
      <header>
        <h1>Todo</h1>
        <input type="text" value={inputText} onChange={handleInput} onKeyUp={(e) => checkInput(e)} />
      </header>
      <section className="main">
        <List todos={todos}></List>
        <Tabs curShowing={curShowing}></Tabs>
      </section>
        
    </div>
  );
}

export default App;
