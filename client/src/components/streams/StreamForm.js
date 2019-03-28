import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { Button, Form, Message } from "semantic-ui-react";

class StreamForm extends Component {
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
    this.props.onSubmit(formValues);
  };

  render() {
    return (
      <Form error onSubmit={this.props.handleSubmit(this.onSubmit)}>
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

export default reduxForm({
  form: "streamForm",
  validate
})(StreamForm);
