import { slides } from '../projects-data/slides';

const Projects = ({ slide, setSlide }) => {
  const content = slides[slide];
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        gap: '0.5em',
        position: 'relative',
        color: '#2abfff'
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
        <h3>Projects</h3>
        <h3
          className="back-button"
          style={{ color: 'red', cursor: 'pointer' }}
          onClick={() => {
            if (slide === 0) {
              setSlide(slides.length - 1);
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
            if (slide === slides.length - 1) {
              setSlide(0);
            } else {
              setSlide((prev) => prev + 1);
            }
          }}
        >
          &#x21E8;
        </h3>
        <h3>{`${slide + 1} / ${slides.length}`}</h3>
      </div>
      <div className="slide">
        <div className="links" style={{ display: 'flex', gap: '8px' }}>
          {content.sourceLink.length > 0 && (
            <a
              target="_blank"
              rel="noopener noreferrer"
              style={linksStyles}
              href={content.sourceLink}
            >
              Source code
            </a>
          )}
          {content.liveLink.length > 0 && (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={content.liveLink}
              style={linksStyles}
            >
              Live app
            </a>
          )}
          {content.clientLink.length > 0 && (
            <a
              target="_blank"
              rel="noopener noreferrer"
              style={linksStyles}
              href={content.liveLink}
            >
              Client source code
            </a>
          )}
          {content.serverLink.length > 0 && (
            <a
              target="_blank"
              rel="noopener noreferrer"
              style={linksStyles}
              href={content.serverLink}
            >
              Server source code
            </a>
          )}
        </div>
        <p
          style={{
            margin: '0.5em auto',
            fontSize: '0.5rem',
            color: '#f3f2e2',
            lineHeight: '14px'
          }}
        >
          {content.description}
        </p>
      </div>
    </div>
  );
};
const linksStyles = {
  textDecoration: 'none',
  color: '#dc99c5',
  background: '#141414c1',
  fontSize: '0.6rem',
  boxShadow: '0px 0px 5px 0px white',
  padding: '0.3em 0.7em',
  borderRadius: '10px',
  cursor: 'pointer'
};

export default Projects;