import {take,put,select} from 'redux-saga/effects'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid';
import {history} from "./history";
import * as mutations from './mutations'
import {logger} from "redux-logger/src";

const url = process.env.NODE_ENV == "production" ? "" : "http://localhost:5000"

export function* taskCreationSaga() {

    while (true) {
        const {groupID} = yield take(mutations.REQUEST_TASK_CREATION)
        const ownerID =`U1`
        const taskID = uuidv4()
        yield put(mutations.createTask(taskID,groupID,ownerID))
        const {res} = yield axios.post(url + '/task/new',{
            task:{
                id:taskID,
                group:groupID,
                owner:ownerID,
                isComplete: false,
                name: "New task"
            }
        });
    }
}

export function* taskModificationSaga() {
    while (true){
        const task = yield take([mutations.SET_TASK_GROUP,mutations.SET_TASK_NAME,mutations.SET_TASK_COMPLETE])
        axios.post(url + '/task/update',{
            task:{
                id :task.taskID,
                group:task.groupID,
                owner:task.ownerID,
                isComplete:task.isComplete,
                name:task.name
            }
        })
    }
}

export function* userAuthenticationSaga() {
    while (true) {
        const {username , password} = yield take(mutations.REQUEST_AUTHENTICATE_USER)
        try{
            console.log(username,password)
            const data =  yield axios.post(url + '/authenticate' , {username,password})

            if (!data) {
                throw new Error()
            }

            console.log('Authenticated !' , data)
            yield put(mutations.setState(data.state))
            yield put(mutations.processAuthenticateUser(mutations.AUTHENTICATED))
            history.push('/dashboard')
        }catch (e) {
            console.log("Can't authenticate")
            yield put(mutations.processAuthenticateUser(mutations.NOT_AUTHENTICATED))
        }

    }
}