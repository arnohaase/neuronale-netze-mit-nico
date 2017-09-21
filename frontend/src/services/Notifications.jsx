

function dispatch (msg, type) {
    fluxCtx.executeAction ((context, payload) => context.dispatch ('DISPLAY_NOTIFICATION', payload), {text: msg, type: type});
}


export default {
    success: (msg) => dispatch(msg, 'success'),
    info:    (msg) => dispatch(msg, 'info'),
    warning: (msg) => dispatch(msg, 'warning'),
    error:   (msg) => dispatch(msg, 'danger')
};
