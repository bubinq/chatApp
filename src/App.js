import { Routes, Route } from 'react-router';
import './App.css';
import { ChatRoom } from './components/ChatRoom';
import { HomePage } from './components/HomePage'

function App() {

    return (
        <div className="App">
            <Routes>
                <Route path='/' element={<HomePage />}></Route>
                <Route path='/chatroom/:chatroomId' element={<ChatRoom />}></Route>
            </Routes>
        </div>
    );
}

export default App;
