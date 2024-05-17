import { useQuery } from "@apollo/client";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import SignUpPage from "./pages/SignUpPage";
import TransactionPage from "./pages/TransactionPage";
import { GET_AUTHENTICATED_USER } from "./graphql/queries/user.query";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";

function App() {
	const authUser = true;
	const {loading,data,error}=useQuery(GET_AUTHENTICATED_USER);

	console.log("Authenticated user",data);

	return (
		<>
			{authUser && <Header />}
			<Routes>
				<Route path='/' element={<HomePage />} />
				<Route path='/login' element={<LoginPage />} />
				<Route path='/signup' element={<SignUpPage />} />
				<Route path='/transaction/:id' element={<TransactionPage />} />
				<Route path='*' element={<NotFoundPage />} />
			</Routes>
		</>
	);

	// return (
	// 	<h1 className="text-3xl font-bold underline bg-red-700">
	// 	  Hello world!
	// 	</h1>
	//   )
}

export default App;


//used Acternity UI for background style
