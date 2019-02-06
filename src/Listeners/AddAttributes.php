<?php

/*
 * This file is part of fof/socialprofile.
 *
 * Copyright (c) 2019 FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\SocialProfile\Listeners;

use Flarum\Api\Event\Serializing;
use Flarum\Api\Serializer\UserSerializer;

class AddAttributes
{
    public function handle(Serializing $event)
    {
        if ($event->isSerializer(UserSerializer::class)) {
            $event->attributes['socialButtons'] = $event->model->social_buttons;
        }
    }
}