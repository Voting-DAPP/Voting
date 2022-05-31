import { Form } from 'react-bootstrap';
import { useState } from 'react';
import axios from "axios"
import { InjectedConnector } from '@web3-react/injected-connector';
import { useWeb3React } from '@web3-react/core';
import { ethers } from "ethers"
import {Img1, Img2, Img3, Img4, Img5, Img6} from './img'
import Card from 'react-bootstrap/Card'
import CardGroup from 'react-bootstrap/CardGroup'
import { useNavigate } from 'react-router-dom';




function Vote() {
  const eth = new ethers.providers.JsonRpcProvider("http://localhost:8001")
  const injected = new InjectedConnector();

  const {
    chainId,
    account,
    active,
    activate,
    deactivate
  } = useWeb3React();


  const [vote, setVote] = useState(0)

  const onClick = async () => {
    if (active) {
      deactivate();
      return;
    }
    activate(injected, (err) => {
      if ('/No Ethereum provider was found on window.ethereum/'.test(err)) {
        window.open('https://metamask.io/download.html');
      }
    });
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(eth.blockNumber)
    console.log((await eth.getBalance("0x9f1c6b2f78D504107c496aF83E5f2f2140e7b5d3")).toString())
    // const {data} = await axios.post("http://localhost:3500/vote",{vote})
    // console.log(data)
  }

  const changeHandler = (e) => {
    console.log(e.target.value)
    setVote(e.target.value)
  }



  let voteList = [{
      id: "서기영",
      description: 'react,',
      popular: "후보0",
      img: Img1
  }, {
      id: "서기일",
      description: 'nodejs',
      popular: "후보1",
      img: Img2
  },{
      id: "서기이",
      description: 'javascript',
      popular: "후보2",
      img: Img3
  }];

  const [voteValue, setVoteValue] = useState(voteList);
  const [clickState, setClickState] = useState(false);
  const [addVoteId, setAddVoteId] = useState("");
  const [addVoteDe, setAddVoteDe] = useState("");
  const [addVoteP, setAddVoteP] = useState("");
  
  const navigate = useNavigate()


  const voteClick = (vote) => {
      console.log(vote)
      navigate('/admin')
  }

  const divCard = (vote, index) => {

      return (
          <div key={index}>
          <CardGroup onClick={() => voteClick(vote)} >
              <Card  className='Card'>
                  <Card.Img variant="top" src={vote.img} />
                  <Card.Body>
                  <Card.Title>{vote.id}</Card.Title>
                  <Card.Text>
                      {vote.description}
                  </Card.Text>
                  </Card.Body>
                  <Card.Footer>
                  <small className="text-muted">{vote.popular}</small>
                  </Card.Footer>
              </Card>
          </CardGroup >
          </div>
      )
  }

  // 상태 바꿔주는 함수
  const click =() => {
      if (!clickState) setClickState(!clickState)
      else {
          if(addVoteId == "" || addVoteDe == "" || addVoteP == ""){
              alert("없다")
          } else {
              // array.concat(array1)
              // array = [1,2], array1 = [2,3,4]
              // [1,2,2,3,4];
              // 배열과 배열을 함칠때 
              setVoteValue(voteValue.concat([{id: addVoteId, description: addVoteDe, popular: addVoteP ,img : Img4}]));
              setClickState(!clickState)
              setAddVoteId("")
              setAddVoteDe("")
              setAddVoteP("")
          }
      }
  }

  return (
    <div className="App">
      <Form
        onSubmit={submitHandler}
      >

        <div key={`inline-radio`} className="mb-3">
          <Form.Check
            inline
            label="1"
            value="1"
            name="group1"
            type="radio"
            id={`inline-radio-1`}
            onChange={changeHandler}
          />
          <Form.Check
            inline
            label="2"
            value="2"
            name="group1"
            type="radio"
            id={`inline-radio-2`}
            onChange={changeHandler}
          />
          <Form.Check
            inline
            value="3"
            label="3"
            name="group1"
            type="radio"
            id={`inline-radio-3`}
            onChange={changeHandler}
          />
        </div>
        <div>chainId:{chainId} account : {account}</div>
        <button type='submit'>제출</button>
      </Form>

      <div className="voteTitle" >
        <h2>!@ 조장 뽑기 @! </h2>
        <div className="VoteMap">
            {
                voteValue.map((item,index) => { 
                    return divCard(item, index)
                })
            }
        </div>
        <div className='form'>
        {clickState &&
        <div className='form-input-box'>
            <input placeholder='id' value={addVoteId} onChange={(e)=>setAddVoteId(e.target.value) }/>
            <input placeholder='description' value={addVoteDe} onChange={(e)=>setAddVoteDe(e.target.value)} />
            <input type='numver' placeholder='후보'  value={addVoteP} onChange={(e) => setAddVoteP(e.target.value)} />
        </div>
        }
        <button onClick={()=>click()}>{!clickState ? "등록하기" : "추가하기"}</button>
        </div>
    </div>

      <button onClick={onClick}>{!active ? "메타마스크 연결" : "연결 끊기"}</button>

    </div>
  )
}

export default Vote