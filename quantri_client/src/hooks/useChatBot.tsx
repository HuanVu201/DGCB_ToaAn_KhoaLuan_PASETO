import { useEffect } from 'react';

const useChatBot = (url?: string) => {
  useEffect(() => {
    if(!url){
      return
    }
    const script = document.createElement('script');

    script.src = url;
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    }
  }, [url]);
};

export default useChatBot;