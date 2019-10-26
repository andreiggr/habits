import { week } from "./constants";

export default function weekCompletion(userDays = []) {
  const daysChecked = week
    .map(day => userDays.includes(day.format("ddd Do")))
    .filter(Boolean).length;

  const completion = (daysChecked * 100) / 5;

  return completion;
}
