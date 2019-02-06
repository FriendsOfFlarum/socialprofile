<?php

/*
 * This file is part of fof/socialprofile.
 *
 * Copyright (c) 2018 FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Schema\Builder;

return [
    'up' => function (Builder $schema) {
        if ($schema->hasColumn('users', 'social_buttons')) {
            return;
        }

        $schema->table('users', function (Blueprint $table) {
            $table->longText('social_buttons')->nullable();
        });
    },
    'down' => function (Builder $schema) {
        if (!$schema->hasColumn('users', 'social_buttons')) {
            return;
        }

        $schema->table('users', function (Blueprint $table) {
            $table->dropColumn('social_buttons');
        });
    },
];