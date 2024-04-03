import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import Dashboard from './screens/Dashboard';
import MedicationScreen from './screens/MedicationScreen';
import OrderScreen from './screens/OrderScreen';
import ProfileScreen from './screens/ProfileScreen';
import SettingsScreen from './screens/settingsScreen';
import MedicationDetailsScreen from './screens/MedicationDetailsScreen';


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Dashboard" component={Dashboard}/>
        <Stack.Screen name="Medication" component={MedicationScreen} />
        <Stack.Screen name="MedicationDetails" component={MedicationDetailsScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="order" component={OrderScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
