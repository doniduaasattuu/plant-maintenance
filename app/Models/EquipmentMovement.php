<?php

namespace App\Models;

use Illuminate\Contracts\Database\Query\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;

class EquipmentMovement extends Model
{
    use HasFactory;

    protected $table = 'equipment_movements';
    protected $primaryKey = 'id';
    protected $keyType = 'int';
    public $timestamps = true;
    public $increments = true;

    protected $fillable = [
        'id',
        'functional_location_id',
        'functional_location_description',
        'equipment_id',
        'equipment_sort_field',
        'movement_status_id',
        'replaced_by',
        'created_at',
        'updated_at',
    ];

    public function scopeSearch(Builder $builder, Request $request)
    {
        $search = $request->search;

        $builder
            ->when($search, function ($query, $search) {
                $query
                    ->where('functional_location_id', 'LIKE', "%{$search}%")
                    ->orWhere('functional_location_description', 'LIKE', "%{$search}%")
                    ->orWhere('equipment_id', 'LIKE', "%{$search}%")
                    ->orWhere('equipment_sort_field', 'LIKE', "%{$search}%")
                    ->orWhere('replaced_by', 'LIKE', "%{$search}%");
            });
    }
}
