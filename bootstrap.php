<?php

use davis\socialprofile\Listener;
use Illuminate\Contracts\Events\Dispatcher;

return function (Dispatcher $events) {
    
    $events->subscribe(Listener\AddClientAssets::class);
    $events->subscribe(Listener\AddApiAttributes::class);
    
};
