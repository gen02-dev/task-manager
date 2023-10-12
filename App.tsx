import React from 'react';
import { TaskProvider } from './src/context/TaskContext';
import AppNavigator from './src/screens/AppNavigator';

const App: React.FC = () => {
  return (
    <TaskProvider>
      <AppNavigator />
    </TaskProvider>
  );
};

export default App;
