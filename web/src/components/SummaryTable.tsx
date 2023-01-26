import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

import { api } from '../lib/axios';
import { generateDatesFromYearBeginning } from '../utils/generateDatesFromYearBeginning';
import { HabitDay } from './HabitDay';

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

const summaryDates = generateDatesFromYearBeginning();

const minimumSummaryDatesSize = 18 * 7; // 18 weeks
const amountOfDaysToFill = minimumSummaryDatesSize - summaryDates.length;

interface ISummary {
  id: string;
  date: string;
  amount: number;
  completed: number;
}

const SummaryTable = () => {
  const [summary, setSummary] = useState<ISummary[]>([]);

  useEffect(() => {
    api
      .get<ISummary[]>('/summary')
      .then((response) => setSummary(response.data));
  }, []);

  return (
    <div className="flex w-full">
      <div className="grid grid-rows-7 grid-flow-row gap-3">
        {weekDays.map((weekDay, index) => (
          <div
            key={`${weekDay}-${index}`}
            className="flex items-center justify-center text-zinc-400 text-xl font-bold h-10 w-10"
          >
            {weekDay}
          </div>
        ))}
      </div>

      <div className="grid grid-rows-7 grid-flow-col gap-3">
        {summary.length > 0 &&
          summaryDates.map((date) => {
            const dayInSummary = summary.find((day) => {
              return dayjs(date).isSame(day.date, 'day');
            });

            return (
              <HabitDay
                date={date}
                amount={dayInSummary?.amount}
                defaultCompleted={dayInSummary?.completed}
                key={date.toISOString()}
              />
            );
          })}

        {amountOfDaysToFill > 0 &&
          [...new Array(amountOfDaysToFill).keys()].map((amountOfDay) => (
            <div
              key={amountOfDay}
              className="w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg opacity-40 cursor-not-allowed"
            />
          ))}
      </div>
    </div>
  );
};

export { SummaryTable };
