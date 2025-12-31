<?php

/*
 * This file is part of fof/socialprofile.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\SocialProfile\Content;

use Flarum\Frontend\Document;
use Flarum\Settings\SettingsRepositoryInterface;

class AddSettingsData
{
    public function __construct(private SettingsRepositoryInterface $settings)
    {
    }

    public function __invoke(Document $document)
    {
        $key = 'fof-socialprofile.test';

        $document->payload[$key] = $this->settings->get($key);
    }
}
