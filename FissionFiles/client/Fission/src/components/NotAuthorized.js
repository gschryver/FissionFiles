import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NotAuthorized = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(3); // initial countdown value

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(prevCountdown => prevCountdown - 1);
    }, 1000); // decrease countdown by 1 every second

    const timer = setTimeout(() => {
      navigate('/');
    }, 3000); // redirect after 3 seconds

    return () => {
      clearInterval(interval); // clear interval when component unmounts
      clearTimeout(timer); // clear timeout when component unmounts
    };
  }, [navigate]);

  return (
    <div>
      <h1>Access Denied</h1>
      <p>You do not have permission to view this page.</p>
      <p>Redirecting to home page in {countdown} seconds...</p>
    </div>
  );
};

export default NotAuthorized;
