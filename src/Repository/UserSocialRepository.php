<?php namespace davis\socialprofile\Repository;

use davis\socialprofile\buttons;
use Illuminate\Database\Eloquent\Builder;

class UserSocialRepository
{
    /**
     * Get a new query builder for the users table.
     *
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function query()
    {
        return buttons::query();
    }

    /**
     * Find a user by ID, optionally making sure it is visible to a certain
     * user, or throw an exception.
     *
     * @param int $id
     * @param User $actor
     * @return User
     *
     * @throws \Illuminate\Database\Eloquent\ModelNotFoundException
     */
    public function findOrFail($id, User $actor = null)
    {
        $query = buttons::where('user_id', $id);
        
        return $this->scopeVisibleTo($query, $actor)->firstOrFail();
    }
    /**
     * Scope a query to only include records that are visible to a user.
     *
     * @param Builder $query
     * @param User $actor
     * @return Builder
     */
    protected function scopeVisibleTo(Builder $query, User $actor = null)
    {
        if ($actor !== null) {
            $query->whereVisibleTo($actor);
        }
        return $query;
    }
}
