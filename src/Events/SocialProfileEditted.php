<?php

/*
 * This file is part of davis/flarum-ext-socialprofile
 *
 * (c) Connor Davis <davis@produes.co>
 *
 * For the full copyright and license information, please view the MIT license
 */

namespace Davis\SocialProfile\Events;

use Davis\SocialProfile\Buttons;
use Flarum\Core\User;

class SocialProfileEditted
{
    public $actor;

    public $Buttons;

    public function __construct(User $actor, $Buttons)
    {
        $this->actor = $actor;
        $this->Buttons = $Buttons;
    }
}
