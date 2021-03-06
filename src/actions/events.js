import constants from '../constants'
import fetch from 'isomorphic-fetch'

import { setFlashMsg } from './app'

function makeRequest(query, startDate, endDate) {
    var url = `${appSettings.api_base}/event/?text=${query}`

    if(appSettings.nocache) {
        url += `&nocache=${Date.now()}`
    }

    if (startDate) {
        url += `&start=${startDate.format('YYYY-MM-DD')}`
    }
    if (endDate) {
        url += `&end=${endDate.format('YYYY-MM-DD')}`
    }

    return fetch(url).then(function(response) {
        if (response.status >= 400) {
            return {
                apiErrorMsg: 'API error from server'
            }
        }
        return response.json()
    })
    .catch(e => {
        // Error happened while fetching ajax (connection or javascript)
    })
}

export function receiveEvents(json) {
    if(json.apiErrorMsg) {
        return {
            type: constants.RECEIVE_EVENTS_ERROR,
            apiErrorMsg: json.apiErrorMsg,
            items: []
        }
    }
    else {
        return {
            type: constants.RECEIVE_EVENTS,
            items: json.data,
            receivedAt: Date.now()
        }
    }
}

// NOTE: Server should always return either json, or nothing (on failed connection)
export function fetchEvents(query, startDate, endDate) {
    return (dispatch) => {
        return makeRequest(query, startDate, endDate)
            .then(json => dispatch(receiveEvents(json)))
    }
}

export function receiveEventDetails(json) {
    return {
        type: constants.RECEIVE_EVENT_DETAILS,
        event: json
    }
}

export function fetchEventDetails(eventID, user = {}) {
    let url = `${appSettings.api_base}/event/${eventID}/?include=keywords,location,audience,in_language,external_links,image`

    if(appSettings.nocache) {
        url += `&nocache=${Date.now()}`
    }

    let options = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }

    if(user && user.token) {
        Object.assign(options.headers, {
            'Authorization': 'JWT ' + user.token
        })
    }

    return (dispatch) => {
        return fetch(url, options)
            .then(response => response.json())
            .then(json => dispatch(receiveEventDetails(json)))
            .catch(e => {
                // Error happened while fetching ajax (connection or javascript)
            })
    }
}
