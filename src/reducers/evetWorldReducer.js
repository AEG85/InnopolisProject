const initialState = {
    evetnsWorld: [
        {
            id: 'xxx',
            text: 'default',
            status: false
        }

    ]
}

const ACTIONS = {
    ADD_EVENT: 'ADD_EVENT',
    REMOVE_EVENT: 'REMOVE_EVENT',
    UPDATE_EVENT: 'UPDATE_EVENT',
}

const eventWorldReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTIONS.ADD_EVENT: {
            return {
                ...state,
                evetnsWorld: [...state.evetnsWorld, action.payload]
            }
        }
        case ACTIONS.REMOVE_EVENT: {
            return {
                ...state,
                evetnsWorld: state.evetnsWorld.filter(event => event.id !== action.payload.id)
            }
        }
        case ACTIONS.UPDATE_EVENT: {
            return {
                ...state,
                evetnsWorld: state.evetnsWorld.list.forEach(function (event) {
                    if (event.id === action.payload.id) {
                        event.text = action.payload.text
                        event.status = action.payload.status
                    }
                })
            }
        }
        default:
            return state
    }
}

export default eventWorldReducer