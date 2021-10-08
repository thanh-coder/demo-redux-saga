
import studentSaga from 'modules/student/studentSaga';
import { all } from 'redux-saga/effects';
function* generateId() {
    yield 1;
    yield 2
    yield 3;
}
const newId  = generateId();
console.log(newId.next());// {value: 1, done: false}
console.log(newId.next());// {value: undefined, done: true}
console.log(newId.next());// {value: undefined, done: true}
export default function* rootSaga() {
  yield all([studentSaga()]);
}
