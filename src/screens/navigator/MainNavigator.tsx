import React, {useState} from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Home from '../Home';
import Stores from '../Stores';
import Order from '../Order';
import Contact from '../Contact';
import MyPage from '../MyPage';
import {useAsync} from '../../hooks';
import {appKeys} from '../../enum';
import {getStringValueFromAsyncStorage} from '../../utils';
import {AppStyles} from '../../styles/AppStyles';
import {MenuImageDetailHeaderDelete} from '../../components/seller/MenuImageDetails';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from './navigationStackTypes';
import {SettingSeller} from '../../components/seller/SettingSeller';

const Tab = createBottomTabNavigator();

export const MainNavigator = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const [role, setRole] = useState<string>();
  const [error, resetError] = useAsync(async () => {
    resetError();
    const fetchData = await getStringValueFromAsyncStorage(
      appKeys.roleTokenKey,
    );
    if (fetchData) {
      console.log('role', fetchData);
      setRole(fetchData);
    }
  });

  const onPressSellerMyPageSetting = () => {
    navigation.navigate('Setting');
  };

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarLabelStyle: {
          ...Platform.select({
            android: {
              fontFamily: 'AppleSDGothicNeoM',
            },
          }),
          lineHeight: 16,
        },
        tabBarActiveTintColor: AppStyles.color.hotPink,
        tabBarStyle: {
          ...Platform.select({
            ios: {
              shadowColor: '#000000',
              shadowRadius: 9,
              shadowOffset: {height: -20, width: 0},
              shadowOpacity: 0.05,
            },
            android: {
              fontFamily: 'AppleSDGothicNeoM',
            },
          }),
        },
        headerTitleStyle: {
          fontFamily: 'AppleSDGothicNeoM',
        },
      }}>
      <Tab.Screen
        name="홈"
        component={Home}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <Image
                style={{width: 20, height: 20}}
                source={
                  focused
                    ? require('../../asset/home_active.png')
                    : require('../../asset/home_none.png')
                }
              />
            );
          },
          headerTitleStyle: {
            fontSize: 15,
            fontWeight: Platform.OS === 'ios' ? '600' : '800',
            fontFamily: 'AppleSDGothicNeo-Bold',
          },
          headerStyle: {
            borderBottomWidth: 5,
            borderBottomColor: '#F4F4F4',
          },
        }}
      />
      <Tab.Screen
        name={role === 'CONSUMER' ? '가게' : '메뉴'}
        component={Stores}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <Image
                style={{width: 23.5, height: 23.5}}
                source={
                  focused
                    ? require('../../asset/store_active.png')
                    : require('../../asset/store_none.png')
                }
              />
            );
          },
          headerShown: role === 'CoNSUMER' ? true : false,
          headerTitle: role === 'CONSUMER' ? '' : '메뉴 관리',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontSize: 15,
            fontWeight: Platform.OS === 'ios' ? '600' : '800',
            fontFamily: 'AppleSDGothicNeo-Bold',
          },
          headerStyle: {
            borderBottomWidth: 5,
            borderBottomColor: '#F4F4F4',
          },
        }}
      />
      <Tab.Screen
        name="주문"
        component={Order}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <Image
                style={{width: 20, height: 20}}
                source={
                  focused
                    ? require('../../asset/calendar_active.png')
                    : require('../../asset/calendar_none.png')
                }
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="상담"
        component={Contact}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <Image
                style={{width: 22, height: 22}}
                source={
                  focused
                    ? require('../../asset/message_active.png')
                    : require('../../asset/message_none.png')
                }
              />
            );
          },
          headerShown: true,
          headerTitle: '주문 상담',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontSize: 15,
            fontWeight: Platform.OS === 'ios' ? '600' : '800',
            fontFamily: 'AppleSDGothicNeo-Bold',
          },
          headerStyle: {
            borderBottomWidth: 5,
            borderBottomColor: '#F4F4F4',
          },
        }}
      />
      <Tab.Screen
        name="마이페이지"
        component={role === 'SELLER' ? MyPage : SettingSeller}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <Image
                style={{width: 20, height: 20}}
                source={
                  focused
                    ? require('../../asset/people_active.png')
                    : require('../../asset/people_none.png')
                }
              />
            );
          },
          headerShown: role === 'SELLER' ? false : true,
          headerTitle: role === 'SELLER' ? '마이페이지' : '설정',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontSize: 15,
            fontWeight: Platform.OS === 'ios' ? '600' : '800',
            fontFamily: 'AppleSDGothicNeo-Bold',
          },
          headerStyle: {
            borderBottomColor: '#ffffff',
          },
          headerRight: () => {
            return (
              role === 'SELLER' && (
                <TouchableOpacity onPress={onPressSellerMyPageSetting}>
                  <Image
                    style={{width: 20, height: 20, marginRight: 10}}
                    source={require('../../asset/setting.png')}
                  />
                </TouchableOpacity>
              )
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  headerTitle: {
    fontSize: 16,
    ...Platform.select({
      android: {
        fontFamily: 'AppleSDGothicNeoM',
      },
      ios: {fontWeight: '600'},
    }),
  },
  headerTitleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      android: {
        fontFamily: 'AppleSDGothicNeoM',
      },
      ios: {},
    }),
  },
});
