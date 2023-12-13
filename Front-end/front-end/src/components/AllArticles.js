import React, { useEffect , useState } from 'react'
import axios from "axios";
import { Link } from 'react-router-dom';

function AllArticles() {  

  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

async function fetchArticles() {
  try {
    const response = await axios.get(
      'http://localhost:4000/articles'
    );
    console.log(response.data);
    setArticles(response.data)
  } catch (error) {
    console.error(error);
  }
  finally {
    setIsLoading(false);
  }
}

useEffect(()=>{
  fetchArticles()
},[])

  return (
    <div>
      <h1>All Articles</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul style={{ display: 'flex',flexWrap: "wrap", columnGap: '20px', cursor: 'pointer' }}>
          {articles.map((article) => (
            <li key={article.id} style={{ margin: '0 auto', textAlign: 'center' }}>
              <Link to={`/article/${article.id}`}>
                <img alt='' src={`http://localhost:4000/images/${article.image}`} />
                <h2>{article.title}</h2>
                <p>{article.body}</p>
                <p>{article.category}</p>
                <p>{article.author}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default AllArticles
