const AboutMe = () => {
  return (
    <div
      style={{
        fontSize: '0.5rem',
        lineHeight: '1.5em',

        color: 'lime',

        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <p>
        Hello! My name is Ali, a 28-year-old boy from the land of{' '}
        <strong>Persia 🇮🇷</strong>. I’m not just working as a developer; I’m
        living as one.
        <br />
        I’m a passionate full-stack JavaScript developer based in{' '}
        <strong>London 🏴󠁧󠁢󠁥󠁮󠁧󠁿</strong> with some experience in DevOps and Cloud as
        well.
      </p>
      <br />
      <p style={{ color: '#ffffff' }}>
        I have over <b>80 repositories</b> on GitHub, showcasing my solo and
        team projects.
      </p>
      <p style={{ color: '#ffffff' }}>
        If you'd like to learn more about me, view my CV, or connect elsewhere,
        please explore the options displayed on the wall.
      </p>
      <br />
      <p
        style={{
          color: '#cb0000'
        }}
      >
        By the way, I’m a MetalHead guitar player as well. Candlemass, Uaral and
        Gojira are afew of my favourite bands. You can contact me via Email as
        well.
      </p>
      <p style={{ textAlign: 'center' }}>aral2@yahoo.com</p>
    </div>
  );
};

export default AboutMe;
