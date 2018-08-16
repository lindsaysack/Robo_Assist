import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { fetchBots, fetchSingleBot } from '../store';
import {connect} from 'react-redux'

class AllBots extends Component {
  constructor() {
    super();
    this.state = {
      botName: '',
      triggered: false,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.props.fetchBots();
  }

  handleChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value, triggered: true });
  }

  render() {
    const bots = this.props.bots.filter(bot => bot.name.toLowerCase().match(this.state.botName));
    return (
      <div>
        <h3>Search Bots</h3>
        <form className="form-group" style={{marginTop: '20px'}}>
          <input
            className="form-control"
            value={this.state.botName}
            name="botName"
            placeholder="Enter bot's name"
            onChange={this.handleChange}   
          />
        </form>
        <div className="row">
          {(bots.length === 0) ?
          (<div>
            <div>
            <h3>There are no bots to display</h3>
            </div>
          </div>
          ) :
            bots.map(bot => {
            return (
              <div className="col-sm-4" key={bot.name}>
                <Link className="thumbnail" to={`/detail/${bot.robo_id.$oid}`}>
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
    bots: state.bots, 
    bot: state.selectedBot
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchBots: () => dispatch(fetchBots()),
    fetchSingleBot: (robo_id) => dispatch(fetchSingleBot(robo_id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllBots)
