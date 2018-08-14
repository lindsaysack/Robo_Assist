import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import store, { fetchBots } from '../store';

export default class AllBots extends Component {
  constructor() {
    super();
    this.state = store.getState();
  }

  componentDidMount() {
    const fetchThunk = fetchBots();
    store.dispatch(fetchThunk);
    this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  handleDelete(evt) {
    evt.preventDefault();
    store.dispatch(deleteSingleCampus(Number(evt.target.value)))
  }

  render() {
    const bots = this.state.bots;
    if (bots.length === 0) {
        return (
          <div>
            <h3>Bots</h3>
            <div>
            <h3>There are no bots to display</h3>
            </div>
          </div>
          )
    }
    return (
      <div>
        <h3>Bots</h3>
        <div className="row">
          {bots.map(bot => {
            return (
              <div className="col-sm-4" key={bot.robo_id}>
                <Link className="thumbnail" to={`/bots/${bot.robo_id}`}>
                  <img className="img-thumbnail" src={bot.avatar} />
                  <div className="caption">
                    <h4>
                      <span>{bot.name}</span>
                    </h4>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
