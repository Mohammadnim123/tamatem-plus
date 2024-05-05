import React from "react";
import * as ReactDOM from "react-dom/client";

import { Container } from "react-bootstrap";
import Listing from "./components/Listing";
import Edit from "./components/Edit";
import './App.css';


const App = () => {
	return (
		<Container className="mb-4">
			<Listing />
		</Container>
	);
};

export default App;
