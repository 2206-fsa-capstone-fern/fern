import React from "react";
import { Link } from "react-router-dom";

export class Contact extends React.Component {
  render() {
    return (
      <div>
        <section className="contact-header">Contact</section>
        <p className="contact-desc">in case we want to put soemthing here</p>
        <br />

        <p className="bakers">The Investors</p>
        <div className="members">
          <div className="container">
            <div className="card">
              <div className="content">
                <div className="imgBx">
                  <img
                    src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                    alt=""
                  />
                </div>
                <div className="contentBx">
                  <h4>Alex Wong</h4>
                </div>
                <div className="sci">
                  <Link
                    to={{ pathname: "https://github.com/" }}
                    target="_blank"
                  >
                    Github
                  </Link>
                  <br />
                  <Link
                    to={{
                      pathname: "https://www.linkedin.com/",
                    }}
                    target="_blank"
                  >
                    LinkedIn
                  </Link>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="content">
                <div className="imgBx">
                  <img
                    src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                    alt=""
                  />
                </div>
                <div className="contentBx">
                  <h4>Amy Wong</h4>
                </div>
                <div className="sci">
                  <Link
                    to={{ pathname: "https://github.com/" }}
                    target="_blank"
                  >
                    Github
                  </Link>
                  <br />
                  <Link
                    to={{
                      pathname: "https://www.linkedin.com/",
                    }}
                    target="_blank"
                  >
                    LinkedIn
                  </Link>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="content">
                <div className="imgBx">
                  <img
                    src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                    alt=""
                  />
                </div>
                <div className="contentBx">
                  <h4>Savoy Rath</h4>
                </div>
                <div className="sci">
                  <Link
                    to={{ pathname: "https://github.com/" }}
                    target="_blank"
                  >
                    Github
                  </Link>
                  <br />
                  <Link
                    to={{
                      pathname: "https://www.linkedin.com/",
                    }}
                    target="_blank"
                  >
                    LinkedIn
                  </Link>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="content">
                <div className="imgBx">
                  <img
                    src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                    alt=""
                  />
                </div>
                <div className="contentBx">
                  <h4>Victor Lopez</h4>
                </div>
                <div className="sci">
                  <Link
                    to={{ pathname: "https://github.com/" }}
                    target="_blank"
                  >
                    Github
                  </Link>
                  <br />
                  <Link
                    to={{
                      pathname: "https://www.linkedin.com/",
                    }}
                    target="_blank"
                  >
                    LinkedIn
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Contact;
