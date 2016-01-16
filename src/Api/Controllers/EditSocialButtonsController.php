<?php namespace davis\socialprofile\Api\Controllers;

use davis\socialprofile\Api\Serializers\SocialButtonsSerializer;
use davis\socialprofile\Commands\SaveSocialSettings;
use Flarum\Api\Controller\AbstractResourceController;
use Illuminate\Contracts\Bus\Dispatcher;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;
use Zend\Diactoros\UploadedFile;

class EditSocialButtonsController extends AbstractResourceController
{

    public $serializer = SocialButtonsSerializer::class;

    protected $bus;

    public function __construct(Dispatcher $bus)
    {
        $this->bus = $bus;
    }
 
    protected function data(ServerRequestInterface $request, Document $document)
    {
        $actor = $request->getAttribute('actor');
        $buttons = array_get($request->getParsedBody(), 'buttons');

        return $this->bus->dispatch(
            new SaveSocialSettings($buttons, $actor)
        );
    }
}
