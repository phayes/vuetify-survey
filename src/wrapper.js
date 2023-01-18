// Import vue component
import VuetifySurvey from './VuetifySurvey.vue';
import VuetifySurveyEditor from './VuetifySurveyEditor.vue';
import VuetifySurveyItemEditor from './VuetifySurveyItemEditor.vue';


// Declare install function executed by Vue.use()
export function install(Vue) {
	if (install.installed) return;
	install.installed = true;
	Vue.component('VuetifySurvey', VuetifySurvey);
    Vue.component('VuetifySurveyEditor', VuetifySurveyEditor);
    Vue.component('VuetifySurveyItemEditor', VuetifySurveyItemEditor);
}

// Create module definition for Vue.use()
const plugin = {
	install,
};

// Auto-install when vue is found (eg. in browser via <script> tag)
let GlobalVue = null;
if (typeof window !== 'undefined') {
	GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
	GlobalVue = global.Vue;
}
if (GlobalVue) {
	GlobalVue.use(plugin);
}

// To allow use as module (npm/webpack/etc.) export component
export default {
    VuetifySurvey, VuetifySurveyEditor, VuetifySurveyItemEditor
};