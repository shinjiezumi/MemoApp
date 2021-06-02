import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import firebase from 'firebase';
import { LogBox } from 'react-native';
import MemoListScreen from './src/screens/MemoListScreen';
import MemoDetailScreen from './src/screens/MemoDetailScreen';
import MemoCreateScreen from './src/screens/MemoCreateScreen';
import MemoEditScreen from './src/screens/MemoEditScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import LogInScreen from './src/screens/LogInScreen';

import { firebaseConfig } from './env';

LogBox.ignoreLogs(['Setting a timer']);

require('firebase/firestore');

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SignUp"
        // アプリ標準のヘッダーをカスタマイズ
        screenOptions={{
          headerStyle: { backgroundColor: '#467fd3' },
          headerTitleStyle: { color: '#ffffff' },
          headerTitle: 'Memo App',
          headerTintColor: '#ffffff',
          headerBackTitle: 'Back',
          // 画面遷移のアニメーションをiOSに統一する
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          gestureEnabled: true,
          gestureDirection: 'horizontal',
        }}
      >
        <Stack.Screen name="MemoList" component={MemoListScreen} />
        <Stack.Screen name="MemoDetail" component={MemoDetailScreen} />
        <Stack.Screen name="MemoCreate" component={MemoCreateScreen} />
        <Stack.Screen name="MemoEdit" component={MemoEditScreen} />
        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
          options={{
            // 画面単位で指定することも可能
            cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
          }}
        />
        <Stack.Screen
          name="LogIn"
          component={LogInScreen}
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
