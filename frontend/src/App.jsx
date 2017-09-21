window.jQuery = require ('jquery');
window.$ = jQuery;

require ('bootstrap');
// require ('bootstrap/dist/css/bootstrap.css');

import Fluxible from 'fluxible';
import {RouteStore} from 'fluxible-router';
import routes from './configs/routes';

import Application from './components/Application';

import ConfigStore from './stores/ConfigStore';
import ModalStore from './stores/ModalStore';
import NotificationsStore from './stores/NotificationsStore';


const app = new Fluxible({
    component: Application,
    stores: [
        RouteStore.withStaticRoutes (routes),
        ConfigStore,
        ModalStore,
        NotificationsStore
    ]
});

export default app;
