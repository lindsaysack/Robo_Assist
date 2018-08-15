import React, { Component } from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import store, { fetchSingleBot, fetchReviews } from "../store";

class SingleBot extends Component {


    async componentDidMount() {
        const { robo_id } = this.props.match.params;
        await this.props.fetchBot(robo_id);
        this.props.bot ? this.props.fetchReviews(this.props.bot.reviews) : null
    }

  render() {
    const { bot, reviews }= this.props;
    console.log(reviews.content)
    return (
      <div>
      <div>
        <h3>{bot.name}</h3>
        <img
          src={bot.avatar}
          className="img-thumbnail"
        />
        <div>
          <h4>Model: {bot.model}</h4>
        </div>
        <div>
          <div>
        <h3>Reviews for {bot.name}</h3>
        <div className="row">
          {!reviews.content ?
          null :
          reviews.content.map(review => {
            return (
              <div className="col-sm-4" key={reviews.content.indexOf(review)}>          
                  <div className="caption">
                    <h4>
                      <span>Rating: {review.rating}</span>
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

const mapStateToProps = state => {
    return {
      bot: state.selectedBot,
      reviews: state.botReviews
    }
}
  
const mapDispatchToProps = dispatch => {
    return {
      fetchBot: robo_id => dispatch(fetchSingleBot(robo_id)),
      fetchReviews: reviewsId => dispatch(fetchReviews(reviewsId))
    }
} 
  
export default connect(mapStateToProps, mapDispatchToProps)(SingleBot)

