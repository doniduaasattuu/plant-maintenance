<?php

namespace App\Models;

use Illuminate\Contracts\Database\Query\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
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
            ->when(($search && $classification && $status), function ($query) use ($search, $classification, $status) {
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
            ->when($search, function ($query) use ($search, $classification, $status) {
                $query
                    ->when($classification, function ($query) use ($search, $classification) {
                        $query
                            ->where('classification_id', $classification)
                            ->where(function ($query) use ($search) {
                                $query
                                    ->where('id', 'LIKE', "%{$search}%")
                                    ->orWhere('sort_field', 'LIKE', "%{$search}%")
                                    ->orWhere('functional_location_id', 'LIKE', "%{$search}%")
                                    ->orWhere('description', 'LIKE', "%{$search}%");
                            });
                    })
                    ->when($status, function ($query) use ($search, $status) {
                        $query
                            ->where('equipment_status_id', $status)
                            ->where(function ($query) use ($search) {
                                $query
                                    ->where('id', 'LIKE', "%{$search}%")
                                    ->orWhere('sort_field', 'LIKE', "%{$search}%")
                                    ->orWhere('functional_location_id', 'LIKE', "%{$search}%")
                                    ->orWhere('description', 'LIKE', "%{$search}%");
                            });
                    })
                    ->when(is_null($status) && is_null($classification), function ($query) use ($search) {
                        $query
                            ->where('id', 'LIKE', "%{$search}%")
                            ->orWhere('sort_field', 'LIKE', "%{$search}%")
                            ->orWhere('functional_location_id', 'LIKE', "%{$search}%")
                            ->orWhere('description', 'LIKE', "%{$search}%");
                    });
            })
            ->when($classification, function ($query) use ($classification, $status, $search) {
                $query
                    ->when($classification && !is_null($status), function ($query) use ($classification, $status, $search) {
                        $query
                            ->when($status, function ($query) use ($classification, $status) {
                                $query
                                    ->where('classification_id', $classification)
                                    ->where('equipment_status_id', $status);
                            });
                    })
                    ->when(is_null($status) && is_null($search), function ($query) use ($classification) {
                        $query
                            ->where('classification_id', $classification);
                    });
            })
            ->when($status, function ($query, $status) {
                $query
                    ->where('equipment_status_id', $status);
            });
    }

    public function materials(): BelongsToMany
    {
        return $this->belongsToMany(
            Material::class,
            'material_equipment',
            'equipment_id',
            'material_id',
        )
            ->withPivot('quantity')
            ->withTimestamps();
    }

    public array $links = [
        'ZCLASS_E009' => [
            'check' => 'motor-check.create',
            'trend' => 'trend.show',
            'export' => 'export.motor-checks',
        ],
        'ZCLASS_U001' => [
            'check' => 'ac-check.create',
            'trend' => 'trend.show',
            'export' => 'export.ac-checks',
        ],
    ];
}
