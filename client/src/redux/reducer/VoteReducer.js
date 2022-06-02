let initialState = {
    VoteList : {},
    winner: "",
}


function VoteReducer (state=initialState, action) {
    let {type,payload} = action
    console.log(" acion 동작 ",action)

    switch (type) {
        case "GET_VOTELIST_REQUEST":
            console.log('hi')
            return {...state,
                // VoteList: action.payload.VoteList,
                winner: payload.winner,
            }
            
        default:
            return {...state}
    }
}

export default VoteReducer;