import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import styles from '../../components/CartStyles';

export default function CartScreen() {

    const cartItems = [
        { 
        id: 1, 
        name: 'Jam Tangan', 
        price: 150000, 
        image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8amFtJTIwdGFuZ2FufGVufDB8fDB8fHww' 
        },
        { 
        id: 2, 
        name: 'Baju Hitam Polos', 
        price: 100000, 
        image: 'https://images.unsplash.com/photo-1618354691321-e851c56960d1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmFqdSUyMGhpdGFtJTIwcG9sb3N8ZW58MHx8MHx8fDA%3D' 
        },
    ];

    const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);

    const formatRupiah = (num: number) => {
        return 'Rp ' + num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />

        <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={28} color="#000" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>My Cart</Text>
        </View>

        <ScrollView contentContainerStyle={styles.cartList}>
            {cartItems.map((item) => (
            <View key={item.id} style={styles.cartItem}>
                <Image source={{ uri: item.image }} style={styles.itemImage} />
                <View style={styles.itemInfo}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemPrice}>{formatRupiah(item.price)}</Text>
                </View>
                
                {/*tambahin fungsi hapus product*/}
                <TouchableOpacity>
                <Ionicons name="trash-outline" size={20} color="#ff4444" />
                </TouchableOpacity>

            </View>
            ))}
        </ScrollView>

        <View style={styles.footer}>
            <View>
            <Text style={styles.totalText}>Total:</Text>
            <Text style={styles.totalPrice}>{formatRupiah(totalPrice)}</Text>
            </View>
            
            {/*tambahin fungsi checkout yang ngilangin semua barang*/}
            <TouchableOpacity style={styles.checkoutButton}>
            <Text style={styles.checkoutText}>Checkout</Text>
            </TouchableOpacity>
        </View>

        </SafeAreaView>
    );
}