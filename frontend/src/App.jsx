import "./App.css";
import useSWR from "swr";
import axios from "axios";

async function search() {
  const res = await axios.get(
    "http://localhost:8000/search/?format=json&title=doomed"
  );
  return res.data;
}

function App() {
  const { data } = useSWR("/search", search);
  console.log(data);

  return (
    <>
      {/* <form action={search} method="get">
      <label>search for podcast: <input type="search" name="title" id="" /></label>
    </form> */}
    </>
  );
}

export default App;
