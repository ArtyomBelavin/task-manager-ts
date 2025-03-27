import React, { useState } from "react";
import { useTodo } from "../../Store/useTodo";
import styles from "./index.module.scss";
import { Link } from "react-router-dom";
import { TodoStatusType } from "../../Types/Todo.types";
import { SubmitHandler, useForm } from "react-hook-form";

type StatusForm = {
  status: TodoStatusType;
};

export const HomePage: React.FC = () => {
  const tasks = useTodo((state) => state.tasks);
  const { deleteTask, updateTask, resetAllTasks } = useTodo();

  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const { handleSubmit, register } = useForm<StatusForm>();

  const onSubmit: SubmitHandler<StatusForm> = (data) => {
    if (editingTaskId !== null) {
      updateTask(editingTaskId, data.status);
      setEditingTaskId(null);
    }
  };

  return (
    <>
      {tasks.length === 0 ? (
        <div className={styles.homepageContainer}>
          <h2 className={styles.title}>
            Здравствуйте, Артём! Список задач пуст...
          </h2>
          <div>
            <Link className={styles.link} to="/create-task">
              Создать задачу
            </Link>
          </div>
        </div>
      ) : (
        <div className={styles.homepageContainer}>
          <h2 className={styles.title}>
            Здравствуйте, Артём! Список задач составляет: {tasks.length}
          </h2>
          <ul className={styles.List}>
            {tasks.map((task) => (
              <li key={task.id} className={styles.ListItem}>
                <div className={styles.ListItemContainer}>
                  <h3 className={styles.ListItemTitle}>
                    Название задачи: <br />
                    <span>{task.title}</span>
                  </h3>
                  <p className={styles.ListItemDescription}>
                    Описание задачи: <br /> <span>{task.description}</span>
                  </p>
                  <p className={styles.ListItemStatus}>
                    Статус задачи: <br /> <span>{task.status}</span>
                  </p>
                  <button
                    className={styles.ListItemBtn}
                    onClick={() => setEditingTaskId(task.id)}
                  >
                    Изменить статус задачи
                  </button>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className={styles.ListItemBtn}
                  >
                    Удалить задачу
                  </button>
                </div>

                {editingTaskId === task.id && (
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className={styles.statusForm}
                  >
                    <select {...register("status")} className={styles.select}>
                      <option className={styles.option} value="Created">
                        Created
                      </option>
                      <option className={styles.option} value="InProcess">
                        InProcess
                      </option>
                      <option className={styles.option} value="Done">
                        Done
                      </option>
                    </select>
                    <button type="submit" className={styles.btnEditStatus}>
                      Изменить
                    </button>
                  </form>
                )}
              </li>
            ))}
          </ul>

          <div className={styles.btns}>
            <button onClick={resetAllTasks} className={styles.btnReset}>
              Очистить весь список
            </button>
            <Link className={styles.link} to="/create-task">
              Создать задачу
            </Link>
          </div>
        </div>
      )}
    </>
  );
};
