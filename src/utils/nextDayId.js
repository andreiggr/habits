export default function nextDayId(habits) {
  var allDaysId = [].concat(
    ...habits.map(habit => habit.days.map(day => parseInt(day.id)))
  );

  var id = allDaysId.length > 0 ? Math.max(...allDaysId) + 1 : 1;

  return id;
}
