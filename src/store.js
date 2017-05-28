import { createStore, applyMiddleware, compose } from 'redux';
import reducer from './reducers';
import thunkMiddleware from 'redux-thunk';
import loggerMiddleware from 'redux-logger';

export default function configureStore(initialState) {
    const enhancer = compose(
        applyMiddleware(
            thunkMiddleware, // lets us dispatch() functions
            loggerMiddleware,
        ),
    );
    return createStore(reducer, initialState, enhancer);
}
