import React from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity, Alert, FlatList,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import {
  shape, string, instanceOf, arrayOf,
} from 'prop-types';

export default function MemoList(props) {
  const { memos } = props;

  // <Stack.Screen>に登録していないとpropsからnavigationを取得できない。その場合はuseNavigationを利用する
  const navigation = useNavigation();

  function renderItem({ item }) {
    return (
      <TouchableOpacity
        style={styles.memoListItem}
        onPress={() => {
          navigation.navigate('MemoDetail');
        }}
      >
        <View>
          <Text style={styles.memoListItemTitle} numberOfLines={1}>{item.bodyText}</Text>
          <Text style={styles.memoListItemDate}>{String(item.updatedAt)}</Text>
        </View>
        <View>
          <TouchableOpacity style={styles.memoDelete}>
            <Feather
              name="x"
              size={16}
              color="#B0B0B0"
              onPress={() => {
                Alert.alert('Are you sure?');
              }}
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
