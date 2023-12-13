import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Crud() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    async function fetchArticles() {
      try {
        const response = await axios.get('http://localhost:4000/articles');
        setArticles(response.data);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    }

    fetchArticles();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/articles/${id}`);
      setArticles((prevArticles) => prevArticles.filter((article) => article.id !== id));
    } catch (error) {
      console.error('Error deleting article:', error);
    }
  };

  return (
    <div>
      <h1>All Articles</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Body</th>
            <th>Category</th>
            <th>Author</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {articles.map((article) => (
            <tr key={article.id}>
              <td>{article.id}</td>
              <td>{article.title}</td>
              <td>{article.body}</td>
              <td>{article.category}</td>
              <td>{article.author}</td>
              <td>
                <Link to={`/article/${article.id}`}>View</Link>
                {' | '}
                <Link to={`/edit/${article.id}`}>Edit</Link>
                {' | '}
                <button onClick={() => handleDelete(article.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Crud;

