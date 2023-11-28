# シンプルな天気予報アプリを作るハンズオン

## 作るもの

以下の機能を持つシンプルな天気予報アプリを実装します。

- ブラウザから現在地を取得して、外部APIを呼び出し、画面に表示する
  - 外部APIにて現在の天気、当日の時間毎の天気予報を取得する
  - 天気予報APIには、[Open-Meteo](https://open-meteo.com/)を使用しています。
    - 非営利目的であればユーザ登録不要で、10,000回まで無料で使用できます。
- 画面は一画面のみで、モーダルも使わない
- 外部APIは呼び出し、エラーハンドリングを行わない簡易実装。

注意:  
実際に開発する場合には要件に応じて、適切な外部APIを選定してください。  
今回は気軽にWebアプリ開発を体験してもらうため、ハンズオン参加者の利便性(無料かつユーザ登録不要という点)を重視しています。

## 主な技術スタック

- [Next.js](https://nextjs.org/)
  - React-based UI framework
  - Next.jsを導入する際に以下2つの技術スタックを選択すると自動で追加・設定されます。
- [Typescript](https://www.typescriptlang.org/)
  - JavaScript with syntax for types
- [tailwindcss](https://tailwindcss.com/)
  - CSS framework

## 実装

### Next.jsインストール設定済みのブラウザベースのIDEを開く

Next.jsインストール設定済みのブラウザベースのIDE [stackblitzのテンプレート](https://stackblitz.com/edit/nextjs)を開いてください。

stackblitzの画面の説明は[1st](./1st.md#nextjsインストール設定済みのブラウザベースのideを開く)を参照。

### 不要なCSS設定を消す

左のサイドバーにあるFilesの`app/globals.css`ファイルを開き、その内容を以下のコードに置き換えます。  
内容を確実に保存するため、変更後`Ctrl + s`(Macなら`Command + s`)を押してください。

```css
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';

body {
  @apply bg-neutral-100 text-gray-800;
}

h1 {
  @apply text-2xl font-bold mb-4;
}

h2 {
  @apply text-xl my-2;
}

p {
  @apply my-1;
}

table {
  @apply w-full text-left border-collapse;
}

th,
td {
  @apply text-lg border py-2 px-4 text-center whitespace-nowrap;
}
```

### 型を定義する

外部APIで返却されたレスポンスに必要な型を定義します。

左のサイドバーにあるFilesの右にあるファイルアイコンをクリックし、`types/weather.ts`ファイルを作成します。  
![Screen when creating file on stackblitz](../../../static/img/students/2nd/screen_file_creating.png)  
`types/weather.ts`ファイルを開き、その内容を以下のコードに置き換えます。  
内容を確実に保存するため、変更後`Ctrl + s`(Macなら`Command + s`)を押してください。

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

左のサイドバーにあるFilesの右にあるファイルアイコンをクリックし、`utils/weather.ts`ファイルを作成します。  
`utils/weather.ts`ファイルを開き、その内容を以下のコードに置き換えます。  
内容を確実に保存するため、変更後`Ctrl + s`(Macなら`Command + s`)を押してください。

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

左のサイドバーにあるFilesの`app/page.tsx`ファイルを開き、その内容を以下のコードに置き換えます。  
内容を確実に保存するため、変更後`Ctrl + s`(Macなら`Command + s`)を押してください。

```tsx
"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { WeatherData } from "../types/weather";
import { weatherCodeToEmoji } from "../utils/weather";

const Home = () => {
  // Define current time only once at rendering
  const now = new Date();
  // round down to the nearest hour
  now.setMinutes(0);
  const currentTime = now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const currentDate = now.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const timeRefs = useRef<{ [key: string]: HTMLTableCellElement | null }>({});
  const scrollContainer = useRef<HTMLDivElement>(null);
  // Define the width of the fixed columns
  // This should be adjusted based on your actual layout
  const fixedColumnsWidth = 100;
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        // Simple coding, so fetch error handling is not implemented.
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=auto&current=temperature_2m,relative_humidity_2m,rain,weather_code&hourly=temperature_2m,relative_humidity_2m,precipitation_probability,rain,weather_code&forecast_days=1`
        );
        const data = await response.json();
        setWeatherData(data);
      },
      (error) => {
        // Error handling when location information cannot be obtained
        setErrorMessage(
          "Failed to get location information. Please check your browser settings."
        );
      }
    );
  }, []);

  // To move to the column corresponding to the current time
  useEffect(() => {
    const currentTimeColumn = timeRefs.current[currentTime];
    if (currentTimeColumn && scrollContainer.current) {
      // Calculate the scroll position
      const scrollPosition = currentTimeColumn.offsetLeft + fixedColumnsWidth;
      // Scroll to the calculated position
      scrollContainer.current.scrollLeft = scrollPosition;
    }
    timeRefs.current[currentTime]?.scrollIntoView({
      behavior: "auto",
      block: "nearest",
      inline: "start",
    });
  }, [currentTime, weatherData]);

  // Simplified message and screen if location information could not be obtained
  if (errorMessage) {
    return <p>{errorMessage}</p>;
  }

  return (
    <div className="container mx-auto p-4">
      {weatherData && (
        <div>
          <h1>Weather Forecast</h1>
          <p className="mt-2 text-sm text-gray-500">
            <span role="img" aria-label="map">
              🗺️{" "}
            </span>
            Lat: {weatherData.latitude} Lng: {weatherData.longitude}
          </p>
          <h2>Currently</h2>
          <div className="flex items-center space-x-4">
            <div className="text-6xl">
              {weatherCodeToEmoji[weatherData.current.weather_code] ||
                weatherData.current.weather_code}
            </div>
            <div className="text-lg">
              <p>
                <span role="img" aria-label="thermometer">
                  🌡️
                </span>{" "}
                {weatherData.current.temperature_2m}°C
              </p>
              <p>
                <span role="img" aria-label="droplet">
                  💧
                </span>{" "}
                {weatherData.current.relative_humidity_2m}%
              </p>
              <p>
                <span role="img" aria-label="umbrella">
                  ☔
                </span>{" "}
                {weatherData.current.rain}mm
              </p>
            </div>
          </div>

          <h2>Hourly for {currentDate}</h2>
          <div className="overflow-x-auto" ref={scrollContainer}>
            <table className="table-auto">
              <thead>
                <tr>
                  {weatherData.hourly.time.map((time, index) => {
                    const date = new Date(time);
                    const formattedTime = date.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    });
                    // Constant definition to change the style if it is the current time
                    const isCurrent = formattedTime === currentTime;
                    return (
                      <td
                        key={time}
                        ref={(ref) => (timeRefs.current[formattedTime] = ref)}
                        className={
                          isCurrent
                            ? "border-solid border-2 border-sky-300"
                            : ""
                        }
                      >
                        {formattedTime}
                      </td>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                <tr>
                  {weatherData.hourly.temperature_2m.map((temp, index) => (
                    <td key={index}>{temp}°C</td>
                  ))}
                </tr>
                <tr>
                  {weatherData.hourly.relative_humidity_2m.map(
                    (humidity, index) => (
                      <td key={index}>
                        <span role="img" aria-label="droplet">
                          💧
                        </span>
                        {humidity}%
                      </td>
                    )
                  )}
                </tr>
                <tr>
                  {weatherData.hourly.precipitation_probability.map(
                    (probability, index) => (
                      <td key={index}>
                        <span role="img" aria-label="umbrella with rain drops">
                          ☔
                        </span>
                        {probability}%
                      </td>
                    )
                  )}
                </tr>
                <tr>
                  {weatherData.hourly.weather_code.map((code, index) => (
                    <td key={index}>{weatherCodeToEmoji[code] || "⭐"}</td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-2 text-sm text-gray-500">
            <Link href="https://open-meteo.com/">
              Weather data by Open-Meteo.com
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;

```

実装後は、以下の画面になっています。

![Screen after development on stackblitz](../../../static/img/students/2nd/screen_after_development.png)

注意:  

- 実装後も画面がNextjsのデフォルトの画面から変更がない場合は、プレビュー画面の更新ボタンを押してください。
- 動作確認において、ブラウザの位置情報アクセスを許可してください。
  - 動作確認時にポップアップで許可するか否かが表示されます。
  - 許可しない場合、緯度・経度が取得できず、外部APIを呼び出せないため、簡易的なエラーメッセージが画面に表示されます。
- APIのエラーハンドリングについて
  - このハンズオンにおける、エラーハンドリングは簡易的なものです。実際の開発においては、適切なエラーハンドリング処理を行ってください。
    - 簡易実装のため、外部API呼び出し時にエラーハンドリングを行っていません。
    - 位置情報取得におけるエラーハンドリングは簡易的なものです。
- コンポーネント化について
  - このハンズオンは簡易実装となっています。実際に開発する場合には、適切にコンポーネント設計を行うことをおすすめします。
    - コンポーネントについて、[教員向けのハンズオン資料](../teachers/1st.md)で少し説明しています。

### 動作確認

右側のプレビュー画面にて、天気予報アプリの動作確認をしてみてください。

- 簡単な機能仕様
  - 上部に現在地の緯度・経度が表示される
  - 真ん中に現在の天気が表示される
  - 下部に1時間毎の現在日付の天気予報が表示される
    - 現在時刻に相当するカラムに自動でスクロールされる

### 終わりに

これでハンズオンは終わりです。  
コードは[ここ](https://github.com/minakamoto/pcshscr2023/tree/main/src/webapp/30min-exp-web-tech/2nd/weather-foecast)から確認できます。  

もし、興味があれば、上に挙げたリンクをたどってコードの内容を調べたり、コードを好きに修正してみてください。  
[Open-Meteo](https://open-meteo.com/)は、当日だけでなく、16日先までの予報を取得できます。自分で10日間天気予報など作ってみると良いかもしれません。  
自分の好きなAPIを使い、天気予報アプリを作成してみるのも良いかもしれません。
