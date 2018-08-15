import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import store, { fetchBots } from '../store';
import {connect} from 'react-redux'

class AllBots extends Component {

componentDidMount() {
    this.props.fetchBots();
  }

  render() {
    const bots = this.props.bots;
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
              <div className="col-sm-4" key={bot.name}>
                <Link className="thumbnail" to={`/bots/${bot.robo_id.$oid}`}>
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

const mapStateToProps = state => {
  return {
    bots: state.bots
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchBots: () => dispatch(fetchBots()),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)
(AllBots)
