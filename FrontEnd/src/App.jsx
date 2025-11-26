// import React, { useEffect } from "react"
// import Home from "./pages/home"                                                                                                      // Importing Home component with a capital H
// import Navbar from "./components/Navbar/Navbar"
// import Footer from "./components/Footer/Footer"
// import{ Routes, Route} from "react-router-dom"
// import AllBooks from "./pages/AllBooks"
// import SignUp from "./pages/SignUp"
// import Login from "./pages/Login"
// import Cart from "./pages/Cart"
// import Profile from "./pages/Profile"
// import ViewBookDetails from "./components/ViewBookDetails/ViewBookDetails"
// import { useDispatch,useSelector } from "react-redux"
// import { authActions } from "./store/auth"
// import Favourites from "./components/Profile/Favourites"
// import UserOrderHistory from "./components/Profile/UserOrderHistory"
// import Settings from "./components/Profile/Settings"
// import AllOrders from "./pages/AllOrders"
// import AddBook from "./pages/AddBook"
// import UpdateBook from "./pages/UpdateBook";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// const App = () => {
// const dispatch = useDispatch()
//   const role = useSelector((state) => state.auth.role)
//   useEffect(() => {
//     if(
//       localStorage.getItem("id")&&
//       localStorage.getItem("token")&&
//       localStorage.getItem("role")
//     ){
// dispatch(authActions.login())
// dispatch(authActions.changeRole(localStorage.getItem("role")))

//     }
//   }, [])
// return (
//     <div>
    
//               <Navbar />
//               <Routes>
//                 <Route exact path = "/" element = { <Home />} />
//                 <Route  path = "/all-books" element = { <AllBooks />} />
//                 <Route  path = "/cart" element = { <Cart />} />
//                 <Route  path = "/profile" element = { <Profile />} >
//                 {role === "user" ? <Route index element={<Favourites />} /> : <Route index element={<AllOrders />} /> }
//                 {role === "admin" && <Route path="/profile/add-book" element={<AddBook />} /> }
//                 <Route path="/profile/settings" element={<Settings />} /> 
//                  </Route>
//                 <Route  path = "/Login" element = { <Login />} />
//                 <Route  path = "/updateBook/:id" element = { <UpdateBook />} />
//                 <Route  path = "/SignUp" element = { <SignUp />} />
//                 <Route path = "view-book-details/:id" element = {<ViewBookDetails />}/>
//               </Routes>
//               <Footer />
      
               
      
      
//     </div>
//   )// AT LINE 40 //here we can define multiple routes herer and also index here ttell that by-default where you will go i.e directly to the Favourites
//   //AT LINE 42 inki madat se yeh hoora hai ki jo side bar banaya hai waha pr jo favourites and order history ahi jb uspe click karoge toh page toh wohi rahega bss profile se directly aap favourites ya order history pe re-direct ho jaoge
// }

// export default App

import React, { useEffect } from "react";
import Home from "./pages/home";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import { Routes, Route, useLocation } from "react-router-dom";
import AllBooks from "./pages/AllBooks";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import ViewBookDetails from "./components/ViewBookDetails/ViewBookDetails";
import About from "./pages/About";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Disclaimer from "./pages/Disclaimer";
import TermsOfUse from "./pages/TermsOfUse";
import HowToOrder from "./pages/HowToOrder";
import ShippingPolicy from "./pages/ShippingPolicy";
import ReturnPolicy from "./pages/ReturnPolicy";
import CheckoutAddress from "./pages/CheckoutAddress";
import CheckoutPayment from "./pages/CheckoutPayment";
import CheckoutSummary from "./pages/CheckoutSummary";
import TrackOrder from "./pages/TrackOrder";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./store/auth";
import Favourites from "./components/Profile/Favourites";
import UserOrderHistory from "./components/Profile/UserOrderHistory"; // Make sure you import this!
import Settings from "./components/Profile/Settings";
import AllOrders from "./pages/AllOrders";
import AddBook from "./pages/AddBook";
import UpdateBook from "./pages/UpdateBook";

const App = () => {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth.role);

  useEffect(() => {
    if (
      localStorage.getItem("id") &&
      localStorage.getItem("token") &&
      localStorage.getItem("role")
    ) {
      dispatch(authActions.login());
      dispatch(authActions.changeRole(localStorage.getItem("role")));
    }

    const storedTheme = localStorage.getItem("theme");
    const initialTheme =
      storedTheme === "light" || storedTheme === "dark" ? storedTheme : "dark";
    if (initialTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  return (
    <div>
      <Navbar />
      <ScrollToTop />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/all-books" element={<AllBooks />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={<Profile />}>
          {/* For users: */}
          {role === "user" && (
            <>
              <Route index element={<Favourites />} /> {/* Default profile page */}
            </>
          )}
          {/* For admins: */}
          {role === "admin" && (
            <>
              <Route index element={<AllOrders />} /> {/* Admin default */}
              <Route path="add-book" element={<AddBook />} />
            </>
          )}
          {/* Common routes for both users and admins */}
          <Route path="orderHistory" element={<UserOrderHistory />} /> {/* Order history available to all */}
          <Route path="settings" element={<Settings />} />
        </Route>
        <Route path="/Login" element={<Login />} />
        <Route path="/updateBook/:id" element={<UpdateBook />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/view-book-details/:id" element={<ViewBookDetails />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/disclaimer" element={<Disclaimer />} />
        <Route path="/terms-of-use" element={<TermsOfUse />} />
        <Route path="/how-to-order" element={<HowToOrder />} />
        <Route path="/shipping-policy" element={<ShippingPolicy />} />
        <Route path="/return-policy" element={<ReturnPolicy />} />
        <Route path="/checkout/address" element={<CheckoutAddress />} />
        <Route path="/checkout/payment" element={<CheckoutPayment />} />
        <Route path="/checkout/summary" element={<CheckoutSummary />} />
        <Route path="/checkout/track/:orderId" element={<TrackOrder />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
