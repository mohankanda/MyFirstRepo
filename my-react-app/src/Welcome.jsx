import { useEffect, useState } from "react";

import axios from "axios";

function Welcome() {
  const [fact, setFact] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    const url = "https://meowfacts.herokuapp.com/";

    const getFact = async () => {
      try {
        let response = await axios.get(url, { signal });
        setFact(response.data.data[0]);
      } catch (err) {
        setFact("");
        console.error("Data not found", err);
      } finally {
        setLoading(false);
      }
    };

    getFact();
    return () => { controller.abort(); };
  }, []);

  return (
    <>
      <h1>Welcome</h1>
      {loading ? <p>Loading...</p> : fact ? <p>{fact}</p> : <p></p>}
    </>
  );
}

export default Welcome;
