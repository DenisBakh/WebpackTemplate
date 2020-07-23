//import * as $ from 'jquery';
//import './js/common.js';



//import './theme/global.scss';
/*
function requireAll(requireContext) {
	return requireContext.keys().map(requireContext);
}

requireAll(require.context('./components', true, /^\.\/(?!.*(?:__tests__)).*\.(jsx?)$/));
requireAll(require.context('./pages', true, /^\.\/(?!.*(?:__tests__)).*\.(jsx?)$/));

$(document).ready(function () {
	console.log('jQuery loaded');
});
*/
require.context('./components', true, /\.(png|jpg|gif|svg)$/);
require.context('./pages', true, /\.(png|jpg|gif|svg)$/);
//require.context('./assets/img', true, /\.(png|jpg|gif|svg)$/);