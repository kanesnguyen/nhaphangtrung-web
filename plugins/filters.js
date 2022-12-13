import Vue from 'vue';

import currencyFormat from '@/plugins/filters/currencyFormat';
import dateFormat from '@/plugins/filters/dateFormat';
import moneyFormat from '@/plugins/filters/moneyFormat';
import humanizeTime from '@/plugins/filters/humanizeTime';
import numberFormat from '@/plugins/filters/numberFormat';
import phoneFormat from '@/plugins/filters/phoneFormat';

export default () => {
    Vue.filter('currencyFormat', currencyFormat);
    Vue.filter('dateFormat', dateFormat);
    Vue.filter('moneyFormat', moneyFormat);
    Vue.filter('humanizeTime', humanizeTime);
    Vue.filter('numberFormat', numberFormat);
    Vue.filter('phoneFormat', phoneFormat);
};
