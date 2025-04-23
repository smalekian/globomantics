import { router } from 'expo-router';
import { useReducer } from 'react';
import { Image, Text, TextInput, View } from 'react-native';

import { Button } from '~/components/Button';
import { useSignUpMutation } from '~/rtk/service/generated';
import { setCredentials } from '~/rtk/slices/authSlice';
import { useAppDispatch } from '~/rtk/state/store';

type State = {
  name: string;
  email: string;
  password: string;
  repeatPassword: string;
};

type Action =
  | { type: 'setEmail'; payload: string }
  | { type: 'setName'; payload: string }
  | { type: 'setPassword'; payload: string }
  | { type: 'setRepeatPassword'; payload: string };

const initialState: State = {
  email: '',
  name: '',
  password: '',
  repeatPassword: '',
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'setEmail':
      return { ...state, email: action.payload };
    case 'setName':
      return { ...state, name: action.payload };
    case 'setPassword':
      return { ...state, password: action.payload };
    case 'setRepeatPassword':
      return { ...state, repeatPassword: action.payload };
    default:
      return state;
  }
}

export function useForm() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setEmail = (email: string) => dispatch({ type: 'setEmail', payload: email });
  const setName = (name: string) => dispatch({ type: 'setName', payload: name });
  const setPassword = (password: string) => dispatch({ type: 'setPassword', payload: password });
  const setRepeatPassword = (repeatPassword: string) =>
    dispatch({ type: 'setRepeatPassword', payload: repeatPassword });

  return { state, setEmail, setName, setPassword, setRepeatPassword };
}

export default function SignUp() {
  const { state, setEmail, setName, setPassword, setRepeatPassword } = useForm();
  const dispatch = useAppDispatch();
  const [signUp] = useSignUpMutation();

  return (
    <View className="flex-1 items-center justify-center gap-2 bg-white p-3">
      <Image
        className="h-52"
        resizeMode="contain"
        source={require('../assets/globomantics-logo-bug-darkblue.png')}
      />
      <View className="w-full gap-2">
        <Text className="text-center text-2xl font-bold">Sign Up</Text>
      </View>
      <View className="w-full gap-2">
        <TextInput
          className="w-full border-2 border-gray-400 bg-white p-3 text-gray-400"
          placeholder="Name"
          value={state.name}
          inputMode="text"
          onChangeText={setName}
        />
        <TextInput
          className="w-full border-2 border-gray-400 bg-white p-3 text-gray-400"
          placeholder="Email Address"
          value={state.email}
          inputMode="email"
          onChangeText={setEmail}
        />
        <TextInput
          className="w-full border-2 border-gray-400 bg-white p-3 text-gray-400"
          placeholder="Password"
          value={state.password}
          inputMode="text"
          secureTextEntry
          onChangeText={setPassword}
        />
        <TextInput
          className="w-full border-2 border-gray-400 bg-white p-3 text-gray-400"
          placeholder="Repeat Password"
          value={state.repeatPassword}
          inputMode="text"
          secureTextEntry
          onChangeText={setRepeatPassword}
        />
        <Button
          onPress={async () => {
            const results = await signUp({
              credentials: {
                name: state.name,
                email: state.email,
                password: state.password,
              },
            }).unwrap();

            // store results
            dispatch(setCredentials(results.signUp));

            router.replace('/home');
          }}>
          Sign Up
        </Button>
      </View>
    </View>
  );
}
