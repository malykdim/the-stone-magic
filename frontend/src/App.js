import {BrowserRouter as Router, Route} from 'react-router-dom';
import {Container} from 'react-bootstrap';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import MosaicScreen from './screens/MosaicScreen';


const App = () => {
    return (
        <Router>
            <Header />
            <main className="main py-3">
                <Container>
                    <Route path='/' component={HomeScreen} exact />
                    <Route path='/panneau/:id' component={MosaicScreen} />
                </Container>
            </main>
            <Footer />
        </Router>
    );
}

export default App;
