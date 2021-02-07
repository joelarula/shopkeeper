import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import 'material-design-icons-iconfont'

Vue.use(Vuetify);

export default new Vuetify({
    theme: { dark: true },
    icons: {
        iconfont: 'md',
    },
});
