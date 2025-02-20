import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';

const Profile = () => {
  const router = useRouter();

  const user = {
    name: 'Sharvesh Sanjay M',
    email: 'sharveshsanjay@gmail.com',
    profilePicture: require('./../../assets/images/profile-icon.jpg'),
  };

  const handleEditProfile = () => {
    router.push('/profile/edit');
  };

  const handleLogout = () => {
    console.log('User logged out');
    router.replace('/login');
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <View style={{ width: 24 }} /> {/* Placeholder for alignment */}
      </View>

      {/* Profile Header */}
      <View style={styles.profileHeader}>
        <Image source={user.profilePicture} style={styles.profileImage} />
        <Text style={styles.userName}>{user.name}</Text>
        <Text style={styles.userEmail}>{user.email}</Text>
        <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>

      {/* Saved Addresses Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Saved Addresses</Text>
        <View style={styles.card}>
          <View style={styles.addressItem}>
            <Ionicons name="location-outline" size={24} color="#555" />
            <View style={styles.addressDetails}>
              <Text style={styles.addressTitle}>Home</Text>
              <Text style={styles.addressText}>123 Bhavani, Erode, Tamilnadu</Text>
            </View>
          </View>
          <View style={styles.divider} />
          <View style={styles.addressItem}>
            <Ionicons name="location-outline" size={24} color="#555" />
            <View style={styles.addressDetails}>
              <Text style={styles.addressTitle}>Work</Text>
              <Text style={styles.addressText}>Veltech University, Avadi, Chennai</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Preferences Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preferences</Text>
        <View style={styles.card}>
          <TouchableOpacity style={styles.preferenceItem}>
            <Ionicons name="notifications-outline" size={24} color="#555" />
            <Text style={styles.preferenceText}>Notification Preferences</Text>
          </TouchableOpacity>
          <View style={styles.divider} />
          <TouchableOpacity style={styles.preferenceItem}>
            <Ionicons name="card-outline" size={24} color="#555" />
            <Text style={styles.preferenceText}>Payment Methods</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Settings Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Settings</Text>
        <View style={styles.card}>
          <TouchableOpacity style={styles.preferenceItem}>
            <Ionicons name="settings-outline" size={24} color="#555" />
            <Text style={styles.preferenceText}>Account Settings</Text>
          </TouchableOpacity>
          <View style={styles.divider} />
          <TouchableOpacity style={styles.preferenceItem}>
            <Ionicons name="lock-closed-outline" size={24} color="#555" />
            <Text style={styles.preferenceText}>Privacy & Security</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Log Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 40,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  userEmail: {
    fontSize: 16,
    color: '#888',
    marginBottom: 16,
  },
  editButton: {
    backgroundColor: '#007BFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
    maxWidth: 200,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  addressItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  addressDetails: {
    marginLeft: 12,
    flex: 1,
  },
  addressTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  addressText: {
    fontSize: 14,
    color: '#555',
  },
  preferenceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  preferenceText: {
    fontSize: 16,
    marginLeft: 12,
    flex: 1,
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 8,
  },
  logoutButton: {
    backgroundColor: '#FF3B30',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 24,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Profile;