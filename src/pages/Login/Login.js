import { useState, useEffect } from 'react';
import { useAuthentication } from '../../hooks/useAuthentication';
import styles from './Login.module.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { loading, error: authError, login } = useAuthentication();

  const handleSubmit = async(e) => {
    e.preventDefault()

    setError('');

    const user = {
        email, 
        password
    }
    
    const response = await login(user);
  } 

  useEffect(() => {
      if(authError){
          setError(authError);
      }
  }, [authError]);

  return (
    <div className={styles.login}>
      <h1>Login</h1>
        <p>Faça login para compartilhar seus posts</p>
        <form onSubmit={handleSubmit}>
            <label>
                <span>Email:</span>
                <input 
                    type="email" 
                    name='email'
                    required
                    placeholder='Digite seu e-mail'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    />
            </label>
            <label>
                <span>Senha:</span>
                <input 
                    type="new-password" 
                    name="password" 
                    required
                    placeholder='Digite sua senha'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
            </label>
            <button className='btn' disabled={loading}>
                {loading? 'Aguarde...' : 'Entrar'}
            </button>
            {error && <p className='error'>{error}</p>}
        </form>
    </div>
  )
}

export default Login