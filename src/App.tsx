import Navbar from "./components/navbar/navbar";
import Router from "./router";

function App() {
	return (
		<div className="main-wrapper">
			<div className="header-wrapper">piScan</div>
			<div className="content-wrapper">
				<Router />
			</div>
			<Navbar />
		</div>
	);
}

export default App;
