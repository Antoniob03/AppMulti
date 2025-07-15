// screens/SignIn.js
import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { signInUser } from '../firebase/AuthService';

export default function SignIn({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Error', 'Por favor ingresa email y contraseña válidos.');
      return;
    }
    try {
      await signInUser(email.trim(), password.trim());
      Alert.alert('Inicio de sesión exitoso');
      navigation.replace('Dashboard');
    } catch (error) {
      let message = 'Ocurrió un error al iniciar sesión, Vuelva a intentar';
      switch (error.code) {
        case 'auth/invalid-email':
          message = 'El correo ingresado no es válido.';
          break;
        case 'auth/user-not-found':
          message = 'No hay ninguna cuenta con este correo.';
          break;
        case 'auth/wrong-password':
          message = 'La contraseña es incorrecta.';
          break;
      }
      Alert.alert('Error de autenticación', message);
    }
  };


  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Iniciar Sesión</Text>
        <TextInput
          placeholder="Correo electrónico"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          style={styles.input}
        />
        <TextInput
          placeholder="Contraseña"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
        />
        <Button title="Iniciar sesión" onPress={handleSignIn} color="#4A90E2" />
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')} style={{ marginTop: 20 }}>
          <Text style={styles.link}>¿No tienes cuenta? Regístrate</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F9FF',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 25,
    color: '#2c3e50',
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: '#fefefe',
  },
  link: {
    color: '#4A90E2',
    textAlign: 'center',
    fontWeight: '600',
  },
});
