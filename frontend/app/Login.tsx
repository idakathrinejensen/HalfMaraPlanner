//login

import React, { useState } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleLogin = () => {
    // Handle login logic here
    console.log('Logging in with:', email, password);
    // Navigate to the main app screen after login
    navigation.navigate('MainApp' as never);
  };

  return (
    <View style={{
      flex: 1,
      backgroundColor: '#0f172a',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
    }}>
      <Text style={{
        color: '#a78bfa',
        fontSize: 32,
        fontWeight: '600',
        marginBottom: 6,
      }}>
        Welcome Back
      </Text>
      <Text style={{
        color: '#cbd5e1',
        fontSize: 16,
        marginBottom: 30,
      }}>
        Continue your training journey
      </Text>

      <View style={{
        width: '100%',
        backgroundColor: '#1e293b',
        padding: 20,
        borderRadius: 22,
        borderWidth: 1,
        borderColor: '#334155',
      }}>
        <Text style={{ color: '#cbd5e1', marginBottom: 6 }}>Email</Text>
        <TextInput
          placeholder="your@email.com"
          placeholderTextColor="#9ca3af"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          style={{
            backgroundColor: '#0f172a',
            color: 'white',
            borderRadius: 16,
            padding: 14,
            fontSize: 16,
            borderWidth: 1,
            borderColor: '#334155',
            marginBottom: 16,
          }}
        />

        <Text style={{ color: '#cbd5e1', marginBottom: 6 }}>Password</Text>
        <TextInput
          placeholder="Enter your password"
          placeholderTextColor="#9ca3af"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          style={{
            backgroundColor: '#0f172a',
            color: 'white',
            borderRadius: 16,
            padding: 14,
            fontSize: 16,
            borderWidth: 1,
            borderColor: '#334155',
            marginBottom: 26,
          }}
        />

        <Pressable
          onPress={handleLogin}
          style={{
            backgroundColor: '#a78bfa',
            padding: 16,
            borderRadius: 16,
            alignItems: 'center',
          }}
        >
          <Text style={{ color: 'white', fontWeight: '600', fontSize: 16 }}>Log In</Text>
        </Pressable>

        <Text
          onPress={() => navigation.navigate('Register' as never)}
          style={{
            color: '#cbd5e1',
            marginTop: 20,
            textAlign: 'center',
          }}
        >
          Don’t have an account? Sign up
        </Text>
      </View>
    </View>
  );
}
