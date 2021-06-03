import React from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity, Alert, FlatList,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  shape, string, instanceOf, arrayOf,
} from 'prop-types';
import firebase from 'firebase';
import { dateToString } from '../utils';
import Icon from './icon';

export default function MemoList(props) {
  const { memos } = props;

  // <Stack.Screen>に登録していないとpropsからnavigationを取得できない。その場合はuseNavigationを利用する
  const navigation = useNavigation();

  function deleteMemo(id) {
    const { currentUser } = firebase.auth();
    if (!currentUser) {
      return;
    }

    const db = firebase.firestore();
    const ref = db.collection(`users/${currentUser.uid}/memos`).doc(id);
    // Androidはネガティブ(中止)→ポジティブ(実行)の順で選択肢を
    Alert.alert('メモを削除します', 'よろしいですか？', [
      {
        text: 'キャンセル',
        onPress: () => {
        },
      },
      {
        text: '削除する',
        style: 'destructive', // iOSで赤字にする
        onPress: () => {
          ref.delete().catch(() => {
            Alert.alert('削除に失敗しました');
          });
        },
      },
    ]);
  }

  function renderItem({ item }) {
    return (
      <TouchableOpacity
        style={styles.memoListItem}
        onPress={() => {
          navigation.navigate('MemoDetail', {
            id: item.id,
          });
        }}
      >
        <View style={styles.memoInner}>
          <Text style={styles.memoListItemTitle} numberOfLines={1}>{item.bodyText}</Text>
          <Text style={styles.memoListItemDate}>{dateToString(item.updatedAt)}</Text>
        </View>
        <View>
          <TouchableOpacity
            style={styles.memoDelete}
            onPress={() => {
              deleteMemo(item.id);
            }}
          >
            <Icon
              name="delete"
              size={24}
              color="#B0B0B0"
            />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      {/* FlatListはコストが低い */}
      <FlatList
        data={memos}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

MemoList.propTypes = {
  memos: arrayOf(
    shape({
      id: string,
      bodyText: string,
      updatedAt: instanceOf(Date),
    }),
  ).isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  memoListItem: {
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 19,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: 'rgba(0,0,0,0.15)',
  },
  memoInner: {
    flex: 1, // タイトルが長すぎる場合に、削除ボタンがずれないようにする
  },
  memoListItemTitle: {
    color: '#000000',
    fontSize: 16,
    lineHeight: 32,
  },
  memoListItemDate: {
    fontSize: 12,
    lineHeight: 16,
    color: '#848484',
  },
  memoDelete: {
    padding: 8,
  },
});
