import { Feather } from '@expo/vector-icons';
import React from 'react';
import { ActivityIndicator, FlatList, Image, Text, View } from 'react-native';

import { useSpeakersQuery } from '~/rtk/service/generated';

function renderItem({ item: speaker }: { item: { id: string; name: string } }) {
  return (
    <View className="flex flex-row items-center justify-between bg-white p-2">
      <View className="flex flex-row items-center justify-center gap-2">
        <Image
          className="h-12 w-12 rounded-xl"
          source={{
            uri: `https://i.pravatar.cc/150?u=${speaker.id}`,
          }}
        />
        <Text>{speaker.name}</Text>
      </View>
      <View className="flex flex-row items-center">
        <Feather.Button
          name="heart"
          size={24}
          color="black"
          className="mr-0 bg-white pr-0 active:bg-slate-100"
        />
        <Feather.Button
          name="share"
          size={24}
          color="black"
          className="mr-0 bg-white pr-0 active:bg-slate-100"
        />
        <Feather.Button
          name="more-vertical"
          size={24}
          color="black"
          className="mr-0 bg-white pr-0 active:bg-slate-100"
        />
      </View>
    </View>
  );
}

const Separator = () => <View className="h-[1px] bg-gray-200" />;

export default function SpeakersScreen() {
  const { data, isLoading, refetch, isFetching, error, isError } = useSpeakersQuery();
  const speakers = data?.speakers ?? [];

  if (isLoading) {
    return (
      <View className="flex-column flex flex-1 items-center justify-center">
        <ActivityIndicator />
      </View>
    );
  }

  if (isError) {
    return (
      <View className="flex-column flex flex-1 items-center justify-center">
        <Text>{JSON.stringify(error)}</Text>
      </View>
    );
  }

  return (
    <View className="flex-column flex flex-1">
      <FlatList
        data={speakers.map((speaker) => ({
          ...speaker,
          title: speaker.name.length > 30 ? speaker.name.substring(0, 30) + '...' : speaker.name,
        }))}
        keyExtractor={(speaker) => speaker.id}
        ItemSeparatorComponent={Separator}
        renderItem={renderItem}
        onRefresh={refetch}
        refreshing={isFetching}
      />
    </View>
  );
}
