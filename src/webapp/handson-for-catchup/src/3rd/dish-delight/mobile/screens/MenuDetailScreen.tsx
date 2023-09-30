import { StyleSheet, View } from "react-native";
import { MenuDetailProps } from "../App";
import { Card, Text } from "react-native-paper";

export default function MenuDetailScreen({ route }: MenuDetailProps) {
  const menu = route.params.menu;

  return (
    <View style={styles.container}>
      <Card
        key={menu.id}
        style={styles.cardContainer}
        accessible={true}
        accessibilityLabel={`Card for${menu.name}`}
      >
        <Card.Cover
          accessible={true}
          accessibilityLabel={`Cover image for${menu.name}`}
          alt={`Card image for${menu.name}`}
          source={{ uri: menu.img }}
          style={styles.cardCover}
        />
        <Card.Title
          title={menu.name}
          subtitle={menu.price}
          titleVariant="headlineSmall"
          subtitleVariant="titleLarge"
          titleStyle={styles.cardTitle}
          subtitleStyle={styles.cardSubTitle}
          style={styles.cardTitleContainer}
        ></Card.Title>
      </Card>
      <Text variant="titleLarge" style={styles.menuDescription}>
        {menu.description}
      </Text>
      {menu.options && menu.options.length > 0 && (
        <View style={styles.menuOptionContainer}>
          <Text variant="headlineSmall" style={styles.menuOptionTitle}>
            Option
          </Text>
          {/* If there are options in the menu, display the number of options */}
          {menu.options.map((option) => (
            <View
              key={option.name}
              style={styles.menuOptionInnerContainer}
              accessible={true}
            >
              <Text variant="titleLarge" style={styles.menuOptionName}>
                {option.name}
              </Text>
              <Text variant="titleLarge" style={styles.menuOptionPrice}>
                {option.price}
              </Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    marginVertical: 20,
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
  menuDescription: {
    color: "white",
    marginHorizontal: 42,
  },
  menuOptionContainer: {
    marginHorizontal: 42,
    marginTop: 28,
  },
  menuOptionTitle: {
    color: "#6b7280",
  },
  menuOptionInnerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginTop: 8,
  },
  menuOptionName: {
    color: "white",
  },
  menuOptionPrice: {
    color: "#6b7280",
    marginLeft: 10,
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
