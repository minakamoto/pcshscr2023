import { StyleSheet, ScrollView } from "react-native";
import { HomeProps } from "../App";
import { Card, Text } from "react-native-paper";
import { getStores, Store } from "../lib/api";
import { useEffect, useState } from "react";

// 動的画像ファイルの読み込みがデフォルトでは難しいもようなので、一旦この形で進める
// TODO あとでちゃんと見直し
const assetLogoImages = [
  { name: "Sakura-tei", source: require("./../assets/sakura_tei_logo.jpeg") },
  { name: "Aroy", source: require("./../assets/aroy_logo.jpeg") },
  { name: "Buono", source: require("./../assets/buono_logo.jpeg") },
];

function getStoreImage(storeName: string) {
  const imageSource = assetLogoImages.find((image) => image.name === storeName);
  return imageSource
    ? imageSource.source
    : require("./../assets/sakura_tei_logo.jpeg"); // TODO 一致するデータがないときの画像データを探す
}

export default function HomeScreen({ navigation }: HomeProps) {
  const [stores, setStores] = useState<Store[]>([]);

  // see. https://reactnative.dev/docs/next/network#using-fetch
  const getStoreList = async () => {
    try {
      const data = await getStores();
      setStores(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getStoreList();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>
        Welcome to Jojo University Cafeteria!
      </Text>
      <Text variant="titleMedium" style={styles.subTitle}>
        Select the store where you would like to see the menu
      </Text>
      {stores.map((store) => (
        <Card
          key={store.id}
          accessible={true}
          accessibilityLabel={`Card for${store.name}`}
          style={styles.cardContainer}
          onPress={() =>
            navigation.navigate("MenuList", {
              storeName: store.name,
              storeId: store.id,
            })
          }
        >
          <Card.Cover
            accessible={true}
            accessibilityLabel={`Cover image for${store.name}`}
            alt={`Cover image for${store.name}`}
            source={getStoreImage(store.name)}
            style={styles.cardCover}
          />
          <Card.Title
            title={store.name}
            subtitle={store.category}
            titleVariant="headlineSmall"
            subtitleVariant="titleLarge"
            titleStyle={styles.cardTitle}
            subtitleStyle={styles.cardSubTitle}
            style={{
              backgroundColor: "black",
            }}
          ></Card.Title>
        </Card>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
  },
  title: {
    textAlign: "center",
    marginTop: 32,
    color: "#fff",
  },
  subTitle: {
    textAlign: "center",
    marginTop: 10,
    marginBottom: 20,
    marginHorizontal: 6,
    color: "#6b7280",
  },
  cardContainer: {
    alignSelf: "center",
    marginBottom: 20,
    marginHorizontal: 30,
    height: 350,
    width: 370,
  },
  cardCover: {
    height: 280,
    width: 370,
  },
  cardTitle: {
    textAlign: "center",
    color: "#fff",
  },
  cardSubTitle: {
    textAlign: "center",
    color: "#6b7280",
  },
});
