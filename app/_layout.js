import { Stack } from 'expo-router/stack';

export default function Layout() {
  return <Stack screenOptions={{
    headerStyle: {
      backgroundColor: '#002D72',
      // e00043
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
    headerShown: false,
  }}/>
  
}