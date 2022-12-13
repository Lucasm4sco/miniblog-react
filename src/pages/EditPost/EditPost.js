import { useEffect, useState } from "react"
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthValue } from "../../context/AuthContext";
import { useUpadteDocument } from "../../hooks/useUpdateDocument";
import { useFetchDocument } from "../../hooks/useFetchDocument";
import styles from './EditPost.module.css';

const EditPost = () => {
    const { id } = useParams();
    const {document: post} = useFetchDocument('posts', id);

    const [title, setTitle] = useState('');
    const [image, setImage] = useState('');
    const [body, setBody] = useState('');
    const [tags, setTags] = useState([]);
    const [formError, setFormError] = useState('');

    useEffect(() => {
        if(!post) return
        setTitle(post.title);
        setBody(post.body);
        setImage(post.image);

        const textTags = post.tagsArray.join(', ');
        setTags(textTags);
    }, [post])

    const navigate = useNavigate();

    const { updateDocument, response } = useUpadteDocument('posts');
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

        updateDocument(id, {
            title,
            image,
            body,
            tagsArray,
            uid: user.uid,
            createdBy: user.displayName
        });

        navigate('/dashboard');
    }

    useEffect(() => {
        if(response.error){
        setFormError(response.error);
        }
    }, [response.error])

    if(!post) {
        return <p>carregando...</p>
    }

    return (
        <div className={styles.editPost}>
            <h1>Editando post: {title}</h1>
            <p>Altere os dados do post como desejar</p>
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
                <p className={styles.preview_title}>Preview da imagem atual:</p>
                <img 
                    className={styles.image_preview} 
                    src={post.image} 
                    alt={post.title} 
                />
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

export default EditPost;