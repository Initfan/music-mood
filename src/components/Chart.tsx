import type { mood } from "../utils/types";
import { PieChart } from "@mui/x-charts";

export default function Example() {
	const moods: mood[] = ["energik", "focus", "santai", "sedih", "senang"];
	const data = moods.map((v, i) => ({
		id: i,
		label: v,
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
