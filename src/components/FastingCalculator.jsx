import {TimePicker} from "@mui/x-date-pickers";
import {DateTime} from "luxon";
import {useEffect, useState} from "react";
import {Alert, MenuItem, Select} from "@mui/material";
import {fastingDuration as fastingDurationData} from "../data/fasting-duration.jsx";

export default function FastingCalculator() {
	const [lastMealTime, setLastMealTime] = useState(DateTime.local());
	const [fastingDuration, setFastingDuration] = useState(8);
	const [nextMealTime, setNextMealTime] = useState(null);
	const [popUpVisibility, setPopUpVisibility] = useState(false);

	const copyNextMeal = () => {
		navigator.clipboard.writeText(nextMealTime.toFormat("HH:MM a (yyyy LLLL dd)")).then(r => "Failed to Copy");

		setPopUpVisibility(true);

		setTimeout(() => {
			setPopUpVisibility(false)
		}, 3000)

	}

	useEffect(() => {
		setNextMealTime(lastMealTime.plus({hours: fastingDuration}));
	}, [fastingDuration, lastMealTime])

	return (
		<div className="bg-white lg:min-w-[500px] md:w-fit w-full p-8 rounded-xl shadow flex flex-col gap-4">
			<h1 className="text-lg font-bold">Intermittent Fasting Hour Calculator</h1>

			<div className="flex flex-col gap-2">
				<p className={`text-sm font-bold`}>Last Meal</p>
				<TimePicker
					className={'w-full'}
					defaultValue={lastMealTime}
					onChange={(newValue) => setLastMealTime(newValue)}
					format="hh:mm a"
				/>
			</div>

			<div className="flex flex-col gap-2">
				<p className={`text-sm font-bold`}>Fasting Duration (n Hours)</p>
				<Select
					value={fastingDuration}
					onChange={(event) => setFastingDuration(event.target.value)}
				>
					{
						fastingDurationData.map((duration, index) => (
							<MenuItem key={index} value={duration}>{duration} hour(s)</MenuItem>
						))
					}
				</Select>
			</div>

			<div className="flex flex-col gap-2">
				<p className={`text-sm font-bold`}>Next Meal Period ({fastingDuration} hour(s) eating window)</p>
				<div className="">
					{nextMealTime && (
						<p className={'text-lg font-bold text-sea-blue tracking-widest'}>
							{nextMealTime.toFormat("hh:MM a (yyyy LLLL dd)")}
						</p>
					)}
				</div>
				<button
					onClick={copyNextMeal}
					className={'bg-sea-blue py-2 px-8 w-fit text-sm text-white rounded-lg tracking-wide border border-transparent hover:border-sea-blue hover:bg-white hover:text-sea-blue'}
				>
					Copy
				</button>
			</div>

			{
				popUpVisibility && (
					<div className="absolute top-1 right-1">
						<Alert variant="filled" severity="success">
							Copied text succesfully.
						</Alert>
					</div>
				)
			}
		</div>
	);
}