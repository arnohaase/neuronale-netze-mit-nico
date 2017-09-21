import React from 'react';
import { connectToStores } from 'fluxible-addons-react';
import {handleHistory} from 'fluxible-router';
import {RouteStore} from 'fluxible-router';

import Modal from './layout/Modal';
import NotificationList from './misc/NotificationList';
import TitleBar from './layout/TitleBar';

import './Shared.scss';


@handleHistory
@connectToStores ([RouteStore], (context) => ({
    routeStore: context.getStore (RouteStore)
}))
class Application extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        let Handler = this.props.currentRoute.handler;

        return <div className="full-height">
            <Modal />
            <NotificationList />
            <TitleBar />
            <div className="container-fluid">
                <Handler />
            </div>
        </div>
    }
}

export default Application;
