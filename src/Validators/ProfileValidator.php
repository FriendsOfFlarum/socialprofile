<?php

/*
 * This file is part of fof/socialprofile.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\SocialProfile\Validators;

use Flarum\Foundation\AbstractValidator;
use Illuminate\Validation\Validator;

class ProfileValidator extends AbstractValidator
{
    /**
     * {@inheritdoc}
     */
    protected $rules = [
        'socialButtons' => ['json', 'socialbuttons'],
        'title'         => ['string', 'max:55', 'required'],
        'url'           => ['required', 'max:120', 'url'],
        'icon'          => ['string', 'max:35', 'required'],
    ];

    /**
     * {@inheritdoc}
     */
    protected function getMessages(): array
    {
        return [
            'socialButtons.socialbuttons' => 'The data you sent is missing required variables.',
        ];
    }

    /**
     * {@inheritdoc}
     */
    protected function makeValidator(array $attributes): Validator
    {
        $this->validator->extend('socialbuttons', function ($attribute, $value, $parameters, $validator) {
            return resolve(ProfileValidator::class)->validateSocialButtons($attribute, $value, $parameters, $validator);
        });

        $this->validator->extend('url', function ($attribute, $value, $parameters, $validator) {
            return filter_var($value, FILTER_VALIDATE_URL);
        });

        return parent::makeValidator($attributes);
    }

    protected function validateSocialButtons($attribute, $value, $parameters, $validator)
    {
        if ($value == '[]') {
            return true;
        }

        $data = json_decode($value);

        $valid = false;

        foreach ($data as $button) {
            if (!isset($button->title, $button->url, $button->icon)) {
                $valid = false;
            } else {
                $attributes = [
                    'title'   => $button->title,
                    'url'     => $button->url,
                    'icon'    => $button->icon,
                ];
                $this->assertValid($attributes);
                $valid = true;
            }
        }

        return $valid;
    }
}
