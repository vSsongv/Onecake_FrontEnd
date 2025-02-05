import {atom, selector} from 'recoil';
import {IEditFetchMenu, IFetchMenu} from '../screens/enterMenu';
import {IMenuList, IRefreshToken} from '../api';
import moment from 'moment';
import {appKeys, storeTabKeys} from '../enum';
import {IMenuImageDetailsItem} from '../screens/menuImage';
export const storeMenuState = atom<IFetchMenu>({
  key: 'storeMenuState',
});

export const customerInfoState = atom<string[]>({
  key: 'customerInfoState',
  default: ['주문자 이름', '전화번호', '픽업날짜', '픽업시간'],
});

export const cakeInfoState = atom<string[]>({
  key: 'cakeInfoState',
  default: [
    '케이크 맛',
    '배경 색상',
    '레터링 색상',
    '레터링 문구',
    '레퍼런스 사진',
  ],
});

export const accessTokenState = atom<IRefreshToken>({
  key: 'accessTokenState',
  default: {
    accessToken: '',
    refreshToken: '',
  },
});

export const currentYearState = atom<number>({
  key: 'currentYearState',
  default: moment().year(),
});

export const orderListModalState = atom<string>({
  key: 'orderListModalState',
  default: appKeys.orderList,
});

export const storeIdState = atom<number>({
  key: 'storeIdState',
  default: 0,
});

export const menuEditSheetInfoState = atom<IEditFetchMenu>({
  key: 'menuEditSheetInfoState',
  default: {
    cakeSize: '',
    price: 0,
    menuDescription: '',
    taste: '',
    consumerInput: [],
    cakeInput: [],
    cakeImage: '',
  },
});

export const EditTargetMenuIdState = atom<number>({
  key: 'EditTargetMenuIdState',
  default: -1,
});

export const orderSheetIdState = atom<number>({
  key: 'orderSheetIdState',
});

export const currentTabState = atom<string>({
  key: 'currentTabState',
  default: storeTabKeys.menu,
});

export const menuRenderListItemState = atom<IMenuList>({
  key: 'menuRenderListItemState',
  default: {
    image: '',
    menuName: '',
    menuDescription: '',
    price: 0,
    id: 0,
  },
});

export const orderHistoryIdState = atom<number>({
  key: 'orderHistoryIdState',
});

//메뉴리스트를 선택한 후 그리드에서 사진을 선택했을때 디테일 페이지로 보내주는 atom
export const menuImageDetailState = atom<IMenuImageDetailsItem>({
  key: 'menuImageDetailState',
});

// 마이페이지 프로필 수정
export const profileEditState = atom({
  key: 'profileEditState',
  default: {
    profileImg:
      'https://onecake-image-bucket.s3.ap-northeast-2.amazonaws.com/472fe03a-20df-4a95-a614-ff0094b27034-Mask%20group.png',
    nickname: '원게익',
  },
});

//판매 데이터에서 현재 월
export const chartCurrMonthState = atom({
  key: 'chartCurrMonthState',
  default: `${moment().month() + 1}`,
});
