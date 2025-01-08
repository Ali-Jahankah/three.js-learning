import './App.css';
import * as contentful from 'contentful';
import React, { useMemo, useState, useEffect, Suspense } from 'react';
import ModelViewer from './ModelViewer';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [projects, setProjects] = useState([]);
  const [findMe, setFindMe] = useState([]);
  const [aboutMe, setAboutMe] = useState([]);
  const [music, setMusic] = useState();

  const client = useMemo(() => {
    return contentful.createClient({
      space: process.env.REACT_APP_SPACE,
      accessToken: process.env.REACT_APP_ACCESS_TOKEN
    });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const blogRes = await client.getEntries({ content_type: 'blogs' });
        const blogsArray = Object.values(blogRes.items[0].fields).map(
          (item) => ({
            link: item.fields.link,
            title: item.fields.title,
            description: item.fields.description
          })
        );
        setBlogs(blogsArray);
        const projectsRes = await client.getEntries({
          content_type: 'projects'
        });

        const projectsArray = Object.values(projectsRes.items[0].fields).map(
          (item) => {
            const {
              link,
              title,
              description,
              serverLink,
              liveLink,
              clientLink,
              sourceLink
            } = item.fields;
            return {
              link,
              title,
              description,
              serverLink,
              liveLink,
              clientLink,
              sourceLink
            };
          }
        );
        setProjects(projectsArray);

        const aboutMeRes = await client.getEntries({ content_type: 'aboutMe' });
        const aboutMeArray = {
          email: aboutMeRes.items[0].fields.email,
          greenText: aboutMeRes.items[0].fields.greenText,
          whiteText: aboutMeRes.items[0].fields.whiteText,
          redText: aboutMeRes.items[0].fields.redText
        };
        setAboutMe(aboutMeArray);

        const findMeRes = await client.getEntries({
          content_type: 'findMeLinks'
        });

        const findMeArray = findMeRes.items[0].fields;
        setFindMe(findMeArray);

        const musicRes = await client.getEntries({ content_type: 'music' });
        const singleMusic = musicRes.items[0].fields.music;
        setMusic(singleMusic);
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
        {music ? (
          <ModelViewer
            audioData={music}
            blogs={blogs}
            aboutMe={aboutMe}
            projects={projects}
            findMe={findMe}
          />
        ) : (
          <Loader />
        )}
      </Suspense>
    </div>
  );
};

export default App;
