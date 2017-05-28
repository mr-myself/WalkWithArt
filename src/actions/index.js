import Global from '../global';

export function fetchArtWorksSuccess(data) {
    return { type: 'FETCH_ART_WORKS', data }
}

export function fetchAllPaintersSuccess(data) {
    return { type: 'FETCH_ALL_PAINTERS', data }
}

export function fetchRandomArtWorksSuccess(data) {
    return { type: 'FETCH_RANDOM_ART_WORKS', data }
}

export function fetchRandomPaintersSuccess(data) {
    return { type: 'FETCH_RANDOM_PAINTERS', data }
}

export function fetchAllArtWorksSuccess(data) {
    return { type: 'FETCH_ALL_ART_WORKS', data }
}

export function fetchRandomPainters() {
    return dispatch => {
        fetch(Global.BASE_URL + '/api/painters?rand=true')
        .then((response) => response.json())
        .then((responseJSON) => {
            dispatch(fetchRandomPaintersSuccess(responseJSON))
        })
        .catch((error) => {
            console.log(error)
        })
    }
}

export function fetchArtWorks(painter_id) {
    return dispatch => {
        fetch(Global.BASE_URL + '/api/painters/' + painter_id + '/art_works')
        .then((response) => response.json())
        .then((responseJSON) => {
            dispatch(fetchArtWorksSuccess(responseJSON))
        })
        .catch((error) => {
            console.log(error)
        })
    }
}

export function fetchRandomArtWorks() {
    return dispatch => {
        fetch(Global.BASE_URL + '/api/art_works?rand=true')
        .then((response) => response.json())
        .then((responseJSON) => {
            dispatch(fetchRandomArtWorksSuccess(responseJSON))
        })
        .catch((error) => {
            console.log(error)
        })
    }
}

export function fetchAllArtWorks() {
    return dispatch => {
        fetch(Global.BASE_URL + '/api/art_works')
        .then((response) => response.json())
        .then((responseJSON) => {
            dispatch(fetchAllArtWorksSuccess(responseJSON))
        })
        .catch((error) => {
            console.log(error)
        })
    }
}

export function fetchAllPainters() {
    return dispatch => {
        fetch(Global.BASE_URL + '/api/painters')
        .then((response) => response.json())
        .then((responseJSON) => {
            dispatch(fetchAllPaintersSuccess(responseJSON))
        })
        .catch((error) => {
            console.log(error)
        })
    }
}
