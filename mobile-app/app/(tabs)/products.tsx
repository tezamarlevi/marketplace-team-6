import React, { useState, useEffect } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, ScrollView, Image, StatusBar, ActivityIndicator, RefreshControl
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router} from 'expo-router';
import styles from '../../components/ProductStyles';
import { API_URL } from '../../constants/Api';

export default function ProductScreen() {
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${API_URL}/api/products`);
      const data = await response.json(); 
      setProducts(data);
      setFilteredProducts(data); 
    } catch (error) {
      console.error("Gagal ambil data:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSearch = (text: string) => {
    setSearchText(text);
    
    if (text) {
      const newData = products.filter((item: any) => {
        const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredProducts(newData);
    } else {
      setFilteredProducts(products);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchProducts();
  };

  if (loading) {
    return (
      <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
        <ActivityIndicator size="large" color="#be123c" />
      </View>
    );
  }


  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#9ca3af" />
          <TextInput 
            style={styles.searchInput}
            placeholder="Search products..."
            placeholderTextColor="#9ca3af"
            value={searchText}
            onChangeText={(text) => handleSearch(text)}
          />
          {searchText.length > 0 && (
             <TouchableOpacity onPress={() => handleSearch('')}>
                <Ionicons name="close-circle" size={20} color="#9ca3af" />
             </TouchableOpacity>
          )}
        </View>

        <TouchableOpacity style={styles.cartButton} onPress={() => router.push('/cart')}>
          <Ionicons name="cart-outline" size={26} color="#111827" />
        </TouchableOpacity>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={styles.contentContainer}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <Text style={styles.sectionTitle}>
          {searchText ? `Hasil pencarian: "${searchText}"` : 'Semua Produk'}
        </Text>

        <View style={styles.productGrid}>
          {filteredProducts.map((item: any) => (
            <TouchableOpacity 
              key={item._id} 
              style={styles.card}
              onPress={() => router.push(`/product/${item._id}`)} 
            >
              <Image source={{ uri: item.image }} style={styles.cardImage} />
              <View>
                <Text style={styles.productName} numberOfLines={2}>{item.name}</Text>
                <Text style={styles.productPrice}>
                  Rp {item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
        
        {filteredProducts.length === 0 && (
          <View style={{alignItems: 'center', marginTop: 50}}>
            <Text style={{color: '#888'}}>Produk tidak ditemukan.</Text>
          </View>
        )}
        
      </ScrollView>
    </SafeAreaView>
  );
}