import {useMutation} from 'react-query';
import {customAxios} from '../../../services/customAxios';

export const fetchUserPhoneNumber = async (phoneNumber: string) => {
  const {data} = await customAxios().put('/api/v1/member/phoneNumber', {
    phoneNumber,
  });
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return data;
};

export const useUserPhoneNumberMutate = () => {
  return useMutation(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    async (phoneNumber: string) => await fetchUserPhoneNumber(phoneNumber),
    {
      onSuccess: data => {
        console.log(data);
      },
    },
  );
};