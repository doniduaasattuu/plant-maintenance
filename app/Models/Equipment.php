<?php

namespace App\Models;

use Illuminate\Contracts\Database\Query\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;

class Equipment extends Model
{
    use HasFactory;

    protected $table = 'equipments';
    protected $primaryKey = 'id';
    protected $keyType = 'string';
    public $timestamps = true;

    protected $fillable = [
        'id',
        'classification_id',
        'functional_location_id',
        'sort_field',
        'description',
        'equipment_status_id',
        'updated_by',
        'created_at',
        'updated_at',
    ];

    protected $attributes = [
        'equipment_status_id' => 1,
    ];

    public function scopeSearch(Builder $builder, Request $request)
    {
        $search = $request->search;
        $classification = $request->classification;
        $status = $request->status;

        $builder
            ->when($search && $classification && $status, function ($query) use ($search, $classification, $status) {
                $query
                    ->where('classification_id', '=', $classification)
                    ->where('equipment_status_id', '=', $status)
                    ->where(function ($query) use ($search) {
                        $query
                            ->where('id', 'LIKE', "%{$search}%")
                            ->orWhere('sort_field', 'LIKE', "%{$search}%")
                            ->orWhere('functional_location_id', 'LIKE', "%{$search}%")
                            ->orWhere('description', 'LIKE', "%{$search}%");
                    });
            })
            ->when($search && is_null($classification) || is_null($status), function ($query) use ($search) {
                $query
                    ->where('id', 'LIKE', "%{$search}%")
                    ->orWhere('sort_field', 'LIKE', "%{$search}%")
                    ->orWhere('functional_location_id', 'LIKE', "%{$search}%")
                    ->orWhere('description', 'LIKE', "%{$search}%");
            })
            ->when($classification && is_null($search) || is_null($status), function ($query) use ($classification) {
                $query
                    ->where('classification_id', $classification);
            })
            ->when($status && is_null($search) || is_null($classification), function ($query) use ($status) {
                $query
                    ->where('equipment_status_id', $status);
            });
    }
}
