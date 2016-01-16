<?php

namespace davis\socialprofile\Migration;
use Flarum\Database\AbstractMigration;
use Illuminate\Database\Schema\Blueprint;
class CreateSocialbuttonsTable extends AbstractMigration
{
    public function up()
    {
        $this->schema->create('socialbuttons', function (Blueprint $table) {
            $table->integer('user_id')->unsigned();
            $table->string('buttons');
        });
    }
    public function down()
    {
        $this->schema->drop('socialbuttons');
    }
}