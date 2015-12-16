<?php 
namespace davis\socialprofile\Listener;

use Flarum\Api\Controller\ListDiscussionsController;
use Flarum\Api\Serializer\UserSerializer;
use Flarum\Event\ConfigureApiController;
use Flarum\Event\PrepareApiAttributes;
use Illuminate\Contracts\Events\Dispatcher;

class AddApiAttributes
{
    /**
     * @param Dispatcher $events
     */
    public function subscribe(Dispatcher $events)
    {
        $events->listen(PrepareApiAttributes::class, [$this, 'prepareApiAttributes']);
       // $events->listen(ConfigureApiController::class, [$this, 'includeStartPost']);
    }

    /**
     * @param PrepareApiAttributes $event
     */
    public function prepareApiAttributes(PrepareApiAttributes $event)
    {
        if ($event->isSerializer(UserSerializer::class)) {
            $event->attributes['socialaccs'] = (string) $event->model->socialaccs;
        }
    }

    /**
     * @param ConfigureApiController $event
     */
    public function includeStartPost(ConfigureApiController $event)
    {
        if ($event->isController(ListDiscussionsController::class)) {
            $event->addInclude('startPost');
        }
    }
}
