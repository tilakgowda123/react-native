import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import UsersDetails from "./component/UsersDetails";
import ClientsDetails from "./component/ClientsDetails";
import UserDetailPage from "./component/UserDetailPage";
import ClientDetailPage from "./component/ClientDetailPage";

const HomeScreen = ({ navigation }) => {
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={toggleMenu}>
          <Icon name="menu" size={30} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Levisoft</Text>
      </View>

      {menuVisible && (
        <View style={styles.menu}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              setMenuVisible(false);
              navigation.navigate("Users");
            }}
          >
            <Text style={styles.menuText}>Users</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              setMenuVisible(false);
              navigation.navigate("Clients");
            }}
          >
            <Text style={styles.menuText}>Clients</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Users" component={UsersDetails} />
        <Stack.Screen name="UserDetailPage" component={UserDetailPage} />
        <Stack.Screen name="Clients" component={ClientsDetails} />
        <Stack.Screen name="ClientDetailPage" component={ClientDetailPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "skyblue",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerText: {
    fontSize: 20,
    marginLeft: 10,
  },
  menu: {
    backgroundColor: "#f0f0f0",
    marginTop: 10,
    borderRadius: 5,
    padding: 10,
  },
  menuItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  menuText: {
    fontSize: 16,
  },
});

export default App;





