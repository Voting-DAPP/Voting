import { Form } from 'react-bootstrap';
import { useState } from 'react';
import axios from "axios"
import { InjectedConnector } from '@web3-react/injected-connector';
import { useWeb3React } from '@web3-react/core';
import { ethers } from "ethers"

function Vote() {
  const eth = new ethers.providers.JsonRpcProvider("http://3.38.193.25:8001")
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
      <button onClick={onClick}>{!active ? "메타마스크 연결" : "연결 끊기"}</button>

    </div>
  )
}

export default Vote