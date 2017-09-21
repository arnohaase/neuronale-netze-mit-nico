import React from 'react';

import {navigateAction} from 'fluxible-router';

import * as Cookies from "js-cookie";

class TitleBar extends React.Component {
    constructor (props, context) {
        super(props, context);
    }

    onSearch() {
        fluxCtx.executeAction (navigateAction, {routeName: 'search'});
    }

    render() {
        return <nav className="navbar navbar-default">
            <div className="container-fluid">
                <div className="collapse navbar-collapse">
                    <ul className="nav navbar-nav navbar-left">
                        <div className="btn-group">
                            <button className="btn btn-primary navbar-btn" id="titlebar.button.search" onClick={this.onSearch}><i className="glyphicon glyphicon-search"/> Neue Suche</button>
                        </div>
                    </ul>
                    <p className="navbar-text navbar-right">Angemeldet als: {123}</p>
                </div>
            </div>
        </nav>;
    }
}

export default TitleBar;
