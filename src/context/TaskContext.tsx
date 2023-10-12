import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Task } from '../types';

type State = {
  tasks: Task[];
};

type Action =
  | { type: 'SET_TASKS'; tasks: Task[] }
  | { type: 'ADD_TASK'; task: Task }
  | { type: 'UPDATE_TASK'; task: Task }
  | { type: 'DELETE_TASK'; taskId: string };

type TaskProviderProps = {
  children: ReactNode;
};

const TaskContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
}>({
  state: { tasks: [] },
  dispatch: () => {},
});

const taskReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_TASKS':
      return { ...state, tasks: action.tasks };
    case 'ADD_TASK':
      return { ...state, tasks: [...state.tasks, action.task] };
    case 'UPDATE_TASK':
      const updatedTasks = state.tasks.map((task) =>
        task._id === action.task._id ? action.task : task
      );
      return { ...state, tasks: updatedTasks };
    case 'DELETE_TASK':
      const filteredTasks = state.tasks.filter((task) => task._id !== action.taskId);
      return { ...state, tasks: filteredTasks };
    default:
      return state;
  }
};

export const TaskProvider: React.FC<TaskProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, { tasks: [] });

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};
