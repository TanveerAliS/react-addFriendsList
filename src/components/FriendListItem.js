import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import styles from './FriendListItem.css';

class FriendListItem extends Component {

  render() {
    const {name, gender, id, starred, starFriend, deleteFriend} = this.props;
    return (
      <li className={styles.friendListItem}>
        <div className={styles.friendInfos}>
          <div><span>{name}</span></div>
          <div>
            <small><i className={(`fa fa-${gender}`)} />{gender.charAt(0).toUpperCase() + gender.slice(1)}</small>
          </div>
          <div>
            <small> xx friends in common</small>
          </div>
        </div>
        <div className={styles.friendActions}>
          <button className={`btn btn-default ${styles.btnAction}`}
            onClick={() => starFriend(id)}>
            <i className={classnames('fa', {
              'fa-star': starred,
              'fa-star-o': !starred
            })} />
          </button>
          <button className={`btn btn-default ${styles.btnAction}`}
            onClick={() => deleteFriend(id)}>
            <i className="fa fa-trash" />
          </button>
        </div>
      </li>
    );
  }

}

FriendListItem.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  gender: PropTypes.string,
  starred: PropTypes.bool,
  starFriend: PropTypes.func.isRequired
};

export default FriendListItem
