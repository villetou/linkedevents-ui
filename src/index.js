import Intl from 'intl'

if(window && !window.Intl) {
    window.Intl = Intl
}

import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute } from 'react-router'

import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'

import { createHashHistory } from 'history'
import { syncReduxAndRouter, routeReducer } from 'redux-simple-router'

import thunk from 'redux-thunk'

import reducers from './reducers'

// Translations
import {IntlProvider} from 'react-intl';
import translations from 'src/i18n';
import moment from 'moment'

// Views
import App from './views/App'
import Editor from './views/Editor'
import Search from './views/Search'
import Event from './views/Event'
import EventCreated from './views/EventCreated'
import EventListing from './views/EventListing'

// Actors
import Validator from './actors/validator'

// Initialize tap event plugin
import injectTapEventPlugin from 'react-tap-event-plugin'

injectTapEventPlugin()

const reducer = combineReducers(Object.assign({}, reducers, {
  routing: routeReducer
}))

const createStoreWithMiddleware = compose(
    applyMiddleware(thunk),
    typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f
)(createStore)

const store = createStoreWithMiddleware(reducer)
const history = createHashHistory()

syncReduxAndRouter(history, store)

let locale = 'fi'
moment.locale(locale)

// Setup actor for validation. Actor is a viewless component which can listen to store changes
// and send new actions accordingly. Bind the store as this for function
store.subscribe(_.bind(Validator, null, store))

ReactDOM.render(
    <Provider store={store}>
        <IntlProvider locale={locale} messages={translations[locale] || {}}>
            <Router history={history}>
                <Route path="/" component={App}>
                    <IndexRoute component={EventListing}/>
                    <Route path="/event/:eventId" component={Event}/>
                    <Route path="/event/:action/:eventId" component={Editor}/>
                    <Route path="/event/done/:action/:eventId" component={EventCreated}/>
                    <Route path="/search" component={Search}/>
                </Route>
            </Router>
        </IntlProvider>
    </Provider>,
    document.getElementById('content')
)
