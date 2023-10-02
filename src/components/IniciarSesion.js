import React, { useState, useEffect } from 'react';
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import appFirebase from '../credenciales';

const IniciarSesion = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const auth = getAuth(appFirebase);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setLoginSuccess(true);
      } else {
        setUser(null);
        setLoginSuccess(false);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  const handleLogin = async () => {
    try {
      if (!email || !password) {
        setErrorMessage('Por favor, completa todos los campos y presiona "Iniciar Sesión" para registrarte.');
        return;
      }

      if (!validateEmail(email)) {
        setErrorMessage('El correo electrónico no es válido. Debe ser una dirección de correo válida.');
        return;
      }

      if (password.length < 6) {
        setErrorMessage('La contraseña debe contener al menos 6 caracteres.');
        return;
      }

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      setUser(user);
      setLoginSuccess(true);
      setErrorMessage(''); // Restablece el mensaje de error
      console.log('Inicio de sesión exitoso. Usuario conectado:', user);
    } catch (error) {
      console.error('Error al iniciar sesión:', error);

      if (error.code === 'auth/user-not-found') {
        setErrorMessage('Ups, al parecer primero debes registrarte');
      } else if (error.code === 'auth/wrong-password') {
        setErrorMessage('Ingresaste mal tu contraseña');
      } else if (error.code === 'auth/invalid-email') {
        setErrorMessage('El Email debe ser una dirección de correo válida.');
      } else if (error.code === 'auth/invalid-login-credentials') {
        setErrorMessage('Ups, al parecer primero debes registrarte');
      } else {
        setErrorMessage(error.message);
      }

      setLoginSuccess(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setLoginSuccess(false);
      console.log('Usuario desconectado');
    } catch (error) {
      console.error('Error al desconectar:', error);
    }
  };

  const validateEmail = (email) => {
    const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return emailPattern.test(email);
  };

  return (
    <div className="container-fluid">
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h2 className="card-title text-center mb-4">Iniciar Sesión</h2>
                {loginSuccess ? (
                  <div>
                    <p className="text-center">¡Inicio de sesión exitoso!</p>
                    <p className="text-center">¡Estás conectado con el usuario: {user.email}!</p>
                    <div className="text-center">
                      <button className="btn btn-danger btn-block" onClick={handleLogout}>Cerrar Sesión</button>
                    </div>
                  </div>
                ) : (
                  <div>
                    {errorMessage && (
                      <p className="text-danger text-center">{errorMessage}</p>
                    )}
                    <div className="mb-3">
                      <label htmlFor="email">Correo electrónico:</label>
                      <input
                        type="email"
                        id="email"
                        className="form-control"
                        placeholder="Correo electrónico"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="password">Contraseña:</label>
                      <input
                        type="password"
                        id="password"
                        className="form-control"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <div className="text-center">
                      <button className="btn btn-primary" onClick={handleLogin}>Iniciar Sesión</button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IniciarSesion;
