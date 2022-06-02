import React, { useState } from 'react'
import VoteResult from '../components/VoteResult'
import { useDispatch, useSelector } from 'react-redux';


const Admin = () => {

  const dispatch = useDispatch()
  const [result , setResult] = useState(false)

  let winner = useSelector(state=> state.winner)

  const click = (e) => {
    setResult(!result)
    dispatch({type:"GET_VOTELIST_REQUEST", payload : {winner :"서기이~"}})

  }

  return (
    <div>
      <button onClick={click}> 투표 마무리 할껴 ? </button>
      {
        result ?
        <p>winner : {winner}</p>
        :null
      }
    </div>
  )
}

export default Admin