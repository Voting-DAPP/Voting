import { Form } from 'react-bootstrap';
import { useState } from 'react';
import axios from "axios"
import { InjectedConnector } from '@web3-react/injected-connector';
import { useWeb3React } from '@web3-react/core';

const Vote = () => {

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
    // const {data} = await axios.post("http://localhost:3500/vote",{vote})
    // console.log(data)
  }

  const changeHandler = (e) => {
    console.log(e.target.value)
    setVote(e.target.value)
  }

  return (
    <div>
      <Form
        onSubmit={submitHandler}
      >
        
          <div key={`inline-radio`} className="mb-3">
            <Form.Check
              inline
              label="서기영"
              value="0"
              name="group1"
              type="radio"
              id={`inline-radio-1`}
              onChange={changeHandler}
            />
            <Form.Check
              inline
              label="서기일"
              value="1"
              name="group1"
              type="radio"
              id={`inline-radio-2`}
              onChange={changeHandler}
            />
            <Form.Check
              inline
              value="2"
              label="서기이"
              name="group1"
              type="radio"
              id={`inline-radio-3`}
              onChange={changeHandler}
            />
          </div>
        
        <button type='submit'>제출</button>
      </Form>
      <button onClick={onClick}>메타마스크 연결</button>
    
    </div>
  )
}

export default Vote