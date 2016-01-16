<?php namespace davis\socialprofile\Listener;

use davis\socialprofile\Api\Controllers\EditSocialButtonsController;
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
    }
}
