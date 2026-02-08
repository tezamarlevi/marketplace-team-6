import React, { useEffect, useState } from 'react';
import { 
  View, Text, Image, TouchableOpacity, ScrollView, StatusBar, Alert, ActivityIndicator 
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../../components/DetailStyles';
import { API_URL } from '../../constants/Api'; 

export default function ProductDetail() {
  const { id } = useLocalSearchParams();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [addingToCart, setAddingToCart] = useState(false);

useEffect(() => {
    const fetchDetail = async () => {
      try {
        const response = await fetch(`${API_URL}/api/products`);
        const data = await response.json();
        const found = data.find((item: any) => item._id === id);
        setProduct(found);
      } catch (error) {
        console.error("Can't get detail:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchDetail();
  }, [id]);

  if (loading) {
    return (
      <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
        <ActivityIndicator size="large" color="#be123c" />
      </View>
    );
  }

  if (!product) {
    return (
      <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
        <Text>Product not found!</Text>
        <TouchableOpacity onPress={() => router.back()} style={{marginTop: 20}}>
          <Text style={{color: 'blue', fontSize: 18}}>Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleAddToCart = async () => {
    setAddingToCart(true);
    try {
      const token = await AsyncStorage.getItem('userToken');
      
      if (!token) {
        Alert.alert("Please login!", "You need to login to add to cart.");
        router.push('/login');
        return;
      }

      const response = await fetch(`${API_URL}/api/cart`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({
          productId: product._id, 
          quantity: 1             
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert("Success", "Added to cart!");
        router.push('/cart');
      } else {
        Alert.alert("Fail", data.message || "Can't add to cart");
      }

    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Can't connect to server");
    } finally {
      setAddingToCart(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={28} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Product Detail</Text>
        
        <TouchableOpacity onPress={() => router.push('/cart')}>
           <Ionicons name="cart-outline" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        
        <View style={styles.imageContainer}>
          <Image source={{ uri: product.image }} style={styles.image} />
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.title}>{product.name}</Text>
          
          <Text style={styles.price}>
            Rp {product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
          </Text>
          
          <View style={{flexDirection:'row', marginTop: 10, gap: 10}}>
             <View style={{backgroundColor:'#f3f4f6', padding:5, borderRadius:5}}>
                <Text style={{fontSize:15, color:'#222'}}>Stock: {product.stock}</Text>
             </View>
             <View style={{backgroundColor:'#f3f4f6', padding:5, borderRadius:5}}>
                <Text style={{fontSize:15, color:'#222'}}>{product.category}</Text>
             </View>
          </View>

          <Text style={styles.descriptionTitle}>Description</Text>
          <Text style={styles.descriptionText}>
            {product.description || "No description."}
          </Text>
        </View>

      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={[styles.button, addingToCart && {backgroundColor: '#ccc'}]} 
          onPress={handleAddToCart}
          disabled={addingToCart}
        >
          <Text style={styles.buttonText}>
            {addingToCart ? "Adding..." : "Add to Cart"}
          </Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
}