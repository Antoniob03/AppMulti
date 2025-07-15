// screens/Dashboard.js
import React from 'react'; 
import { View, Text, Button, StyleSheet } from 'react-native';
import { getAuth, signOut } from 'firebase/auth';

export default function Dashboard({ navigation }) {
  const auth = getAuth();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigation.replace('SignIn');
    } catch (error) {
      alert('Error al cerrar sesión: ' + error.message);
    }
  };

  const user = auth.currentUser;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>¡Bienvenido{user ? `, ${user.email}` : ''}!</Text>
      <Text style={styles.subtitle}>Has iniciado sesión correctamente.</Text>
      <Button title="Cerrar sesión" onPress={handleSignOut} color="#4A90E2" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    padding: 20, 
    backgroundColor: '#F5F9FF' 
  },
  title: { 
    fontSize: 28, 
    fontWeight: 'bold', 
    marginBottom: 10, 
    textAlign: 'center',
    color: '#2c3e50'
  },
  subtitle: { 
    fontSize: 18, 
    marginBottom: 30, 
    textAlign: 'center',
    color: '#4a6fa5'
  },
});
