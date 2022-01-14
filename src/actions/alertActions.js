import {
    SHOW_ALERT,
    HIDE_ALERT
} from '../types'

//SHOW
export function showAlertAction(alert) {
    return (dispatch) => {
        dispatch(showAlert(alert))
    }
}

const showAlert = alert => ({
    type: SHOW_ALERT,
    payload: alert
})


//HIDE
export function hideAlertAction() {
    return (dispatch) => {
        dispatch(hideAlert())
    }
}

const hideAlert = () => ({
    type: HIDE_ALERT
})