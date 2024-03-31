import {TimeField, TimePicker} from "@mui/x-date-pickers";
import dayjs from "dayjs";
import {DateTime} from "luxon";
import {useEffect, useState} from "react";
import {MenuItem, Select} from "@mui/material";
import {fastingDuration as fastingDurationData} from "../data/fasting-duration.jsx";

export default function FastingCalculator() {
	const [lastMealTime, setLastMealTime] = useState(DateTime.local());
	const [fastingDuration, setFastingDuration] = useState(8);
	const [nextMealTime, setNextMealTime] = useState(null)

	useEffect(() => {
		setNextMealTime(lastMealTime.plus({hours: fastingDuration}));
	}, [fastingDuration])

	return (
		<div className="bg-white min-w-[500px] p-4 rounded-lg shadow flex flex-col gap-4">
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
							{nextMealTime.toFormat("HH:MM a (yyyy LLLL dd)")}
						</p>
					)}
				</div>
			</div>
		</div>
	);
}