import React, { Component } from "react";
// import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import store, { fetchSingleBot } from "../store";

export default class SingleBot extends Component {
  constructor() {
    super();
    this.state = store.getState();
  }

  componentDidMount() {
    const thunk = fetchSingleBot(this.props.match.params.botId);
    store.dispatch(thunk)
    this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const bot = this.state.selectedBot;
    return (
      <div>
      <div>
        <h3>{bot.name}</h3>
        <img
          src={bot.avatar}
          className="img-thumbnail"
        />
        <div>
          <h4>Model</h4>
          <p>{bot.model}</p>
        </div>
        <div>
          <div>
        <h3>{bot.name} Reviews</h3>
        <div className="row">
          {bot.reviews.map(review => {
            return (
              <div className="col-sm-4" key={reviewsID++}>          
                  <div className="caption">
                    <h4>
                      <span>{review.rating}</span>
                    </h4>
                  </div>
                <div>
                    <span>{review.review}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

        </div>
      </div>
    </div>
    )
  }
}


