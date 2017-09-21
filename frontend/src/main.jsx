import app from './App'
import ReactDOM from 'react-dom';

import executeMultiple from 'fluxible-action-utils/async/executeMultiple';
import {createElementWithContext} from 'fluxible-addons-react';
import {navigateAction} from 'fluxible-router';

import LoadConfigAction from './actions/LoadConfigAction';

const dehydratedState = {};

function navigateAndRender (context) {
    const mountNode = document.getElementById('content');

    context.executeAction (navigateAction, {url: location.pathname})
        .then (() => {
            "use strict";

            ReactDOM.render(
                createElementWithContext(context),
                mountNode
            );
        });
}

app.rehydrate(dehydratedState, (err, context) => {
    if (err) {
        throw err;
    }

    window.fluxCtx = context.getComponentContext();
    
    executeMultiple (context, {
            loadConfig: {
                action: LoadConfigAction,
                isCritical: true
            }
        },
        (err) => {
            if (err) {
                console.log ("error during startup"); //TODO
            }
            else {
                navigateAndRender (context);
            }
        }
    );
});
