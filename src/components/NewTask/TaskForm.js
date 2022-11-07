import { useRef } from "react";

import styles from "./TaskForm.module.css";

const TaskForm = (props) => {
  const taskInputRef = useRef();

  const submitHandler = (e) => {
    e.preventDefault();

    const enterdValue = taskInputRef.current.value;

    if (enterdValue.trim().length > 0) {
      props.onEnterTask(enterdValue);
    }

    taskInputRef.current.value = "";
  };

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <input type="text" ref={taskInputRef} />
      <button>{props.loading ? "Sending..." : "Add Task"}</button>
    </form>
  );
};

export default TaskForm;
