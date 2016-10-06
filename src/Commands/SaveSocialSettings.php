<?php

/*
 * This file is part of davis/flarum-ext-socialprofile
 *
 * (c) Connor Davis <davis@produes.co>
 *
 * For the full copyright and license information, please view the MIT license
 */

namespace Davis\SocialProfile\Commands;

use Flarum\Core\User;

class SaveSocialSettings
{
    public $Buttons;

    public $actor;

    public function __construct($Buttons, User $actor)
    {
        $this->Buttons = $Buttons;
        $this->actor = $actor;
    }
}
