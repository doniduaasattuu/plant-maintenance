<?php

namespace App\Models;

use Illuminate\Contracts\Database\Query\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Http\Request;

class FunctionalLocation extends Model
{
    use HasFactory;

    protected $table = 'functional_locations';
    protected $primaryKey = 'id';
    protected $keyType = 'string';
    public $timestamps = true;

    protected $fillable = [
        'id',
        'description',
        'updated_by',
        'created_at',
        'updated_at',
    ];

    // RELATION
    public function equipments(): HasMany
    {
        return $this->hasMany(Equipment::class, 'functional_location_id', 'id');
    }

    public function scopeSearch(Builder $builder, Request $request)
    {
        $search = $request->search;
        $order_by = $request->order_by ?? 'id';
        $sort_by = $request->sort_by ?? 'asc';

        $builder
            ->when($search, function ($query, $search) {
                $query
                    ->where('id', 'LIKE', "%{$search}%")
                    ->orWhere('description', 'LIKE', "%{$search}%")
                    ->orWhere('updated_by', 'LIKE', "%{$search}%")
                    ->orWhere(function ($query) use ($search) {
                        $query
                            ->whereRelation('equipments', 'id', 'LIKE', "%{$search}%");
                    });
            })
            ->orderBy($order_by, $sort_by);
    }
}
