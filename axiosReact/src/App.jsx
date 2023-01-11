import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
  });

  // api.get("/api").then((res) => {
  //   setData(res.data);
  //   setLoading(false);
  // });

  async function fetchApi() {
    const request = api
      .get("/")
      .then((res) => {
        setLoading(false);
        return res;
      })
      .catch((err) => setError(err));

    const response = await request;
    console.log(response.data);
    setData(response.data);
  }

  useEffect(() => {
    fetchApi();
  } , []);

  return (
    <div className="App">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <p>Username: {data.username}</p>
      )}
    </div>
  );
}

export default App;
