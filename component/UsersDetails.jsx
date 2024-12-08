import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, Image } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import axios from "axios";
import { useNavigation } from '@react-navigation/native';

const UsersDetails = () => {
  const [usersData, setUsersData] = useState([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState(false);
  const [sortOrder, setSortOrder] = useState({ field: "", ascending: true });

  const navigation = useNavigation();

  const usersInfo = async () => {
    try {
      const { data } = await axios.get("https://randomuser.me/api/?results=15");
      setUsersData(data.results);
    } catch (err) {
      setError(true);
    }
  };

  useEffect(() => {
    usersInfo();
  }, []);

  const sortUsers = (field) => {
    const ascending = sortOrder.field === field ? !sortOrder.ascending : true;
    const sortedData = [...usersData].sort((a, b) => {
      if (field === "city") {
        return ascending
          ? a.location.city.localeCompare(b.location.city)
          : b.location.city.localeCompare(a.location.city);
      }
      if (field === "age") {
        return ascending ? a.dob.age - b.dob.age : b.dob.age - a.dob.age;
      }
    });
    setUsersData(sortedData);
    setSortOrder({ field, ascending });
  };

  const filteredUsers = usersData.filter((user) =>
    `${user.name.first} ${user.name.last}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const renderUserCard = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate("UserDetailPage", { user: item })}
    >
      <Image source={{ uri: item.picture.thumbnail }} style={styles.thumbnail} />
      <View style={styles.cardContent}>
        <Text style={styles.name}>
          {item.name.first} {item.name.last}
        </Text>
        <Text style={styles.age}>Age: {item.dob.age}</Text>
        <Text style={styles.location}>
          Location: {item.location.city}, {item.location.country}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Icon name="menu" size={30} color="#000" />
        </TouchableOpacity>
        <Text style={styles.name}>Users</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search by name..."
          value={search}
          onChangeText={(text) => setSearch(text)}
        />
        <TouchableOpacity style={styles.filterButton} onPress={() => sortUsers("city")}>
          <Text style={styles.buttonText}>City</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton} onPress={() => sortUsers("age")}>
          <Text style={styles.buttonText}>Age</Text>
        </TouchableOpacity>
      </View>

      {error ? (
        <Text style={styles.errorText}>Failed to load data.</Text>
      ) : (
        <FlatList
          data={filteredUsers}
          renderItem={renderUserCard}
          keyExtractor={(item) => item.login.uuid}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#ffffff",
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginHorizontal: 10,
  },
  filterButton: {
    backgroundColor: "#007bff",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginLeft: 5,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 14,
  },
  list: {
    padding: 10,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    borderRadius: 8,
    marginBottom: 10,
    elevation: 2,
    padding: 10,
  },
  thumbnail: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  cardContent: {
    justifyContent: "center",
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  age: {
    fontSize: 14,
    color: "#555",
  },
  location: {
    fontSize: 14,
    color: "#777",
  },
  errorText: {
    textAlign: "center",
    color: "red",
    marginTop: 20,
  },
});

export default UsersDetails;


