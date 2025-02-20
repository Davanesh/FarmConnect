import React, { useState, useMemo } from 'react';
import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
  FlatList,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import Carousel from 'react-native-reanimated-carousel';
import { Colors } from '../../constants/Colors';
import { product } from '../../data/itemData';

const Home = () => {
  const width = Dimensions.get('window').width;
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const banners = useMemo(() => [
    require('./../../assets/images/banner1.jpg'),
    require('./../../assets/images/front.jpg'),
  ], []);

  const categories = useMemo(() => [
    { id: 1, name: 'Fruits', image: require('./../../assets/images/fruits.jpg') },
    { id: 2, name: 'Vegetables', image: require('./../../assets/images/vegetables.jpg') },
    { id: 3, name: 'Dairy', image: require('./../../assets/images/dairy.jpg') },
  ], []);

  const deals = useMemo(() => [
    { id: 1, name: '₹20', image: require('./../../assets/images/10000027_31-fresho-banana-robusta.jpg') },
    { id: 2, name: '₹35', image: require('./../../assets/images/40004992_15-fresho-sweet-corn.jpg') },
    { id: 3, name: '₹60', image: require('./../../assets/images/40057966_8-fresho-tender-coconut-medium.jpg') },
  ], []);

  const filteredProducts = product.filter(item =>
    item.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('./../../assets/images/FC_logo-removebg-preview.png')}
          style={styles.logo}
        />
        <TouchableOpacity onPress={() => router.push('/products/profile')}>
          <Ionicons name="person-circle-outline" size={35} color="black" />
        </TouchableOpacity>
      </View>

      <View style={styles.searchBar}>
        <Ionicons name="search-outline" size={24} color="black" />
        <TextInput 
          placeholder='Search' 
          style={styles.searchInput} 
          value={searchQuery} 
          onChangeText={setSearchQuery} 
        />
      </View>

      <Carousel
        width={width}
        height={200}
        autoPlay
        data={banners}
        scrollAnimationDuration={1000}
        renderItem={({ item }) => (
          <Image source={item} style={styles.banner} />
        )}
      />

      <Text style={styles.sectionTitle}>Shop By Category</Text>
      <FlatList
        data={categories}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.categoryItem}
            onPress={() => router.push('/products/fruits')}>
            <Image source={item.image} style={styles.categoryImage} />
            <Text style={styles.categoryText}>{item.name}</Text>
          </TouchableOpacity>
        )}
        showsVerticalScrollIndicator={false}
      />

      <Text style={styles.sectionTitle}>Deals of the Day</Text>
      <FlatList
        horizontal
        data={deals}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.dealItem}
            onPress={() => router.push('/products/product')}>
            <Image source={item.image} style={styles.dealImage} />
            <Text style={styles.dealText}>{item.name}</Text>
          </TouchableOpacity>
        )}
        showsHorizontalScrollIndicator={false}
      />

      <Text style={styles.sectionTitle}>Recommended For You</Text>
      <FlatList
        horizontal
        data={filteredProducts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.productItem}
            onPress={() => router.push('/products/product')}>
            <Image source={item.image} style={styles.productImage} />
            <Text style={styles.productText}>{item.text}</Text>
            <Text style={styles.productPrice}>{item.price}</Text>
          </TouchableOpacity>
        )}
        showsHorizontalScrollIndicator={false}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    marginTop: 30,
    marginRight: 5,
  },
  logo: {
    width: 200,
    height: 50,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
    borderRadius: 10,
    padding: 12,
    margin: 10,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
  },
  banner: {
    width: '100%',
    height: 200,
    borderRadius: 1,
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 20,
  },
  categoryItem: {
    flex: 1,
    alignItems: 'center',
    margin: 10,
  },
  categoryImage: {
    width: 100,
    height: 100,
    borderRadius: 12,
  },
  categoryText: {
    textAlign: 'center',
    marginTop: 5,
  },
  dealItem: {
    margin: 10,
  },
  dealImage: {
    width: 150,
    height: 150,
    borderRadius: 12,
  },
  dealText: {
    textAlign: 'center',
    marginTop: 5,
  },
  productItem: {
    margin: 10,
  },
  productImage: {
    width: 150,
    height: 150,
    borderRadius: 12,
  },
  productText: {
    textAlign: 'center',
    marginTop: 5,
  },
  productPrice: {
    textAlign: 'center',
    marginTop: 5,
    color: Colors.PRIMARY,
    fontWeight: 'bold',
  },
});

export default Home;
