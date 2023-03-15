import { useEffect, useState } from "react";
import { dataImage } from "../utilits";

const NewsModalbox = ({ close, value }) => {
  const data = [
    {
      title:
        "M.A.S.S. (Mutual Aid & Shared Support)",
      date: "Javascript, React, Express, Node, PostgreSQL",
      desc: [
        { p: "User registers with phone number, allows user to be as anonymous as possible. Logged in user is able to submit a list of things needed as well as a location of where the trusted admin is to drop off the requested items. Admin is able to see a list of orders with the items requested from all users.",
        l: "https://mass-client.vercel.app/",
        c: "https://github.com/xeviert/mass-client", 
        s: "https://github.com/xeviert/mass-api" }
      ]
    },
    {
      title:
        "Neighbr",
      date: "Javascript, React, Express, Node, PostgreSQL",
      desc: [
        { p: "This application is meant to be used as an online bulletin board for your neighborhood but focused on asking for help and helping others. User creates an account and can see a feed of posts from users and things they need help with. The user can make a post themselves as well.",
        l: "https://neighbr.vercel.app/",
        c: "https://github.com/xeviert/Neighbr", 
        s: "https://github.com/xeviert/neighbr-api" 
      }
      ]
    },
    {
      title: "Petful",
      date: "Javascript, React, Node, Express",
      desc: [
        { p: "Pet adoption site where user submits their name and waits in line for others to adopt. Once it's user's turn, they get to adopt a cat or dog. This project is meant to show my understanding of the queue data structure.",
        l: "https://petful-client-hazel.vercel.app/",
        c: "https://github.com/xeviert/petful-client", 
        s: "https://github.com/xeviert/petful-server"  }
      ]
    },
    {
      title: "Lango",
      date: "Javascript, React, Express, Node, PostgreSQL",
      desc: [
        { p: "This project uses spaced repetition to teach Italian. The user guesses the translation for the Italian word and the next page shows if they got the word right or wrong. For each user, score is kept on how many times they have guessed on the word, the correct and incorrect number of guesses on each word.",
        l: "https://spaced-repetition-plum.vercel.app/",
        c: "https://github.com/xeviert/spaced-repetition", 
        s: "https://github.com/xeviert/spaced-repetition-api" }
      ]

    }
  ];

  const [index, setIndex] = useState(value);
  useEffect(() => {
    dataImage();
  }, [index]);

  return (
    <div className="resumo_fn_modalbox opened">
      <a
        className="extra_closer"
        href="#"
        onClick={(e) => {
          e.preventDefault();
          close(false);
        }}
      />
      <div className="box_inner">
        <a
          className="closer"
          href="#"
          onClick={(e) => {
            e.preventDefault();
            close(false);
          }}
        >
          <span />
        </a>
        <div className="modal_content">
          <div className="modal_in">
            {data.map(
              (d, i) =>
                i + 1 == index && (
                  <div key={i}>
                    <p className="fn__cat">{d.date}</p>
                    <p className="fn__cat">{d.tag}</p>
                    <h3 className="fn__title">{d.title}</h3>
                    <div className="img_holder">
                      <img src={`/img/portfolio/${i}.png`} alt="" />
                      <div
                        className="abs_img"
                        data-bg-img={`/img/portfolio/${i}.png`}
                      />
                    </div>
                    {d.desc.map((des) => (
                      <p key={i} className="fn__desc">
                        {des.p}
                        <div className="repo-links">
                          <a 
                            className="repo-live-links"
                            target="_blank"
                            rel="noreferrer"
                            href={`${des.l}`}>Live App</a> | 
                          <a 
                            className="repo-live-links"
                            target="_blank" 
                            rel="noreferrer"
                            href={`${des.c}`}> Client Repo</a> | 
                          <a 
                            className="repo-live-links" 
                            target="_blank"
                            rel="noreferrer"
                            href={`${des.s}`}> Server Repo</a>
                        </div>
                      </p>
                    ))}

                  </div>
                )
            )}
          </div>

          <div className="fn__nav" data-from="portfolio" data-index="1">
            <a
              href="#"
              className="prev"
              onClick={(e) => {
                e.preventDefault();
                setIndex(index == 1 ? 4 : index - 1);
              }}
            >
              <span className="text">Prev</span>
              <span className="arrow_wrapper">
                <span className="arrow"></span>
              </span>
            </a>
            <a
              href="#"
              className="next"
              onClick={(e) => {
                e.preventDefault();
                setIndex(index == 4 ? 1 : index + 1);
              }}
            >
              <span className="text">Next</span>
              <span className="arrow_wrapper">
                <span className="arrow"></span>
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsModalbox;
