import {
  FlatList,
  Image,
  ListRenderItemInfo,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {AppStyles} from '../../../styles/AppStyles';
import {useQuery, useQueryClient} from 'react-query';
import {getKeyWordCakeList, IKeywordCakeList} from '../../../api';
import {cakeKeywords, queryKeys} from '../../../enum';

export const KeywordCakes = () => {
  const queryClient = useQueryClient();

  const {data} = useQuery<IKeywordCakeList[]>(
    queryKeys.keywordCakeList,
    async () =>
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      await getKeyWordCakeList().then(res => {
        if (!res?.ok) {
          throw new Error(res?.status.toString());
        } else {
          if (res) return res.json();
        }
      }),
    {
      refetchOnMount: 'always',
      refetchOnWindowFocus: true,
      staleTime: 5000,
      cacheTime: Infinity,
      onError: err => {
        console.log('err');
        const response = err as Error;
        if (response.message === '401') {
          queryClient.invalidateQueries(queryKeys.keywordCakeList);
          console.log('쿼리 성공');
        }
      },
    },
  );

  const renderItem = (item: ListRenderItemInfo<IKeywordCakeList>) => {
    return (
      <>
        <Image style={styles.image} source={{uri: item.item.image}} />
        <View style={styles.tag}>
          <Text
            style={{
              color: AppStyles.color.lightGray,
              alignSelf: 'center',
              ...Platform.select({
                android: {
                  fontFamily: 'AppleSDGothicNeoM',
                  lineHeight: 15,
                },
                ios: {},
              }),
            }}>
            # {cakeKeywords[item.item.keyword]}
          </Text>
        </View>
      </>
    );
  };

  return (
    <>
      <Text style={styles.title}>내가 찾는 기념일 케이크</Text>
      <FlatList data={data} renderItem={renderItem} horizontal={true} />
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    marginTop: 30,
    marginLeft: 16,
    color: AppStyles.color.black,
    fontSize: 19,
    ...Platform.select({
      android: {
        fontFamily: 'AppleSDGothicNeo-Bold',
      },
      ios: {
        fontWeight: '800',
      },
    }),
  },
  image: {
    width: 320,
    height: 223,
    borderRadius: 10,
    marginLeft: 15,
    marginTop: 10,
    alignSelf: 'center',
  },
  tag: {
    position: 'absolute',
    backgroundColor: AppStyles.color.black,
    borderRadius: 18,
    opacity: 0.6,
    height: 22,
    justifyContent: 'center',
    width: 70,
    bottom: 1,
    marginBottom: 14,
    marginLeft: 29,
  },
});
