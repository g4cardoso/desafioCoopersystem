import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './src/Home';
import Resgate from './src/view/resgate'

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title: 'Tela inicio',
            headerShown:false
                    
          }}
        />        
        <Stack.Screen
          name="Resgate"
          component={Resgate}
          options={{
            title: 'Resgate',                   
          }}
        />    
      </Stack.Navigator>
    </NavigationContainer>
  )
}