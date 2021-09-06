import React, {useState, Fragment} from 'react';
import './App.css';

interface Todo {
  id: number;
  content: string;
  isDone: boolean;
}

function List(props : {todos : Todo[]}) : JSX.Element {
  return (
    <>
      {props.todos.map((item : Todo) => (
          <Fragment key={item.id}>
            <div className="item" >{item.isDone ? ' done' : 'doing'} : {item.content}</div>
          </Fragment>
      ))}
    </>
  )
}

function App() {

  const [inputText, setInputText] = useState('')
  const [todos, setTodos] = useState<Todo[]>([])

  /**
   * 监听输入事件
   * @param e inputEvent
   */
  function handleInput(e:any) {
    const text = e.target.value
    setInputText(text)
  }

  /**
   * 监听回车键
   * @param e inputEvent
   */
  function checkInput(e:any) {
    if(e.keyCode === 13) {
      setTodos([...todos, {id: (new Date()).getTime(), content: inputText, isDone: false}])
      setInputText('')
    }
  }

  return (
    <div className="App">
      <div className="title">Todo</div>
      <div className="todos">
        <div className="input">
          <input type="text" value={inputText} onChange={handleInput} onKeyUp={(e)=> checkInput(e)}/>
        </div>
        <div className="list">
          <List todos={todos}></List>
        </div>
      </div>
    </div>
  );
}

export default App;
