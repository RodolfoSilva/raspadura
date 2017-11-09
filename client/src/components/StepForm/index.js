import React from 'react';
import { Field, reduxForm, FieldArray } from 'redux-form';
import Parameters from './Parameters';
import Extractors from './Extractors';

const StepForm = ({ handleSubmit }) => (
  <form onSubmit={handleSubmit}>
    <fieldset>
      <legend>Configuração</legend>

      <div>
        <div>
          <label htmlFor="url">URL</label>
        </div>
        <Field name="url" component="input" type="text" />
      </div>

      <div>
        <div>
          <label htmlFor="httpMethod">Método</label>
        </div>
        <Field name="httpMethod" component="select">
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
          <option value="DELETE">DELETE</option>
        </Field>
      </div>

      <div>
        <div>
          <label htmlFor="statusCode">Código de resposta esperado</label>
        </div>
        <Field name="statusCode" component="input" type="text" />
      </div>
    </fieldset>

    <fieldset>
      <legend>Entrada</legend>
    </fieldset>

    <fieldset>
      <legend>Parametros</legend>

      <FieldArray name="properties" component={Parameters} />
    </fieldset>

    <fieldset>
      <legend>Extractors</legend>

      <FieldArray name="extractors" component={Extractors} />
    </fieldset>

    <fieldset>
      <legend>Saida</legend>
    </fieldset>

    <button style={{ marginTop: 16 }} type="submit">Test Scrap</button>
  </form>
);

export default reduxForm({ form: 'step-form' })(StepForm);