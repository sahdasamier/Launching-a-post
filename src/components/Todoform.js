import React, { useMemo } from 'react'
import TodoItems from './TodoItems'
import { useSelector } from 'react-redux'

const TodoForm = ({ searchQuery = '' }) => {
  const toposts = useSelector((state) => state.toposts);
  
  // Filter and sort posts based on search query
  const filteredPosts = useMemo(() => {
    let posts = [...toposts]; // Create a copy to avoid mutating the original array
    
    // Sort posts by creation date (newest first)
    posts.sort((a, b) => {
      const dateA = a.createdAt || 0;
      const dateB = b.createdAt || 0;
      return dateB - dateA; // Descending order (newest first)
    });
    
    // Filter by search query if provided
    if (!searchQuery.trim()) {
      return posts;
    }
    
    const query = searchQuery.toLowerCase();
    return posts.filter(post => 
      post.title.toLowerCase().includes(query) ||
      post.body.toLowerCase().includes(query) ||
      (post.author && post.author.toLowerCase().includes(query))
    );
  }, [toposts, searchQuery]);
  
  return (
    <div>
      {searchQuery && (
        <div className="search-results-info">
          <p className="search-info">
            {filteredPosts.length === 0 
              ? `No stories found for "${searchQuery}"` 
              : `Found ${filteredPosts.length} ${filteredPosts.length === 1 ? 'story' : 'stories'} for "${searchQuery}"`
            }
          </p>
        </div>
      )}
      {filteredPosts.map((topost) => (
        <TodoItems
          key={topost.id}
          id={topost.id}
          title={topost.title}
          body={topost.body}
          like={topost.like}
          image={topost.image}
          liked={topost.liked}
          likeCount={topost.likeCount}
          comments={topost.comments}
          createdAt={topost.createdAt}
          author={topost.author}
        />
      ))};
    </div>
  )
}

export default TodoForm;
