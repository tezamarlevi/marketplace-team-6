import React, { useState } from 'react';
import { 
    View, Text, TextInput, TouchableOpacity, ScrollView, Alert, ActivityIndicator
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link, router } from 'expo-router';
import styles from '../components/AuthStyles';
import { API_URL } from '../constants/Api';

export default function LoginScreen() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert("Error", "Email and password are missing!");
            return;
        }

        setLoading(true);

        try {
            const response = await fetch(`${API_URL}/api/users/login`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json',},
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {

                await AsyncStorage.setItem('userToken', data.token);

                const userData = {
                    _id: data._id,
                    name: data.name,
                    email: data.email,
                    role: data.role
                };
                await AsyncStorage.setItem('userData', JSON.stringify(userData));

                Alert.alert("Welcome back!", `Hello, ${data.name}`);
                
                router.replace('/(tabs)');
            } else {
                Alert.alert("Login Failed", data.message || "Invalid credentials");
            }
        } catch (error) {
            console.error("Login Error:", error);
            Alert.alert("Error", "Can't connect to server");
        } finally {
            setLoading(false);
        }
    };

  return (
    <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            
            <Text style={styles.title}>Super🌟Store</Text>
            
            <Text style={{textAlign: 'center', marginBottom: 20, color: '#222'}}>
                Welcome back! Please login to continue.
            </Text>

            <View style={styles.inputContainer}>
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
                onPress={handleLogin}
                disabled={loading} 
            >
                {loading ? (
                    <ActivityIndicator color="#fff" /> 
                ) : (
                    <Text style={styles.mainButtonText}>Log In</Text>
                )}
            </TouchableOpacity>
            
            <TouchableOpacity style={{marginTop: 15, alignSelf: 'center'}}>
                <Text style={{color: '#666', fontSize: 13}}>Forgot Password?</Text>
            </TouchableOpacity>

            <Text style={styles.orText}>OR</Text>

            <View style={styles.socialContainer}>
                <TouchableOpacity style={styles.socialButton}>
                    <AntDesign name="google" size={24} color="#DB4437" />
                    <Text style={styles.socialText}>Log in with Google</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialButton}>
                    <AntDesign name="apple" size={24} color="black" />
                    <Text style={styles.socialText}>Log in with Apple</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialButton}>
                    <FontAwesome name="facebook-square" size={24} color="#4267B2" />
                    <Text style={styles.socialText}>Log in with Facebook</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.footer}>
                <Text style={styles.footerText}>Don't have an account?</Text>
                <Link href="/register" asChild>
                    <TouchableOpacity>
                        <Text style={styles.linkText}>Join Now</Text>
                    </TouchableOpacity>
                </Link>
            </View>
            
        </ScrollView>
    </SafeAreaView>
  );
}