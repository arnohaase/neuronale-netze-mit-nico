import BaseStore from 'fluxible/addons/BaseStore';


class ModalStore extends BaseStore {
    constructor(dispatcher) {
        super(dispatcher);

        this.header = undefined;
        this.body = undefined;
        this.footer = undefined;
        this.style = {};
    }

    getHeader() {
        return this.header;
    }
    getBody() {
        return this.body;
    }
    getFooter() { 
        return this.footer;
    }
    getStyle() {
        return this.style;
    }

    onShowModal (details) {
        this.header = details.header;
        this.body = details.body;
        this.footer = details.footer;
        this.style = details.style;

        this.emitChange();

        const theModal = $('#theCsiModal');
        theModal.modal ('show');
        
        if (details.onShown) {
            theModal.on('shown.bs.modal', details.onShown);
        }
    }
}


ModalStore.storeName = 'ModalStore';
ModalStore.handlers = {
    'showModal': 'onShowModal'
};

export default ModalStore;
