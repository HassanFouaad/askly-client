import { Avatar, Button, Row } from "antd";
import {
  RiUserFollowFill,
  RiMessage3Fill,
  RiQuestionFill,
} from "react-icons/ri";
import React from "react";
import { connect } from "react-redux";
import { getProfile } from "../../store/actions/profileActions";
import Posts from "../../Components/Posts";
import SadEmoji from "../../Assets/sad.png";
import AskModal from "./Ask";
export const Profile = ({
  match: {
    params: { username },
  },
  profile,
  error,
  getProfile,
  user,
}) => {
  const [showAskModal, setShowAskModal] = React.useState(false);

  React.useEffect(() => {
    getProfile({ username });
  }, [username]);

  return (
    <div className="main-page">
      {showAskModal && (
        <AskModal
          showAskModal={showAskModal}
          setAskModal={setShowAskModal}
          profile={profile}
        />
      )}
      {profile && (
        <>
          <div className="mainBox2">
            <div className="row justify-content-center text-center">
              <Avatar
                src={profile.image}
                style={{
                  height: "150px",
                  width: "150px",
                  border: "3px solid var(--primaryColor)",
                }}
                draggable
              />
              <span className="profile-name">
                {profile.firstName} {profile.lastname}
              </span>
              <span className="sec-text">@{profile.username}</span>
            </div>
            <div className="row justify-content-center text-center mx-5 mt-2">
              {user && user.id != profile.id && (
                <div className="col-sm ml-5">
                  <Button
                    className="main-button my-1"
                    style={{ width: "100px", height: "35px" }}
                  >
                    <RiUserFollowFill size="20" />
                  </Button>
                </div>
              )}

              <div className="col-sm mr-5">
                <Button
                  onClick={() => setShowAskModal(true)}
                  className="main-button my-1"
                  style={{ width: "100px", height: "35px" }}
                >
                  <RiQuestionFill size="20" />
                </Button>
              </div>
              {user && user.id != profile.id && (
                <div className="col-sm mr-5">
                  <Button
                    className="main-button my-1"
                    style={{ width: "100px", height: "35px" }}
                  >
                    <RiMessage3Fill size="20" />
                  </Button>
                </div>
              )}
            </div>
          </div>
          {profile?.id && (
            <Posts userId={profile?.id} myProfile={profile?.id === user?.id} />
          )}
        </>
      )}
      {error && (
        <div className="container align-content-center mt-5">
          <div className="hText text-center">
            Opps! Profile not found
            <div className="text-center">
              <img src={SadEmoji} height="80px" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  profile: state.profile.profile,
  user: state.auth.user,
  error: state.profile.error,
});

const mapDispatchToProps = { getProfile };

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
