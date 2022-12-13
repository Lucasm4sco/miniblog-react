import { useState } from 'react';
import { Link, useNavigate} from 'react-router-dom';
import { useFetchDocuments } from '../../hooks/useFetchDocuments';
import { useQuery } from '../../hooks/useQuery';
import styles from './Search.module.css';

import PostDetail from '../../components/PostDetail/PostDetail';

const Search = () => {
    const query = useQuery();
    const search = query.get('q');

    const {documents: posts} = useFetchDocuments('posts', search);

    const [newQuery, setNewQuery] = useState(search);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (newQuery) {
            navigate(`/search?q=${newQuery}`);
        }
    }

    return (
        <div className={styles.search_container}>
            <h1>Search</h1>
            <form className={styles.search_form} onSubmit={handleSubmit}>
                <input 
                type="text" 
                placeholder='Ou busque por tags...' 
                value={newQuery}
                onChange={(e) => setNewQuery(e.target.value)}
                />
                <button className='btn btn-dark'>Pesquisar</button>
            </form>
            <div className={styles.result}>
                {posts && posts.length === 0 && (
                    <>
                        <p>Não foram encontrados posts a partir da sua busca...</p>
                        <Link to='/' className="btn btn-dark">Voltar</Link>
                    </>
                )}
                {posts && posts.map((post) => (
                    <PostDetail post={post} key={post.id}/>
                ))}
            </div>
        </div>
    )
}

export default Search