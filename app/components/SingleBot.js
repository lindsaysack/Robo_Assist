import React, { Component } from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import store, { fetchSingleBot } from "../store";

class SingleBot extends Component {
    componentDidMount() {
        const { botId } = this.props.match.params;
        console.log("botId", botId)
        this.props.fetchBot(botId);
    }

  render() {
    const bot = this.props.bot;
    console.log("bot", bot)
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
        <h3>Reviews for {bot.name}</h3>
        <div className="row">
          {/* {bot.reviews.map(review => {
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
          })} */}
        </div>
      </div>

        </div>
      </div>
    </div>
    )
  }
}

const mapStateToProps = state => {
    return {
      bot: state.selectedBot,
    }
}
  
const mapDispatchToProps = dispatch => {
    
    return {
      fetchBot: botId => dispatch(fetchSingleBot(botId)),
    }
} 
  
export default connect(mapStateToProps, mapDispatchToProps)(SingleBot)

