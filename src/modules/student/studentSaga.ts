import { PayloadAction } from '@reduxjs/toolkit';
import studentApi from 'api/studentApi';
import { ListParams, ListResponse, Student } from 'models';
import { all, call, debounce, delay, fork, put, take, takeLatest } from 'redux-saga/effects';
import { studentActions } from './studentSlice';

function* fetchStudentList(action: PayloadAction<ListParams>) {
  try {
    const response: ListResponse<Student> = yield call(studentApi.getAll, action.payload);
    yield put(studentActions.fetchStudentListSuccess(response));
  } catch (error) {
    console.log('Failed to fetch student list', error);
    yield put(studentActions.fetchStudentListFailed());
  }
}

function* watchFetchStudentList() {
  while(true) {
    const action = yield take(studentActions.fetchStudentList.type);
    try {
      const response: ListResponse<Student> = yield call(studentApi.getAll, action.payload);
      yield put(studentActions.fetchStudentListSuccess(response));
    } catch (error) {
      console.log('Failed to fetch student list', error);
      yield put(studentActions.fetchStudentListFailed());
    }
  }
} 

function* handleSearchDebounce(action: PayloadAction<ListParams>) {
  yield put(studentActions.setFilter(action.payload));
}

function* handleFilterWithDelay(action: PayloadAction<ListParams>) {
  yield delay(5000);
  yield put(studentActions.fetchStudentList(action.payload))
}

export default function* studentSaga() {
    yield takeLatest(studentActions.fetchStudentList.type, fetchStudentList);
    yield fork(watchFetchStudentList);
    yield takeLatest(studentActions.setFilterWithDebounce.type, handleFilterWithDelay);
    yield debounce(5000, studentActions.setFilterWithDebounce.type, handleSearchDebounce);
}
