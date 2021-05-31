import React from 'react';
import {
  View, StyleSheet, TextInput,
} from 'react-native';

import AppBar from '../components/AppBar';
import CircleButton from '../components/CircleButton';
import KeyboardSafeView from '../components/KeyboardSafeView';

export default function MemoCreateScreen() {
  return (
    // KeyboardAvoidingViewにはバグがあり、暫定対応版を使う
    <KeyboardSafeView style={styles.container}>
      <AppBar />
      <View style={styles.inputContainer}>
        <TextInput multiline style={styles.input} />
      </View>
      <CircleButton name="check" />
    </KeyboardSafeView>
  );
}

const styles = StyleSheet.create({
  container: {
    // 画面いっぱいにする
    flex: 1,
  },
  inputContainer: {
    paddingHorizontal: 27,
    paddingVertical: 32,
    flex: 1,
  },
  input: {
    paddingTop: 0,
    flex: 1,
    // for Android. 指定しないと縦方向に中央揃えになる。
    textAlignVertical: 'top',
    fontSize: 16,
    lineHeight: 24,
  },
});
