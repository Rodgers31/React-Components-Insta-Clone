/* 
  Start here and work your way down the nested components.
  Not all files in the project need code added.
  Look at each file to see what props need to be passed!
*/

// Import the state hook
import React from 'react';
import { useState } from 'react';
// Import the Posts (plural!) and SearchBar components, since they are used inside App component
import './components/Posts/Posts';
// Import the dummyData
import './dummy-data'
import './App.css';
import dummyData from './dummy-data';

const App = () => {
  // Create a state called `posts` to hold the array of post objects, **initializing to dummyData**.
  // This state is the source of truth for the data inside the app. You won't be needing dummyData anymore.
  // To make the search bar work (which is stretch) we'd need another state to hold the search term.
  const [posts, setposts] = useState(dummyData);
  const [search, setSearch] = useState("");
 

  const [search, setSearch] = useState('');

  const [text, setText] = useState('');

  const changeText = evt => {

    const { value } = evt.target;

    setText(value);

  };

  const submit = postId => {

    const map = posts.map((post) => {
      if (post.id === postId && text.length > 0) {
        post.comments.push({ id: post.comments[post.comments.length - 1].id + 1, username: userData.toLowerCase(), text });
        return post;
      }
      else {
        return post;
      }
    });

    setPosts(map);

  };

  const showComments = postId => {

    const map = posts.map((post) => {
      if (post.id === postId) {
        switch(post.show) {
          case (true): {
            post.show = false;
            return post;
          }
          default: {
            post.show = true;
            return post;
          }
        }
      }
      else {
        return post;
      }
    });

    setPosts(map);

  };

  const likePost = postId => {
    /*
      This function serves the purpose of increasing the number of likes by one, of the post with a given id.

      The state of the app lives at the top of the React tree, but it wouldn't be fair for nested components not to be able to change state!
      This function is passed down to nested components through props, allowing them to increase the number of likes of a given post.

      Invoke `setPosts` and pass as the new state the invocation of `posts.map`.
      The callback passed into `map` performs the following logic:
        - if the `id` of the post matches `postId`, return a new post object with the desired values (use the spread operator).
        - otherwise just return the post object unchanged.
     */
  };

  const map = posts.map((post) => {
    if (post.id === postId) {
      switch (post.liked) {
        case (true): {
          post.likes--;
          post.liked = false;
          return post;
        }
        default: {
          post.likes++;
          post.liked = true;
          return post;
        }
      }
    }
    else {
      return post;
    }

  });

  setPosts(map);

};

const searchPost = evt => {

  const { value } = evt.target;

  setSearch(value);

  const filter = dummyData.filter((post) => {

    if (value.length > 0) {
      if (post.username.includes(value)) {
        return post;
      }
    }
    else {
      return post;
    }

  });

  setPosts(filter);

};

return (
  <div className='App'>
    {/* Add SearchBar and Posts here to render them */}
    {SearchBar({ search, searchPost })}
    {Posts({ posts, likePost, showComments, submit, text, changeText })}
    {/* Check the implementation of each component, to see what props they require, if any! */}
  </div>
);
};

export default App;
