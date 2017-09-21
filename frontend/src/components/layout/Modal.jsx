import React from 'react';
import { connectToStores } from 'fluxible-addons-react';

import ModalStore from '../../stores/ModalStore';


@connectToStores ([ModalStore], (context) => ({
    header: context.getStore (ModalStore).getHeader(),
    body:   context.getStore (ModalStore).getBody(),
    footer: context.getStore (ModalStore).getFooter(),
    style:  context.getStore (ModalStore).getStyle()
}))
class Modal extends React.Component {
    render() {
        let header = this.props.header && <div className="modal-header">{this.props.header}</div>;
        let footer = this.props.footer && <div className="modal-footer">{this.props.footer}</div>;

        return <div className="modal fade" id="theCsiModal" tabIndex="-1" role="dialog" >
            <div className="modal-dialog" style={this.props.style} role="document">
                <div className="modal-content">
                    {header}
                    <div className="modal-body">{this.props.body}</div>
                    {footer}
                </div>
            </div>
        </div>
    }
}

export default Modal;
