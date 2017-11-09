import React from 'react';
import { Field } from 'redux-form';

export default class Parameters extends React.Component {

  render() {
    const { fields, meta: { error } } = this.props;
    return (
      <div>
        <button type="button" onClick={() => fields.push({})}>Adicionar parametro</button>
        <ul>
          {fields.map((property, index) => (
            <li key={index}>
              <button type="button" onClick={() => fields.remove(index)}> X </button>
              <Field
                name={`${property}.name`}
                type="text"
                component="input"
                label={`Hobby #${index + 1}`}
              />
              <Field
                name={`${property}.value`}
                type="text"
                component="input"
              />
            </li>
          ))}
          {error && <li className="error">{error}</li>}
        </ul>
      </div>
    );
  }
}