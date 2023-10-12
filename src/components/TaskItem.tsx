import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { List } from 'react-native-paper';
import { Task } from '../types';

type TaskItemProps = {
  item: Task;
  onDelete: () => void;
  onItemPress: () => void;
};

const getStatusPillColor = (status: string) => {
  switch (status) {
    case 'todo':
      return 'blue';
    case 'in-progress':
      return 'orange';
    case 'blocked':
      return 'red';
    case 'done':
      return 'green';
    default:
      return 'gray';
  }
};

const TaskItem: React.FC<TaskItemProps> = ({ item, onDelete, onItemPress }) => {
  const renderRightActions = (_, dragX) => {
    return (
      <View style={styles.rightActions}>
        <TouchableOpacity onPress={onDelete}>
          <List.Icon icon='delete' color='white' />
          <Text style={styles.deleteText}>Delete</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <Swipeable renderRightActions={renderRightActions}>
      <TouchableOpacity onPress={onItemPress} style={styles.itemContainer}>
        <List.Item title={item.title} description={item.description} />
        <View
          style={[
            styles.statusPill,
            { backgroundColor: getStatusPillColor(item.status) },
          ]}
        >
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </TouchableOpacity>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  rightActions: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    backgroundColor: 'red',
    height: '100%',
  },
  deleteText: {
    color: 'white',
  },
  itemContainer: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusPill: {
    padding: 5,
    borderRadius: 10,
    marginRight: 10,
  },
  statusText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default TaskItem;
