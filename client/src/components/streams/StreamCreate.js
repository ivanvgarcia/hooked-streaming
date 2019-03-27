import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { Button, Form, Message } from "semantic-ui-react";
import { connect } from "react-redux";
import { createStream } from "../../actions/index";

class StreamCreate extends Component {
  renderError({ error, touched }) {
    if (touched && error) {
      return <Message error content={error} />;
    }
  }

  renderInput = ({ input, label, meta }) => {
    const errorField = meta.error && meta.touched ? "error" : "";

    return (
      <Form.Field className={errorField}>
        <label>{label}</label>
        <input {...input} />
        {this.renderError(meta)}
      </Form.Field>
    );
  };

  onSubmit = formValues => {
    this.props.createStream(formValues);
  };

  render() {
    return (
      <Form error onSubmit={this.props.handleSubmit(this.onSubmit)}>
        <h1>Start a Stream</h1>
        <Field name="title" component={this.renderInput} label="Enter Title" />
        <Field
          name="description"
          component={this.renderInput}
          label={"Enter Description"}
        />
        <Button color="red" type="submit">
          Submit
        </Button>
      </Form>
    );
  }
}

const validate = formValues => {
  const errors = {};

  if (!formValues.title) {
    errors.title = "You must enter a title";
  }

  if (!formValues.description) {
    errors.description = "You must enter a description";
  }

  return errors;
};

const formWrapped = reduxForm({
  form: "streamCreate",
  validate
})(StreamCreate);

export default connect(
  null,
  { createStream }
)(formWrapped);
