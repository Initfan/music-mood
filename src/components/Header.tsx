import { Card, CardBody } from "@heroui/card";
import {
	Button,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
} from "@heroui/react";
import { useState } from "react";

const Header = () => {
	const [preference, setPreference] = useState(["local", "international"]);

	return (
		<header>
			<Card radius="sm">
				<CardBody>
					<div className="flex justify-between p-3">
						<h1 className="text-2xl font-semibold">
							Music by Mood
						</h1>
						<Dropdown>
							<DropdownTrigger>
								<Button variant="light" color="primary">
									Music Preference
								</Button>
							</DropdownTrigger>
							<DropdownMenu
								selectionMode="multiple"
								closeOnSelect={false}
								disallowEmptySelection
								selectedKeys={preference}
								onSelectionChange={setPreference}
							>
								<DropdownItem key="local">Local</DropdownItem>
								<DropdownItem key="international">
									International
								</DropdownItem>
							</DropdownMenu>
						</Dropdown>
					</div>
				</CardBody>
			</Card>
		</header>
	);
};

export default Header;
