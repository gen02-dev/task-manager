import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TaskListScreen from './TaskListScreen';
import TaskEditScreen from './TaskEditScreen';

const Stack = createStackNavigator();

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='TaskListScreen'>
        <Stack.Screen
          name='TaskListScreen'
          component={TaskListScreen}
          options={() => ({
            headerTitle: 'Tasks',
          })}
        />
        <Stack.Screen
          name='TaskEditScreen'
          component={TaskEditScreen}
          options={({ route }) => ({
            headerTitle: route.params?.headerName,
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
