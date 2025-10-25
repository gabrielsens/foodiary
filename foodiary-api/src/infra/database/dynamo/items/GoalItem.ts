import { Goal } from '@application/entities/Goal';
import { AccountItem } from './AccountItem';

export class GoalItem {
  static readonly type = 'Goal';

  private readonly keys: GoalItem.Keys;

  constructor(private readonly attrs: GoalItem.Attributes) {
    this.keys = {
      PK: GoalItem.getPK(this.attrs.accountId),
      SK: GoalItem.getSK(this.attrs.accountId),
    };
  }

  static fromEntity(goal: Goal) {
    return new GoalItem({
      ...goal,
      createdAt: goal.createdAt.toISOString(),
    });
  }

  static toEntity(goalItem: GoalItem.ItemType): Goal {
    return new Goal({
      accountId: goalItem.accountId,
      calories: goalItem.calories,
      proteins: goalItem.proteins,
      carbohydrates: goalItem.carbohydrates,
      fats: goalItem.fats,
      createdAt: new Date(goalItem.createdAt),
    });
  }

  toItem(): GoalItem.ItemType {
    return {
      type: GoalItem.type,
      ...this.keys,
      ...this.attrs,
    };
  }

  static getPK(accountId: string): GoalItem.Keys['PK'] {
    return `ACCOUNT#${accountId}`;
  }

  static getSK(accountId: string): GoalItem.Keys['SK'] {
    return `ACCOUNT#${accountId}#GOAL`;
  }
}

export namespace GoalItem {
  export type Keys = {
    PK: AccountItem.Keys['PK'];
    SK: `ACCOUNT#${string}#GOAL`;
  };

  export type Attributes = {
    accountId: string;
    calories: number;
    proteins: number;
    carbohydrates: number;
    fats: number;
    createdAt: string;
  };

  export type ItemType = Keys &
    Attributes & {
      type: 'Goal';
    };
}
