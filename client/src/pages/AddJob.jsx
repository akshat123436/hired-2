import React from "react";
import { FormRow, FormRowSelect } from "../components";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { useOutletContext } from "react-router-dom";
import { JOB_STATUS, JOB_TYPE } from "../../../utils/constants";
import { Form, useNavigation, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
function AddJob() {
  console.log("add job called");
  const { user } = useOutletContext();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="for-title">add job</h4>
        <div className="form-center">
          <FormRow type="text" name="position"></FormRow>
          <FormRow type="text" name="company"></FormRow>
          <FormRow
            type="text"
            labelText="job location"
            name="jobLocation"
            defaultValue={user.location}
          ></FormRow>
          <FormRowSelect
            name="jobStatus"
            labelText="Job Status"
            list={Object.values(JOB_STATUS)}
            defaultValue="pending"
          ></FormRowSelect>
          <FormRowSelect
            name="jobType"
            labelText="Job Type"
            list={Object.values(JOB_TYPE)}
            defaultValue="full-time"
          ></FormRowSelect>
          <button
            type="submit"
            className="btn btn-block form-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? "submitting" : "submit"}
          </button>
        </div>
      </Form>
    </Wrapper>
  );
}

export default AddJob;
