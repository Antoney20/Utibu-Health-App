import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; 
import BottomTab from '../components/BottomTab';
import { BASE_URL } from '@env';

export default function ProfileScreen({ navigation }) {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await fetch(`${BASE_URL}profile/`, {
        headers: {
          // Authorization: 'Bearer YOUR_ACCESS_TOKEN', 
        },
      });
      const data = await response.json();
      setUserData(data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleLogout = () => {
    // Implement logout functionality
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeAreaView}>
        <View style={styles.card}>
          {userData ? (
            <>
              <View style={styles.userInfo}>
                <FontAwesome name="user" size={24} color="black" />
                <Text style={styles.label}>Username:</Text>
                <Text>{userData.first_name} {userData.last_name}</Text>
              </View>
              <View style={styles.userInfo}>
                <FontAwesome name="envelope" size={24} color="black" />
                <Text style={styles.label}>Email:</Text>
                <Text>{userData.email}</Text>
              </View>
              {/* Add more user details as needed */}
            </>
          ) : (
            <Text>Loading...</Text>
          )}
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <BottomTab navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  safeAreaView: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 20,
    borderWidth: 1,
    borderColor: '#dddddd',
    elevation: 3, // for Android
    shadowColor: '#000000', // for iOS
    shadowOpacity: 0.2, // for iOS
    shadowOffset: { width: 1, height: 1 }, // for iOS
    marginBottom: 20,
    width: '90%', // Adjust card width as needed
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
    marginLeft: 10,
  },
  logoutButton: {
    backgroundColor: 'red',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
