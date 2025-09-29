import type { mood } from "../utils/types";
import { PieChart } from "@mui/x-charts";

export default function Example() {
	const moods: mood[] = ["energik", "focus", "santai", "sedih", "senang"];
	const data = moods.map((v, i) => ({
		id: i,
		label: v,
		value: Math.ceil(Math.random() * 1000),
	}));

	console.log(data);

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
