import './App.css';
import * as contentful from 'contentful';
import React, { useMemo, useState, useEffect, Suspense } from 'react';
import ModelViewer from './ModelViewer';

const App = () => {
  const [data, setData] = useState([]);
  const client = useMemo(() => {
    return contentful.createClient({
      space: process.env.REACT_APP_SPACE,
      accessToken: process.env.REACT_APP_ACCESS_TOKEN
    });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await client.getEntries();
        setData(res.items);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [client]);

  const Loader = () => (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        color: 'white',
        fontSize: '2rem'
      }}
    >
      Loading content...
    </div>
  );

  return (
    <div className="model">
      <Suspense fallback={<Loader />}>
        {data.length > 0 ? (
          <ModelViewer audioData={data[0].fields.music} />
        ) : (
          <Loader />
        )}
      </Suspense>
    </div>
  );
};

export default App;
