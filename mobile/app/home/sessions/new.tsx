import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { z } from 'zod';
import { Button } from '~/components/Button';
import { useCreateSessionMutation } from '~/rtk/service/generated';
import { router } from 'expo-router';

const formatOptions = ['Lecture', 'Workshop', 'Keynote'] as const;
const levelOptions = ['Beginner', 'Intermediate', 'Advanced'] as const;

const schema = z.object({
  title: z.string().min(1, 'Session title is required.'),
  description: z.string().min(1, 'Description is required.'),
  format: z.enum(formatOptions, {
    required_error: 'Session format is required',
  }),
  level: z.enum(levelOptions, {
    required_error: 'Experience level is required',
  }),
});

type FormInputs = z.infer<typeof schema>;

export default function CreateNewSession() {
  const [submitSession] = useCreateSessionMutation();
  const { control, handleSubmit } = useForm<FormInputs>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: '',
      description: '',
      format: '' as FormInputs['format'],
      level: '' as FormInputs['level'],
    },
  });

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    console.log('values', data);

    submitSession({ session: data })
      .unwrap()
      .then(() => {
        router.back();
      });
  };
  const onError: SubmitErrorHandler<FormInputs> = (error) => {
    console.log('error', error);
  };

  return (
    <View className="flex-column flex flex-1 gap-3 bg-slate-50 p-2">
      <View>
        <Controller
          name="title"
          control={control}
          render={({ field: { onChange, onBlur, value }, fieldState: { invalid, error } }) => (
            <View className="gap-1">
              <Text>Title</Text>
              <TextInput
                className="w-full border-2 border-gray-400 bg-white p-3 text-gray-400"
                placeholder="Title"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
              />
              {invalid ? <Text className="py-2 text-red-700">{error?.message}</Text> : null}
            </View>
          )}
        />
      </View>

      <View>
        <Controller
          name="description"
          control={control}
          render={({ field: { onChange, onBlur, value }, fieldState: { invalid, error } }) => (
            <View className="gap-1">
              <Text>Description</Text>
              <TextInput
                className="h-32 w-full border-2 border-gray-400 bg-white p-3 text-gray-400"
                placeholder="Description"
                multiline
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
              />
              {invalid ? <Text className="py-2 text-red-700">{error?.message}</Text> : null}
            </View>
          )}
        />
      </View>

      <View>
        <Controller
          name="format"
          control={control}
          render={({ field: { onChange, onBlur, value }, fieldState: { invalid, error } }) => (
            <View className="gap-1">
              <Text>Session Format</Text>
              <Picker
                selectedValue={value}
                onValueChange={(itemValue) => onChange(itemValue)}
                onBlur={onBlur}>
                {formatOptions.map((item) => (
                  <Picker.Item key={item} label={item} value={item} />
                ))}
              </Picker>
              {invalid ? <Text className="py-2 text-red-700">{error?.message}</Text> : null}
            </View>
          )}
        />
      </View>

      <View>
        <Controller
          name="level"
          control={control}
          render={({ field: { onChange, value }, fieldState: { invalid, error } }) => {
            return (
              <View className="gap-1">
                <Text>Experience Level</Text>
                <View className="pl-2">
                  {levelOptions.map((item) => (
                    <View key={item} className="flex flex-row items-center">
                      <TouchableOpacity
                        className={`flex size-6 items-center rounded-xl border-2 border-neutral-200 bg-stone-50`}
                        onPress={() => {
                          onChange(item);
                        }}>
                        <View
                          className={`size-4 rounded-lg ${value === item ? 'bg-primary-400' : 'bg-stone-50'}`}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        className="p-3"
                        onPress={() => {
                          onChange(item);
                        }}>
                        <Text>{item}</Text>
                      </TouchableOpacity>
                    </View>
                  ))}

                  {invalid ? <Text className="py-2 text-red-700">{error?.message}</Text> : null}
                </View>
              </View>
            );
          }}
        />
      </View>
      <Button onPress={handleSubmit(onSubmit, onError)}>Submit</Button>
    </View>
  );
}
