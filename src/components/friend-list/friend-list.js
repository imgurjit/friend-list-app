import "./friend-list.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import { faStar as filledFaStar } from "@fortawesome/free-solid-svg-icons";

function FriendList(props) {
  return (
    <div>
      {props.data.length === 0 ? (
        <div className="empty-box">No friend found, enter friend's name and press enter to add a friend</div>
      ) : (
        <>
          {props.data.map((d, i) => {
            return (
              <div key={i} className="friend-box">
                <div className="friend-info">
                  <div>{d.name}</div>
                  <div className="relation-text">is your friend</div>
                </div>
                <div className="friend-actions">
                  <div className="favourite">
                    {d.isFavourite ? (
                      <FontAwesomeIcon
                        icon={filledFaStar}
                        className="icons star-icon"
                        onClick={() => {
                          props.toggleFavourite(d.id);
                        }}
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={faStar}
                        className="icons star-icon"
                        onClick={() => {
                          props.toggleFavourite(d.id);
                        }}
                      />
                    )}
                  </div>
                  <div>
                    <FontAwesomeIcon
                      icon={faTrashAlt}
                      className="icons star-icon"
                      onClick={() => {
                        props.deleteFriend(d.id, d.name);
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}

export default FriendList;
