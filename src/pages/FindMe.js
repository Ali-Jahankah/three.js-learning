const FindMe = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        padding: '20px',
        borderRadius: '10px',
        gap: '15px'
      }}
    >
      <a
        href="https://www.linkedin.com/in/uaral/"
        target="_blank"
        rel="noopener noreferrer"
        style={{ ...linkStyle, color: '#1e90ff' }}
      >
        LinkedIn
      </a>
      <a
        href="https://github.com/Ali-Jahankah"
        target="_blank"
        rel="noopener noreferrer"
        style={{ ...linkStyle, color: '#f0d32a' }}
      >
        GitHub
      </a>
      <a
        href="https://medium.com/@ali-jahankah"
        target="_blank"
        rel="noopener noreferrer"
        style={{ ...linkStyle, color: '#c2e0ff' }}
      >
        Medium
      </a>
      <a
        href="https://www.instagram.com/2alij"
        target="_blank"
        rel="noopener noreferrer"
        style={{ ...linkStyle, color: '#e6750b' }}
      >
        Instagram
      </a>
    </div>
  );
};
const linkStyle = {
  textDecoration: 'none',
  fontSize: '1.2rem',
  fontWeight: 'bold',
  transition: 'color 0.3s'
};

export default FindMe;
