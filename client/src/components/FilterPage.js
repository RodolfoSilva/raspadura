import React, { Component } from 'react'
import axios from 'axios';
import StepForm from './StepForm';


export default class FilterPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      result: {}
    };

    this.doScrap = this.doScrap.bind(this);
  }

  async doScrap(values) {
    const data = await axios.post('http://localhost:5000/scrape', values);

    this.setState({ result: data });
  }

  render() {
    const initialValues = {
      url: 'http://localhost/tcm.html',// 'http://www.tcm.ba.gov.br/portal-da-cidadania/pessoal/', 
      httpMethod: 'POST',
      statusCode: 200,
      properties: [
        { name: "municipios", value: "2922508" },
        { name: "ano", value: "2017" },
        { name: "mes", value: "1" },
        { name: "entidades", value: "270" },
        { name: "pesquisar", value: "Pesquisar" }
      ],
      extractors: [
        { name: "resultados", selector: "#tabelaResultado", parser: 'tableToJson' },
        { name: "total", selector: "#totalVencimentos", parser: 'toText', replace: '.*\\:\\s(.*)', format: '$1' },
      ]
    };

    return (
      <div>
        <h1>Passo</h1>
        <StepForm initialValues={initialValues} onSubmit={this.doScrap} />
        <textarea value={JSON.stringify(this.state.result)} onChange={() => {}} style={{ display: 'block', boxSizing: 'border-box', width: "100%", height: 200, marginTop: 20 }} />
      </div>
    );
  }
}