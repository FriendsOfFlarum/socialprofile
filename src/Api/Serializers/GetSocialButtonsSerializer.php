<?php namespace davis\socialprofile\Api\Serializer;

use Flarum\Core\Access\Gate;
use Flarum\Api\Serializer\UserBasicSerializer;

class GetSocialButtonsSerializer extends UserBasicSerializer
{
    /**
     * @var Gate
     */
    protected $gate;

    /**
     * @param Gate $gate
     */
    public function __construct(Gate $gate)
    {
        $this->gate = $gate;
    }

    /**
     * {@inheritdoc}
     */
    protected function getDefaultAttributes($user)
    {
        //$attributes = parent::getDefaultAttributes($user);

        $gate = $this->gate->forUser($this->actor);

        //$canEdit = $gate->allows('edit', $user);

        $attributes = [
            'buttons'              => $user->buttons,
        ];

        return $attributes;
    }
}
