import BaseStore from 'fluxible/addons/BaseStore';


class ConfigStore extends BaseStore {
    constructor(dispatcher) {
        super(dispatcher);
        this.config = {};
    }

    onConfigLoaded (config) {
        this.config = config;
        this.emitChange();
    }

    getConfig () {
        return this.config;
    }
}

ConfigStore.storeName = 'ConfigStore';
ConfigStore.handlers = {
    'configLoaded': "onConfigLoaded"
};

export default ConfigStore;
