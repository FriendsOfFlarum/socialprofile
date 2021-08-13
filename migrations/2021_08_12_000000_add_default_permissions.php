<?php

/*
 * This file is part of fof/socialprofile.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

use Flarum\Database\Migration;
use Flarum\Group\Group;

return Migration::addPermissions([
    'fof-socialprofile.view'    => Group::MEMBER_ID,
    'fof-socialprofile.editOwn' => Group::MEMBER_ID,
    'fof-socialprofile.editAny' => Group::MODERATOR_ID,
]);
