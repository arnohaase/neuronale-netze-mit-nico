import React from 'react';
import { connectToStores } from 'fluxible-addons-react';

import NotificationsStore from '../../stores/NotificationsStore';


@connectToStores([NotificationsStore], (context) => ({
    notifications: context.getStore(NotificationsStore).getNotifications()
}))
class NotificationList extends React.Component {

    render() {
        let notifications = this.props.notifications.map (message => <div className={'alert alert-dismissible alert-' + message.type} role="alert" key={message.id} id={message.id}>{message.text}</div>);

        return (
            <div className="container-fluid">
                {notifications}
            </div>
        );
    }
}

export default NotificationList;
