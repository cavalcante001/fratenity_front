import './App.css';
import { Header } from './layouts/Header';
import { Footer } from './layouts/Footer';
import { ListaDeBans } from './components/ListaDeBans';

const App = () => {
  return (
    <>
       <Header />
          <ListaDeBans />
        <Footer />
    </>
  );
}

export default App;