import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/Login";
import Details from "./components/Details";
import Edit from './components/Edit';
import API from './context/apis'

const router = createBrowserRouter([
	{
		path: "/",
		element: <Login />,
	},
	{
		path: "/products",
		element: <App />,
	},
	{
		path: "/details/:productId",
		element: <Details />,
	},
	{
		path: "/edit/:productId",
		element: <Edit />,
	},
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<API>
			<RouterProvider router={router} />
		</API>
	</React.StrictMode>
);

