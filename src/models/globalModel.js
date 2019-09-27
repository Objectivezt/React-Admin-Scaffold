import { baseRouterUrl, globalModalProps } from '@common/config';
import i18N from '@common/i18N/index';

const { CN, EN } = i18N;

export default {
  namespace: 'globalModel',
  state: {
    collapsed: false,
    isMultiPage: true,
    baseRouterUrl,
    language: CN,
    globalModalProps // 全局组件属性配置
  },
  effects: {},
  reducers: {
    changeLayoutCollapsed(state, { payloadCollapsed }) {
      return {
        ...state,
        collapsed: payloadCollapsed
      };
    },
    changeMultiPage(state, { payloadMultiPage }) {
      return {
        ...state,
        isMultiPage: payloadMultiPage
      };
    },
    pushRouterUrl(state, { payloadRouterUrl }) {
      return {
        ...state,
        baseRouterUrl: payloadRouterUrl
      };
    },
    changeLang(state, { payloadLang }) {
      let lang = 'cn';
      lang = payloadLang === 'cn' ? CN : EN;
      return {
        ...state,
        language: lang
      };
    }
  }
};
