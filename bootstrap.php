<?php namespace davis\socialprofile;

use Illuminate\Contracts\Events\Dispatcher;

return function (Dispatcher $events) {
    $events->subscribe(Listener\AddClientAssets::class);
    $events->subscribe(Listener\LoadSettingsFromDatabase::class);
    $events->subscribe(Listener\AddApiAttributes::class);
};
