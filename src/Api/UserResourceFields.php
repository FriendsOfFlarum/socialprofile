<?php

/*
 * This file is part of fof/socialprofile.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\SocialProfile\Api;

use Flarum\Api\Context;
use Flarum\Api\Endpoint;
use Flarum\Api\Resource\AbstractDatabaseResource;
use Flarum\Api\Schema;
use Flarum\User\User;
use FoF\SocialProfile\Events\UserButtonsWereChanged;
use FoF\SocialProfile\Validators\ProfileValidator;

class UserResourceFields
{
    public function __construct(
        protected ProfileValidator $validator
    ) {
    }

    public function __invoke(): array
    {
        return [
            Schema\Str::make('socialButtons')
                ->property('social_buttons')
                ->nullable()
                ->writable(function (User $user, Context $context) {
                    // Check if user can view social profile (required to edit)
                    if (!$context->getActor()->can('viewSocialProfile', $user)) {
                        return false;
                    }

                    // Check if user can edit social profile
                    return $context->getActor()->can('editSocialProfile', $user);
                })
                ->visible(fn (User $user, Context $context) => $context->getActor()->can('viewSocialProfile', $user))
                ->set(function (User $user, string|null $value, Context $context) {
                    // Validate the social buttons
                    $this->validator->assertValid(['socialButtons' => $value]);

                    $user->social_buttons = $value;
                    $user->raise(new UserButtonsWereChanged($user, $context->getActor()));

                    return $user;
                }),

            Schema\Boolean::make('canViewSocialProfile')
                ->get(fn (User $user, Context $context) => $context->getActor()->can('viewSocialProfile', $user)),

            Schema\Boolean::make('canEditSocialProfile')
                ->visible(fn (User $user, Context $context) => $context->getActor()->can('viewSocialProfile', $user))
                ->get(fn (User $user, Context $context) => $context->getActor()->can('editSocialProfile', $user)),
        ];
    }
}
