import React, { useEffect } from 'react';
import { View, StyleSheet, Alert, Text } from 'react-native';
import { FAB } from 'react-native-paper';
import TaskList from '../components/TaskList';
import { useTaskContext } from '../context/TaskContext';
import { fetchTasks, deleteTask } from '../api/api';
import { StackNavigationProp } from '@react-navigation/stack';

type TaskListScreenProps = {
  navigation: StackNavigationProp<any>;
};

const TaskListScreen: React.FC<TaskListScreenProps> = ({ navigation }) => {
  const { state, dispatch } = useTaskContext();

  const fetchData = async () => {
    try {
      const tasks = await fetchTasks();
      dispatch({ type: 'SET_TASKS', tasks });
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEditTask = (taskId: string) => {
    navigation.navigate('TaskEditScreen', {
      taskId,
      headerName: 'Edit Task',
    });
  };

  const handleDeleteTask = async (taskId: string) => {
    Alert.alert(
      'Delete Task',
      'Are you sure you want to delete this task?',
      [
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: async () => {
            try {
              await deleteTask(taskId);
              dispatch({ type: 'DELETE_TASK', taskId });
            } catch (error) {
              console.error('Error deleting task:', error);
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
      {state.tasks.length === 0 ? (
        <Text style={styles.noTasksMessage}>
          There's nothing in here yet. Click on the "+" button to create a new
          task.
        </Text>
      ) : (
        <TaskList deleteItem={handleDeleteTask} onTaskPress={handleEditTask} />
      )}
      <FAB
        style={styles.fab}
        icon='plus'
        onPress={() =>
          navigation.navigate('TaskEditScreen', { headerName: 'Create Task' })
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    borderRadius: 50,
  },
  noTasksMessage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 18,
    color: '#aaa',
    padding: 16,
    textAlign: 'center',
  },
});

export default TaskListScreen;
