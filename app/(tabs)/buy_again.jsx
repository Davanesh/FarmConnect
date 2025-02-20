import React from 'react';
import { Text, View, FlatList, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

const buyAgainProducts = [
    { id: '1', text: 'Banana', image: require('./../../assets/images/10000027_31-fresho-banana-robusta.jpg'), price: '₹20', rating: 4.5, lastPurchased: 'few minutes ago' },
    { id: '2', text: 'Sweet Corn', image: require('./../../assets/images/40004992_15-fresho-sweet-corn.jpg'), price: '₹35', rating: 4.6, lastPurchased: '1 day ago' },

];

export default function BuyAgain() {
    const router = useRouter();

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Buy Again</Text>
                <TouchableOpacity>
                    <Text style={styles.viewAll}>View All</Text>
                </TouchableOpacity>
            </View>
            
            <FlatList
                data={buyAgainProducts}
                keyExtractor={(item) => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                    <TouchableOpacity 
                        style={styles.productItem} 
                        onPress={() => router.push(`/(tabs)/cart`)}>
                        <Image source={item.image} style={styles.productImage} />
                        <Text style={styles.productText}>{item.text}</Text>
                        <Text style={styles.productPrice}>{item.price}</Text>
                        <View style={styles.ratingRow}>
                            <Ionicons name="star" size={16} color="gold" />
                            <Text style={styles.rating}>{item.rating}</Text>
                        </View>
                        <Text style={styles.lastPurchased}>Last bought {item.lastPurchased}</Text>
                    </TouchableOpacity>
                )}
            />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 45,
        paddingHorizontal: 15,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    viewAll: {
        color: 'blue',
        fontSize: 16,
    },
    productItem: {
        width: 140,
        alignItems: 'center',
        marginRight: 15,
        backgroundColor: '#f9f9f9',
        padding: 10,
        borderRadius: 10,
        elevation: 2,
    },
    productImage: {
        width: 100,
        height: 100,
        borderRadius: 12,
    },
    productText: {
        textAlign: 'center',
        marginTop: 5,
        fontWeight: '500',
    },
    productPrice: {
        fontWeight: 'bold',
        color: 'green',
        marginTop: 5,
    },
    ratingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
    },
    rating: {
        marginLeft: 5,
        fontWeight: 'bold',
    },
    lastPurchased: {
        fontSize: 12,
        color: 'gray',
        marginTop: 5,
    },
});