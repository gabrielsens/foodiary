import { Profile } from '@application/entities/Profile';
import { AccountItem } from './AccountItem';

export class ProfileItem {
  static readonly type = 'Profile';

  private readonly keys: ProfileItem.Keys;

  constructor(private readonly attrs: ProfileItem.Attributes) {
    this.keys = {
      PK: ProfileItem.getPK(this.attrs.accountId),
      SK: ProfileItem.getSK(this.attrs.accountId),
    };
  }

  static fromEntity(profile: Profile) {
    return new ProfileItem({
      ...profile,
      birthDate: profile.birthDate.toISOString(),
      createdAt: profile.createdAt.toISOString(),
    });
  }

  static toEntity(profileItem: ProfileItem.ItemType): Profile {
    return new Profile({
      accountId: profileItem.accountId,
      name: profileItem.name,
      birthDate: new Date(profileItem.birthDate),
      gender: profileItem.gender,
      height: profileItem.height,
      weight: profileItem.weight,
      activityLevel: profileItem.activityLevel,
      goal: profileItem.goal,
      createdAt: new Date(profileItem.createdAt),
    });
  }

  toItem(): ProfileItem.ItemType {
    return {
      type: ProfileItem.type,
      ...this.keys,
      ...this.attrs,
    };
  }

  static getPK(accountId: string): ProfileItem.Keys['PK'] {
    return `ACCOUNT#${accountId}`;
  }

  static getSK(accountId: string): ProfileItem.Keys['SK'] {
    return `ACCOUNT#${accountId}#PROFILE`;
  }
}

export namespace ProfileItem {
  export type Keys = {
    PK: AccountItem.Keys['PK'];
    SK: `ACCOUNT#${string}#PROFILE`;
  };

  export type Attributes = {
    accountId: string;
    name: string;
    birthDate: string;
    gender: Profile.Gender;
    height: number;
    weight: number;
    activityLevel: Profile.ActivityLevel;
    goal: Profile.Goal;
    createdAt: string;
  };

  export type ItemType = Keys & Attributes & {
    type: 'Profile';
  };
}
