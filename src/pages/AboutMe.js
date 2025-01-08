import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

const AboutMe = ({ aboutMe }) => {
  return (
    <div
      style={{
        fontSize: '0.5rem',
        lineHeight: '1.5em',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <div style={{ color: 'lime' }}>
        {documentToReactComponents(aboutMe.greenText)}
      </div>
      <br />

      <div style={{ color: 'white' }}>
        {documentToReactComponents(aboutMe.whiteText)}
      </div>

      <br />
      <div
        style={{
          color: '#cb0000'
        }}
      >
        {documentToReactComponents(aboutMe.redText)}
      </div>
      <p style={{ textAlign: 'center', color: '#ffd000', fontSize: '0.8rem' }}>
        {aboutMe.email}
      </p>
    </div>
  );
};

export default AboutMe;
