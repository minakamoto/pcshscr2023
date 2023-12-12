# モバイル版のシンプルな天気予報アプリを作るハンズオン

## 作るもの

[2nd](./2nd.md)で作ったシンプルな天気予報アプリのモバイル版を開発します。  
機能や見た目、条件や注意事項はほぼ同じです。

## 主な技術スタック

- [Reac Native](https://reactnative.dev/)
  - ReactをネイティブUIに適用したクロスプラットフォーム(Android/iOS/Webなど)開発フレームワーク
    - Web開発の知識や経験を活かして、モバイルアプリを開発することができます。
- [EXPO](https://expo.dev/)
  - React Nativeの開発をより簡単に、より早くするツール
- [Typescript](https://www.typescriptlang.org/)
  - JavaScript with syntax for types

## 実装

### React Native/Expo設定済みのブラウザベースのIDEを開く

React Native/Expo設定済みのブラウザベースのIDE [Snack](https://snack.expo.dev/)を開いてください。

Snackは、左ペインにファイルのディレクトリ、真ん中はファイルの編集、右ペインはプレビュー画面の構成になっています。右ペインの上部で確認するデバイスのエミュレータを選ぶことができます。

![Default display on snack](../../../static/img/students/3rd/default_display.png)  

参考に、Androidエミュレータの場合は以下になります。
![Default display on android emulator](../../../static/img/students/3rd/default_display_android.png)  
Androidエミュレータを選び、`Tap to play`を押すと、インストールおよび起動が始まります。(`Que...`というメッセージが出たら、インストールおよび起動が始まるまでしばらくお待ちください。)

TIPS/注意事項:  

- Snackについて
  - SnackはブラウザベースのIDEなので、PCにIDEやエミュレータ（Androidなどのデバイスの仮想の実行環境）のインストールや設定をする必要がありません。
  - 簡単にすぐに開発体験を得ることを目的としたサービスなので、フルスペックの機能開発には向きません。
    - 本格的な実装をする場合は、お使いのPCに開発環境の構築を行ってください。
    - 環境構築に当たっては、[React Native公式サイト](https://reactnative.dev/docs/environment-setup)もしくは[Expo公式サイト](https://docs.expo.dev/get-started/installation/)を見ると良いでしょう。

### 型を定義する

外部APIで返却されたレスポンスに必要な型を定義します。  
([2nd](2nd.md#型を定義する)とまったく同じコードです。)

左のサイドバーにあるProjectの右にあるファイルアイコンをクリックし、`types/weather.ts`ファイルを作成します。  

![Screen when creating file on snack](../../../static/img/students/3rd/screen_file_creating.png)  
`types/weather.ts`ファイルを開き、その内容を以下のコードに置き換えます。  

```ts
// define type
export type WeatherData = {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  current_units: {
    time: string;
    interval: string;
    temperature_2m: string;
    relative_humidity_2m: string;
    rain: string;
    weather_code: string;
  };
  current: {
    time: string;
    interval: number;
    temperature_2m: number;
    relative_humidity_2m: number;
    rain: number;
    weather_code: number;
  };
  hourly_units: {
    time: string;
    temperature_2m: string;
    relative_humidity_2m: string;
    precipitation_probability: string;
    weather_code: string;
  };
  hourly: {
    time: string[];
    temperature_2m: number[];
    relative_humidity_2m: number[];
    precipitation_probability: number[];
    weather_code: number[];
  };
};

```

### Utilityを実装する

外部APIで返却されたレスポンスの天気コードを絵文字に変換するために必要なオブジェクトを定義します。  
([2nd](2nd.md#utilityを実装する)とまったく同じコードです。)

左のサイドバーにあるProjectの右にあるファイルアイコンをクリックし、`utils/weather.ts`ファイルを作成します。  
`utils/weather.ts`ファイルを開き、その内容を以下のコードに置き換えます。  

```ts
// mapping of weather codes returned in API responses and emojis
export const weatherCodeToEmoji: Record<number, string> = {
  0: "🌞", // Clear sky
  1: "🌤️", // Mainly clear, partly cloudy, and overcast
  2: "🌤️", // Mainly clear, partly cloudy, and overcast
  3: "🌤️", // Mainly clear, partly cloudy, and overcast
  45: "🌫️", // Fog and depositing rime fog
  48: "🌫️", // Fog and depositing rime fog
  51: "🌧️", // Drizzle: Light, moderate, and dense intensity
  53: "🌧️", // Drizzle: Light, moderate, and dense intensity
  55: "🌧️", // Drizzle: Light, moderate, and dense intensity
  56: "🌧️", // Freezing Drizzle: Light and dense intensity
  57: "🌧️", // Freezing Drizzle: Light and dense intensity
  61: "🌧️", // Rain: Slight, moderate and heavy intensity
  63: "🌧️", // Rain: Slight, moderate and heavy intensity
  65: "🌧️", // Rain: Slight, moderate and heavy intensity
  66: "🌧️", // Freezing Rain: Light and heavy intensity
  67: "🌧️", // Freezing Rain: Light and heavy intensity
  71: "🌨️", // Snow fall: Slight, moderate, and heavy intensity
  73: "🌨️", // Snow fall: Slight, moderate, and heavy intensity
  75: "🌨️", // Snow fall: Slight, moderate, and heavy intensity
  77: "🌨️", // Snow grains
  80: "🌧️", // Rain showers: Slight, moderate, and violent
  81: "🌧️", // Rain showers: Slight, moderate, and violent
  82: "🌧️", // Rain showers: Slight, moderate, and violent
  85: "🌨️", // Snow showers slight and heavy
  86: "🌨️", // Snow showers slight and heavy
  95: "⛈️", // Thunderstorm: Slight or moderate
  96: "⛈️", // Thunderstorm with slight and heavy hail
  99: "⛈️", // Thunderstorm with slight and heavy hail
};

```

### 天気予報アプリを実装する

左のサイドバーにあるProjectの`App.js`ファイルの左のスリードットメニューを開き、`Rename to App.tsx`を押し、ファイル名を変更します。ファイル名の変更後、その内容を以下のコードに置き換えます。  

```tsx
import React, { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  Linking,
} from "react-native";
import { WeatherData } from "./types/weather";
import { weatherCodeToEmoji } from "./utils/weather";
import * as Location from "expo-location";

export default function App() {
  const now = new Date();
  now.setMinutes(0);
  const currentTime = now.getHours(); // get current time (0-23)
  const currentDate = now.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const scrollViewRef = useRef<ScrollView>(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMessage(
          "Failed to get location information. Please check your device settings."
        );
        return;
      }

      // On Snack, using the Location.getCurrentPositionAsync method would not get a response, so the Location.getLastKnownPositionAsync method was used.
      // It is usually better to use Location.getCurrentPositionAsync.
      // See. https://docs.expo.dev/versions/latest/sdk/location/#locationgetlastknownpositionasyncoptions
      const location = await Location.getLastKnownPositionAsync({});

      const { latitude, longitude } = location?.coords || {
        // If the current location could not be obtained, set the location of Tokyo Tower.
        latitude: 35.6586414931039,
        longitude: 139.74540071013897,
      };
      fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=auto&current=temperature_2m,relative_humidity_2m,rain,weather_code&hourly=temperature_2m,relative_humidity_2m,precipitation_probability,rain,weather_code&forecast_days=1`
      )
        .then((response) => response.json())
        .then((data) => setWeatherData(data))
        .catch((error) => setErrorMessage(error.message))
        .finally(() => setLoading(false));
    })();
  }, []);

  const handleLayout = () => {
    const columnIndex = currentTime;
    const columnWidth = 65; // set the width of each column
    const scrollPosition = columnIndex * columnWidth; // calculate scroll position
    scrollViewRef.current?.scrollTo({
      x: scrollPosition,
      y: 0,
      animated: true,
    });
  };

  if (errorMessage) {
    return (
      <View style={styles.container}>
        <Text>Error: {errorMessage}</Text>
      </View>
    );
  }

  return (
    <>
      {isLoading ? (
        <ActivityIndicator size="large" style={styles.indicatorContainer} />
      ) : (
        <View style={styles.container}>
          <Text style={styles.title}>Weather Forecast</Text>
          {weatherData && (
            <View>
              <Text style={styles.latLngLabel}>
                🗺️ Lat: {weatherData.latitude} Lng: {weatherData.longitude}
              </Text>
              <Text style={styles.subTitle}>Currently:</Text>
              <View style={styles.currentContainer}>
                <Text style={styles.emojiLabel}>
                  {weatherCodeToEmoji[weatherData.current.weather_code]}
                </Text>
                <View style={styles.currentLabel}>
                  <Text>🌡️{weatherData.current.temperature_2m}°C </Text>
                  <Text>
                    💧
                    {weatherData.current.relative_humidity_2m}%{" "}
                  </Text>
                  <Text>☔{weatherData.current.rain}mm </Text>
                </View>
              </View>
              <Text style={styles.subTitle}>Houly for {currentDate}</Text>
              <ScrollView
                horizontal={true}
                style={styles.scrollContainer}
                ref={scrollViewRef}
                onLayout={handleLayout}
              >
                <View style={styles.table}>
                  <View style={styles.row}>
                    {weatherData.hourly.time.map((time, index) => {
                      const date = new Date(time);
                      const formattedTime = date.toLocaleTimeString([], {
                        hour12: false,
                        hour: "2-digit",
                        minute: "2-digit",
                      });
                      return (
                        <Text key={index} style={styles.cell}>
                          {formattedTime}
                        </Text>
                      );
                    })}
                  </View>
                  <View style={styles.row}>
                    {weatherData.hourly.temperature_2m.map((temp, index) => (
                      <Text key={index} style={styles.cell}>
                        {temp}°C
                      </Text>
                    ))}
                  </View>
                  <View style={styles.row}>
                    {weatherData.hourly.relative_humidity_2m.map(
                      (humidity, index) => (
                        <Text key={index} style={styles.cell}>
                          <Text>💧</Text>
                          {humidity}%
                        </Text>
                      )
                    )}
                  </View>
                  <View style={styles.row}>
                    {weatherData.hourly.precipitation_probability.map(
                      (probability, index) => (
                        <Text key={index} style={styles.cell}>
                          <Text>☔</Text>
                          {probability}%
                        </Text>
                      )
                    )}
                  </View>
                  <View style={styles.row}>
                    {weatherData.hourly.weather_code.map((code, index) => (
                      <Text key={index} style={styles.cell}>
                        {weatherCodeToEmoji[code] || "⭐"}
                      </Text>
                    ))}
                  </View>
                </View>
              </ScrollView>
              <Text
                style={styles.linkLabel}
                onPress={() => Linking.openURL("https://open-meteo.com/")}
              >
                Weather data by Open-Meteo.com
              </Text>
            </View>
          )}
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  indicatorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginHorizontal: 20,
    paddingVertical: 50,
    paddingHorizontal: 10,
  },
  title: {
    paddingTop: 10,
    fontSize: 24,
    fontWeight: "bold",
  },
  subTitle: {
    fontSize: 18,
    paddingTop: 20,
    paddingBottom: 10,
  },
  latLngLabel: {
    paddingTop: 20,
    color: "grey",
  },
  emojiLabel: {
    fontSize: 36,
    margin: 10,
  },
  currentContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 10,
  },
  currentLabel: {
    justifyContent: "space-around",
  },
  scrollContainer: {
    paddingTop: 5,
    marginTop: 5,
    marginBottom: 10,
  },
  table: {
    flexDirection: "column",
    borderTopColor: "gainsboro",
    borderTopWidth: 0.2,
  },
  row: {
    flexDirection: "row",
    borderBottomColor: "gainsboro",
    borderBottomWidth: 0.2,
  },
  cell: {
    padding: 10,
    width: 65,
    textAlign: "center",
    borderRightColor: "gainsboro",
    borderRightWidth: 0.2,
    borderLeftColor: "gainsboro",
    borderLeftWidth: 0.2,
    borderStyle: "solid",
  },
  linkLabel: {
    paddingTop: 10,
    color: "grey",
  },
});


```

以下の画面のようにエラーメッセージ(`expo-location`が依存設定に定義されてないことに対するエラー)が表示されます。メッセージに従って`Add dependency`を押してください。

![Dependency Error Message on snack](../../../static/img/students/3rd/dependency_error_message.png)

Androidエミュレータの場合、実装後は、以下の画面になっています。  

![Screen after development on snack](../../../static/img/students/3rd/screen_after_development.png)

注意:  

- Snack上のエミュレータは仮想デバイスのため、あなたの現在地や時刻とは異なる場合があります。
  - 現在地や時刻はエミュレータの時刻や地図、設定で確認することができます。
  - もし、あなたの環境で確認したい場合は、ご自身のデバイス(Android/iOSなど)に[Expo Go](https://expo.dev/client)をインストールし、Snack上の`My Device`のQRコードをスキャンしてください。
    - あなた自身のデバイスで確認する場合かつ、より正確な現在位置を取得したい場合、コードを以下のとおり変更すると良いでしょう。
      - before

        ```ts
        const location = await Location.getLastKnownPositionAsync({});
        const { latitude, longitude } = location?.coords || {
          latitude: 35.6586414931039,
          longitude: 139.74540071013897,
        };
        ```

      - after

        ```ts
        const location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location?.coords;
        ```

- 動作確認において、位置情報アクセスを許可してください。
  - [2nd](2nd.md#天気予報アプリを実装する)と同様のため、割愛
- APIのエラーハンドリング、コンポーネント化について
  - [2nd](2nd.md#天気予報アプリを実装する)と同様のため、割愛

### 動作確認

右側のプレビュー画面にて、天気予報アプリの動作確認をしてみてください。

- 簡単な機能仕様
  - [2nd](2nd.md#動作確認)と同様のため、割愛

### 終わりに

これでハンズオンは終わりです。  
コードは[ここ](https://github.com/minakamoto/pcshscr2023/tree/main/src/webapp/30min-exp-web-tech/3rd/weather-forecast)から確認できます。  
[Snack](https://snack.expo.dev/1KahnBN9w)上からも確認できます。
