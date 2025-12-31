import Extend from 'flarum/common/extenders';
import User from 'flarum/common/models/User';

export interface SocialButton {
  title: string;
  url: string;
  icon: string;
}

export default [
  new Extend.Model(User) //
    .attribute<boolean>('canViewSocialProfile')
    .attribute<boolean>('canEditSocialProfile')
    .attribute<SocialButton[]>('socialButtons', (str: unknown) => JSON.parse((str as string) || '[]')),
];
