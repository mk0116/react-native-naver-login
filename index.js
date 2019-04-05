import { NativeModules, Platform } from 'react-native';

const { IosNaverLogin, RNNaverLogin } = NativeModules; // 여기 이름은 달라야 함.

// const getNaverProfile = {}

const NaverLoginIos = {
  login(param, callback) {
    IosNaverLogin.login(callback);
  },
  loginSilently(param, callback) {
    IosNaverLogin.loginSilently(callback);
  },
  getToken(param, callback) {
    IosNaverLogin.getToken(callback);
  },
  logout() {
    IosNaverLogin.logout();
  }
}

const RNNaverLoginAndr = {
  login(param, callback) {
    RNNaverLogin.login(JSON.stringify(param), callback);
  },
  loginSilently(param, callback) {
    RNNaverLogin.loginSilently(JSON.stringify(param), callback);
  },
  getToken(param, callback) {
    RNNaverLogin.getToken(JSON.stringify(param), callback);
  },
  logout() {
    RNNaverLogin.logout();
  }
}

const getProfile = (token) => {
  return fetch('https://openapi.naver.com/v1/nid/me', {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + token,
    },
  }).then((response) => response.json()).then((responseJson) => {
    return responseJson;
  }).catch((err) => {
    console.log('getProfile err');
    console.log(err);
  });
};

const NaverLogin = Platform.OS === 'ios'
    ? NaverLoginIos
    : RNNaverLoginAndr;

module.exports = { NaverLogin, getProfile }
