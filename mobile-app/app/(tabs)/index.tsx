import React, { useState, useEffect, useCallback } from 'react';
import { 
  Text, View, ScrollView, Image, TouchableOpacity, StatusBar 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'; 
import { Ionicons } from '@expo/vector-icons'; 
import { router, useFocusEffect } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../../components/DashboardStyles';
import { API_URL } from '../../constants/Api';

export default function HomeScreen() {
  const [products, setProducts] = useState<any[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const [userName, setUserName] = useState('');

useFocusEffect(
    useCallback(() => {
      const checkLoginStatus = async () => {
        try {
          const userDataJson = await AsyncStorage.getItem('userData');
          const token = await AsyncStorage.getItem('userToken');

          if (userDataJson && token) {
            const userData = JSON.parse(userDataJson);
            setIsLoggedIn(true);
            setUserName(userData.name); 
          } else {
            setIsLoggedIn(false);
            setUserName('');
          }
        } catch (error) {
          console.error("Can't read user data:", error);
        }
      };

      checkLoginStatus();
    }, [])
  );

  useEffect(() => {
    fetch(`${API_URL}/api/products`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
           setProducts(data.slice(0, 4)); 
        }
        setLoadingProducts(false);
      })
      .catch(err => {
        console.log("Error fetching home products:", err);
        setLoadingProducts(false);
      });
  }, []);

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
            <Text style={styles.greeting}>Hello, </Text>
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
            <Text style={styles.greeting}>You haven't logged in</Text>
            <Text style={[styles.username, { color: '#f43f5e' }]}>
              Login / Register here
            </Text>
          </View>
        </TouchableOpacity>
      )}

        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconButton}
          onPress={() => router.push('/products')}>
            <Ionicons name="search-outline" size={22} color="#333" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}
          onPress={() => router.push('/cart')}>
            <Ionicons name="cart-outline" size={22} color="#333" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingTop: 10 }}>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Special Deals 🔥</Text>
          <View style={styles.bannerContainer}>
            <Image 
              source={{ uri: 'https://plus.unsplash.com/premium_photo-1671076131210-5376fccb100b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0' }} 
              style={styles.bannerImage} 
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recommended for you</Text>
          <View style={styles.productGrid}>
            {products.map((item: any) => (
              <TouchableOpacity 
                key={item._id} 
                style={styles.card}
                onPress={() => router.push(`/product/${item._id}`)}
              >
                <Image source={{ uri: item.image }} style={styles.cardImage} />
                <View style={styles.cardContent}>
                  <Text style={styles.productName} numberOfLines={2}>{item.name}</Text>
                  <Text style={styles.productPrice}>
                    Rp {item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                  </Text>
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