/*
This file contains references to the vendor libraries used in this project.
It is used be Webpack in production build only.
A seperate bundle is vendor.js file that is unlikely to change.
Is have only to be downloaded when a vendor library changes.
Other files that are not listed where will be bundled into main.js.
*/

/* eslint-disable no-unsused-vars */

import fetch from 'whatwg-fetch';
