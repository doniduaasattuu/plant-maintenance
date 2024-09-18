<?php

namespace App\Models;

use Illuminate\Contracts\Database\Query\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Http\Request;

class Material extends Model
{
    use HasFactory;

    protected $table = 'materials';
    protected $primaryKey = 'id';
    protected $keyType = 'string';
    public $timestamps = true;
    public $incrementing = true;

    protected $fillable = [
        'id',
        'title',
        'unit_of_measurement_id',
        'created_at',
        'updated_at',
    ];

    const MAX_PRICE = 100000000;

    public function scopeSearch(Builder $builder, Request $request)
    {
        $search = $request->search;
        $measurement = $request->measurement;

        $builder
            ->when(($search && $measurement), function ($query) use ($search, $measurement) {
                $query
                    ->where('unit_of_measurement_id', '=', $measurement)
                    ->where(function ($query) use ($search) {
                        $query
                            ->where('id', 'LIKE', "%{$search}%")
                            ->orWhere('title', 'LIKE', "%{$search}%");
                    });
            })
            ->when($search && is_null($measurement), function ($query) use ($search) {
                $query
                    ->where('id', 'LIKE', "%{$search}%")
                    ->orWhere('title', 'LIKE', "%{$search}%");
            })
            ->when($measurement && is_null($search), function ($query) use ($measurement) {
                $query
                    ->where('unit_of_measurement_id', '=', $measurement);
            });
    }

    public function equipments(): BelongsToMany
    {
        return $this->belongsToMany(
            Equipment::class,
            'material_equipment',
            'material_id',
            'equipment_id',
        )
            ->withPivot('quantity')
            ->withTimestamps();
    }
}
