import React, { useState, useEffect } from 'react';
import { 
  Text, View, ScrollView, Image, TouchableOpacity, StatusBar 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'; 
import { Ionicons } from '@expo/vector-icons'; 
import { router, useLocalSearchParams } from 'expo-router';

import styles from '../../components/DashboardStyles';

export default function HomeScreen() {
  const params = useLocalSearchParams();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("Tamu");

  useEffect(() => {
    if (params.status === 'login_sukses') {
      setIsLoggedIn(true);
      setUserName("John Doe");
    }
  }, [params]);

  const products = [
    { id: 1, name: 'Baju Hitam Polos', price: 'Rp 100.000', image: 'https://images.unsplash.com/photo-1618354691321-e851c56960d1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmFqdSUyMGhpdGFtJTIwcG9sb3N8ZW58MHx8MHx8fDA%3D' },
    { id: 2, name: 'Botol Minum', price: 'Rp 70.000', image: 'https://images.unsplash.com/photo-1585250815365-a90a469677c5?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { id: 3, name: 'Jam Tangan', price: 'Rp 150.000', image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8amFtJTIwdGFuZ2FufGVufDB8fDB8fHww' },
    { id: 4, name: 'Sepatu Lari Nike', price: 'Rp 350.000', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c2VwYXR1JTIwbGFyaXxlbnwwfHwwfHx8MA%3D%3D' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      <View style={styles.header}>
        {isLoggedIn ? (
          <View style={styles.userInfo}>
            <View style={styles.avatarContainer}>
              <Ionicons name="person" size={24} color="#555" />
            </View>
            <View>
              <Text style={styles.greeting}>Halo, Selamat Datang</Text>
              <Text style={styles.username}>{userName}</Text>
            </View>
          </View>
        ) : (
          <TouchableOpacity 
            style={styles.userInfo} 
            onPress={() => router.push('/login')}
          >
            <View style={[styles.avatarContainer, { backgroundColor: '#ffe4e6' }]}>
              <Ionicons name="log-in-outline" size={24} color="#f43f5e" />
            </View>
            <View>
              <Text style={styles.greeting}>Kamu belum login</Text>
              <Text style={[styles.username, { color: '#f43f5e' }]}>
                Masuk / Daftar Sekarang
              </Text>
            </View>
          </TouchableOpacity>
        )}

        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconButton}
          onPress={() => router.push('/products')}>
            <Ionicons name="search-outline" size={22} color="#333" />
            
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="cart-outline" size={22} color="#333" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingTop: 10 }}>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Promo Spesial 🔥</Text>
          <View style={styles.bannerContainer}>
            <Image 
              source={{ uri: 'https://plus.unsplash.com/premium_photo-1671076131210-5376fccb100b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YmFubmVyJTIwc2FsZXxlbnwwfHwwfHx8MA%3D%3D' }} 
              style={styles.bannerImage} 
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Rekomendasi Untukmu</Text>
          <View style={styles.productGrid}>
            {products.map((item) => (
              <TouchableOpacity key={item.id} style={styles.card}>
                <Image source={{ uri: item.image }} style={styles.cardImage} />
                <View style={styles.cardContent}>
                  <Text style={styles.productName} numberOfLines={2}>{item.name}</Text>
                  <Text style={styles.productPrice}>{item.price}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        
        <View style={{ height: 80 }} />
      </ScrollView>

    </SafeAreaView>
  );
}