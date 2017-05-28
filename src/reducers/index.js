//import * as STEP from '../states';

export const initialState = {
    painters: [],
    art_works: [],
    art_works_today: []
}

export default function(state = initialState, action) {

    switch (action.type) {
        case 'FETCH_RANDOM_PAINTERS': {
            return Object.assign({}, state, {
                painters: action.data || [],
            });
        }

        case 'FETCH_ART_WORKS': {
            return Object.assign({}, state, {
                art_works: action.data || [],
            });
        }

        case 'FETCH_ALL_ART_WORKS': {
            return Object.assign({}, state, {
                all_art_works: action.data || [],
            });
        }

        case 'FETCH_ALL_PAINTERS': {
            return Object.assign({}, state, {
                all_painters: action.data || [],
            });
        }

        case 'FETCH_RANDOM_ART_WORKS': {
            return Object.assign({}, state, {
                art_works_today: action.data || [],
            });
        }
    }
}
