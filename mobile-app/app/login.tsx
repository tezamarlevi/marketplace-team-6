// File: app/login.tsx
import React from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { Link, router } from 'expo-router';
import styles from '../components/AuthStyles';

export default function LoginScreen() {

    const handleLogin = () => {
        console.log("User Login");
        router.replace('/(tabs)');
    };

  return (
    <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            
            <Text style={styles.title}>Super🌟Store</Text>
            
            <Text style={{textAlign: 'center', marginBottom: 20, color: '#222'}}>
                Welcome back! Please login to continue.
            </Text>

            <View style={styles.inputContainer}>
                <TextInput style={styles.input} placeholder="Email Address" placeholderTextColor="#aaa" keyboardType="email-address" />
                <TextInput style={styles.input} placeholder="Password" placeholderTextColor="#aaa" secureTextEntry />
            </View>

            <TouchableOpacity style={styles.mainButton} onPress={handleLogin}>
                <Text style={styles.mainButtonText}>Log In</Text>
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