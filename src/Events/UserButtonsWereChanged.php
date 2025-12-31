<?php

/*
 * This file is part of fof/socialprofile.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\SocialProfile\Events;

use Flarum\User\User;

class UserButtonsWereChanged
{
    public function __construct(public User $user, public User $actor)
    {
    }
}
