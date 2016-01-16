<?php namespace davis\socialprofile\Commands;

use Flarum\Core\User;
use Psr\Http\Message\UploadedFileInterface;

class SaveSocialSettings
{
    public $buttons;

    public $actor;

    public function __construct($buttons, User $actor)
    {
        $this->buttons = $buttons;
        $this->actor = $actor;
    }
}
