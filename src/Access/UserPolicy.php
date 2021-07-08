<?php

/*
 * This file is part of fof/socialprofile.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\SocialProfile\Access;

use Flarum\User\Access\AbstractPolicy;
use Flarum\User\User;

class UserPolicy extends AbstractPolicy
{
    public function viewSocialProfile(User $actor, User $user): string
    {
        // We only let the user see its own socialprofile if they are also allowed to edit it
        if (($actor->id === $user->id && $actor->hasPermission('fof-socialprofile.editOwn'))
            || $actor->hasPermission('fof-socialprofile.view')
        ) {
            return $this->allow();
        }

        return $this->deny();
    }

    public function editSocialProfile(User $actor, User $user): string
    {
        if (($actor->id === $user->id && $actor->hasPermission('fof-socialprofile.editOwn'))
            || $actor->hasPermission('fof-socialprofile.editAny')
        ) {
            return $this->allow();
        }

        return $this->deny();
    }
}
