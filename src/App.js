import React from 'react';
import './App.css';
import { Navbar } from './components/Navbar';
import Nosotros from './components/Nosotros';
import Registrarse from './components/Registrarse';// Importa el componente de la barra de navegación
import Home from './components/Home'; // Importa el componente de la página "Sobre Nosotros"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import IniciarSesion from './components/IniciarSesion';


function App() {

  

  return (
    <Router>
    <div className='back'>
      
    <Navbar />
    <Routes>
    <Route exact path='/' element={<Home/>}/>
    <Route path="/nosotros" element={<Nosotros/>} />
    <Route path="/registrarse" element={<Registrarse/>}/>
    <Route path="/iniciarsesion" element={<IniciarSesion/>}/>
    </Routes>
        
    
      


      

      

    </div>
    {/* esta seccion es para el pie de pagina */}

    <footer class="footer">
    <p>&copy; 2023 Tienda de Harry Potter</p>
    <p><a href="#">Inicio</a> | <a href="#">Productos</a> | <a href="#">Contacto</a></p>
    <p>Síguenos en <a href="#">Facebook</a> | <a href="#">Twitter</a> | <a href="#">Instagram</a></p>
    </footer>
    </Router>
    
  );
}

export default App;