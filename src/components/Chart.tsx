import type { mood } from "../utils/types";
import { PieChart } from "@mui/x-charts";

export default function Example() {
	const moods: mood[] = ["focus", "santai", "sedih", "senang"];
	const data = moods.map((v, i) => ({
		id: i,
		label: String(v.charAt(0).toUpperCase()) + String(v.slice(1)),
		value: Number(sessionStorage.getItem(v) ?? 0),
	}));

	return (
		<PieChart
			series={[
				{
					data,
				},
			]}
			width={200}
			height={200}
		/>
	);
}
