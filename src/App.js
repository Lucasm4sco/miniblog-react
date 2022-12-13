import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthentication } from './hooks/useAuthentication';
import { AuthProvider } from './context/AuthContext';
import { onAuthStateChanged } from 'firebase/auth';
import './App.css';

import Home from './pages/Home/Home';
import About from './pages/About/About';
import Search from './pages/Search/Search';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Dashboard from './pages/Dashboard/Dashboard';
import CreatePost from './pages/CreatePost/CreatePost';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Post from './pages/Post/Post';
import EditPost from './pages/EditPost/EditPost';


const App = () => {

  const [user, setUser] = useState(undefined);
  const { auth } = useAuthentication();

  const loadingUser = user === undefined;

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    })
  }, [auth]);

  if(loadingUser) {
    return <p>Carregando...</p>
  }

  return (
    <div className='App'>
      <AuthProvider value={{ user }}>
        <BrowserRouter>
          <Navbar />
          <div className='container'>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/about' element={<About />} />
              <Route path='/search' element={<Search />} />
              <Route path='/posts/:id' element={<Post />} />
              <Route 
                path='/login' 
                element={user ? <Navigate to='/'/> : <Login />} 
              />
              <Route 
                path='/register' 
                element={user ? <Navigate to='/' /> : <Register />} 
              />
              <Route 
                path='/posts/create' 
                element={!user? <Navigate to='/login' /> : <CreatePost />} 
              />
              <Route 
                path='/posts/edit/:id' 
                element={!user? <Navigate to='/login' /> : <EditPost />} 
              />
              <Route 
                path='/dashboard' 
                element={!user? <Navigate to='/login' /> : <Dashboard />} 
              />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;