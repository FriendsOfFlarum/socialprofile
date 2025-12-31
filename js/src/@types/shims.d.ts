import type { SocialButton } from '../forum/extend';
import User from 'flarum/common/models/User';

declare module 'flarum/common/models/User' {
  export default interface User {
    canViewSocialProfile(): boolean;
    canEditSocialProfile(): boolean;
    socialButtons(): SocialButton[];
  }
}

declare module 'flarum/forum/components/UserCard' {
  export default interface UserCard {
    attrs: UserCardAttrs;
  }

  export interface UserCardAttrs {
    user: User;
    className?: string;
    editable?: boolean;
    controlsButtonClassName?: string;
  }
}
