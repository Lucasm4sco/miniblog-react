import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styles from './Home.module.css';

const Home = () => {
  const [query, setQuery] = useState('');
  const [posts, setPosts] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
  }
  return (
    <div className={styles.home}>
      <h1>Veja os nossos posts mais recentes</h1>
      <form className={styles.search_form}>
        <input 
          type="text" 
          placeholder='Ou busque por tags...' 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className='btn btn-dark'>Pesquisar</button>
      </form>
      <div>
        {!posts.length && (
          <div className={styles.noposts}>
            <p>Ainda não existem post</p>
            <Link to='/posts/create'  className='btn'>Criar primeiro post</Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default Home