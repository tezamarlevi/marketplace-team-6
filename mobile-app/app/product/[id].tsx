import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, StatusBar } from 'react-native';
import { useLocalSearchParams, router, Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from '../../components/DetailStyles';

export default function ProductDetail() {
  const { id } = useLocalSearchParams();

  const products = [
    { id: 1, name: 'Baju Hitam Polos', price: 'Rp 100.000', description: 'Baju hitam polos berbahan katun combed 30s yang nyaman dipakai sehari-hari. Anti gerah dan menyerap keringat.', image: 'https://images.unsplash.com/photo-1618354691321-e851c56960d1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmFqdSUyMGhpdGFtJTIwcG9sb3N8ZW58MHx8MHx8fDA%3D' },
    { id: 2, name: 'Botol Minum', price: 'Rp 70.000', description: 'Botol minum stainless steel tahan panas dan dingin hingga 12 jam. Cocok untuk dibawa olahraga atau kerja.', image: 'https://images.unsplash.com/photo-1585250815365-a90a469677c5?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { id: 3, name: 'Jam Tangan Casio', price: 'Rp 150.000', description: 'Jam tangan digital klasik dengan fitur stopwatch, alarm, dan tahan air. Desain retro yang tak lekang oleh waktu.', image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8amFtJTIwdGFuZ2FufGVufDB8fDB8fHww' },
    { id: 4, name: 'Sepatu Lari Nike', price: 'Rp 350.000', description: 'Sepatu lari ringan dengan bantalan empuk. Membuat lari Anda lebih kencang dan kaki tidak mudah lelah.', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c2VwYXR1JTIwbGFyaXxlbnwwfHwwfHx8MA%3D%3D' },
  ];

  const product = products.find((p) => p.id == Number(id));

  if (!product) {
    return (
      <View style={styles.center}>
        <Text>Produk tidak ditemukan!</Text>
        <TouchableOpacity onPress={() => router.back()} style={{marginTop: 20}}>
          <Text style={{color: 'blue', fontSize: 30}}>Kembali</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={28} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Product Description</Text>
        <View style={{ width: 28 }} /> 
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        
        <View style={styles.imageContainer}>
          <Image source={{ uri: product.image }} style={styles.image} />
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.title}>{product.name}</Text>
          <Text style={styles.price}>{product.price}</Text>
          
          <Text style={styles.descriptionTitle}>Product Description</Text>
          <Text style={styles.descriptionText}>
            {product.description || "Tidak ada deskripsi untuk produk ini."}
          </Text>
        </View>

      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.button} onPress={() => router.push('/cart')}>
          <Text style={styles.buttonText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
}
