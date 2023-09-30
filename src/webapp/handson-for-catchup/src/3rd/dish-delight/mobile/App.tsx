import React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { PaperProvider } from "react-native-paper";
import HomeScreen from "./screens/HomeScreen";
import MenuListScreen from "./screens/MenuListScreen";
import MenuDetailScreen from "./screens/MenuDetailScreen";
import Navbar from "./components/Navbar";
import { Menu } from "./lib/api";

export type RootStackParamList = {
  Home: undefined;
  MenuList: { storeName: string; storeId: number };
  MenuDetail: { menu: Menu };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export type HomeProps = NativeStackScreenProps<RootStackParamList, "Home">;
export type MenuListProps = NativeStackScreenProps<
  RootStackParamList,
  "MenuList"
>;
export type MenuDetailProps = NativeStackScreenProps<
  RootStackParamList,
  "MenuDetail"
>;

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          // common setting
          screenOptions={{
            headerStyle: {
              backgroundColor: "#0284c7",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        >
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerTitle: () => <Navbar /> }}
          />
          <Stack.Screen
            name="MenuList"
            component={MenuListScreen}
            options={({ route }) => ({ title: route.params.storeName })}
          />
          <Stack.Screen
            name="MenuDetail"
            component={MenuDetailScreen}
            options={({ route }) => ({ title: route.params.menu.name })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({});
