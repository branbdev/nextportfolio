import React from 'react';

const Home: React.FC = () => {
  return (
    <section id='home'>
      <div className='container'>
        <div className='roww'>
          {/* Main Title */}
          <div className='resumo_fn_main_title'>
            <h3 className='subtitle'>Introduction</h3>
            <h3 className='title'>Full Stack Solutions</h3>
            <p className='desc'>
              Software engineer proficient in Nextjs, ASP.NET, and the MERN
              stack. I have experience in freelancing and marketing. Both have
              allowed me to develop my problem-solving, assessment, and
              communication skills with clients and partners.
            </p>
            {/* <img src="img/signature.png" alt="image" /> */}
          </div>
          {/* /Main Title */}
        </div>
      </div>
    </section>
  );
};

export default Home;
