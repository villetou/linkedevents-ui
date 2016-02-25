const constants = {

    APP_SET_FLASHMSG: 'APP_SET_FLASHMSG',
    APP_CLEAR_FLASHMSG: 'APP_CLEAR_FLASHMSG',
    APP_CONFIRM_ACTION: 'APP_CONFIRM_ACTION',
    APP_DO_ACTION: 'APP_DO_ACTION',
    APP_CANCEL_ACTION: 'APP_CANCEL_ACTION',

    REQUEST_EVENTS: 'REQUEST_EVENTS',
    RECEIVE_EVENTS: 'RECEIVE_EVENTS',
    RECEIVE_EVENT_FOR_EDITING: 'RECEIVE_EVENT_FOR_EDITING',
    RECEIVE_EVENTS_ERROR: 'RECEIVE_EVENTS_ERROR',
    RECEIVE_EVENT_DETAILS: 'RECEIVE_EVENT_DETAILS',
    EVENT_DELETED: 'EVENT_DELETED',

    REQUEST_IMAGES: 'REQUEST_IMAGES',
    RECEIVE_IMAGES: 'RECEIVE_IMAGES',
    SELECT_IMAGE_BY_ID: 'SELECT_IMAGE_BY_ID',

    RECEIVE_USERDATA: 'RECEIVE_USERDATA',
    CLEAR_USERDATA: 'CLEAR_USERDATA',

    EDITOR_RECEIVE_KEYWORDSETS: 'EDITOR_RECEIVE_KEYWORDSETS',
    EDITOR_RECEIVE_LANGUAGES: 'EDITOR_RECEIVE_LANGUAGES',
    EDITOR_SETDATA: 'EDITOR_SETDATA',
    EDITOR_REPLACEDATA: 'EDITOR_REPLACEDATA',
    EDITOR_CLEARDATA: 'EDITOR_CLEARDATA',
    EDITOR_SENDDATA: 'EDITOR_SENDDATA',
    EDITOR_SENDDATA_COMPLETE: 'EDITOR_SENDDATACOMPLETE',
    EDITOR_SENDDATA_ERROR: 'EDITOR_SENDDATA_ERROR',
    EDITOR_SENDDATA_SUCCESS: 'EDITOR_SENDDATA_SUCCESS',
    SET_VALIDATION_ERRORS: 'SET_VALIDATION_ERRORS',
    VALIDATE_FOR: 'VALIDATE_FOR',

    IMAGE_UPLOAD_SUCCESS: 'IMAGE_UPLOAD_SUCCESS',
    IMAGE_UPLOAD_ERROR: 'IMAGE_UPLOAD_ERROR',

    // Local storage keys
    EDITOR_VALUES: 'EDITOR_VALUES',

    // Event schedule values
    EVENT_STATUS: {
        SCHEDULED: 'EventScheduled',
        CANCELLED: 'EventCancelled',
        POSTPONED: 'EventPostponed',
        RESCHEDULED: 'EventRescheduled'
    },

    PUBLICATION_STATUS: {
        DRAFT: 'draft',
        PUBLIC: 'public'
    },

    VALIDATION_STATUS: {
        CLEARED: 'cleared', // When form is cleared we also clear validation errors and set this status
        RESOLVE: 'resolve' // When form has validation errors and user is on editor page
    }
}

export default constants
