import Header from "./components/header/header";
import Navbar from "./components/navbar/navbar";
import Router from "./router";

function App() {
	return (
		<div className="main-wrapper">
			<Header />
			<div className="content-wrapper">
				<Router />
			</div>
			<Navbar />
		</div>
	);
}

export default App;
