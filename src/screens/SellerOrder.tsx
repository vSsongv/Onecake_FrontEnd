import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useMemo, useRef, useState} from 'react';
import {Header} from '@react-navigation/stack';
import {TouchableOpacity} from 'react-native-gesture-handler';
import moment from 'moment';
import {AppStyles} from '../styles/AppStyles';
import {BottomSheet, ScrollCalendar} from '../components';
import {useQuery} from 'react-query';
import {getSellerOrderList, ISellerOrderList} from '../services/orderService';
import {queryKeys} from '../enum';
import {useRecoilValue} from 'recoil';
import {currentYearState} from '../recoil/atom';
import {DateData} from 'react-native-calendars';
const WEEK = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

export const SellerOrder = () => {
  const [orderDate, setOrderDate] = useState<string[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const scrollYear = useRecoilValue(currentYearState);
  const {data, status} = useQuery<ISellerOrderList[]>(
    queryKeys.sellerOrderList,
    async () =>
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      await getSellerOrderList().then(res => {
        if (!res?.ok) {
          throw new Error(res?.status.toString());
        } else {
          if (res) return res.json();
        }
      }),
    {
      refetchOnMount: 'always',
      onError: err => {
        console.log('여기서 떠야지 이놈아', err);
      },
      onSuccess: data => {
        setOrderDate([]);
        data.map((val, idx) => {
          setOrderDate(prev => [...prev, val.orderDate]);
        });
      },
    },
  );
  const onDayPress = (date: DateData) => {
    console.log('눌림', date);
    setModalVisible(true);
  };

  const renderContent = () => (
    <View
      style={{
        backgroundColor: AppStyles.color.gray,
        height: '100%',
      }}>
      <Text>Swipe down to close</Text>
    </View>
  );

  const sheetRef = React.useRef(null);

  return (
    <View style={styles.flex}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{scrollYear}</Text>
        <Text
          style={[
            styles.headerTitle,
            styles.headerText,
            {color: AppStyles.color.black},
          ]}>
          주문
        </Text>
        <TouchableOpacity>
          <Text style={styles.headerText}>휴무</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.week}>
        {WEEK.map((val, idx) => (
          <Text key={idx} style={styles.weekText}>
            {val}
          </Text>
        ))}
      </View>
      <ScrollCalendar
        current={moment().format('YYYY-MM-DD').toString()}
        markedDate={orderDate}
        onDayPress={onDayPress}
      />
      <BottomSheet
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    height: 40,
    paddingHorizontal: 14,
    marginTop: 10,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    color: AppStyles.color.black,
  },
  headerText: {
    color: AppStyles.color.hotPink,
    fontSize: 15,
    fontWeight: '600',
  },
  week: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 22,
    paddingBottom: 4,
    borderBottomWidth: 1,
    borderBottomColor: AppStyles.color.border,
  },
  weekText: {
    fontSize: 13,
    fontWeight: '400',
    color: 'rgba(60,60,67,0.3)',
    letterSpacing: -0.078,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
});
