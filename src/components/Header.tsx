import {
	Button,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
} from "@heroui/react";

const Header = ({
	preference,
	setPreference,
}: {
	preference: string[];
	setPreference: (v: string[]) => void;
}) => {
	return (
		<header className="flex justify-between">
			<div className="flex gap-2 items-center">
				<img src="/icon.png" alt="logo" width={30} height={30} />
				<h1 className="text-xl font-semibold">Moodician</h1>
			</div>
			<Dropdown>
				<DropdownTrigger>
					<Button color="primary" size="sm">
						Pilihan musik
					</Button>
				</DropdownTrigger>
				<DropdownMenu
					selectionMode="multiple"
					closeOnSelect={false}
					disallowEmptySelection
					selectedKeys={preference}
					onSelectionChange={(keys) =>
						setPreference(Array.from(keys as Set<string>))
					}
				>
					<DropdownItem key="local">Lokal</DropdownItem>
					<DropdownItem key="international">
						Internasional
					</DropdownItem>
				</DropdownMenu>
			</Dropdown>
		</header>
	);
};

export default Header;

