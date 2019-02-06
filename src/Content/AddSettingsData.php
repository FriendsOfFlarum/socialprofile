<?php

/*
 * This file is part of fof/socialprofile.
 *
 * Copyright (c) 2019 FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\SocialProfile\Content;

use Flarum\Frontend\Document;
use Flarum\Settings\SettingsRepositoryInterface;

class AddSettingsData
{
    /**
     * @var SettingsRepositoryInterface
     */
    private $settings;

    public function __construct(SettingsRepositoryInterface $settings)
    {
        $this->settings = $settings;
    }

    public function __invoke(Document $document)
    {
        $key = "fof-socialprofile.test";

        $document->payload[$key] = $this->settings->get($key);
    }
}