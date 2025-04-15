
import { OpenGraphViewer } from "./components/opengraph-viewer";

function App() {
	return (
		<div>
			<div className="min-h-screen flex flex-col">
				{/* <SidebarProvider> */}
						<OpenGraphViewer />
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
