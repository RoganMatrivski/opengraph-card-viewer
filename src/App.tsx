import { AppSidebar } from "./components/app-sidebar";
import { Navbar } from "./components/navbar";
import { OpenGraphViewer } from "./components/opengraph-viewer";
import { Button } from "./components/ui/button";
import { SidebarInset, SidebarProvider } from "./components/ui/sidebar";

function App() {
	return (
		<div>
			<div className="min-h-screen flex flex-col">
				<SidebarProvider>
						<OpenGraphViewer />
						<AppSidebar
							variant="floating"
							side="right"
							collapsible="offcanvas"
						/>
				</SidebarProvider>
			</div>
		</div>
	);
}

export default App;
