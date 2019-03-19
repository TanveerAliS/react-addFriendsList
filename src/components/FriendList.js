import React, { Component, PropTypes } from 'react';
import styles from './FriendList.css';
import FriendListItem from './FriendListItem';
import Pagination from '../containers/Pagination';

export default class FriendList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      itemPerPage: 2
    };
  }

  handleClick = page => {
    this.setState({
      page: page
    });
  }

  render() {
    const { friends } = this.props;
    const { page, itemPerPage } = this.state;
    const indexOfLastTodo = page * itemPerPage;
    const indexOfFirstTodo = indexOfLastTodo - itemPerPage;
    const currentFriends = friends.slice(indexOfFirstTodo, indexOfLastTodo);
    return (
      <div className={styles.friendListContainer}>
        <ul className={styles.friendList}>
          {
            currentFriends.map((friend, index) => {
              return (
                <FriendListItem
                  key={index}
                  id={index}
                  {...friend}
                  {...this.props.actions} />
              );
            })
          }
        </ul>
        <div className={styles.textCenter}>
          {this.renderPagination()}
        </div>
      </div>
    );
  }

  renderPagination() {
    const { friends } = this.props;
    const { itemPerPage, page } = this.state;
    return (
      <Pagination
        count={friends.length}
        itemPerPage={itemPerPage}
        handleClick={this.handleClick}
        page={page}
      />
    )
  }

}

FriendList.propTypes = {
  friends: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
};
