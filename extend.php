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

    (new Extend\Frontend('admin'))
        ->js(__DIR__.'/js/dist/admin.js'),

    (new Extend\Model(User::class))
        ->cast('social_buttons', 'string'),

    (new Extend\Settings())
        ->serializeToForum('fof-socialprofile.allow_external_favicons', 'fof-socialprofile.allow_external_favicons', 'boolval', true)
        ->serializeToForum('fof-socialprofile.favicon_provider', 'fof-socialprofile.favicon_provider', 'strval')
        ->default('fof-socialprofile.favicon_provider', 'duckduckgo'),

    new Extend\Locales(__DIR__.'/resources/locale'),

    (new Extend\Event())
        ->listen(Saving::class, Listeners\AddSocialButtonsToDatabase::class),

    (new Extend\ApiSerializer(UserSerializer::class))
        ->attributes(Listeners\AddUserSocialProfileAttributes::class),

    (new Extend\Policy())
        ->modelPolicy(User::class, Access\UserPolicy::class),
];
