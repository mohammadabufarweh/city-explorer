
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import './Style.css';


export class App extends React.Component {

  render() {
    return (
      <div>
        <Header />
        <Main />
        <Footer />

      </div>

    )
  }
}
export default App