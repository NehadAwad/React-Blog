import {useState} from "react";
import {useHistory} from "react-router-dom";

const Create = () => {
    const [title, setTitle] = useState('');
    const [body, setbody] = useState('');
    const [author, setauthor] = useState('');
    const [isPending, setIsPending] = useState(false);
    const history = useHistory();
    const handleSubmit = (e) => {
        e.preventDefault()
        const blog = { title, body, author}
        setIsPending(true)
        fetch('http://localhost:8000/blogs', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(blog)
        }).then(() => {
            console.log('new blog added')
            setIsPending(false)
            history.push('/')
        })
    }
    return (
    <div className="create">
      <h2>Add a New Blog</h2>
        <form onSubmit={handleSubmit}>
            <label>Blog title:</label>
            <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <label>Blog body:</label>
            <textarea
            value={body}
            onChange={(e) => setbody(e.target.value)}
            required>
            </textarea>
            <label>Blog author:</label>
            <select
            value={author}
            onChange={(e)=> setauthor(e.target.value)}>
                <option value="mario">mario</option>
                <option value="yoshi">yoshi</option>
            </select>
            { !isPending && <button>Add Blog</button>}
            { isPending && <button>Adding Blog...</button>}

        </form>
    </div>
  );
}
 
export default Create;