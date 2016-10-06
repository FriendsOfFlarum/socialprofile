<?php

/*
 * This file is part of davis/flarum-ext-socialprofile
 *
 * (c) Connor Davis <davis@produes.co>
 *
 * For the full copyright and license information, please view the MIT license
 */

namespace Davis\SocialProfile\Repository;

use Davis\SocialProfile\Buttons;

class UserSocialRepository
{
    public function query()
    {
        return Buttons::query();
    }

    public function findOrFail($id)
    {
        return Buttons::where('user_id', $id)->first();
    }
}
