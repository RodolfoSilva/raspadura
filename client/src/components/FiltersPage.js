import React from 'react';
import { Link } from 'react-router-dom';

export default () => (
  <div>
    <h1>Filtros <span style={{ fontSize: 16 }}><Link to="/filters/add">Adicionar</Link></span></h1>

    <div style={{ borderWidth: 1, borderStyle: 'solid', borderColor: '#000', marginTop: 16, marginBottom: 16 }}>
      It has found no record of the database!
        </div>

    <table width="100%" border="1">
      <thead>
        <tr>
          <th>Namespace</th>
          <th>Domain</th>
          <th>Las change</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </tbody>
    </table>
  </div>
);