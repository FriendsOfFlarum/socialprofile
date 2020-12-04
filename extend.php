<?php

/*
 * This file is part of fof/socialprofile.
 *
 * Copyright (c) 2019 FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\SocialProfile;

use Flarum\Api\Event\Serializing;
use Flarum\Extend;
use Flarum\User\Event\Saving;

return [
    (new Extend\Frontend('forum'))
        ->js(__DIR__.'/js/dist/forum.js')
        ->css(__DIR__.'/resources/less/forum.less')
        ->content(Content\AddSettingsData::class),
    new Extend\Locales(__DIR__ . '/resources/locale'),
    (new Extend\Event())
        ->listen(Serializing::class, Listeners\AddAttributes::class)
        ->listen(Saving::class, Listeners\AddSocialButtonsToDatabase::class),
];
