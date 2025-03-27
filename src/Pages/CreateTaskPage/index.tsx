import React from "react";
import styles from "./index.module.scss";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTodo } from "../../Store/useTodo";
import { Link, useNavigate } from "react-router-dom";

type FromValues = {
  title: string;
  description: string;
};

export const CreateTaskPage: React.FC = () => {
  const navigate = useNavigate();
  const { handleSubmit, reset, register } = useForm<FromValues>();

  const { addTask } = useTodo();

  const onSubmitForm: SubmitHandler<FromValues> = (data) => {
    addTask(data.title, data.description);
    reset();
    navigate("/");
  };
  return (
    <div className={styles.createpageContainer}>
      <Link to="/">Вернуться на главную &#60;==</Link>
      <h2 className={styles.title}>Создание задачи</h2>
      <form onSubmit={handleSubmit(onSubmitForm)} className={styles.form}>
        <label className={styles.label}>
          Введите название задачи:
          <input
            {...register("title", { required: "Название обязательно" })}
            className={styles.input}
            type="text"
            placeholder="Название задачи"
          />
        </label>
        <label className={styles.label}>
          Введите описание задачи:
          <input
            {...register("description", { required: "Описание обязательно" })}
            className={styles.input}
            type="text"
            placeholder="Описание задачи"
          />
        </label>

       

        <button className={styles.btn}>Создать</button>
      </form>
    </div>
  );
};
