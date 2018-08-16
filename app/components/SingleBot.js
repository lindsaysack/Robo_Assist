import React, { Component } from "react";
import { connect } from 'react-redux';
import { fetchSingleBot, fetchReviews } from "../store";

class SingleBot extends Component {

  async componentDidMount() {
    let { robo_id } = this.props.match.params;
    await this.props.fetchBot(robo_id);
    let reviews = this.props.bot.reviews ? await this.props.fetchReviews(this.props.bot.reviews) : null
  }

  componentDidUpdate(prevProps) {
    let prevBotId = prevProps.bot.robo_id ? prevProps.bot.robo_id.$oid : null;
    if (this.props.match.params.robo_id !== prevBotId) {
      this.props.fetchBot(this.props.match.params.robo_id);
    }
    if (this.props.bot.reviews !== prevProps.bot.reviews) {
      this.props.bot.reviews ? this.props.fetchReviews(this.props.bot.reviews) : null; 
    }
  }

  render() {
    let { bot, reviews } = this.props;
    return (
      <div>
        <div>
          <h2>{bot.name}</h2>
          <img
            src={bot.avatar}
            className="img-thumbnail"
          />
          <div>
            <h4>Model: {bot.model}</h4>
            <h4>Price: ${bot.price}</h4>
          </div>
          <div>
            <div>
              <h3>Reviews for {bot.name}</h3>
              <div className="row">
                {reviews.content ?
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
                  }) :
                  (<div>
                    <div>
                    <h4>
                      <span>There are no reviews to display</span>

                    </h4>
                    </div>
                  </div>
                  )}
              </div>
            </div>

          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    bot: state.selectedBot,
    reviews: state.botReviews
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchBot: robo_id => dispatch(fetchSingleBot(robo_id)),
    fetchReviews: reviewsId => dispatch(fetchReviews(reviewsId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleBot)

