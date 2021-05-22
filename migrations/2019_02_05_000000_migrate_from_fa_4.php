<?php

/*
 * This file is part of fof/socialprofile.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

use Illuminate\Database\Schema\Builder;

return [
    'up' => function (Builder $schema) {
        if (!$schema->hasColumn('users', 'social_buttons')) {
            return;
        }

        $users = $schema->getConnection()->table('users')
            ->where('social_buttons', '!=', '')
            ->where('social_buttons', '!=', '[]')
            ->select('id', 'social_buttons')
            ->cursor();

        foreach ($users as $user) {
            $schema->getConnection()->table('users')
                ->where('id', $user->id)
                ->update([
                    'social_buttons' => preg_replace('/"(?<!fab )(fa-\S+?)"/m', '"fab \\1"', $user->social_buttons),
                ]);
        }
    },
    'down' => function (Builder $schema) {
    },
];
