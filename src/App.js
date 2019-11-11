import React from 'react';
import Buscador from './componentes/Buscador';
import Resultado from './componentes/Resultado';


class App extends React.Component {

  state = {
    termino : '',
    imagenes : [],
    pagina : ''
  };
  
  scroll = () =>{
    const elemento = document.querySelector('.jumbotron');
    elemento.scrollIntoView('smooth', 'start');
  }
  paginaSiguiente = () => {
    // Leer el state de la pagina actual
    let pagina = this.state.pagina;

    // Sumar uno a la pagina actual
      pagina += 1;
    // Agregar cambio al state 
      this.setState({
        pagina 
      },() =>{
        this.consultarApi();
        this.scroll();
      });
    //console.log(pagina);
  }
  
  paginaAnterior = () => {
    let pagina = this.state.pagina;
    
    // Leer si la pagina es uno, ya no ir hacia atras
      if(pagina === 1) return null;
    // Sumar uno a la pagina actual
      pagina -= 1;
    // Agregar cambio al state 
      this.setState({
        pagina 
      },() =>{
        this.consultarApi();
        this.scroll();
      });
    //console.log(pagina);
  }
  
  datosBusqueda = (termino) => {
    this.setState({
      termino : termino,
      pagina : 1
    },() => {
      this.consultarApi();
    });
  };
  consultarApi = () => {
    const termino = this.state.termino;
    const pagina = this.state.pagina;
    const url = `https://pixabay.com/api/?key=14234447-45d79726849832e1098048faa&q=${termino}&per_page=30&page=${pagina}`;
    fetch(url)
      .then(respuesta => respuesta.json())
      .then(resultado => this.setState({imagenes: resultado.hits}));
    
  }
  render() {
    return (
      <div className="app container">
        <div className="jumbotron">
          <p className="lead text-center">Buscador de imagenes</p>
          <Buscador datosBusqueda={this.datosBusqueda} />
          
        </div>
       <div className="row justify-content-center">
          <Resultado
            imagenes = {this.state.imagenes} 
            paginaSiguiente = {this.paginaSiguiente}
            paginaAnterior = {this.paginaAnterior}
            />
       </div> 
      </div>        
      );
  }




  
}

export default App;
