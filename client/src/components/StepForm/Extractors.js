import React from 'react';
import { Field } from 'redux-form';

export default ({ fields, meta: { error } }) => (
  <div>
    <button type="button" onClick={() => fields.push()}>Adicionar parametro</button>

    <ul>
      {fields.map((property, index) => (
        <li key={index}>
          <button
            type="button"
            title="Remove"
            onClick={() => fields.remove(index)}
          > X </button>
          <Field
            name={`${property}.name`}
            type="text"
            component="input"
            label={`Hobby #${index + 1}`}
          />
          <Field
            name={`${property}.selector`}
            type="text"
            component="input"
          />
          <Field
            name={`${property}.replace`}
            type="text"
            component="input"
          />
          <Field
            name={`${property}.format`}
            type="text"
            component="input"
          />
          <Field
            name={`${property}.parser`}
            component="select"
          >
            <option value=""></option>
            <option value="tableToJson">tableToJson</option>
            <option value="toText">toText</option>
          </Field>
        </li>
      ))}
      {error && <li className="error">{error}</li>}
    </ul>
  </div>
)