import { useState } from 'react';

export const ReactLecture = () => {
  // ここにロジックを書く
  const [count, setCount] = useState(0);
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const data = await response.json();

    setData(data);
  };

  // ここに UI を書く
  return (
    <div>
      <h1>ReactLecture</h1>
      <p>count: {count}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
      <button onClick={fetchData}>fetchData</button>

      <ul>
        {data.map((item: { id: number; title: string }) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
};
