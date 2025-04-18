import { OpenGraphViewer } from "./components/opengraph-viewer";
import { BrowserRouter } from "react-router";

function App() {
	return (
		<div>
			<div className="min-h-screen flex flex-col">
				{/* <SidebarProvider> */}
				<BrowserRouter>
					<OpenGraphViewer />
				</BrowserRouter>
				{/* <AppSidebar
							variant="floating"
							side="right"
							collapsible="offcanvas"
						/>
				</SidebarProvider> */}
			</div>
		</div>
	);
}

export default App;
