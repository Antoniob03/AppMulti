// screens/SignUp.js
import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { createUser } from '../firebase/AuthService';

export default function SignUp({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    if (!name.trim() || !email.trim() || !password.trim()) {
      Alert.alert('Error', 'Por favor completa todos los campos.');
      return;
    }
    try {
      await createUser(email.trim(), password.trim());
      Alert.alert('Registro exitoso', `¡Bienvenido ${name.trim()}!`);
      navigation.replace('SignIn');
    } catch (error) {
      let message = 'No se pudo registrar tu cuenta';
      switch (error.code) {
        case 'auth/email-already-in-use':
          message = 'Este correo ya está registrado.';
          break;
        case 'auth/invalid-email':
          message = 'El correo ingresado no es válido.';
          break;
        case 'auth/weak-password':
          message = 'La contraseña debe tener al menos 6 caracteres.';
          break;
      }
      Alert.alert('Error en registro', message);
    }
  };


  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Crear Cuenta</Text>
        <TextInput
          placeholder="Nombre"
          value={name}
          onChangeText={setName}
          style={styles.input}
          autoCapitalize="words"
        />
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
        <Button title="Registrarse" onPress={handleSignUp} color="#4A90E2" />
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginTop: 20 }}>
          <Text style={styles.link}>¿Ya tienes cuenta? Inicia sesión</Text>
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
