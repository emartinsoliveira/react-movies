import { create } from 'apisauce';
import Config from 'react-native-config';
import { Platform, NativeModules } from 'react-native';

const deviceLanguage =
      Platform.OS === 'ios'
        ? NativeModules.SettingsManager.settings.AppleLocale ||
          NativeModules.SettingsManager.settings.AppleLanguages[0] //iOS 13
        : NativeModules.I18nManager.localeIdentifier;

const langFormat = deviceLanguage.replace('_', '-')

const api = create({
  baseURL: Config.API_URL,
  timeout: 60000
});

api.addAsyncRequestTransform(request => async () => {
  request.headers.Authorization = `Bearer ${Config.API_TOKEN}`;
  request.params['language'] = langFormat
});

api.addResponseTransform(response => {
  if (!response.ok) throw response;
});

export default api;
