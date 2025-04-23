import { Feather, FontAwesome } from '@expo/vector-icons';
import { Link } from 'expo-router';
import React from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';

import { Button } from '~/components/Button';
import {
  useMarkSessionAsFavoriteMutation,
  useSessionsQuery,
  useUserFavoritesQuery,
} from '~/rtk/service/enhanced';
import { SessionFragment } from '~/rtk/service/generated';

function renderItem({
  item: session,
}: {
  item: SessionFragment & { markFavorite: () => void; isFavorite: boolean };
}) {
  return (
    <View className="flex flex-row items-center justify-between bg-white p-2">
      <View className="flex justify-center">
        <Text>{session.title}</Text>
      </View>
      <View className="flex flex-row items-center">
        {/* TODO: couldn't get onPress to work with Feather.Button, so just using Feather for now */}
        <FontAwesome.Button
          name={session.isFavorite ? 'heart' : 'heart-o'}
          iconStyle={{ color: session.isFavorite ? 'red' : 'black' }}
          size={24}
          color="black"
          className="bg-white p-2 active:bg-slate-100"
          onPress={session.markFavorite}
        />
        <Feather
          name="share"
          size={24}
          color="black"
          className="bg-white p-2 active:bg-slate-100"
        />
        <Feather
          name="more-vertical"
          size={24}
          color="black"
          className="bg-white p-2 active:bg-slate-100"
        />
      </View>
    </View>
  );
}

const Separator = () => <View className="h-[1px] bg-gray-200" />;

export default function SessionsScreen() {
  const [markFavorite] = useMarkSessionAsFavoriteMutation();
  const { data: myInfo, isLoading: myInfoLoading } = useUserFavoritesQuery();
  const { data, isLoading, refetch, isFetching } = useSessionsQuery();
  const sessions = data?.sessions ?? [];

  if (isLoading || myInfoLoading) {
    return (
      <View className="flex-column flex flex-1 items-center justify-center">
        <ActivityIndicator />
      </View>
    );
  }

  const myFavorites = myInfo?.me?.favorites?.map((item) => item.id) ?? [];

  return (
    <View className="flex-column flex flex-1">
      <FlatList
        data={sessions.map((session) => ({
          ...session,
          title: session.title.length > 30 ? session.title.substring(0, 30) + '...' : session.title,
          markFavorite: () => markFavorite({ id: session.id }),
          isFavorite: myFavorites.includes(session.id),
        }))}
        keyExtractor={(session) => session.id}
        ItemSeparatorComponent={Separator}
        renderItem={renderItem}
        onRefresh={refetch}
        refreshing={isFetching}
      />
      <View className="p-4">
        <Link href="/home/sessions/new" asChild>
          <Button>Create New Session</Button>
        </Link>
      </View>
    </View>
  );
}
