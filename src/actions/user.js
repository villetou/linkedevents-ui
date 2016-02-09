import constants from '../constants.js'
import fetch from 'isomorphic-fetch'

// Handled by the user reducer
export function receiveUserData(data) {
    return {
        type: constants.RECEIVE_USERDATA,
        payload: data
    }
}

// Handled by the user reducer
export function clearUserData() {
    return {
        type: constants.CLEAR_USERDATA
    }
}

// Returns userdata if available, else return null
function tryFetchingUserFromLocalStorage() {
    let user = ''

    try {
        user = localStorage.getItem('user')
        user = JSON.parse(user)
    } catch(e) {
        // No dice
    }

    if(user && typeof user === 'object' && user.id && user.token && user.displayName) {
        return user
    }
    else {
        return null
    }
}

export function retrieveUserFromSession() {
    return (dispatch) => {
        let user = tryFetchingUserFromLocalStorage()
        if(user) {
            return dispatch(receiveUserData(user))
        } else {
            return fetch('/auth/me?' + (+new Date()), {method: 'GET', credentials: 'same-origin'}).then((response) => {
                return response.json()
            }).then((data) => {
                localStorage.setItem('user', JSON.stringify(data))
                return dispatch(receiveUserData(data))
            })
        }
    }
}

export function login() {
  return (dispatch) => {
    return new Promise((resolve) => {
      if (typeof window === 'undefined') {  // Not in DOM? Just try to get an user then and see how that goes.
        return resolve(true);
      }
      const loginPopup = window.open(
        '/auth/login/helsinki',
        'kkLoginWindow',
        'location,scrollbars=on,width=720,height=600'
      );
      const wait = function wait() {
        if (loginPopup.closed) { // Is our login popup gone?
          return resolve(true);
        }
        setTimeout(wait, 500); // Try again in a bit...
      };
      wait();
    }).then(() => {
      return dispatch(retrieveUserFromSession());
    });
  };
}

export function logout() {
  return (dispatch) => {
      fetch('/auth/logout', {method: 'POST', credentials: 'same-origin'}) // Fire-and-forget
      localStorage.removeItem('user')
      dispatch(clearUserData())
  };
}
