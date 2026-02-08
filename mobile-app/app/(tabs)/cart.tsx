import React, { useState, useCallback } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StatusBar, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router, useFocusEffect } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../../components/CartStyles';
import { API_URL } from '../../constants/Api';

export default function CartScreen() {
    const [cartItems, setCartItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [totalPrice, setTotalPrice] = useState(0);

    useFocusEffect(
        useCallback(() => {
        fetchCart();
        }, [])
    );

    const fetchCart = async () => {
        try {
        const token = await AsyncStorage.getItem('userToken');
        if (!token) {
            setLoading(false);
            return;
        }

        const response = await fetch(`${API_URL}/api/cart`, {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        
        const data = await response.json();

        if (response.ok) {
            const items = data.items || []; 
            setCartItems(items);
            
            const total = items.reduce((sum: number, item: any) => {
            return sum + (item.product.price * item.quantity);
            }, 0);
            setTotalPrice(total);
        }
        } catch (error) {
        console.error("Can't get cart:", error);
        } finally {
        setLoading(false);
        }
    };


    const removeItem = async (productId: string) => {
        try {
        const token = await AsyncStorage.getItem('userToken');
        const response = await fetch(`${API_URL}/api/cart/${productId}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        });

        if (response.ok) {
            Alert.alert("Success", "Product erased from cart");
            fetchCart(); 
        } else {
            Alert.alert("Fail", "Can't erase product");
        }
        } catch (error) {
        console.error(error);
        }
    };

    const handleCheckout = () => {
        if (cartItems.length === 0) {
        Alert.alert("Empty", "Your cart is empty");
        return;
        }
        Alert.alert("Checkout succesfull!", "Your order is being processed");
        router.push('/(tabs)');
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
            <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={28} color="#000" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>My cart</Text>
        </View>

        <ScrollView contentContainerStyle={styles.cartList}>
            {cartItems.length === 0 ? (
            <View style={{alignItems:'center', marginTop: 50}}>
                <Ionicons name="cart-outline" size={60} color="#ddd" />
                <Text style={{color:'#888', marginTop:10}}>Empty cart </Text>
            </View>
            ) : (
            cartItems.map((item, index) => (
                <View key={index} style={styles.cartItem}>
                <Image source={{ uri: item.product.image }} style={styles.itemImage} />
                
                <View style={styles.itemInfo}>
                    <Text style={styles.itemName}>{item.product.name}</Text>
                    <Text style={{fontSize:12, color:'#666', marginBottom: 5}}>Qty: {item.quantity}</Text>
                    <Text style={styles.itemPrice}>
                    Rp {(item.product.price * item.quantity).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                    </Text>
                </View>

                <TouchableOpacity onPress={() => removeItem(item.product._id)}>
                    <Ionicons name="trash-outline" size={24} color="red" />
                </TouchableOpacity>
                </View>
            ))
            )}
        </ScrollView>

        <View style={styles.footer}>
            <View>
            <Text style={styles.totalText}>Total:</Text>
            <Text style={styles.totalPrice}>
                Rp {totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
            </Text>
            </View>
            
            <TouchableOpacity 
            style={[styles.checkoutButton, cartItems.length === 0 && {backgroundColor: '#ccc'}]}
            onPress={handleCheckout}
            disabled={cartItems.length === 0}
            >
            <Text style={styles.checkoutText}>Checkout</Text>
            </TouchableOpacity>
        </View>

        </SafeAreaView>
    );
}