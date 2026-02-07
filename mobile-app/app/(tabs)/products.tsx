import React, { useState } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, ScrollView, Image, StatusBar 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import styles from '../../components/ProductStyles';

export default function ProductScreen() {
  const [searchText, setSearchText] = useState('');

  const allProducts = [
    { id: 1, name: 'Baju Hitam Polos', price: 'Rp 100.000', image: 'https://images.unsplash.com/photo-1618354691321-e851c56960d1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmFqdSUyMGhpdGFtJTIwcG9sb3N8ZW58MHx8MHx8fDA%3D' },
    { id: 2, name: 'Baju Merah Maroon', price: 'Rp 100.000', image: 'https://images.unsplash.com/photo-1633676747161-35969adecb29?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YmFqdSUyMG1lcmFoJTIwbWFyb29ufGVufDB8fDB8fHww' },
    { id: 3, name: 'Botol Minum Biru', price: 'Rp 70.000', image: 'https://images.unsplash.com/photo-1600956054489-a23507c64a36?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGJvdG9sJTIwbWludW0lMjBiaXJ1fGVufDB8fDB8fHww' },
    { id: 4, name: 'Jam Tangan Digital', price: 'Rp 150.000', image: 'https://images.unsplash.com/photo-1676173648519-06522eb8c269?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8amFtJTIwdGFuZ2FuJTIwZGlnaXRhbHxlbnwwfHwwfHx8MA%3D%3D' },
    { id: 5, name: 'Botol Minum Silver', price: 'Rp 70.000', image: 'https://images.unsplash.com/photo-1654781639631-9ed8b0168ea1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Ym90b2wlMjBtaW51bSUyMHNpbHZlcnxlbnwwfHwwfHx8MA%3D%3D' },
    { id: 6, name: 'Jam Tangan', price: 'Rp 150.000', image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8amFtJTIwdGFuZ2FufGVufDB8fDB8fHww' },
    { id: 7, name: 'Sepatu Lari Nike', price: 'Rp 350.000', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c2VwYXR1JTIwbGFyaXxlbnwwfHwwfHx8MA%3D%3D' },
    { id: 8, name: 'Tas Ransel', price: 'Rp 200.000', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGFzJTIwcmFuc2VsfGVufDB8fDB8fHww' },
  ];

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
            onChangeText={setSearchText}
          />
        </View>

        <TouchableOpacity style={styles.cartButton}>
          <Ionicons name="cart-outline" size={26} color="#111827" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.contentContainer}>
        
        <Text style={styles.sectionTitle}>Rekomendasi</Text>

        <View style={styles.productGrid}>
          {allProducts.map((item) => (
            <TouchableOpacity key={item.id} style={styles.card}>
              <Image source={{ uri: item.image }} style={styles.cardImage} />
              <View>
                <Text style={styles.productName} numberOfLines={2}>{item.name}</Text>
                <Text style={styles.productPrice}>{item.price}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}