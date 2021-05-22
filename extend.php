<?php

/*
 * This file is part of fof/socialprofile.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\SocialProfile;

use Flarum\Api\Serializer\UserSerializer;
use Flarum\Extend;
use Flarum\User\Event\Saving;
use Flarum\User\User;

return [
    (new Extend\Frontend('forum'))
        ->js(__DIR__.'/js/dist/forum.js')
        ->css(__DIR__.'/resources/less/forum.less')
        ->content(Content\AddSettingsData::class),

    new Extend\Locales(__DIR__.'/resources/locale'),

    (new Extend\Event())
        ->listen(Saving::class, Listeners\AddSocialButtonsToDatabase::class),

    (new Extend\ApiSerializer(UserSerializer::class))
        ->attribute('socialButtons', function (UserSerializer $serializer, User $user) {
            return $user->social_buttons;
        }),
];
