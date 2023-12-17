import React from "react";
import { FormRow, SubmitBtn } from "../components";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { useOutletContext } from "react-router-dom";
import { Form } from "react-router-dom";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

export const action = async ({ request }) => {
  const formData = await request.formData();
  console.log("profile form submit action");
  const file = formData.get("avatar");
  if (file && file.size > 500000) {
    toast.error("Image size too large");
    return null;
  }
  try {
    await customFetch.patch("/users/update-user", formData);
    toast.success("Profile updated successfully");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
  }
  return null;
};

function Profile() {
  const { user } = useOutletContext();
  const { name, lastName, email, location } = user;

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
          <SubmitBtn formBtn></SubmitBtn>
        </div>
      </Form>
    </Wrapper>
  );
}

export default Profile;
