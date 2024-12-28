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
        Hello! My name is Ali, and I’m a 28-year-old developer from the land of
        Persia. I’m not just working as a developer—I’m living as one. I’m a
        passionate full-stack JavaScript developer with experience in DevOps and
        cloud technologies.
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
        By the way, I’m a metalhead guitar player as well. I have three weapons
        at my home: my laptop, my guitar, and my phone.
      </p>
    </div>
  );
};

export default AboutMe;
