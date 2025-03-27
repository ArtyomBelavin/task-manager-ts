import { create } from 'zustand'
import { Todo } from '../Types/Todo.types'
import { TodoStatusType } from '../Types/Todo.types'
import { persist } from 'zustand/middleware';

type TaskType = {
  tasks: Todo[],
  addTask: (title: string, description: string) => void;
  updateTask: (id: number, status: TodoStatusType) => void;
  deleteTask: (id: number) => void;
  resetAllTasks: () => void;
}

export const useTodo = create<TaskType>()(persist((set) => ({
  tasks: [],

  addTask: (title, description) => set((state) => ({
    tasks: [
      ...state.tasks, { id: Date.now(), title, description, status: 'Created' },
    ],
  })),

  updateTask: (id, status) => set((state) => ({
    tasks: state.tasks.map((task) => task.id === id ? { ...task, status } : task)
  })),

  deleteTask: (id) => set((state) => ({
    tasks: state.tasks.filter((task) => task.id !== id)
  })),

  resetAllTasks: () => set((state) => ({
    tasks: state.tasks = []
  }))

}),
  {
    name: "todo-crud",
  }
),
)


