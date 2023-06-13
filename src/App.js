import './App.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

//Components
import Navbar from './components/Navbar'
import Login from './pages/login/Login'
import Signup from './pages/signup/Signup'
import Create from './pages/create/Create.js'
import Dashboard from './pages/dashboard/Dashboard'
import Project from './pages/project/Project'

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Navbar />
				<Routes>
					<Route path='/' element={<Login />} />
					<Route path='/signup' element={<Signup />} />
					<Route path='/dashboard' element={<Dashboard />} />
					<Route path='/create' element={<Create />} />
					<Route path='/project/:id' element={<Project />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
