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
  const [userData, setUserData] = useState({ name: 'Loading...', email: '...' });
  useEffect(() => {
    const getUser = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('userData');
        if (jsonValue != null) {
          const parsedUser = JSON.parse(jsonValue);
          setUserData({ 
            name: parsedUser.name || 'User Marketplace', 
            email: parsedUser.email || 'user@example.com' 
          });
        }
      } catch(e) {
        console.error("Can't read user data", e);
      }
  };
    
  if (visible) getUser();
}, [visible]);

  const handleLogout = async () => {
    console.log("1. Tombol ditekan, mencoba logout langsung...");
    
    try {
      await AsyncStorage.multiRemove(['userToken', 'userData']);
      console.log("2. Data terhapus");
      onClose();

      setTimeout(() => {
        console.log("3. Pindah ke Login");
        router.replace('/login');
      }, 300);

    } catch (error) {
      console.error("Logout Failed:", error);
    }
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
