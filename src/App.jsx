import "./App.css";
import { useState } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const onChangeHandler = (e) => {
    if (e.target.name === "title") {
      setTitle(e.target.value);
    } else if (e.target.name === "content") {
      setContent(e.target.value);
    }
  };

  //추가하기 버튼
  const onsubmitHandler = () => {
    const newTodos = {
      id: todos.length + 1,
      title: title,
      content: content,
      isDone: false,
    };

    setTodos([...todos, newTodos]);
    setTitle("");
    setContent("");
  };

  //삭제하기 버튼
  const onDeleteHandler = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  //확인 버튼
  const onDoneHandler = (id) => {
    const newDoneTodo = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, isDone: !todo.isDone };
      }
      return todo;
    });
    setTodos(newDoneTodo);
  };

  const TodoList = ({item, onDeleteHandler, onDoneHandler}) => {
    return (
      <div key={item.id}>
        <h3>{item.title}</h3>
        <p>{item.content}</p>
        <button onClick={() => onDeleteHandler(item.id)}>삭제</button>
        <button onClick={() => onDoneHandler(item.id)}>
          {item.isDone ? "취소" : "완료"}
        </button>
      </div>
    );
  };

  return (
    <>
      <header>
        <h1>My Todo List</h1>
      </header>

      <section className="input-section">
        <div>
          제목 <input name="title" value={title} onChange={onChangeHandler} />
        </div>
        <div>
          내용{" "}
          <input name="content" value={content} onChange={onChangeHandler} />
        </div>
        <button onClick={onsubmitHandler}>추가하기</button>
      </section>

      <section className="working-section">
        <h2>working</h2>
        <div className="todoList">
          {todos
            .filter((todo) => !todo.isDone)
            .map(function (item) {
              return (
                <TodoList 
                  key={item.id}
                  item={item}
                  onDeleteHandler={onDeleteHandler}
                  onDoneHandler={onDoneHandler}
                />
              );
            })}
        </div>
      </section>

      <section className="done-section">
        <h2>done</h2>
        <div className="todoList">
          {todos
            .filter((todo) => todo.isDone)
            .map(function (item) {
              return (
                <TodoList 
                  key={item.id}
                  item={item}
                  onDeleteHandler={onDeleteHandler}
                  onDoneHandler={onDoneHandler}
                />
              );
            })}
        </div>
      </section>
    </>
  );

}

export default App;
