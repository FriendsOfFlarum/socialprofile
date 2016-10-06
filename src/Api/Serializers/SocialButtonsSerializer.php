<?php

/*
 * This file is part of davis/flarum-ext-socialprofile
 *
 * (c) Connor Davis <davis@produes.co>
 *
 * For the full copyright and license information, please view the MIT license
 */

namespace Davis\SocialProfile\Api\Serializers;

use Flarum\Api\Serializer\AbstractSerializer;

class SocialButtonsSerializer extends AbstractSerializer
{
    //protected $type = 'images';

    protected function getDefaultAttributes($model)
    {
        return [
            //
        ];
    }
}
