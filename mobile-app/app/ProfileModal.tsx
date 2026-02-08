import React, { useEffect, useState } from 'react';
import { View, Text, Modal, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import styles from '../components/ProfileModalStyles'; 

interface ProfileModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function ProfileModal({ visible, onClose }: ProfileModalProps) {
  const [userData, setUserData] = useState({ name: 'User', email: 'Loading...' });

  useEffect(() => {
    const getUser = async () => {
        const token = await AsyncStorage.getItem('userToken');
        if(token) {
            setUserData({ name: 'Pelanggan Setia', email: 'user@marketplace.com' });
        }
    };
    if (visible) getUser();
  }, [visible]);

  const handleLogout = async () => {
    Alert.alert("Logout", "Yakin mau keluar?", [
      { text: "Batal", style: "cancel" },
      {
        text: "Ya, Keluar",
        style: 'destructive',
        onPress: async () => {
          try {
            await AsyncStorage.removeItem('userToken');
            onClose(); 
            router.replace('/login'); 
          } catch (error) {
            console.error(error);
          }
        }
      }
    ]);
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={onClose}>
        
        <View style={styles.modalView} onStartShouldSetResponder={() => true}>
          
          <View style={styles.header}>
            <Text style={styles.title}>My Profile</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color="#666" />
            </TouchableOpacity>
          </View>

          <View style={styles.userInfo}>
            <View style={styles.avatar}>
               <Ionicons name="person" size={40} color="#fff" />
            </View>
            <Text style={styles.username}>{userData.name}</Text>
            <Text style={styles.email}>{userData.email}</Text>
          </View>

          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={20} color="#fff" />
            <Text style={styles.logoutText}>Log Out</Text>
          </TouchableOpacity>

        </View>
      </TouchableOpacity>
    </Modal>
  );
}
