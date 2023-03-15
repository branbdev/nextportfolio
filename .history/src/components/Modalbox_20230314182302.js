import { useEffect, useState } from 'react';
import { dataImage } from '../utilits';

//Needs to be able to take in an array of tags
const Modalbox = ({ close, value }) => {
  const data = [
    {
      name: 'B & B Real Estate',
      tag: 'Django',
      desc: [
        {
          p: 'User registers with phone number, allows user to be as anonymous as possible. Logged in user is able to submit a list of things needed as well as a location of where the trusted admin is to drop off the requested items. Admin is able to see a list of orders with the items requested from all users.',
        },
      ],
    },
    {
      name: 'Pebbl',
      tag: 'Angular',
      desc: [
        {
          p: 'This application is meant to be used as an online bulletin board for your neighborhood but focused on asking for help and helping others. User creates an account and can see a feed of posts from users and things they need help with. The user can make a post themselves as well.',
        },
      ],
    },
    {
      name: 'DevCon',
      tag: 'React',
      desc: [
        {
          p: "Pet adoption site where user submits their name and waits in line for others to adopt. Once it's user's turn, they get to adopt a cat or dog. This project is meant to show my understanding of the queue data structure.",
        },
      ],
    },
    {
      name: 'Revry',
      tag: 'React',
      desc: [
        {
          p: 'This project uses spaced repetition to teach Italian. The user guesses the translation for the Italian word and the next page shows if they got the word right or wrong. For each user, score is kept on how many times they have guessed on the word, the correct and incorrect number of guesses on each word.',
        },
      ],
    },
  ];

  const [index, setIndex] = useState(value);
  useEffect(() => {
    dataImage();
  }, [index]);

  return (
    <div className='resumo_fn_modalbox opened'>
      <a
        className='extra_closer'
        href='#'
        onClick={(e) => {
          e.preventDefault();
          close(false);
        }}
      />
      <div className='box_inner'>
        <a
          className='closer'
          href='#'
          onClick={(e) => {
            e.preventDefault();
            close(false);
          }}>
          <span />
        </a>
        <div className='modal_content'>
          <div className='modal_in'>
            {data.map(
              (d, i) =>
                i + 1 == index && (
                  <div key={i}>
                    <p className='fn__cat'>{d.tag}</p>
                    <h3 className='fn__title'>{d.name}</h3>
                    <div className='img_holder'>
                      <img src='/img/thumb/square.jpg' alt='' />
                      <div
                        className='abs_img'
                        data-bg-img={`/img/portfolio/${index}.jpg`}
                      />
                    </div>
                    {d.desc.map((des, i) => (
                      <p key={i} className='fn__desc'>
                        {des.p}
                      </p>
                    ))}
                  </div>
                )
            )}
          </div>

          <div className='fn__nav' data-from='portfolio' data-index='1'>
            <a
              href='#'
              className='prev'
              onClick={(e) => {
                e.preventDefault();
                setIndex(index == 1 ? 4 : index - 1);
              }}>
              <span className='text'>Prev</span>
              <span className='arrow_wrapper'>
                <span className='arrow'></span>
              </span>
            </a>
            <a
              href='#'
              className='next'
              onClick={(e) => {
                e.preventDefault();
                setIndex(index == 4 ? 1 : index + 1);
              }}>
              <span className='text'>Next</span>
              <span className='arrow_wrapper'>
                <span className='arrow'></span>
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modalbox;
