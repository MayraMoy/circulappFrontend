import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import AuthProvider from "./contexts/AuthProvider";
import ErrorBoundary from "./components/common/ErrorBoundary";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <ErrorBoundary>
            <BrowserRouter>
                <AuthProvider>
                    <App />
                </AuthProvider>
            </BrowserRouter>
        </ErrorBoundary>
    </React.StrictMode>
);