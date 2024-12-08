import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const ClientDetailPage = ({ route, navigation }) => {
  const { client } = route.params; 

  return (
    <View style={styles.container}>
      <Image source={{ uri: client.picture.large }} style={styles.image} />
      <Text style={styles.name}>
        {client.name.first} {client.name.last}
      </Text>
      <Text style={styles.info}>Age: {client.dob.age}</Text>
      <Text style={styles.info}>Email: {client.email}</Text>
      <Text style={styles.info}>
        Location: {client.location.city}, {client.location.country}
      </Text>

   
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()} 
      >
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 10,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  info: {
    fontSize: 16,
    marginTop: 10,
  },
  backButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  backButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ClientDetailPage;


