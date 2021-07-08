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
        'url'           => ['url', 'max:120', 'required'],
        'icon'          => ['string', 'max:35', 'required'],
        'favicon'       => ['string', 'max:120', 'required'],
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
            if (!isset($button->title) || !isset($button->url) || !isset($button->icon) || !isset($button->favicon)) {
                $valid = false;
            } else {
                $attributes = [
                    'title'   => $button->title,
                    'url'     => $button->url,
                    'icon'    => $button->icon,
                    'favicon' => $button->favicon,
                ];
                $this->assertValid($attributes);
                $valid = true;
            }
        }

        return $valid;
    }
}
