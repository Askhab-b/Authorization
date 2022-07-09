import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addTodo, fetchTodos, removeTodo } from "../../redux/features/todos";
import styles from "./homepage.module.css";

export default function HomePage() {
  const dispatch = useDispatch();

  const loading = useSelector((state) => state.todos.loading);
  const todos = useSelector((state) => state.todos.items);
  const error = useSelector((state) => state.todos.error);

  const [text, setText] = useState("");

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  if (loading) {
    return <div>loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const handleRemoveTodo = (id) => {
    dispatch(removeTodo(id));
  };

  const handleAddTodo = () => {
    dispatch(addTodo(text));
    setText("");
  };

  return (
    <div className={styles.HomePage}>
      <Link to='/signup' className={styles.registrationBtn}>Зарегистрироваться</Link>
      <div className={styles.homepage}>
        <div>
          <div>
            <div className={styles.inputBtnBlock}>
            <input
              placeholder="Your ToDo"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className={styles.inputHome}
            />
            <button onClick={handleAddTodo} className={styles.addBtn}>
              Add ToDo
            </button>
            </div>
            {todos.map((todo) => {
              return (
                <div className={styles.addTodo}>
                  <input type="checkbox" />
                  {todo.text}
                  <button
                    className={styles.DeleteBtn}
                    onClick={() => handleRemoveTodo(todo._id)}
                  >
                    x
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
