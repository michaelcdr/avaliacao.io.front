import React, { Component } from 'react';
import { Table, Col, Container, Row } from 'reactstrap';
import { USERS_API_URL } from '../../constants';
import { Link } from "react-router-dom";

class ListagemAlunosDisciplina extends Component {
  constructor(props){
    super(props);
    this.state = {
        disciplinaId: 0,
        alunos: []
    }
        
    this.token =  localStorage.getItem('@login-avaliacao.io/token');
    
    this.componentDidMount = this.componentDidMount.bind(this);
    this.getAlunos = this.getAlunos.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  }
  

  componentDidMount() {
    const { id } = this.props.match.params;
    this.setState({ disciplinaId: id });
    this.getAlunos(id);
  }

  async getAlunos(id) {
    await fetch(`${USERS_API_URL}Alunos/ObterTodosPorDisciplina/${id}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(body => {
        this.setState({ alunos: body });
      })
      .catch(err => console.log(err));
  }

  async deleteItem(id) {
    await fetch(`${USERS_API_URL}Disciplinas/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${this.token}`,
        'Access-Control-Allow-Origin' : '*' ,
        'Access-Control-Allow-Methods' : 'DELETE'
      }
    }).then(res => {
      const updated = this.state.disciplinas.filter(disciplina => disciplina.id !== id);
      this.setState({ disciplinas: updated })
    }).catch(err => console.log(err));
  }

  render() {
    const { disciplinaId, alunos } = this.state;
    return (
      <Container style={{ paddingTop: "20px" }}>
        <Row>
          <Col>
            <h3>Alunos</h3>
          </Col>
        </Row>
        <Row>
          <Col>
          <Table striped>
            <thead className="thead-light">
              <tr>
                <th>Nome do aluno</th>
                <th>Matrícula</th>
                <th style={{ textAlign: "center" }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {!alunos || alunos.length <= 0 ?
                <tr>
                  <td colSpan="6" align="center"><b>Não há alunos cadastrados.</b></td>
                </tr>
                : alunos.map(aluno => (
                  <tr key={aluno.id}>
                    <td>
                      {aluno.nome}
                    </td>
                    <td>
                      {aluno.matricula}
                    </td>
                    <td align="center">
                      <div>
                        &nbsp;&nbsp;&nbsp;
                        <Link className="btn btn-outline-primary" to={`/alunos/avaliar/${aluno.id}/${disciplinaId}`}>Avaliar</Link>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="2">
                <Link className="btn btn-light" to="/disciplinas/professor">Voltar</Link>
                </td>
              </tr>        
            </tfoot>
          </Table>
          </Col>
        </Row>
      </Container>
    );
  }
}
export default ListagemAlunosDisciplina;