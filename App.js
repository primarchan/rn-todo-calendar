import { StatusBar } from "expo-status-bar";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { getCalendarColumns, getDayColor, getDayText } from "./src/util";
import dayjs from "dayjs";
import { useEffect } from "react";
import { runPracticeDayjs } from "./src/practice-dayjs";
import Margin from "./src/Margin";
import { SimpleLineIcons } from "@expo/vector-icons";

const columnSize = 35;

export default function App() {
  const now = dayjs();
  const columns = getCalendarColumns(now);

  const Column = ({ text, color, opacity }) => {
    return (
      <View
        style={{
          width: columnSize,
          height: columnSize,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ color, opacity }}>{text}</Text>
      </View>
    );
  };

  const ListHeaderComponent = () => {
    const currentDateText = dayjs(now).format("YYYY.MM.DD.");

    const ArrowButton = ({ iconName, onPress }) => {
      return (
        <TouchableOpacity
          onPress={onPress}
          style={{ paddingHorizontal: 20, paddingVertical: 15 }}
        >
          <SimpleLineIcons name={iconName} size={15} color="#404040" />
        </TouchableOpacity>
      );
    };

    return (
      <View>
        {/* < YYYY.MM.DD. > */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ArrowButton iconName={"arrow-left"} onPress={() => {}} />

          <TouchableOpacity>
            <Text style={{ fontSize: 20, color: "#404040" }}>
              {currentDateText}
            </Text>
          </TouchableOpacity>

          <ArrowButton iconName={"arrow-right"} onPress={() => {}} />
        </View>
        <View style={{ flexDirection: "row" }}>
          {[0, 1, 2, 3, 4, 5, 6].map((day) => {
            const dayText = getDayText(day);
            const color = getDayColor(day);
            return (
              <Column
                key={`day-${day}`}
                text={dayText}
                color={color}
                opacity={1}
              />
            );
          })}
        </View>
      </View>
    );
  };

  const renderItem = ({ item: date }) => {
    const dataText = dayjs(date).get("date");
    const day = dayjs(date).get("day");
    const color = getDayColor(day);
    const isCurrentMonth = dayjs(date).isSame(now, "month");

    return (
      <Column
        text={dataText}
        color={color}
        opacity={isCurrentMonth ? 1 : 0.4}
      />
    );
  };

  useEffect(() => {
    runPracticeDayjs();

    console.log("columns", columns);
  });

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={columns}
        keyExtractor={(_, index) => `column-${index}`}
        numColumns={7}
        ListHeaderComponent={ListHeaderComponent}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
