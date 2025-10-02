import { useEffect, useState,useRef } from "react";

function Welcome() {
  const [fact, setFact] = useState("");
  const didFetch = useRef(false);

  useEffect(() => {
    const url = "https://meowfacts.herokuapp.com/";

    if (didFetch.current) {return;}
    didFetch.current = true;
    

    const getFact = async () => {
      try {
        let response = await fetch(url);

        if (!response.ok) {
          throw new Error(`HTTP Status: ${response.status}`);
        }

        let data = await response.json();

        
        
        setFact(data.data[0]);
      } catch (err) {
        console.error("Data not found", err);
      }
    };

    getFact();
  }, []);

  return (
    <>
      <h1>Welcome</h1>
      {fact && <p>{fact}</p>}
    </>
  );
}

export default Welcome;
