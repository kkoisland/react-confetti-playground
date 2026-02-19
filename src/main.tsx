import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { IntlProvider } from "./i18n";
import "./index.css";

const rootElement = document.getElementById("root");
if (rootElement) {
	createRoot(rootElement).render(
		<StrictMode>
			<IntlProvider>
				<App />
			</IntlProvider>
		</StrictMode>,
	);
}
