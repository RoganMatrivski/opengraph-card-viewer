import * as React from "react";

import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupAction,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuAction,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
	SidebarRail,
} from "@/components/ui/sidebar";
import { Plus, Trash } from "lucide-react";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [data, setData] = React.useState(Array.from({ length: 10 }, () =>
    Math.random().toString(36).substring(2, 10)
  ))

	return (
		<Sidebar {...props}>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>Table of Contents</SidebarGroupLabel>
					<SidebarGroupContent>
						{data.map((item, index) => (
							<div key={item} className="flex items-center justify-between">
								<SidebarMenu>
									<SidebarMenuItem>
										<SidebarMenuButton asChild>
											<span>{item}</span>
										</SidebarMenuButton>
										<SidebarMenuAction
											onClick={() => {
                        const newData = [...data];
                        newData.splice(index, 1);
                        setData(newData);
											}}
										>
											<Trash /> <span className="sr-only">Add Project</span>
										</SidebarMenuAction>
									</SidebarMenuItem>
								</SidebarMenu>
							</div>
						))}
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
			<SidebarRail />
		</Sidebar>
	);
}
