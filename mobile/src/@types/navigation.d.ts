/* eslint-disable @typescript-eslint/naming-convention */

import type { IHabitParams } from '../screens/Habit';

export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      home: undefined;
      new: undefined;
      habit: IHabitParams;
    }
  }
}
