<?php namespace davis\socialprofile\Api\Controllers;

use davis\socialprofile\Repository\UserSocialRepository;
use Flarum\Api\Controller\AbstractResourceController;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;

class GetSocialButtonsController extends AbstractResourceController
{
    /**
     * {@inheritdoc}
     */
    public $serializer = 'davis\socialprofile\Api\Serializer\GetSocialButtonsSerializer';
    public $include = ['groups'];
    protected $users;
    
    /**
     * @param UserRepository $users
     */
    public function __construct(UserSocialRepository $users)
    {
        $this->users = $users;
    }
    /**
     * {@inheritdoc}
     */
    protected function data(ServerRequestInterface $request, Document $document)
    {
        $id = array_get($request->getQueryParams(), 'user');

        $actor = $request->getAttribute('actor');
        
        if ($actor->id == $id) {
            $this->serializer = 'davis\socialprofile\Api\Serializer\GetSocialButtonsSerializer';
        }

        return $this->users->findOrFail($id, $actor);
    }
}
