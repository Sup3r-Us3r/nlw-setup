import dayjs from 'dayjs';
import { Check } from 'phosphor-react';
import { useEffect, useState } from 'react';

import * as Checkbox from '@radix-ui/react-checkbox';

import { api } from '../lib/axios';

interface IHabitsListProps {
  date: Date;
  onCompletedChanged: (completed: number) => void;
}

interface IHabitsInfo {
  possibleHabits: Array<{
    id: string;
    title: string;
    created_at: string;
  }>;
  completedHabits: string[];
}

const HabitsList = ({ date, onCompletedChanged }: IHabitsListProps) => {
  const [habitsInfo, setHabitsInfo] = useState<IHabitsInfo>();

  const isDateInPast = dayjs(date).endOf('day').isBefore(new Date());

  async function handleToggleHabit(habitId: string) {
    try {
      await api.patch(`/habits/${habitId}/toggle`);
    } catch (error) {
      console.log(error);
    }

    const isHabitAlreadyCompleted =
      habitsInfo!.completedHabits.includes(habitId);

    let completedHabits: string[] = [];

    if (isHabitAlreadyCompleted) {
      completedHabits = habitsInfo!.completedHabits.filter(
        (id) => id !== habitId,
      );

      setHabitsInfo(() => ({
        possibleHabits: habitsInfo!.possibleHabits,
        completedHabits,
      }));
    } else {
      completedHabits = [...habitsInfo!.completedHabits, habitId];

      setHabitsInfo(() => ({
        possibleHabits: habitsInfo!.possibleHabits,
        completedHabits,
      }));
    }

    onCompletedChanged(completedHabits.length);
  }

  useEffect(() => {
    api
      .get<IHabitsInfo>('/day', {
        params: {
          date: date.toISOString(),
        },
      })
      .then((response) => setHabitsInfo(response.data));
  }, []);

  return (
    <div className="flex flex-col mt-6 gap-3">
      {habitsInfo?.possibleHabits.map((habit) => (
        <Checkbox.Root
          key={habit.id}
          checked={habitsInfo?.completedHabits.includes(habit.id)}
          disabled={isDateInPast}
          className="flex items-center gap-3 group focus:outline-none disabled:cursor-not-allowed"
          onCheckedChange={() => handleToggleHabit(habit.id)}
        >
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500 transition-colors group-focus:ring-2 group-focus:ring-violet-600 group-focus:ring-offset-2 group-focus:ring-offset-background">
            <Checkbox.Indicator>
              <Check size={20} className="text-white" />
            </Checkbox.Indicator>
          </div>

          <span className="font-semibold text-xl text-white leading-tight group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400">
            {habit.title}
          </span>
        </Checkbox.Root>
      ))}
    </div>
  );
};

export { HabitsList };
