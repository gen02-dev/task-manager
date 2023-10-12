import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { TextInput, Button, Text } from 'react-native-paper';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useTaskContext } from '../context/TaskContext';
import { Task } from '../types';
import { addTask, updateTask } from '../api/api';

type RouteParams = {
  taskId: string;
};

const TaskEditScreen: React.FC = () => {
  const { state, dispatch } = useTaskContext();
  const route = useRoute();
  const navigation = useNavigation();
  const [task, setTask] = useState<Task>({
    title: '',
    description: '',
    status: 'todo',
    comments: '',
  });

  useEffect(() => {
    const routeParams = route.params as RouteParams;
    if (routeParams && routeParams.taskId) {
      const selectedTask = state.tasks.find(
        (t) => t._id === routeParams.taskId
      );
      if (selectedTask) {
        setTask(selectedTask);
      }
    }
  }, [route.params, state.tasks]);

  const handleSaveChanges = async () => {
    try {
      if (task._id) {
        const updatedTask = await updateTask(task._id, task);
        dispatch({ type: 'UPDATE_TASK', task: updatedTask });
      } else {
        const newTask = await addTask(task);
        dispatch({ type: 'ADD_TASK', task: newTask });
      }
      navigation.goBack();
    } catch (error) {
      console.error('Error saving task changes:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        label='Task Title'
        value={task.title}
        onChangeText={(text) => setTask({ ...task, title: text })}
        style={styles.input}
      />
      <TextInput
        label='Task Description'
        value={task.description}
        onChangeText={(text) => setTask({ ...task, description: text })}
        style={styles.input}
      />
      <TextInput
        label='Comments'
        value={task.comments}
        onChangeText={(text) => setTask({ ...task, comments: text })}
        style={styles.commentInput}
        multiline={true}
        numberOfLines={4}
      />
      <Text>Status:</Text>
      <Picker
        selectedValue={task.status}
        onValueChange={(value) => setTask({ ...task, status: value })}
        style={styles.picker}
      >
        <Picker.Item label='To Do' value='todo' />
        <Picker.Item label='In Progress' value='in-progress' />
        <Picker.Item label='Blocked' value='blocked' />
        <Picker.Item label='Done' value='done' />
      </Picker>
      <Button
        mode='contained'
        onPress={handleSaveChanges}
        style={styles.button}
      >
        Save Changes
      </Button>
    </View>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    marginBottom: 16,
  },
  commentInput: {
    marginBottom: 16,
    height: 100,
  },
  radioRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    alignSelf: 'center',
    width: '50%',
  },
  picker: {
    marginBottom: 16,
    marginTop: -10,
  },
});

export default TaskEditScreen;
