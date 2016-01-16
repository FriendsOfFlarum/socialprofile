<?php namespace davis\socialprofile\Events;

use davis\socialprofile\buttons;
use Flarum\Core\Post;
use Flarum\Core\User;

class SocialProfileEditted
{
    public $actor;
    
    public $buttons;

    public function __construct(User $actor, $buttons)
    {
        $this->actor = $actor;
        $this->buttons = $buttons;
    }
}
