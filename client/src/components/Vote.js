import { Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import axios from "axios"
import { InjectedConnector } from '@web3-react/injected-connector';
import { useWeb3React } from '@web3-react/core';
import { ethers } from "ethers"
import {Img1, Img2, Img3, Img4, Img5, Img6} from './img'
import Card from 'react-bootstrap/Card'
import CardGroup from 'react-bootstrap/CardGroup'
import { useNavigate } from 'react-router-dom';
import voteAbi from "./VoteContract.json"
import { useDispatch, useSelector } from 'react-redux';



function Vote() {

  
  
  const eth = new ethers.providers.Web3Provider(window.ethereum)

  const injected = new InjectedConnector();

  console.log(voteAbi.abi)
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

    const callApi = async () => {
      
    }
  }

  const submitHandler = async (e) => {
    e.preventDefault();

    await eth.send("eth_requestAccounts", []);
    
    const signer = eth.getSigner();

    const signAddress = await signer.getAddress()
    console.log(eth.blockNumber)
    console.log(signAddress)
    // const tx = signer.sendTransaction({
    //   to: "0xC60B2D429908765bc5183AA6f88b35Ff39311ffa",
    //   value: ethers.utils.parseEther("1.0")
    // });
    
    const voteaddress = "0xb8f41b53455ae226c03543320a59bab227f0e708";
    const voteContract = new ethers.Contract(voteaddress,voteAbi.abi,eth);
    const response = await voteContract.checkCandidiates()
    console.log(response)
    const voteSigner = voteContract.connect(signer);
    const dai = ethers.utils.parseUnits("0.01", 18);
    let result = await voteSigner.runningForCandidates({from : signAddress, value: dai})
    console.log(result)
    console.log((await eth.getBalance("0x9f1c6b2f78D504107c496aF83E5f2f2140e7b5d3")).toString())
    // const {data} = await axios.post("http://localhost:3500/vote",{vote})
    // console.log(data)
  }

  const changeHandler = (e) => {
    console.log(e.target.value)
    setVote(e.target.value)
  }

  // login 웹3 로 메타마스크 연결


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

  //----------------------------------------------------------------------------------------------
  const dispatch = useDispatch()
  let winner = useSelector(state=> state.winner)

  const clickH = () => {
    dispatch({type:"GET_VOTELIST_REQUEST", payload : {winner :"서기이~"}})
  }

  console.log(winner)

  // 클릭 시 값을 넘겨줘야함.
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
        <button onClick={click}>{!clickState ? "등록하기" : "추가하기"}</button>
        </div>
    </div>

      <button onClick={onClick}>{!active ? "메타마스크 연결" : "연결 끊기"}</button>

    </div>
  )
}

export default Vote