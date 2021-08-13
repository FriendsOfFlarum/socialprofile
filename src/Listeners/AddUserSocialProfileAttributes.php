<?php

/*
 * This file is part of fof/socialprofile.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\SocialProfile\Listeners;

use Flarum\Api\Serializer\UserSerializer;
use Flarum\User\User;

class AddUserSocialProfileAttributes
{
    public function __invoke(UserSerializer $serializer, User $user, array $attributes): array
    {
        $actor = $serializer->getActor();

        $attributes['canViewSocialProfile'] = $actor->can('viewSocialProfile', $user);

        if ($attributes['canViewSocialProfile']) {
            $attributes['socialButtons'] = $user->social_buttons;
            $attributes['canEditSocialProfile'] = $actor->can('editSocialProfile', $user);
        }

        return $attributes;
    }
}
