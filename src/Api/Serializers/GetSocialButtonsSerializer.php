<?php

/*
 * This file is part of davis/flarum-ext-socialprofile
 *
 * (c) Connor Davis <davis@produes.co>
 *
 * For the full copyright and license information, please view the MIT license
 */

namespace Davis\SocialProfile\Api\Serializers;

use Flarum\Api\Serializer\UserBasicSerializer;
use Flarum\Core\Access\Gate;

class GetSocialButtonsSerializer extends UserBasicSerializer
{
    protected $gate;

    public function __construct(Gate $gate)
    {
        $this->gate = $gate;
    }

    protected function getDefaultAttributes($user)
    {
        $gate = $this->gate->forUser($this->actor);

        $attributes = [
            'buttons'              => $user->buttons,
        ];

        return $attributes;
    }
}
