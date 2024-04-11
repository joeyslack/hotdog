import { Stack } from 'expo-router/stack';

export default function Layout() {
  return <Stack screenOptions={{
    headerStyle: {
      backgroundColor: '#e00043',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
    headerShown: false,
  }}/>
  
}