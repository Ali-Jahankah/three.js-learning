import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

const Projects = ({ slide, setSlide, page, projects, blogs }) => {
  const content = page === 'projectsbox' ? projects[slide] : blogs[slide];
  const allSlides = page === 'projectsbox' ? projects : blogs;
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        gap: '0.5em',
        position: 'relative',
        height: '100%'
      }}
    >
      <div
        className="slide-number-div"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <h3 style={{ color: '#00ccff' }}>
          {page === 'projectsbox' ? 'PROJECTS' : 'BLOGS'}
        </h3>
        <h3
          className="back-button"
          style={{ color: 'red', cursor: 'pointer' }}
          onClick={() => {
            if (slide === 0) {
              setSlide(allSlides.length - 1);
            } else {
              setSlide((prev) => prev - 1);
            }
          }}
        >
          &#x21E6;
        </h3>
        <h5 style={{ textAlign: 'center', color: '#ff9500' }}>
          {content.title}
        </h5>
        <h3
          className="right-button"
          style={{ color: 'red', cursor: 'pointer' }}
          onClick={() => {
            if (slide === allSlides.length - 1) {
              setSlide(0);
            } else {
              setSlide((prev) => prev + 1);
            }
          }}
        >
          &#x21E8;
        </h3>
      </div>
      <div
        className="slide"
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'space-between'
        }}
      >
        <div className="links" style={{ display: 'flex', gap: '8px' }}>
          {content?.sourceLink?.length > 0 && (
            <a
              target="_blank"
              rel="noopener noreferrer"
              style={linksStyles}
              href={content.sourceLink}
            >
              Source code
            </a>
          )}
          {content?.liveLink?.length > 0 && (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={content.liveLink}
              style={linksStyles}
            >
              Live app
            </a>
          )}
          {content?.clientLink?.length > 0 && (
            <a
              target="_blank"
              rel="noopener noreferrer"
              style={linksStyles}
              href={content.liveLink}
            >
              Client source code
            </a>
          )}
          {content?.serverLink?.length > 0 && (
            <a
              target="_blank"
              rel="noopener noreferrer"
              style={linksStyles}
              href={content.serverLink}
            >
              Server source code
            </a>
          )}
          {content?.link?.length > 0 && (
            <a
              target="_blank"
              rel="noopener noreferrer"
              style={linksStyles}
              href={content.link}
            >
              Read More on Medium.com
            </a>
          )}
        </div>
        <div
          style={{
            margin: '0.5em auto',
            fontSize: '0.5rem',
            color: '#f3f2e2',
            lineHeight: '14px'
          }}
        >
          {documentToReactComponents(content.description)}
        </div>
        <h3 style={{ flex: '1', alignContent: 'end', color: '#f70e0e' }}>{`${
          slide + 1
        } / ${allSlides.length}`}</h3>
      </div>
    </div>
  );
};
const linksStyles = {
  textDecoration: 'none',
  color: '#dc99c5',
  background: '#141414c1',
  fontSize: '0.6rem',
  boxShadow: '0px 0px 4px 0px white',
  padding: '0.3em 0.7em',
  borderRadius: '10px',
  cursor: 'pointer'
};

export default Projects;
