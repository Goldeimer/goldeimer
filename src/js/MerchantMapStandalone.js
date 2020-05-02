import React from 'react';
import ReactDOM from 'react-dom'

import MerchantMap from 'components/MerchantMap/MerchantMap';


const container = document.getElementById(
    "react-app-container-merchant-map"
);

container ? ReactDOM.render(<MerchantMap />, container) : false;