<?php namespace davis\socialprofile\Commands;

use davis\socialprofile\buttons;
use davis\socialprofile\Events\SocialProfileEditted;
use Flarum\Core\Access\AssertPermissionTrait;
use Flarum\Core\Repository\UserRepository;
use Flarum\Core\Support\DispatchEventsTrait;
use Flarum\Foundation\Application;
use Illuminate\Events\Dispatcher;

class SaveSocialSettingsHandler
{
    use DispatchEventsTrait;
    use AssertPermissionTrait;

    protected $users;
    
    protected $app;

    public function __construct(
        Dispatcher $events,
        UserRepository $users,
        Application $app
    ) {
        $this->events    = $events;
        $this->users     = $users;
        $this->app       = $app;
    }

    public function handle(SaveSocialSettings $command)
    {
        $buttons = new buttons();
        $buttons->user_id = $command->actor->id;
        $buttons->buttons = $command->buttons;

       $this->events->fire(
            new SocialProfileEditted($command->actor, $command->buttons)
        );
        
        $buttons->save();

        return $buttons;
    }
}
