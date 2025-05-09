import { useState } from 'react'
import { useEffect } from 'react'
import './App.css'
import Button from './components/button/Button'
import messageIcon from './components/button/images/message.svg'
import arrowIcon from './components/button/images/arrow-right.svg'
import microIcon from './components/button/images/micro.svg'
import '@fontsource/roboto';
import '@fontsource/roboto/300.css'; 
import '@fontsource/roboto/400.css'; 
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css'; 
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';



function App() {
  
  const [message, setMessage] = useState('')
  const [reply, setReply]     = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState(null)
  useEffect(() => {    
  }, [error]);


  const sendMessage = async () => {
    if (!message.trim()) {setError('Не введен текст запроса');  return};
    setLoading(true)
    setError(null); 
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message })
      })
      if (!res.ok) { throw new Error(`Ошибка ${res.status}`); }
      const data = await res.json()
      setReply(data.reply)
    } catch (err) {
      setError(err.message)
      console.log(error)

    } finally {
      setLoading(false);
      setMessage('');
      resetTranscript();
    }
  }




  function handleKeyDown(event)  {
    if (event.key === 'Enter') {
      sendMessage();      
    }
  }

  const {
    transcript,    // распознанный текст
    listening,     // true, если идёт запись
    resetTranscript, // сбросить текст
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  const [listenSpeach, setListenSpeach] = useState(false)

  useEffect(() => {    
  }, [listenSpeach]);




  const VoiceToText = ()=>{
    if (!browserSupportsSpeechRecognition) {
      return <p>Браузер не поддерживает Speech Recognition.</p>;
    }  else {()=>setTextResult(transcript)}
  
  }



  return (
    <div className='app'>
      <div className="top">
        <Button imgSource={messageIcon} classList='btn message-btn'/>
        <h1>Hi there!</h1>
      </div>
      <div className="app-content">
        <div className="content-title">
          <h2>What would you like to know?</h2>
          {reply?null:<p>Use one of the ost common props to bellow or ask your own question</p>}
          
        </div>
        <div className="answer-block">
          <div className='answer-text'>
            {loading?
                <div className="loaderBlockModal">
                  <div className="loaderProgress"></div>
                </div>
            :reply}
          </div>
          <div className="inputBlock">
            <input 
              placeholder='Ask whatever you want'
              value={transcript?transcript:message}  
              onChange={e => {setMessage(e.target.value); setError(null); resetTranscript();}}
              onKeyDown={e=>{handleKeyDown(e); } }
            />
            {listenSpeach?<p className='listening-text'>Listening...</p>:null}
            {error?<p className='error-text'>{error}</p>:null}


            <Button 
              imgSource={microIcon}
              classList='micro-btn'
              onMouseDown={()=>{SpeechRecognition.startListening(); console.log('Зажата кнопка'); setListenSpeach(true) }}
              onMouseUp = {()=>{SpeechRecognition.stopListening(); setMessage(transcript); setListenSpeach(false)}}
              onMouseLeave={()=>{SpeechRecognition.stopListening();  setMessage(transcript); setListenSpeach(false)}}
              onTouchStart={()=>{SpeechRecognition.startListening();  setListenSpeach(true) }}
              onTouchEnd={()=>{SpeechRecognition.stopListening(); setListenSpeach(false); setMessage(transcript) }}
            />
            <Button 
              imgSource={arrowIcon} classList='submit-btn' 
              onClick={sendMessage}/>
          </div>
        </div>
      </div>
    </div>
  )



}

export default App
