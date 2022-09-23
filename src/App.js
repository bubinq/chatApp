import { Routes, Route } from 'react-router';
import './App.css';
import { ChatRoom } from './components/ChatRoom';
import { HomePage } from './components/HomePage'
import { RouteGuard } from './guards/RouteGuard,';

function App() {

    return (
        <div className="App">
            <Routes>
                <Route path='/' element={<HomePage />}></Route>

                <Route element={<RouteGuard />}>
                    <Route path='/chatroom/:chatroomId' element={<ChatRoom />}></Route>
                </Route>

            </Routes>
        </div>
    );
}

export default App;
