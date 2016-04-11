<?php namespace Davis\SocialProfile\Migration;
<<<<<<< HEAD

use Flarum\Database\Migration;
use Illuminate\Database\Schema\Blueprint;

=======
use Flarum\Database\Migration;
use Illuminate\Database\Schema\Blueprint;
>>>>>>> componentcleanup
return Migration::createTable(
    'socialbuttons',
    function (Blueprint $table) {
        $table->increments('id');
        $table->integer('user_id')->unsigned();
        $table->longText('buttons');
    }
);
