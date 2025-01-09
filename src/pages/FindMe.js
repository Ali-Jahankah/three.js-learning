const FindMe = ({ findMe }) => {
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
      {Object.entries(findMe).map(([key, value]) => {
        const { text, color, href } = value.fields;
        return (
          <a
            href={href}
            key={key + href}
            target="_blank"
            rel="noopener noreferrer"
            style={{ ...linkStyle, color }}
          >
            {text}
          </a>
        );
      })}
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
