<?php

namespace davis\socialprofile;

use Flarum\Core\Discussion;
use Flarum\Core\Permission;
use Flarum\Core\Support\ScopeVisibilityTrait;
use Flarum\Database\AbstractModel;

class SocialButtons extends AbstractModel
{
    use ScopeVisibilityTrait;
    /**
     * {@inheritdoc}
     */
    protected $table = 'socialbuttons';
    /**
     * {@inheritdoc}
     */
    protected $dates = ['read_time'];
    /**
     * {@inheritdoc}
     */
    /*public static function boot()
    {
        parent::boot();
        static::deleted(function ($tag) {
            $tag->discussions()->detach();
            Permission::where('permission', 'like', "tag{$tag->id}.%")->delete();
        });
    }*/
    /**
     * Create a new tag.
     *
     * @param string $name
     * @param string $slug
     * @param string $description
     * @param string $color
     * @param bool $isHidden
     * @return static
     */
    public static function build($user_id, $label, $url, $icon)
    {
        $social = new static;
        $social->user_id       = $user_id;
        $social->label      = $label;
        $social->url        = $url;
        $social->icon       = $icon;
        return $social;
    }
    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function parent()
    {
        return $this->belongsTo('davis\socialprofile\SocialButtons', 'parent_id');
    }
}