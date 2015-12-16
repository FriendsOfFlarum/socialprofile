<?php

namespace davis\socialprofile\Migration;
use Flarum\Database\AbstractMigration;
use Illuminate\Database\Schema\Blueprint;
class AddSocialbuttonsTable extends AbstractMigration
{
    public function up()
    {
        $this->schema->create('socialbuttons', function (Blueprint $table) {
            $table->integer('user_id')->unsigned();
            $table->string('icon');
            $table->string('url');
            $table->string('label');
            $table->dateTime('read_time')->nullable();
            $table->boolean('is_hidden')->default(0);
            $table->primary(['user_id']);
        });
    }
    public function down()
    {
        $this->schema->drop('socialbuttons');
    }
}