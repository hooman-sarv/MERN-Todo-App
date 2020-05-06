import {createStore,applyMiddleware,combineReducers} from 'redux'
import {defaultState} from '../../server/DefaultState'
import {createLogger} from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
//import * as sagas from './sagas.mock'
import * as sagas from './sagas'
import * as mutations from './mutations'
import {SET_STATE} from "./mutations";


const sagaMiddleware = createSagaMiddleware()
const logger = createLogger()
export const store = createStore(
    combineReducers({

        session(userSession= defaultState.session || {}, action){
            let {type , authenticated , session} = action
            console.log(type)
            switch (type) {
                case mutations.SET_STATE:
                    return {...userSession , id:action.state.session.id}
                case mutations.REQUEST_AUTHENTICATE_USER:
                    return {...userSession , authenticated: mutations.AUTHENTICATING}
                case mutations.PROCESS_AUTHENTICATE_USER:
                    return {...userSession,authenticated }

                default:
                    return userSession
            }

        },
        tasks( tasks = [] , action){
            switch (action.type) {
                case mutations.SET_STATE:
                    return action.state.tasks
                case mutations.CREATE_TASK:
                    return [...tasks ,{
                        id:action.taskID,
                        name:"NewTask",
                        group:action.groupID,
                        owner:action.ownerID,
                        isComplete:false
                    }]
                case mutations.SET_TASK_COMPLETE:
                    return tasks.map( task => {
                        return (task.id === action.taskID)
                            ? {...task,isComplete:action.isComplete}
                            : task
                    })
                case mutations.SET_TASK_NAME:
                    return tasks.map( task => {
                        return (task.id === action.taskID)
                            ?{...task , name : action.name}
                            : task
                    })
                case mutations.SET_TASK_GROUP:
                    return tasks.map( task => {
                        return (task.id === action.taskID)
                            ?{...task , group : action.groupID}
                            : task
                    })
            }
            return tasks

        },
        comments(comments = [],action){
            switch (action.type) {
                case mutations.SET_STATE:
                    return action.state.comments
            }
            return comments
        },
        groups(groups = [] , action){
            switch (action.type) {
                case mutations.SET_STATE:
                    return action.state.groups
            }
            return groups
        },
        users(users =[]){
            return users
        }
    }),
    applyMiddleware(logger ,sagaMiddleware)
)

for (let saga in sagas){

    sagaMiddleware.run(sagas[saga]);

}
