import axios from 'axios';
import {StyleSheet, TextInput, TouchableOpacity, Text} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-community/async-storage';
import {useForm} from 'react-hook-form';
import React, {useState} from 'react';
// import { env } from '.env';

const SignIn = ({navigation}) => {
  const {register, handleSubmit, getValues} = useForm();
  const URL = 'http://15.165.27.120:8080';
  const [id, setId] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  interface userData {
    user_id: string;
    password: string;
    accessToken: string;
    refreshToken: string;
    TokenExpires: number;
  }
  const doSignIn = async () => {
    try {
      const data = await axios.post<userData>(URL + '/api/v1/auth/login', {
        user_id: id,
        password: password,
      });
      console.log(data.data.accessToken);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SafeAreaProvider>
      <TextInput
        placeholder="아이디"
        value={id}
        onChangeText={setId}
        style={styles.textInput}
      />
      <TextInput
        placeholder="비밀번호"
        value={password}
        onChangeText={setPassword}
        style={styles.textInput}
      />
      <TouchableOpacity style={styles.loginBtn} onPress={doSignIn}>
        <Text style={{color: '#ffffff'}}>로그인</Text>
      </TouchableOpacity>
      <Text onPress={() => navigation.navigate('SignUp')}>회원가입</Text>
      <Text>비밀번호 찾기</Text>
    </SafeAreaProvider>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  textInput: {
    borderWidth: 1,
    borderBottomColor: 'black',
    height: 50,
    width: 268,
    fontSize: 20,
    borderRadius: 10,
    marginBottom: 20,
    paddingLeft: 10,
  },
  loginBtn: {
    marginTop: 20,
    width: 270,
    height: 42,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF3196',
  },
});
