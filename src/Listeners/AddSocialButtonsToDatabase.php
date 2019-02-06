<?php

/*
 * This file is part of fof/socialprofile.
 *
 * Copyright (c) 2018 FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\SocialProfile\Listeners;

use Flarum\User\AssertPermissionTrait;
use Flarum\User\Event\Saving;
use FoF\SocialProfile\Events\UserButtonsWereChanged;
use FoF\SocialProfile\Validators\ProfileValidator;
use Illuminate\Support\Arr;

class AddSocialButtonsToDatabase
{
    use AssertPermissionTrait;

    /**
     * Validator for limited suspension.
     *
     * @var ProfileValidator
     */
    protected $validator;

    /**
     * @param ProfileValidator $validator
     */
    public function __construct(ProfileValidator $validator)
    {
        $this->validator = $validator;
    }

    public function handle(Saving $event)
    {
        $attributes = array_get($event->data, 'attributes', []);

        if (Arr::has($attributes, 'socialButtons')) {
            $this->validator->assertValid($attributes);

            $user = $event->user;
            $actor = $event->actor;

            if ($actor->id !== $user->id) {
                $this->assertPermission(
                    $this->elementsOnlyRemoved(
                        $user->social_buttons,
                        $attributes['socialButtons']
                    )
                );

                $this->assertCan($actor, 'edit', $user);
            }

            $user->social_buttons = $attributes['socialButtons'];
            $user->raise(new UserButtonsWereChanged($user));
        }
    }

    /**
     * @param string $current
     * @param string $proposed
     * @return bool
     */
    protected function elementsOnlyRemoved($current, $proposed)
    {
        $current = json_decode($current);
        $proposed = json_decode($proposed);

        foreach ($proposed as $component) {
            if (! Arr::has($current, $component)) {
                return false;
            }
        }

        return true;
    }
}