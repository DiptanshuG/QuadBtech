import React, { useState, useCallback } from "react";
import { Button, Form, Label, Input, FormGroup } from "reactstrap";

export default function BookShowForm({ submitForm }) {
  const [values, setValues] = useState(
    JSON.parse(localStorage.getItem("user_data") )|| {}
  );
  const handleValueChange = useCallback((e) => {
    setValues((v) => ({ ...v, [e.target.name]: e.target.value }));
  }, []);

  const handleSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      submitForm(values);
    },
    [values, submitForm]
  );

  return (
    <div>
      <Form onSubmit={handleSubmitForm} className="p-3">
        <FormGroup>
          <Label htmlFor="user-name">Name</Label>
          <Input
            id="user-name"
            type="text"
            name="name"
            onChange={handleValueChange}
            value={values.name || ""}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="user-email">Email</Label>
          <Input
            id="user-email"
            name="email"
            type="text"
            onChange={handleValueChange}
            value={values.email || ""}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="PhoneNo">PhoneNo</Label>
          <Input
            id="PhoneNo"
            type="tel"
            name="phone"
            // pattern="[+]{1}[0-9]{11,14}"
            onChange={handleValueChange}
            value={values.phone || ""}
          />
        </FormGroup>

        <Button className="w-100 " type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}
