import {all,fork} from 'redux-saga/effects'
import * as counterSagas from './counter'
import * as userSagas from './user'
import * as autoSagas from './auto'
//=================================export all saga===================================================================
//将watch的进程导出去
export default function* rootSaga() {
    // all([]) 并发执行
    /*yield all([
        watchIncrementAsync(),watchFetchUserAsync() ,watchFetchTodosAsync()
    ])*/
    yield all([
       /* ...Object.values(counterSagas),
        ...Object.values(userSagas),*/
        ...Object.values(autoSagas)
    ].map(fork))
}