import './App.css';

import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import useAuthContext from './hooks/useAuthContext';

//Components
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Login from './pages/login/Login'
import Signup from './pages/signup/Signup'
import Create from './pages/create/Create.js'
import Dashboard from './pages/dashboard/Dashboard'
import Project from './pages/project/Project'

function App() {
	const { user, authIsReady } = useAuthContext()
	return (
		<div className="App">
			{authIsReady && (
				<BrowserRouter>
				<Routes>
					<Route path="*" element={
					<div className="container">
						<Navbar />
						<Routes>
							<Route path="/" element={user ? <Dashboard /> : <Navigate to="/login" />} />
							<Route path="/create" element={user ? <Create /> : <Navigate to="/login" />} />
							<Route path="/projects/:id" element={user ? <Project /> : <Navigate to="/login" />} />
							<Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
							<Route path="/signup" element={user && user.displayName ? <Navigate to="/" /> : <Signup />} />
							<Route path="*" element={user ? <Dashboard /> : <Navigate to="/login" />} />
						</Routes>
					</div>} />
				</Routes>
				x
				</BrowserRouter>
			)}
		</div>
	);
}

export default App;
