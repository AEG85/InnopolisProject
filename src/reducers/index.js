import eventWorldReducer from './evetWorldReducer'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
    events: eventWorldReducer
})

export default rootReducer