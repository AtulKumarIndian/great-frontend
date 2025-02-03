import { useCallback, useEffect, useRef, useState } from "react";
import "./styles.css";

export default function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(null);
  const loadingref = useRef();
  const [page, setPage] = useState(null);

  async function fetchDetails(page) {
    const url = `https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${page}`;
    try {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error("failed");
      }
      const result = await res.json();
      return result;
    } catch (err) {
      console.log(err);
    }
  }

  const newGetData = useCallback(
    async function getData() {
      if (loading) {
        return;
      }
      console.log(page, "p");
      setLoading(true);
      if (page != null) {
        const dataaa = await fetchDetails(page);
        setData((p) => [...p, ...dataaa]);
        setLoading(false);
        setPage((p) => p + 1);
      }
    },
    [page]
  );

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const target = entries[0];
      if (target.isIntersecting) {
        newGetData();
      }
    });
    if (loadingref.current) {
      observer.observe(loadingref.current);
    }
    return () => {
      if (loadingref.current) {
        observer.unobserve(loadingref.current);
      }
    };
  }, [newGetData]);

  async function firstpagedata() {
    const dataa = await fetchDetails(0);

    setData(dataa);
  }
  //console.log(data, "d");

  useEffect(() => {
    firstpagedata();
    setPage(1);
  }, []);

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      {data.map((item, idx) => (
        <div key={idx} className="row">
          <div className="innerrow">{item.id}</div>
          <div className="innerrow">{item.body}</div>
        </div>
      ))}

      <div ref={loadingref}>{loading && <div>Loading...</div>}</div>
    </div>
  );
}
