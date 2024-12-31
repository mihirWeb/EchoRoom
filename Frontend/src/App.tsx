import { useEffect, useRef, useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [socket, setSocket] = useState();
  const inputRef = useRef();

  const sendMsg = () => {
    socket.send(inputRef.current.value);
    inputRef.current.value = '';
  }

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');
    setSocket(ws);

    ws.onopen = () => {
      console.log('Connected to server');
    }

    ws.onmessage = (msg) => {
      alert(msg.data);
    }
    
  }, []);

  return (
    <div>
      <input ref={inputRef} type="text" placeholder='write your message here...' />
      <button onClick={sendMsg}>Send</button>
    </div>
  )
}

export default App
