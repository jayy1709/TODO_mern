import React, { useState, useEffect, useCallback } from "react";
import Preloader from "./components/Preloader";
import { createTodo, deleteTodo, readTodos, updateTodo } from "./functions";

function App() {
  const [todo, setTodo] = useState({ title: "", content: "" });
  const [todos, setTodos] = useState(null);
  const [currentId, setCurrentId] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const result = await readTodos();
      setTodos(result);
    };
    fetchData();
  }, [currentId]);

  useEffect(() => {
    const clearField = (e) => {
      if (e.keyCode === 27) {
        clear();
      }
    };
    window.addEventListener("keydown", clearField);
    return () => window.removeEventListener("keydown", clearField);
  }, []);

  const clear = () => {
    setCurrentId(0);
    setTodo({ title: "", content: "" });
  };

  const onSubmitHandler = useCallback(
    async (e) => {
      e.preventDefault();
      if (currentId === 0) {
        const result = await createTodo(todo);
        setTodos((prevTodos) => [...prevTodos, result]);
        clear();
      } else {
        await updateTodo(currentId, todo);
        clear();
      }
    },
    [currentId, todo]
  );

  const removeTodo = useCallback(
    async (id) => {
      await deleteTodo(id);
      setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
    },
    []
  );

  return (
    <div className="container">
      <div className="row">
        <pre>{JSON.stringify(todo)}</pre>
        <form className="col s12" onSubmit={onSubmitHandler}>
          <div className="row">
            <div className="input-field col s6">
              <i className="material-icons prefix">title</i>
              <input
                id="icon_prefix"
                type="text"
                className="validate"
                value={todo.title}
                onChange={(e) =>
                  setTodo({ ...todo, title: e.target.value })
                }
              />
              <label htmlFor="icon_prefix">Title</label>
            </div>
            <div className="input-field col s6">
              <i className="material-icons prefix">description</i>
              <input
                id="description"
                type="tel"
                className="validate"
                value={todo.content}
                onChange={(e) =>
                  setTodo({ ...todo, content: e.target.value })
                }
              />
              <label htmlFor="description">Content</label>
            </div>
          </div>
          <div className="row right-align">
            <button className="waves-effect waves-light btn">Submit</button>
          </div>
        </form>
        {!todos ? (
          <Preloader />
        ) : todos.length > 0 ? (
          <ul className="collection">
            {todos.map((todo) => (
              <li
                key={todo._id}
                onClick={() => setCurrentId(todo._id)}
                className="collection-item"
              >
                <div>
                  <h5>{todo.title}</h5>
                  <p>
                    {todo.content}
                    <a
                      href="#!"
                      onClick={(e) => {
                        e.preventDefault();
                        removeTodo(todo._id);
                      }}
                      className="secondary-content"
                    >
                      <i className="material-icons">delete</i>
                    </a>
                  </p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div>
            <h5>Nothing on the list</h5>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
