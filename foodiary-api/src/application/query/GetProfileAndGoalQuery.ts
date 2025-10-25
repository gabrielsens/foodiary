import { Profile } from '@application/entities/Profile';
import { NotFound } from '@application/errors/http/NotFound';
import { QueryCommand } from '@aws-sdk/lib-dynamodb';
import { dynamoClient } from '@infra/clients/dynamoClient';
import { AccountItem } from '@infra/database/dynamo/items/AccountItem';
import { GoalItem } from '@infra/database/dynamo/items/GoalItem';
import { ProfileItem } from '@infra/database/dynamo/items/ProfileItem';
import { Injectable } from '@kernel/decorators/Injectable';
import { AppConfig } from '@shared/config/AppConfig';

@Injectable()
export class GetProfileAndGoalQuery {
  constructor(private readonly appConfig: AppConfig) {}

  async execute({
    accountId,
  }: GetProfileAndGoalQuery.Input): Promise<GetProfileAndGoalQuery.Output> {
    const commnad = new QueryCommand({
      TableName: this.appConfig.db.dynamodb.mainTable,
      Limit: 2,
      ProjectionExpression:
        '#PK, #SK, #name, #birthDate, #gender, #height, #weight, #calories, #proteins, #carbohydrates, #fats, #type',
      KeyConditionExpression: '#PK = :PK AND begins_with(#SK, :SK)',
      ExpressionAttributeNames: {
        '#PK': 'PK',
        '#SK': 'SK',
        '#name': 'name',
        '#birthDate': 'birthDate',
        '#gender': 'gender',
        '#height': 'height',
        '#weight': 'weight',
        '#calories': 'calories',
        '#proteins': 'proteins',
        '#carbohydrates': 'carbohydrates',
        '#fats': 'fats',
        '#type': 'type',
      },
      ExpressionAttributeValues: {
        ':PK': AccountItem.getPK(accountId),
        ':SK': `${AccountItem.getPK(accountId)}#`,
      },
    });

    const { Items = [] } = await dynamoClient.send(commnad);

    const profile = Items.find(
      (item): item is GetProfileAndGoalQuery.ProfileItemType =>
        item.type === ProfileItem.type,
    );

    const goal = Items.find(
      (item): item is GetProfileAndGoalQuery.GoalItemType =>
        item.type === GoalItem.type,
    );

    if (profile === undefined || goal === undefined) {
      throw new NotFound('Account not found');
    }

    return {
      profile: {
        name: profile.name,
        birthDate: profile.birthDate,
        gender: profile.gender,
        height: profile.height,
        weight: profile.weight,
      },
      goal: {
        calories: goal.calories,
        proteins: goal.proteins,
        carbohydrates: goal.carbohydrates,
        fats: goal.fats,
      },
    };
  }
}

export namespace GetProfileAndGoalQuery {
  export type Input = {
    accountId: string;
  };

  export type ProfileItemType = {
    name: string;
    birthDate: string;
    gender: Profile.Gender;
    height: number;
    weight: number;
  };

  export type GoalItemType = {
    calories: number;
    proteins: number;
    carbohydrates: number;
    fats: number;
  };

  export type Output = {
    profile: ProfileItemType;
    goal: GoalItemType;
  };
}
