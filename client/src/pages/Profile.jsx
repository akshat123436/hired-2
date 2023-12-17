import React from "react";
import { FormRow } from "../components";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { useOutletContext } from "react-router-dom";
import { useNavigation, Form } from "react-router-dom";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
function Profile() {
  const { user } = useOutletContext();
  const { name, lastName, email, location } = user;
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <Wrapper>
      <Form method="post" className="form" encType="multipart/form-data">
        <h4 className="form-title"> profile</h4>
        <div className="form-center">
          <div className="form-row">
            <label htmlForm="avatar" className="form-label">
              Select an image file (max 0.5 MB)
            </label>
            <input
              type="file"
              id="avatar"
              name="avatar"
              className="form-input"
              accept="image/*"
            ></input>
          </div>
          <FormRow type="text" name="name" defaultValue={name}></FormRow>
          <FormRow
            type="text"
            name="lastName"
            labelText="last name"
            defaultValue={lastName}
          ></FormRow>
          <FormRow type="email" name="email" defaultValue={email}></FormRow>
          <FormRow
            type="text"
            name="location"
            defaultValue={location}
          ></FormRow>
          <button
            className="btn btn-block form-btn"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "submitting" : "submit"}
          </button>
        </div>
      </Form>
    </Wrapper>
  );
}

export default Profile;
