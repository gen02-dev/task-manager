import React from 'react';
import { FlatList } from 'react-native';
import TaskItem from '../components/TaskItem';
import { useTaskContext } from '../context/TaskContext';

type TaskListProps = {
  deleteItem: (taskId: string) => void;
  onTaskPress: (taskId: string) => void;
};

const TaskList: React.FC<TaskListProps> = ({ deleteItem, onTaskPress }) => {
  const { state } = useTaskContext();

  return (
    <FlatList
      data={state.tasks}
      renderItem={({ item }) => (
        <TaskItem
          item={item}
          onDelete={() => deleteItem(item?._id)}
          onItemPress={() => onTaskPress(item?._id)}
        />
      )}
      keyExtractor={(item) => item._id}
    />
  );
};

export default TaskList;
