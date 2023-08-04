import { Component } from "react";
import { ClassForm } from "./ClassForm";
import { ProfileInformation } from "../ProfileInformation";
import { UserInformation } from "../types";

export class ClassApp extends Component {
  state = {
    userInfo: null,
  };
  render() {
    const { userInfo } = this.state;
    return (
      <>
        <h2>Class</h2>
        <ProfileInformation userData={userInfo} />
        <ClassForm
          handleUserInfo={(userInfoInput: UserInformation) =>
            this.setState({ userInfo: userInfoInput })
          }
        />
      </>
    );
  }
}
