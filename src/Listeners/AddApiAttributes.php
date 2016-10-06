<?php

/*
 * This file is part of davis/flarum-ext-socialprofile
 *
 * (c) Connor Davis <davis@produes.co>
 *
 * For the full copyright and license information, please view the MIT license
 */

namespace Davis\SocialProfile\Listeners;

use Davis\SocialProfile\Api\Controllers\EditSocialButtonsController;
use Davis\SocialProfile\Api\Controllers\GetSocialButtonsController;
use Flarum\Event\ConfigureApiRoutes;
use Illuminate\Events\Dispatcher;

class AddApiAttributes
{
    public function subscribe(Dispatcher $events)
    {
        $events->listen(ConfigureApiRoutes::class, [$this, 'configureApiRoutes']);
    }

    public function configureApiRoutes(ConfigureApiRoutes $event)
    {
        $event->post('/profile/socialbuttons', 'davis.profile.buttons', EditSocialButtonsController::class);
        $event->get('/profile/socialbutton/{user}', 'davis.profile.button.user', GetSocialButtonsController::class);
    }
}
