import React, { Component } from 'react';
import Select from 'react-select';
import _ from "lodash";
import { useHistory } from "react-router-dom";
import { addProductsFields } from "../../requests/owner-requests";

import { isFilledStr } from "../../helpers/validator-helpers";

enum FieldType {
  String = "string",
  Integer = "integer",
  Float = "float"
};

const options = [
  { value: 'string', label: 'string' },
  { value: 'integer', label: 'integer' },
  { value: 'float', label: 'float' }
];

export type Field = { name: string, type: FieldType };

type StateType = {
  fields: Field[] | null[],
  error: boolean
};

type PropType = {
  history: any
};

class InitialSetup extends Component<PropType, StateType> {
  public constructor(props: PropType) {
    super(props);
    this.validateAndSubmit = this.validateAndSubmit.bind(this);
    this.submit = this.submit.bind(this);
    this.generateErrorString = this.generateErrorString.bind(this);
  }

  public state = {
    fields: [
      null,
      null,
      null
    ],
    error: false
  }

  private setField (
    inputOrSelect: "input" | "select",
    idx: number,
    value: string
  ) {
    const stateFields = this.state.fields;
    let updatedField = null;
    const currentField: Field | null = stateFields[idx];

    if(inputOrSelect === "input") {
      updatedField = currentField
        ? {...currentField, name: value}
        : {name: value, type: null};
    } else {
      updatedField = currentField
        ? {...currentField, type: value}
        : {type: value, name: null};
    }

    stateFields[idx] = updatedField;

    this.setState({ fields: stateFields });
    return;
  };

  private validateAndSubmit () {
    const isValid = _.every(this.state.fields, this.checkFields);

    this.setState({ error: !isValid });

    if(isValid) { this.submit(); }
  };

  private checkFields (field: Field | null) {
    console.log(field);
    if(!field) {
      return false;
    }

    return isFilledStr(field["name"]) && isFilledStr(field["type"]);
  }

  private submit () {
    addProductsFields(this.state.fields)
    .then((result: any) =>{
      // console.log(result);
      this.props.history.push("/owner-dashboard");
    })
    .catch((e: any) => {
      console.log(e);
    });
  };

  private generateErrorString () {
    if(this.state.error) {
      return (
        <p className="error-label little-top-margin self-center">
          Please fill all the inputs and try again
        </p>
      );
    }
    return null;
  };

  public render() {
    return (
      <div className="flex align-center justify-center column">
        <h2>Let's customize your products table</h2>
        <h3>Please add the fields that you need</h3>
        <h3>By default the table already includes the insertion time</h3>
        <div className="flex column">
          <div className="field-input-container">
            <input
              className="field-input"
              onChange={(e) => this.setField("input", 0, e.target.value)}
            />
            <Select
              className="field-select"
              options={options}
              onChange={(e: {value: string}) => this.setField("select", 0, e.value)}
            />
          </div>
          <div className="field-input-container">
            <input
              className="field-input"
              onChange={(e) => this.setField("input", 1, e.target.value)}
            />
            <Select
              className="field-select"
              options={options}
              onChange={(e: {value: string}) => this.setField("select", 1, e.value)}
            />
          </div>
          <div className="field-input-container">
            <input
              className="field-input"
              onChange={(e) => this.setField("input", 2, e.target.value)}
            />
            <Select
              className="field-select"
              options={options}
              onChange={(e: {value: string}) => this.setField("select", 2, e.value)}
            />
          </div>
          {this.generateErrorString()}
          <a
            className="button self-center"
            onClick={this.validateAndSubmit}
          >
            Add fields
          </a>
        </div>
      </div>
    );
  }
};

export default InitialSetup;
