import React, { Component } from "react";
import card_1 from "../../img/card1.jpg";
import card_2 from "../../img/card2.jpeg";
import card_3 from "../../img/card3.jpeg";

export default class Info extends Component {
  render() {
    return (
      <div>
        <div className="card-deck ml-4 mr-4 mt-5">
          <div className="card" style={{ width: "4em" }}>
            <img
              className="card-img-top"
              src={card_3}
              alt="Card hello cap 23"
            />
            <div className="card-body">
              <h4 className="card-title">COMPUTING</h4>
              <p className="card-text">
                The SLIIT Faculty of Computing is equipped with a range of
                courses specialising in various arms of the IT sector managers
                and IS professionals that can make decisions and implement
                actions that are right for themselves, right for their career.
              </p>
            </div>
            <div className="card-footer">
              <a href="/">Read More</a>
            </div>
          </div>

          <div className="card">
            <img className="card-img-top" src={card_1} alt="Card hello cap 3" />
            <div className="card-body">
              <h5 className="card-title">BUSINESS</h5>
              <p className="card-text">
                The Faculty of Business within SLIIT continues to rise up to the
                challenge of nurturing leaders, managers and IS professionals
                that can make decisions and implement actions that are right for
                themselves, right for their career.
              </p>
            </div>
            <div className="card-footer">
              <a href="/">Read More</a>
            </div>
          </div>

          <div className="card">
            <img className="card-img-top" src={card_1} alt="Card hello cap 1" />
            <div className="card-body">
              <h5 className="card-title">Engineering</h5>
              <p className="card-text">
                The Faculty of Engineering of Sri Lanka Institute of Information
                technology is the epicenter of engineering education, research,
                knowledge creation and distribution in Sri Lanka.
              </p>
            </div>
            <div className="card-footer">
              <a href="/">Read More</a>
            </div>
          </div>

          <div className="card">
            <img className="card-img-top" src={card_2} alt="Card hello cap 2" />
            <div className="card-body">
              <h5 className="card-title">Humanities and Sciences</h5>
              <p className="card-text">
                The Faculty of Humanities and Sciences strives to develop
                professionals in the areas of Education, Science, Mathematics,
                and Nursing.
              </p>
            </div>
            <div className="card-footer">
              <a href="/">Read More</a>
            </div>
          </div>
        </div>
        <div className="alert alert-dismissible alert-secondary mt-5">
          <button type="button" className="close" data-dismiss="alert">
            &times;
          </button>
          <h2>
            <b>We are a leading non-state degree awarding </b>
          </h2>
          <hr />
          <p>
            We are a leading non-state degree awarding institute approved by the
            University Grants Commission (UGC) under the Universities Act. We
            are also members of the Association of Commonwealth Universities
            (ACU), as well as the International Association of Universities
            (IAU), and the first Sri Lankan institute to be accredited by the
            Institution of Engineering & Technology, UK. We are proud to be
            listed as a leading and formidable awarding institute authorised and
            approved by the University Grants Commission (UGC) under the
            Universities Act, and the International Association of Universities
            (IAU). Furthermore, not only are we the first Sri Lankan institute
            to be accredited by the Institution of Engineering & Technology
            (IET.), UK, our IT degrees are also in turn accredited by the
            Engineering Council, UK. We are a leading non-state degree awarding
            institute approved by the University Grants Commission (UGC) under
            the Universities Act. We are also members of the Association of
            Commonwealth Universities (ACU), as well as the International
            Association of Universities (IAU), and the first Sri Lankan
            institute to be accredited by the Institution of Engineering &
            Technology, UK. We are proud to be listed as a leading and
            formidable awarding institute authorised and approved by the
            University Grants Commission (UGC) under the Universities Act, and
            the International Association of Universities (IAU). Furthermore,
            not only are we the first Sri Lankan institute to be accredited by
            the Institution of Engineering & Technology (IET.), UK, our IT
            degrees are also in turn accredited by the Engineering Council, UK.
          </p>
          .
        </div>
      </div>
    );
  }
}
