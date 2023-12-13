import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function SingleArticle() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    async function fetchArticle() {
      try {
        const response = await axios.get(
          `http://localhost:4000/articles/${id}`
        );
        setArticle(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchArticle();
  }, [id]);

  if (!article) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <img alt="" src={`http://localhost:4000/images/${article.image}`} />
      <h2>{article.title}</h2>
      <p>{article.body}</p>
      <p>{article.category}</p>
      <p>{article.author}</p>
    </div>
  );
}

export default SingleArticle;
