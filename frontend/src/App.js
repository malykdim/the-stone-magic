import {BrowserRouter as Router, Route} from 'react-router-dom';
import {Container} from 'react-bootstrap';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import MosaicScreen from './screens/MosaicScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import MosaicListScreen from './screens/MosaicListScreen';
import MosaicEditScreen from './screens/MosaicEditScreen';
import OrderListScreen from './screens/OrderListScreen';

const App = () => {
    return (
        <Router>
            <Header />
            <main className="main py-3">
                <Container>
                    <Route path='/login' component={LoginScreen} />
                    <Route path='/register' component={RegisterScreen} />
                    <Route path='/profile' component={ProfileScreen} />
                    <Route path='/panneau/:id' component={MosaicScreen} />
                    <Route path='/cart/:id?' component={CartScreen} />
                    <Route path='/shipping' component={ShippingScreen} />
                    <Route path='/payment' component={PaymentScreen} />
                    <Route path='/placeorder' component={PlaceOrderScreen} />
                    <Route path='/order/:id' component={OrderScreen} />
                    <Route path='/admin/userlist' component={UserListScreen} />
                    <Route path='/admin/user/:id/edit' component={UserEditScreen} />
                    <Route path='/admin/productlist' component={MosaicListScreen} />
                    <Route path='/admin/product/:id/edit' component={MosaicEditScreen} />
                    <Route path='/admin/orderlist' component={OrderListScreen} />
                    <Route path='/' component={HomeScreen} exact />
                </Container>
            </main>
            <Footer />
        </Router>
    );
}

export default App;
