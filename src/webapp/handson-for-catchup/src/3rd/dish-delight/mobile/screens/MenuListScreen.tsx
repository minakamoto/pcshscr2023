import { FlatList, StyleSheet, View } from "react-native";
import { ActivityIndicator, Card, Text } from "react-native-paper";
import { MenuListProps } from "../App";
import { Menu, getMenus } from "../lib/api";
import { useEffect, useState } from "react";

export default function MenuListScreen({ route, navigation }: MenuListProps) {
  const storeId = route.params.storeId;
  const [isLoading, setLoading] = useState(true);
  const [menus, setMenus] = useState<Menu[]>([]);

  const getMenuList = async () => {
    try {
      // Next.jsと異なり、ServerComponentsは利用できないので、propsで渡したStoreをそのまま使う
      const data = await getMenus(storeId);
      setMenus(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMenuList();
  }, []);

  const renderCard = (item: Menu) => (
    <>
      <Card
        key={item.id}
        accessible={true}
        accessibilityLabel={`Card for${item.name}`}
        style={styles.cardContainer}
        onPress={() =>
          navigation.navigate("MenuDetail", {
            menu: item,
          })
        }
      >
        <Card.Cover
          accessible={true}
          accessibilityLabel={`Cover image for${item.name}`}
          alt={`Card image for${item.name}`}
          source={{ uri: item.img }}
          style={styles.cardCover}
        />
        <Card.Title
          title={item.name}
          subtitle={item.price}
          titleVariant="headlineSmall"
          subtitleVariant="titleLarge"
          titleStyle={styles.cardTitle}
          subtitleStyle={styles.cardSubTitle}
          style={styles.cardTitleContainer}
        ></Card.Title>
      </Card>
    </>
  );

  if (!isLoading && menus.length === 0) {
    return (
      <View style={styles.notFoundContainer}>
        <Text variant="titleLarge" style={styles.notFoundText}>
          The menu for that store does not exist, please select the store again
          from HOME.
        </Text>
      </View>
    );
  }

  return (
    <>
      {isLoading ? (
        <ActivityIndicator
          size={"large"}
          color="#0284c7"
          style={styles.indicator}
        />
      ) : (
        <FlatList
          style={styles.container}
          data={menus}
          renderItem={({ item }) => renderCard(item)}
        ></FlatList>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  indicator: {
    flex: 1,
    backgroundColor: "black",
  },
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
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 28,
    height: 350,
    backgroundColor: "black",
  },
  cardCover: {
    height: 280,
    width: 370,
  },
  cardTitleContainer: {
    backgroundColor: "black",
  },
  cardTitle: {
    textAlign: "center",
    color: "#fff",
  },
  cardSubTitle: {
    textAlign: "center",
    color: "#6b7280",
  },
  notFoundContainer: {
    flex: 1,
    backgroundColor: "black",
    // Next.js版とレイアウト(UI)が違うが、真ん中の方が良さそう。TODO あとで考える
    alignItems: "center",
    justifyContent: "center",
  },
  notFoundText: {
    // こっちもレイアウトが違う
    textAlign: "center",
    color: "#fff",
    marginHorizontal: 10,
  },
});
