import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Colors } from "../../constants/Colors";
import { useRouter } from 'expo-router';

export default function Main() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>What type of negotiation do you want to choose?</Text>
            
            <TouchableOpacity style={styles.buttonPrimary}
                onPress={() => router.replace('/negotiate/product_base')}>
                <Text style={styles.buttonText}>Product Base</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonSecondary}
                onPress={() => router.replace('/negotiate/Bulk Purchase')}>
                <Text style={styles.buttonText}>Bulk Purchase</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonPrimary}
                onPress={() => router.replace('/negotiate/Frequent Purchase')}>
                <Text style={styles.buttonText}>Frequent Purchase</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.WHITE,
        height: "100%",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 25,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 16,  // Increased spacing
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color: Colors.PRIMARY, // Added color
    },
    buttonPrimary: {
        width: '85%',
        borderRadius: 30,
        backgroundColor: '#2db996',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 14,  // Increased padding for better touch area
        paddingHorizontal: 20,
        elevation: 5,  // Android shadow
        shadowColor: "#000",  // iOS shadow
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    buttonSecondary: {
        width: '85%',
        borderRadius: 30,
        backgroundColor: '#767676',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 14,
        paddingHorizontal: 20,
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    buttonText: {
        color: Colors.WHITE,
        fontSize: 22,
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: 1,  // Added spacing for modern look
    }
});
