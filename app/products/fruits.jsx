import React from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import { useRouter } from 'expo-router';

const fruits = [
  { id: 1, name: 'Banana', price: '12', seller: 'Fresh Farms', image: require('./../../assets/images/10000027_31-fresho-banana-robusta.jpg') },
  { id: 2, name: 'Apple', price: '110', seller: 'Organic Orchards', image: require('./../../assets/images/40033819_34-fresho-apple-shimla.jpg') },
  { id: 3, name: 'Mosambi', price: '132', seller: 'Citrus Growers', image: require('./../../assets/images/40105338_3-fresho-mosambi-economy.jpg') },
  { id: 4, name: 'Papaya', price: '205', seller: 'Tropical Farms', image: require('./../../assets/images/40296057_4-fresho-papaya.jpg') },
  { id: 5, name: 'Watermelon', price: '40', seller: 'Green Harvest', image: require('./../../assets/images/10000207_25-fresho-watermelon-small.jpg') },
  { id: 6, name: 'Guava', price: '90', seller: 'Healthy Fields', image: require('./../../assets/images/10000370_19-fresho-guava.jpg') },
  { id: 7, name: 'Dragon Fruit', price: '55', seller: 'Healthy Fields', image: require('./../../assets/images/40008982_16-fresho-dragon-fruit.jpg') },
  { id: 8, name: 'Pomegranate', price: '190', seller: 'Healthy Fields', image: require('./../../assets/images/40005823_8-fresho-pomegranate-peeled.jpg') },

];



const FruitsPage = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fruits</Text>
      <FlatList
        data={fruits}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => (
          <TouchableOpacity
  style={styles.fruitItem}
  onPress={() =>
    router.push({
      pathname: '/products/product',
      params: {
        id: item.id.toString(),
        name: item.name,
        price: item.price,
      },
    })
  }>
  <Image source={item.image} style={styles.fruitImage} />
  <Text style={styles.fruitName}>{item.name}</Text>
  <Text style={styles.sellerName}>{item.seller}</Text>
  <Text style={styles.fruitPrice}>{`₹${item.price}`}</Text>
</TouchableOpacity>

        )}
        showsVerticalScrollIndicator={false}
      />
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
    marginTop: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  row: {
    justifyContent: 'space-between',
  },
  fruitItem: {
    flex: 1,
    alignItems: 'center',
    margin: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  fruitImage: {
    width: 100,
    height: 100,
    borderRadius: 12,
  },
  fruitName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
  },
  fruitPrice: {
    fontSize: 14,
    color: 'green',
    marginTop: 3,
  },
});

export default FruitsPage;
