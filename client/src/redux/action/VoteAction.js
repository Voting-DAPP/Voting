
function getVote () {

    return async(dispatch) => {
        try {
            // 데이터 넣어주기 , 비동기 는 api
            data = await // 값 넣어주기
            dispatch({
                type: "GET_VOTELIST_REQUEST",
                payload: {
                    data
                }
            });

        }catch (e) {
            dispatch({type: "GET_VOTE_FAILURE"});
        }
    }
}

export const VoteAction = {getVote}

// action 은 middleware 필요없다 비동기 작업이 아니라면....