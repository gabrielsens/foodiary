import { Account } from '@application/entities/Account';
import { PutCommand, QueryCommand } from '@aws-sdk/lib-dynamodb';
import { dynamoClient } from '@infra/clients/dynamoClient';
import { Injectable } from '@kernel/decorators/Injectable';
import { AppConfig } from '@shared/config/AppConfig';
import { AccountItem } from '../items/AccountItem';

@Injectable()
export class AccountRepository {
  async findByEmail(email: string): Promise<Account | null> {
    const command = new QueryCommand({
      TableName: this.appConfig.db.dynamodb.mainTable,
      IndexName: 'GSI1',
      Limit: 1,
      KeyConditionExpression: '#GSI1PK = :GSI1PK AND #GSI1SK = :GSI1SK',
      ExpressionAttributeNames: {
        '#GSI1PK': 'GSI1PK',
        '#GSI1SK': 'GSI1SK',
      },
      ExpressionAttributeValues: {
        ':GSI1PK': AccountItem.getGSI1PK(email),
        ':GSI1SK': AccountItem.getGSI1SK(email),
      },
    });

    const { Items = [] } = await dynamoClient.send(command);

    const [account] = Items;

    if (!account) {
      return null;
    }

    return AccountItem.toEntity(account as AccountItem.ItemType);
  }
    constructor(private readonly appConfig: AppConfig) {}

  async create(account: Account): Promise<void> {
    const accountItem = AccountItem.fromEntity(account);

    const command = new PutCommand({
      TableName: this.appConfig.db.dynamodb.mainTable,
      Item: accountItem.toItem(),
    });

    await dynamoClient.send(command);
  }
}
