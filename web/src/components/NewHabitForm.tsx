import { Check } from 'phosphor-react';
import { useState, type FormEvent } from 'react';

import * as Checkbox from '@radix-ui/react-checkbox';

import { api } from '../lib/axios';

const availableWeeekDays = [
  'Domingo',
  'Segunda-feira',
  'Terça-feira',
  'Quarta-feira',
  'Quinta-feira',
  'Sexta-feira',
  'Sábado',
];

const NewHabitForm = () => {
  const [title, setTitle] = useState<string>('');
  const [weekDays, setWeekDays] = useState<number[]>([]);

  function handleToggleWeekDay(weekDayIndex: number) {
    if (weekDays.includes(weekDayIndex)) {
      setWeekDays((prevState) =>
        prevState.filter((weekDay) => weekDay !== weekDayIndex),
      );
    } else {
      setWeekDays((prevState) => [...prevState, weekDayIndex]);
    }
  }

  async function createNewHabit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!title || weekDays.length === 0) {
      return false;
    }

    await api.post('/habits', {
      title,
      weekDays,
    });

    setTitle('');
    setWeekDays([]);

    alert('Hábito criado com sucesso');
  }

  return (
    <form onSubmit={createNewHabit} className="w-full flex flex-col mt-6">
      <label className="font-semibold leading-tight" htmlFor="title">
        Qual seu comprometimento?
      </label>

      <input
        id="title"
        type="text"
        placeholder="ex.: Exercícios, dormir bem, etc..."
        autoFocus
        className="p-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400 transition-colors focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 focus:ring-offset-zinc-900"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />

      <label htmlFor="recurrence" className="font-semibold leading-tight mt-4">
        Qual a recorrência?
      </label>

      <div className="flex flex-col gap-2 mt-3">
        {availableWeeekDays.map((weekDay, index) => (
          <Checkbox.Root
            key={weekDay}
            checked={weekDays.includes(index)}
            className="flex items-center gap-3 group focus:outline-none"
            onCheckedChange={() => handleToggleWeekDay(index)}
          >
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500 transition-colors group-focus:ring-2 group-focus:ring-violet-600 group-focus:ring-offset-2 group-focus:ring-offset-background">
              <Checkbox.Indicator>
                <Check size={20} className="text-white" />
              </Checkbox.Indicator>
            </div>

            <span className="text-white leading-tight">{weekDay}</span>
          </Checkbox.Root>
        ))}
      </div>

      <button
        type="submit"
        className="flex items-center justify-center gap-3 font-semibold bg-green-600 hover:bg-green-500 transition-colors mt-6 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-background"
      >
        <Check size={20} weight="bold" />
        Confirmar
      </button>
    </form>
  );
};

export { NewHabitForm };
