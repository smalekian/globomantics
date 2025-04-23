import { Redirect, router } from 'expo-router';
import { useReducer } from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';

import { Button } from '~/components/Button';
import { SessionFragment, useMySessionsQuery, useSignOutMutation } from '~/rtk/service/generated';
import { removeCredentials } from '~/rtk/slices/authSlice';
import { useAppDispatch } from '~/rtk/state/store';

function renderItem({ item }: { item: SessionFragment | null }) {
  if (!item) return null;

  return (
    <View className="py-1">
      <View className="gap-2 rounded-md border border-gray-400 p-3">
        <View className="flex flex-row items-center justify-between">
          <Text className="font-semibold">
            {item.title} ({item.format})
          </Text>
          <Text>Level: {item.level}</Text>
        </View>
        <Text className="text-md">{item.description}</Text>
      </View>
    </View>
  );
}

export default function index() {
  const [signOut] = useSignOutMutation();
  const dispatch = useAppDispatch();

  const { data, isLoading } = useMySessionsQuery();

  const name = data?.me?.name ?? 'you';
  const mySessions = data?.me?.speaker?.sessions ?? [];

  if (isLoading) {
    return <ActivityIndicator />;
  }

  return (
    <View className="flex-1 justify-between gap-2 bg-slate-50 p-2">
      <View className="gap-4">
        <Text className="text-lg">Welcome to the GDC, {name}!</Text>

        <View className="flex gap-3">
          <Text className="text-md font-bold">My Sessions</Text>
          {mySessions.length === 0 ? (
            <Text>You don't have any sessions. Head to the sessions screen to submit one!</Text>
          ) : (
            <FlatList data={mySessions} renderItem={renderItem} />
          )}
        </View>
      </View>

      <Button
        onPress={async () => {
          await signOut();

          // remove creds
          dispatch(removeCredentials());

          router.replace('/');
        }}>
        Sign Out
      </Button>
    </View>
  );
}
