import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';

import { useFavoriteSessionsQuery, useMarkSessionAsFavoriteMutation } from '~/rtk/service/enhanced';

function renderItem({
  item: session,
}: {
  item: { id: string; title: string; removeFavorite: () => void };
}) {
  return (
    <View className="flex flex-row items-center justify-between bg-white p-2">
      <View className="flex justify-center">
        <Text>{session.title}</Text>
      </View>
      <View className="flex flex-row items-center">
        <Feather
          name="share"
          size={24}
          color="black"
          className="m-2 bg-white p-2 active:bg-slate-100"
        />
        <MaterialCommunityIcons.Button
          name="delete-forever"
          size={24}
          color="black"
          className="m-0 bg-white active:bg-slate-100"
          onPress={session.removeFavorite}
        />
      </View>
    </View>
  );
}

const Separator = () => <View className="h-[1px] bg-gray-200" />;

export default function FavoritesScreen() {
  const [removeFavorite] = useMarkSessionAsFavoriteMutation();
  const { data, isLoading, refetch, isFetching } = useFavoriteSessionsQuery();

  if (isLoading) {
    return (
      <View className="flex-column flex flex-1 items-center justify-center">
        <ActivityIndicator />
      </View>
    );
  }

  const myFavorites = data?.me?.favorites ?? [];

  return (
    <View className="flex-column flex flex-1">
      <FlatList
        data={myFavorites.map((favorite) => ({
          ...favorite,
          title:
            favorite.title.length > 30 ? favorite.title.substring(0, 30) + '...' : favorite.title,
          removeFavorite: () => removeFavorite({ id: favorite.id }),
        }))}
        keyExtractor={(favorite) => favorite.id}
        ItemSeparatorComponent={Separator}
        renderItem={renderItem}
        onRefresh={refetch}
        refreshing={isFetching}
      />
    </View>
  );
}
