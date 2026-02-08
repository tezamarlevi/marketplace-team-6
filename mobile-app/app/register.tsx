import React, { useState } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, ScrollView, Alert, ActivityIndicator
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { Link, router } from 'expo-router'; 
import styles from '../components/AuthStyles'; 
import { API_URL } from '../constants/Api';

export default function RegisterScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!name || !email || !password) {
      Alert.alert("Error", "Missing information!");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
        }),
      });

      const data = await response.json();    
      
      if (response.ok) {
        Alert.alert("Success", "Account registered! Please Login!.");
        router.replace('/login'); 
      } else {
        const pesanError = data.message || "Registration failed!";
        Alert.alert("Registration failed", pesanError);
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Can't connect to server!");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        
        <Text style={styles.title}>Super🌟Store</Text>

        <View style={styles.inputContainer}>
          <TextInput 
            style={styles.input} 
            placeholder="Name" 
            placeholderTextColor="#aaa"
            value={name}
            onChangeText={setName}
          />
          <TextInput 
            style={styles.input} 
            placeholder="Email Address" 
            placeholderTextColor="#aaa" 
            keyboardType="email-address"
            autoCapitalize="none" 
            value={email}
            onChangeText={setEmail}
          />
          <TextInput 
            style={styles.input} 
            placeholder="Password" 
            placeholderTextColor="#aaa" 
            secureTextEntry 
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <TouchableOpacity 
          style={styles.mainButton} 
          onPress={handleRegister}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" /> 
          ) : (
            <Text style={styles.mainButtonText}>Join</Text>
          )}
        </TouchableOpacity>

        <Text style={styles.orText}>OR</Text>

        <View style={styles.socialContainer}>
          <TouchableOpacity style={styles.socialButton}>
            <AntDesign name="apple" size={24} color="black" />
            <Text style={styles.socialText}>Continue with Apple</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <AntDesign name="google" size={24} color="#DB4437" />
            <Text style={styles.socialText}>Continue with Google</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <FontAwesome name="facebook-square" size={24} color="#4267B2" />
            <Text style={styles.socialText}>Continue with Facebook</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Have an account?</Text>
          <Link href="/login" asChild>
            <TouchableOpacity>
              <Text style={styles.linkText}>Log in</Text>
            </TouchableOpacity>
          </Link>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}