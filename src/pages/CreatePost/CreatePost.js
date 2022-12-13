import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom';
import { useAuthValue } from "../../context/AuthContext";
import { useInsertDocument } from "../../hooks/useInsertDocuments";
import styles from './CreatePost.module.css';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [body, setBody] = useState('');
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState('');

  const navigate = useNavigate();

  const { insertDocument, response } = useInsertDocument('posts');
  const {user} = useAuthValue();

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError('');

    try {
      new URL(image);
    } catch (error) {
      setFormError('A imagem precisa ser uma URL válida.')
    }

    const tagsArray = tags.split(',').map(tag => tag.trim().toLowerCase());

    if(!title || !image || !tags || !body) {
      setFormError('Por favor, preencha todos os campos.')
    }

    if(formError)
      return

    insertDocument({
      title,
      image,
      body,
      tagsArray,
      uid: user.uid,
      createdBy: user.displayName
    });

    navigate('/');
  }

  useEffect(() => {
    if(response.error){
      setFormError(response.error);
    }
  }, [response.error])

  return (
    <div className={styles.createPost}>
      <h1>Criar post</h1>
      <p>Escreva sobre o que quiser e compartilhe o seu conhecimento!</p>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Título: </span>
          <input 
            type="text" 
            name="title" 
            required 
            placeholder="Pense em um  bom título..." 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label>
          <span>URL da imagem: </span>
          <input 
            type="text" 
            name="image" 
            required 
            placeholder="Insira uma image que representa o seu post" 
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </label>
        <label>
          <span>Conteúdo: </span>
          <textarea
            type="text" 
            name="body" 
            required 
            placeholder="Conteúdo do seu post" 
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        </label>
        <label>
          <span>Tags: </span>
          <input 
            type="text" 
            name="tags" 
            required 
            placeholder="Insira as tags separadas por vírgula" 
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </label>
        <button className='btn' disabled={response.loading}>
          {response.loading? 'Aguarde...' : 'Postar'}
        </button>
        {formError && <p className='error'>{formError}</p>}
      </form>
      
    </div>
  )
}

export default CreatePost