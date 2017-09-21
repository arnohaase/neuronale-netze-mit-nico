

const Modal = {
    hide () {
        $('#theCsiModal').modal ('hide');
    },

    /**
     * @param payload: {onShown, header, body, footer, style}
     */
    show (payload) {
        fluxCtx.executeAction ((context, payload) => context.dispatch ('showModal', payload), payload);
    }
};

export default Modal;