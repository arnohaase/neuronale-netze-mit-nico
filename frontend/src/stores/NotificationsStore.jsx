import {BaseStore} from 'fluxible/addons';

import _ from 'lodash';


class NotificationsStore extends BaseStore {
    constructor(dispatcher) {
        super(dispatcher);
        this.notifications = [];
    }

    handleDisplayNotification(notification) {
        notification.id = _.uniqueId();
        this.notifications.push(notification);
        setTimeout(() => {
            this.removeNotification(notification);
        }, 10000);
        this.emitChange();
    }

    removeNotification(notification) {
        this.notifications = _.without(this.notifications, notification);
        this.emitChange();
    }

    removeAllNotifications() {
        this.notifications = [];
        this.emitChange();
    }

    getNotifications() {
        return this.notifications;
    }

}

NotificationsStore.storeName = 'NotificationsStore';
NotificationsStore.handlers = {
    'DISPLAY_NOTIFICATION': 'handleDisplayNotification'
};

export default NotificationsStore;
