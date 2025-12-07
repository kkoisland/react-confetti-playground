import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import BasicPage from "./pages/BasicPage";
import CountdownPage from "./pages/CountdownPage";
import PlaygroundPage from "./pages/PlaygroundPage";
import SeasonalPage from "./pages/SeasonalPage";
import ToastPage from "./pages/ToastPage";

function App() {
	return (
		<Routes>
			<Route element={<Layout />}>
				<Route path="/" element={<Navigate to="/basic" replace />} />
				<Route path="/basic" element={<BasicPage />} />
				<Route path="/countdown" element={<CountdownPage />} />
				<Route path="/toast" element={<ToastPage />} />
				<Route path="/seasonal" element={<SeasonalPage />} />
				<Route path="/playground" element={<PlaygroundPage />} />
			</Route>
		</Routes>
	);
}

export default App;
