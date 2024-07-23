import "./App.css";
import React, { useEffect, useState, lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";
import WebFont from "webfontloader";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import store from "./store";
import { loadUser } from "./actions/userAction";
import Header from "./component/layout/Header/Header.js";
import Footer from "./component/layout/Footer/Footer";
import UserOptions from "./component/layout/Header/UserOptions";
import ProtectedRoute from "./component/Route/ProtectedRoute";
import NotFound from "./component/layout/Not Found/NotFound";

// Lazy load components
const Home = lazy(() => import("./component/Home/Home"));
const ProductDetails = lazy(() => import("./component/Product/ProductDetails"));
const Products = lazy(() => import("./component/Product/Products"));
const Search = lazy(() => import("./component/Product/Search"));
const LoginSignUp = lazy(() => import("./component/User/LoginSignUp"));
const Profile = lazy(() => import("./component/User/Profile"));
const UpdateProfile = lazy(() => import("./component/User/UpdateProfile"));
const UpdatePassword = lazy(() => import("./component/User/UpdatePassword"));
const ForgotPassword = lazy(() => import("./component/User/ForgotPassword"));
const ResetPassword = lazy(() => import("./component/User/ResetPassword"));
const Cart = lazy(() => import("./component/Cart/Cart"));
const Shipping = lazy(() => import("./component/Cart/Shipping"));
const ConfirmOrder = lazy(() => import("./component/Cart/ConfirmOrder"));
const Payment = lazy(() => import("./component/Cart/Payment"));
const OrderSuccess = lazy(() => import("./component/Cart/OrderSuccess"));
const MyOrders = lazy(() => import("./component/Order/MyOrders"));
const OrderDetails = lazy(() => import("./component/Order/OrderDetails"));
const Dashboard = lazy(() => import("./component/Admin/Dashboard"));
const ProductList = lazy(() => import("./component/Admin/ProductList"));
const NewProduct = lazy(() => import("./component/Admin/NewProduct"));
const UpdateProduct = lazy(() => import("./component/Admin/UpdateProduct"));
const OrderList = lazy(() => import("./component/Admin/OrderList"));
const ProcessOrder = lazy(() => import("./component/Admin/ProcessOrder"));
const UsersList = lazy(() => import("./component/Admin/UsersList"));
const UpdateUser = lazy(() => import("./component/Admin/UpdateUser"));
const ProductReviews = lazy(() => import("./component/Admin/ProductReviews"));
const Contact = lazy(() => import("./component/layout/Contact/Contact"));
const About = lazy(() => import("./component/layout/About/About"));

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    try {
      const { data } = await axios.get("/api/v1/stripeapikey");
      setStripeApiKey(data.stripeApiKey);
    } catch (error) {
      console.error("Error fetching Stripe API key:", error.message);
    }
  }

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

    store.dispatch(loadUser());
    getStripeApiKey();

    const preventDefault = (e) => e.preventDefault();
    window.addEventListener("contextmenu", preventDefault);
    return () => window.removeEventListener("contextmenu", preventDefault);
  }, []);

  return (
    <Router>
      <Header />

      {isAuthenticated && <UserOptions user={user} />}

      {stripeApiKey && (
        <Elements stripe={loadStripe(stripeApiKey)}>
          <ProtectedRoute exact path="/process/payment" component={Payment} />
        </Elements>
      )}

      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/product/:id" component={ProductDetails} />
          <Route exact path="/products" component={Products} />
          <Route path="/products/:keyword" component={Products} />
          <Route exact path="/search" component={Search} />
          <Route exact path="/contact" component={Contact} />
          <Route exact path="/about" component={About} />
          <Route exact path="/password/forgot" component={ForgotPassword} />
          <Route exact path="/password/reset/:token" component={ResetPassword} />
          <Route exact path="/login" component={LoginSignUp} />
          <Route exact path="/cart" component={Cart} />

          <ProtectedRoute exact path="/account" component={Profile} />
          <ProtectedRoute exact path="/me/update" component={UpdateProfile} />
          <ProtectedRoute exact path="/password/update" component={UpdatePassword} />
          <ProtectedRoute exact path="/shipping" component={Shipping} />
          <ProtectedRoute exact path="/success" component={OrderSuccess} />
          <ProtectedRoute exact path="/orders" component={MyOrders} />
          <ProtectedRoute exact path="/order/confirm" component={ConfirmOrder} />
          <ProtectedRoute exact path="/order/:id" component={OrderDetails} />

          <ProtectedRoute exact path="/admin/dashboard" component={Dashboard} isAdmin={true} />
          <ProtectedRoute exact path="/admin/products" component={ProductList} isAdmin={true} />
          <ProtectedRoute exact path="/admin/product" component={NewProduct} isAdmin={true} />
          <ProtectedRoute exact path="/admin/product/:id" component={UpdateProduct} isAdmin={true} />
          <ProtectedRoute exact path="/admin/orders" component={OrderList} isAdmin={true} />
          <ProtectedRoute exact path="/admin/order/:id" component={ProcessOrder} isAdmin={true} />
          <ProtectedRoute exact path="/admin/users" component={UsersList} isAdmin={true} />
          <ProtectedRoute exact path="/admin/user/:id" component={UpdateUser} isAdmin={true} />
          <ProtectedRoute exact path="/admin/reviews" component={ProductReviews} isAdmin={true} />

          <Route component={window.location.pathname === "/process/payment" ? null : NotFound} />
        </Switch>
      </Suspense>

      <Footer />
    </Router>
  );
}

export default App;
