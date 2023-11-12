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

use Flarum\Foundation\ValidationException;
use Flarum\User\Event\Saving;
use Flarum\User\Exception\PermissionDeniedException;
use FoF\SocialProfile\Events\UserButtonsWereChanged;
use FoF\SocialProfile\Validators\ProfileValidator;
use Illuminate\Support\Arr;

class AddSocialButtonsToDatabase
{
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

    /**
     * @throws PermissionDeniedException
     * @throws ValidationException
     */
    public function handle(Saving $event)
    {
        $attributes = Arr::get($event->data, 'attributes', []);

        if (Arr::has($attributes, 'socialButtons')) {
            $this->validator->assertValid($attributes);

            $user = $event->user;
            $actor = $event->actor;

            if ($actor->id !== $user->id) {
                $actor->assertCan('editSocialProfile', $user);
            }

            $user->social_buttons = $attributes['socialButtons'];
            $user->raise(new UserButtonsWereChanged($user, $actor));
        }
    }
}
