import { useEffect, useState } from "react";
import { View, ActivityIndicator, FlatList } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { getLatestGames } from "../lib/metacritic";

import { GameCard, AnimatedGameCard } from "./GameCard";
import { Logo } from "./Logo";

export function Main() {
  const [games, setGames] = useState([]);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    const fetchGames = async () => {
      const initialGames = await getLatestGames();
      setGames(initialGames);
    };
    fetchGames();
  }, []);
  return (
    <View style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}>
      <View style={{ marginBottom: 20, marginTop: 10 }}>
        <Logo />
      </View>
      {games.length === 0 ? (
        <ActivityIndicator size={"large"} color={"#fff"} />
      ) : (
        <FlatList
          data={games}
          keyExtractor={(game) => game.slug}
          renderItem={({ item, index }) => (
            <AnimatedGameCard game={item} index={index} />
          )}
        />
      )}
    </View>
  );
}
