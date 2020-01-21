import { useState } from 'react';

function useUpvote(number, upvoteState) {
  const [upvotes_number, setUpvotes_number] = useState(number);
  const [upvotedColor, setUpvotedColor] = useState(upvoteState ? '#1890ff' : '#BBB');
  const [upvoted, setUpvoted] = useState(upvoteState);

  function updateUpvote() {
    // subtract if already upvoted
    if (upvoted) {
      setUpvotes_number(prev => prev - 1);
      setUpvotedColor('#BBB');
      setUpvoted(false);
    }
    else {
      setUpvotes_number(prev => prev + 1);
      setUpvotedColor('#1890ff');
      setUpvoted(true);
    }
  }

  return [upvotes_number, upvotedColor, updateUpvote];
}

export default useUpvote;