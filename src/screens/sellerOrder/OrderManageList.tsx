import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Platform,
} from 'react-native';
import React, {Dispatch, FC, SetStateAction} from 'react';
import {
  getSellerOrderList,
  ISellerOrderList,
} from '../../api/orderService';
import {DateData} from 'react-native-calendars';
import {AppStyles} from '../../styles/AppStyles';
import {assert} from '../../utils';
import {OrderManageContent} from '../../components';
import {useRecoilState, useRecoilValue} from 'recoil';
import {orderListModalState} from '../../recoil/atom';
import {appKeys, orderStatusKeys, queryKeys} from '../../enum';
import {OrderSheet} from './OrderSheet';
import {useQuery} from 'react-query';
import {useQueryRefetchingOnError} from '../../hooks';

export type OrderManageListProps = {
  date: DateData | undefined;
  setModalVisible: Dispatch<SetStateAction<boolean>>;
  close?: () => void;
};
export const OrderManageList = ({
  date,
  setModalVisible,
  close,
}: OrderManageListProps) => {
  const [orderListState, setOrderListState] =
    useRecoilState(orderListModalState);

  console.log(date?.dateString);
  assert(
    date !== undefined,
    '특정 날짜의 주문을 보기 위해서는 날짜가 선택되어야한다.',
  );
  // 특정 날짜의 주문들 가져오기 위한 api
  const {data, status} = useQuery<ISellerOrderList>(
    queryKeys.sellerOrderList,
    async () =>
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      await getSellerOrderList(date.dateString).then(res => {
        if (!res?.ok) {
          throw new Error(res?.status.toString());
        } else {
          if (res) return res.json();
        }
      }),
    {
      onError: err => {
        console.log('특정 날짜의 주문을 보는 api에러 에러 발생');
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useQueryRefetchingOnError(err, queryKeys.sellerOrderList);
      },
      onSuccess: data => {
        console.log(data);
      },
    },
  );

  const BackBtnHandler = () => {
    orderListState === appKeys.orderList
      ? setModalVisible(false)
      : setOrderListState(appKeys.orderList);
  };

  return (
    <View style={styles.view}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerIcon} onPress={BackBtnHandler}>
          <Image
            style={{width: 18, height: 18, resizeMode: 'contain'}}
            source={require('../../asset/arrow-back.png')}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {orderListState === appKeys.orderList
            ? date?.dateString.replace(/-/g, '.')
            : '주문서'}
        </Text>
        <View style={{width: 18, height: 18}} />
      </View>
      {orderListState === appKeys.orderList ? (
        <ScrollView style={{paddingTop: 10}}>
          {data && (
            <View>
              {data.received.length > 0 && (
                <View style={styles.contentView}>
                  <OrderManageContent
                    renderData={data.received}
                    status={'주문대기중'}
                  />
                </View>
              )}
              {data.accepted.length > 0 && (
                <View style={styles.contentView}>
                  <OrderManageContent
                    renderData={data.accepted}
                    status={'주문완료'}
                  />
                </View>
              )}
              {data.making.length > 0 && (
                <View style={styles.contentView}>
                  <OrderManageContent
                    renderData={data.making}
                    status={'제작중'}
                  />
                </View>
              )}
              {data.completed.length > 0 && (
                <View style={styles.contentView}>
                  <OrderManageContent
                    renderData={data.completed}
                    status={'픽업 완료'}
                  />
                </View>
              )}
              {data.canceled.length > 0 && (
                <View style={styles.contentView}>
                  <OrderManageContent
                    renderData={data.canceled}
                    status={'취소된 주문'}
                  />
                </View>
              )}
            </View>
          )}
        </ScrollView>
      ) : (
        <>
          <OrderSheet />
        </>
      )}
      <View style={{height: 50}} />
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    width: Dimensions.get('screen').width,
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  headerIcon: {
    justifyContent: 'flex-start',
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 18,
    color: AppStyles.color.black,
    ...Platform.select({
      android: {
        fontFamily: 'AppleSDGothicNeoM',
      },
      ios: {
        fontWeight: '700',
      },
    }),
  },
  contentView: {
    borderBottomWidth: 7,
    borderBottomColor: '#F4F4F4',
  },
});
