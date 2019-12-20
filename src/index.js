//per the webpack.config file, this is the entry point of the application
import './index.css';

import numeral from 'numeral';

/* eslint-disable no-console */

const courseValue = numeral(1000).format('$0,0.00');
debugger; // sourcemap(enabled in webpack.config) lets us see origional code in browser dev tools
console.log(`I would pay ${courseValue} for this awesome course!`);
