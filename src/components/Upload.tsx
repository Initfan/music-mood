import { Alert, Button, Form, Input, Radio, RadioGroup } from "@heroui/react";
import { db, storage } from "../utils/appwrite";
import { ID } from "appwrite";
import type { mood } from "../utils/types";
import { useState } from "react";

const Upload = () => {
	const moods: mood[] = ["focus", "santai", "sedih", "senang"];
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState<string | null>();

	const uploadMusic = (e: FormData) => {
		setLoading(true);
		e.getAll("audio").map((v) => {
			const data = v as File;
			storage
				.createFile({
					fileId: ID.unique(),
					bucketId: "68da58a3000f561df3f2",
					file: data,
				})
				.then((v) =>
					db.createRow({
						rowId: ID.unique(),
						databaseId: "68da581600322d1917ce",
						tableId: "music",
						data: {
							musicId: v.$id,
							mood: e.get("mood"),
							preference: e.get("preference"),
						},
					})
				)
				.finally(() => {
					setMessage("upload berhasil");
					setLoading(false);
				});
		});
	};

	return (
		<div className="space-y-2">
			<p className="text-xl font-bold mt-4">Upload musik</p>
			<Form action={uploadMusic}>
				{message && <Alert color="success">{message}</Alert>}
				<Input
					type="file"
					name="audio"
					accept="audio/*"
					multiple
					isRequired
				/>
				<select name="mood" disabled={loading}>
					<option selected value="">
						Pilih mood
					</option>
					{moods.map((v) => (
						<option key={v} value={v}>
							{v}
						</option>
					))}
				</select>
				<RadioGroup
					label="Music preference"
					name="preference"
					isDisabled={loading}
				>
					<Radio value="international">international</Radio>
					<Radio value="local">local</Radio>
				</RadioGroup>
				<Button type="submit" isLoading={loading}>
					Submit
				</Button>
			</Form>
		</div>
	);
};

export default Upload;
