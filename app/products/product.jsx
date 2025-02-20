import { useNavigation, useRouter, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, FlatList } from "react-native";
import { Colors } from "../../constants/Colors";
import { useCart } from "../context/CartContext"; // ✅ Import Cart Context

const productImages = {
    "1": require("./../../assets/images/10000027_31-fresho-banana-robusta.jpg"),
    "2": require("./../../assets/images/40033819_34-fresho-apple-shimla.jpg"),
    "3": require("./../../assets/images/40105338_3-fresho-mosambi-economy.jpg"),
    "4": require("./../../assets/images/40296057_4-fresho-papaya.jpg"),
    "5": require("./../../assets/images/10000207_25-fresho-watermelon-small.jpg"),
    "6": require("./../../assets/images/10000370_19-fresho-guava.jpg"),
    "7": require("./../../assets/images/40008982_16-fresho-dragon-fruit.jpg"),
    "8": require("./../../assets/images/40005823_8-fresho-pomegranate-peeled.jpg"),
};

export default function Product() {
    const navigation = useNavigation();
    const router = useRouter();
    const { id, name, price } = useLocalSearchParams();
    const { addToCart } = useCart(); // ✅ Use Cart Context
    const [suggestedProducts, setSuggestedProducts] = useState([]);

    useEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });

        // Simulating a fetch of related products based on the current product's ID
        fetchSuggestedProducts(id);
    }, [id]);

    const fetchSuggestedProducts = async (currentProductId) => {
        // Simulate an API call to fetch suggested products based on the current product
        const response = [
            {
                id: "2",
                name: "Fresh Sweet Corn - 1Kg",
                price: 35,
                image: require("./../../assets/images/40004992_15-fresho-sweet-corn.jpg"),
            },
            {
                id: "3",
                name: "Organic Tomatoes - 1Kg",
                price: 30,
                image: require("./../../assets/images/10000200_20-fresho-tomato-hybrid.jpg"),
            },
            {
                id: "4",
                name: "Fresh Papaya - 1Kg",
                price: 40,
                image: require("./../../assets/images/40296057_4-fresho-papaya.jpg"),
            },
        ];

        // For now, the response is static. You can replace it with an actual API call.
        setSuggestedProducts(response);
    };

    const imageSource = productImages[id] || productImages["1"];

    return (
        <ScrollView style={styles.container}>
            <View style={styles.productInfo}>
                <View style={styles.header}>
                    <Text style={styles.tag}>Fresh</Text>
                    <Image
                        source={require('./../../assets/images/5-star-rating-review-star-transparent-free-png__1_-removebg-preview.png')}
                        style={styles.ratingImage}
                    />
                </View>

                {/* ✅ Display the correct product name and image */}
                <Text style={styles.productTitle}>{name}</Text>
                <Image source={imageSource} style={styles.productImage} />
            </View>

            <View style={styles.details}>
                <Text style={styles.price}>M.R.P: ₹{price}</Text>
                <Text style={styles.inStock}>In Stock</Text>
                <Text style={styles.sellerInfo}>
                    Sold by Arun Groups and fulfilled by FarmConnect
                </Text>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={[styles.button, styles.negotiationButton]}
                        onPress={() => router.push('/type/main')}
                    >
                        <Text style={[styles.buttonText, styles.negotiationText]}>
                            Negotiate with Seller
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.button, styles.cartButton]}
                        onPress={() => addToCart({ id, name, price, image: imageSource })} // ✅ Add to Cart
                    >
                        <Text style={[styles.buttonText, styles.cartText]}>
                            Add to Cart
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Suggested Products Section */}
            <Text style={styles.suggestionTitle}>You may also like</Text>
            <FlatList
                data={suggestedProducts}
                keyExtractor={(item) => item.id}
                horizontal
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.suggestionCard}
                        onPress={() => router.push(`/product?id=${item.id}&name=${item.name}&price=${item.price}`)}
                    >
                        <Image source={item.image} style={styles.suggestionImage} />
                        <Text style={styles.suggestionName}>{item.name}</Text>
                        <Text style={styles.suggestionPrice}>₹{item.price}</Text>
                    </TouchableOpacity>
                )}
            />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 20,
    },
    productInfo: {
        marginTop: 30,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    tag: {
        fontSize: 16,
        color: '#666',
        fontWeight: 'bold',
    },
    ratingImage: {
        height: 20,
        resizeMode: 'contain',
    },
    productTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    productImage: {
        width: "100%",
        height: 350,
        borderRadius: 12,
        resizeMode: "contain",
        alignSelf: "center",
    },
    details: {
        marginTop: 20,
    },
    price: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    inStock: {
        color: Colors.GREEN,
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 5,
    },
    sellerInfo: {
        fontSize: 14,
        color: "#555",
        marginBottom: 20,
    },
    buttonContainer: {
        marginTop: 20,
    },
    button: {
        borderRadius: 12,
        height: 60,
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 10,
        padding: 15,
    },
    negotiationButton: {
        backgroundColor: Colors.GRAY,
    },
    negotiationText: {
        color: Colors.PRIMARY,
    },
    cartButton: {
        backgroundColor: Colors.GREEN,
    },
    cartText: {
        color: Colors.WHITE,
        fontWeight: "bold",
    },
    buttonText: {
        fontSize: 18,
        fontFamily: 'outfit-medium',
        textAlign: "center",
    },
    /* Suggested Products */
    suggestionTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginTop: 30,
        marginBottom: 15,
    },
    suggestionContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 20,
        paddingBottom: 20,
    },
    suggestionCard: {
        backgroundColor: "#f5f5f5",
        borderRadius: 12,
        padding: 10,
        width: 150,
        alignItems: "center",
    },
    suggestionImage: {
        width: 100,
        height: 100,
        borderRadius: 12,
        marginBottom: 10,
    },
    suggestionName: {
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
    },
    suggestionPrice: {
        fontSize: 16,
        fontWeight: "bold",
        color: Colors.PRIMARY,
        marginTop: 5,
    },
});
