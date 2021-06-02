import React, { useEffect, useState } from 'react';
import {
  View, Text, ScrollView, StyleSheet,
} from 'react-native';
import { shape, string } from 'prop-types';
import firebase from 'firebase';
import CircleButton from '../components/CircleButton';
import { dateToString } from '../utils';

export default function MemoDetailScreen(props) {
  const { navigation, route } = props; // ReactNavigationが渡してくれる
  const { id } = route.params;

  const [memo, setMemo] = useState({});
  useEffect(() => {
    const { currentUser } = firebase.auth();
    let unsubscribe = () => {
    };
    if (!currentUser) {
      return unsubscribe;
    }
    const db = firebase.firestore();
    const ref = db.collection(`users/${currentUser.uid}/memos`).doc(id);
    unsubscribe = ref.onSnapshot((doc) => {
      const data = doc.data();
      setMemo({
        id: doc.id,
        bodyText: data.bodyText,
        updatedAt: data.updatedAt.toDate(),
      });
    });
    return unsubscribe;
  });
  return (
    <View style={styles.container}>
      <View style={styles.memoHeader}>
        <Text style={styles.memoTitle} numberOfLines={1}>{memo && memo.bodyText}</Text>
        <Text style={styles.memoDate}>{memo && dateToString(memo.updatedAt)}</Text>
      </View>
      <ScrollView>
        <View style={styles.memoBodyInner}>
          <Text style={styles.memoText}>
            {memo && memo.bodyText}
          </Text>
        </View>
      </ScrollView>
      {/* bottom: auto でデフォルト値をキャンセル */}
      <CircleButton
        name="edit-2"
        style={{ top: 60, bottom: 'auto' }}
        onPress={() => {
          navigation.navigate('MemoEdit', { id: memo.id, bodyText: memo.bodyText }); // 押下されたらMemoEditへ遷移する
        }}
      />
    </View>
  );
}

MemoDetailScreen.propTypes = {
  route: shape({
    params: shape({
      id: string,
    }),
  }).isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  memoHeader: {
    backgroundColor: '#467fd3',
    height: 96,
    justifyContent: 'center',
    paddingVertical: 24,
    paddingHorizontal: 19,
  },
  memoTitle: {
    color: '#ffffff',
    fontSize: 20,
    lineHeight: 32,
    fontWeight: 'bold',
  },
  memoDate: {
    color: '#ffffff',
    fontSize: 12,
    lineHeight: 16,
  },
  memoBodyInner: {
    paddingTop: 32,
    paddingBottom: 27,
    paddingHorizontal: 27,
  },
  memoText: {
    fontSize: 16,
    lineHeight: 24,
  },
});
