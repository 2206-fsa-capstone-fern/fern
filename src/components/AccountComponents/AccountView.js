import React from "react";
import { connect } from "react-redux";

import DeleteAccount from "./DeleteAccount";
import UpdateEmail from "./UpdateEmail";
import UpdatePassword from "./UpdatePassword";
import UpdatePhoneNumber from "./UpdatePhoneNumber";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBIcon,
  MDBListGroup,
  MDBListGroupItem,
} from "mdb-react-ui-kit";
import SideNav from "../NavBars/SideNav";

function AccountView(props) {
  const { user } = props;
  const { firstName, lastName, phoneNumber, email } = user;

  return (
    <div className="budget d-flex">
      <div>
        <SideNav />
      </div>
      <div
        style={{
          flex: "1 1 auto",
          display: "flex",
          flexFlow: "column",
          height: "100vh",
          overflowY: "hidden",
        }}
      >
        <div style={{ height: "100%", background: "#364958" }}>
          <MDBContainer style={{ paddingTop: "50px" }}>
            <MDBRow>
              <MDBCol md="4">
                <MDBCard>
                  <MDBCardImage
                    className="img-fluid"
                    src="https://mdbootstrap.com/img/Photos/Others/images/43.jpg"
                    waves
                  />
                  <MDBCardBody style={{ color: "#01a314" }}>
                    <MDBCardText>
                      <MDBListGroup>
                        <MDBListGroupItem style={{ color: "#364958" }}>
                          <MDBIcon icon="user" className="mr-2" />
                          {firstName} {lastName}
                        </MDBListGroupItem>
                        <MDBListGroupItem style={{ color: "#364958" }}>
                          <MDBIcon icon="envelope" className="mr-2" />
                          {email}
                        </MDBListGroupItem>
                        <MDBListGroupItem style={{ color: "#364958" }}>
                          <MDBIcon icon="phone" className="mr-2" />
                          {phoneNumber}
                        </MDBListGroupItem>
                      </MDBListGroup>
                    </MDBCardText>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
              <MDBCol md="8">
                <MDBCard>
                  <MDBCardBody>
                    <MDBCardText>
                      <MDBRow>
                        <MDBCol md="6">
                          <UpdateEmail />
                        </MDBCol>
                        <MDBCol md="6">
                          <UpdatePassword />
                        </MDBCol>
                      </MDBRow>
                      <MDBRow>
                        <MDBCol md="6">
                          <UpdatePhoneNumber />
                        </MDBCol>
                        <MDBCol md="6">
                          <DeleteAccount />
                        </MDBCol>
                      </MDBRow>
                    </MDBCardText>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </div>
      </div>
    </div>
  );
}

const mapState = (state) => {
  return {
    user: state.user,
    notice: state.accountNotice,
  };
};

export default connect(mapState, null)(AccountView);
